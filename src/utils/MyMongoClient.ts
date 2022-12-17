import { promises as fs } from 'fs'
import { Db, MongoClient } from 'mongodb'

export class MyMongoClient {
  private static client: MongoClient
  private static db: Db

  static async getDb() {
    if (!this.db) {
      await this.connect()
    }
    return this.db
  }

  static async connect() {
    this.client = await MongoClient.connect(getMongoClientURL())
    this.db = this.client.db('hangry-nextjs')
  }

  static async resetDB() {
    if (process.env.NODE_ENV !== 'test') {
      throw new Error('Only allowed to reset DB in test environment!')
    }

    this.db.collection('stores').deleteMany({})
    const dataBuffer = await fs.readFile('__tests__/__mocks__/mockDB.json')
    const data = JSON.parse(dataBuffer.toString())
    this.db.collection('stores').insertMany(data)
  }

  static async disconnect() {
    await this.client.close()
  }
}

function getMongoClientURL(): string {
  switch (process.env.NODE_ENV) {
    case 'test':
      return 'mongodb://127.0.0.1:27017'
    case 'development':
    case 'production':
      return `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.woa4fgk.mongodb.net/?retryWrites=true&w=majority`
  }
}
