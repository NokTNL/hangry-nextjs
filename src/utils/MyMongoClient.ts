import { Db, MongoClient } from 'mongodb'

export class MyMongoClient {
  static client?: MongoClient

  static async getDb(): Promise<Db> {
    if (!this.client) {
      await MyMongoClient.init()
    }
    if (!this.client) {
      throw Error('client not initialised and failed to initialise one')
    }
    return this.client.db(process.env.DB_NAME)
  }
  static async init(): Promise<void> {
    if (this.client) return

    if (!(process.env.IS_TEST_BUILD || process.env.NODE_ENV === 'test')) {
      this.client = await MongoClient.connect(
        `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.woa4fgk.mongodb.net/?retryWrites=true&w=majority`
      )
      return
    }
    // Use mock MongoDB server
    if (!process.env.MOCK_MONGODB_SERVER_URI) {
      throw Error('process.env.MOCK_MONGODB_SERVER_URI is undefined')
    }
    this.client = await MongoClient.connect(process.env.MOCK_MONGODB_SERVER_URI)
  }
}
