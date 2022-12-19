// import { MockMongoServer } from '@/__tests__/__mocks__/MockMongoServer'
import { Db, MongoClient } from 'mongodb'

export class MyMongoClient {
  private static client?: MongoClient

  static async getDb(): Promise<Db> {
    if (!this.client) {
      await this.connect()
      return this.getDb() // !! this may cause infinite loop. Make sure `this.connect` has indeed assigned this.client
    }
    // TODO: return diffferny DB name for each test to prevent clash?
    return this.client.db('hangry-nextjs')
  }

  static async connect() {
    this.client = await getMongoClient()
  }

  static async disconnect() {
    if (!this.client) {
      throw Error('Client not initialised')
    }
    await this.client.close()
  }
}

async function getMongoClient(): Promise<MongoClient> {
  switch (process.env.NODE_ENV) {
    case 'test': {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const {
        MockMongoServer,
      } = require('@/__tests__/__mocks__/MockMongoServer')
      return MockMongoServer.client
    }
    case 'development':
    case 'production':
      return MongoClient.connect(
        `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.woa4fgk.mongodb.net/?retryWrites=true&w=majority`
      )
  }
}
