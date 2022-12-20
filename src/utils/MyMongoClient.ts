import { Db, MongoClient } from 'mongodb'
import { MockMongoServer } from '@/__tests__/mocks/MockMongoServer'
import { DB_NAME } from './constants'

export class MyMongoClient {
  static client?: MongoClient

  static async getDb(): Promise<Db> {
    if (!this.client) {
      await MyMongoClient.init()
    }
    if (!this.client) {
      throw Error('client not initialised and failed to initialise one')
    }
    return this.client.db(DB_NAME)
  }
  static async init(): Promise<void> {
    if (this.client) return
    // Note: `process.env.NODE_ENV` is forced to === 'production' during collecting page data, so need to use a custom env variable here
    if (!(process.env.IS_TEST_BUILD || process.env.NODE_ENV === 'test')) {
      this.client = await MongoClient.connect(
        `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.woa4fgk.mongodb.net/?retryWrites=true&w=majority`
      )
      return
    }
    // Use mock MongoDB server & client
    if (!MockMongoServer.server) {
      await MockMongoServer.init()
    }
    if (!MockMongoServer.server) {
      throw Error(
        'mock MongoDB server not initialised and failed to initialise one'
      )
    }
    this.client = await MongoClient.connect(MockMongoServer.server.getUri())
  }
}
