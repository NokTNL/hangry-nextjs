import { DB_NAME } from '@/src/utils/constants'
import { MongoClient } from 'mongodb'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mockDB from './mockDB'

export class MockMongoServer {
  static server?: MongoMemoryServer

  static async init(): Promise<void> {
    if (this.server) return
    this.server = await MongoMemoryServer.create()

    /* Inject DB */
    const dataInjectionClient = await MongoClient.connect(this.server.getUri())
    const db = dataInjectionClient.db(DB_NAME)
    await db.collection('stores').insertMany(mockDB)
    void dataInjectionClient.close()
  }

  static async resetDB() {
    if (!this.server) {
      throw Error('Mock MongoDB server not initialised')
    }
    const eraserClient = await MongoClient.connect(this.server.getUri())
    const db = await eraserClient.db(DB_NAME)
    await db.collection('stores').deleteMany({})
    await db.collection('stores').insertMany(mockDB)
    void eraserClient.close()
  }
}
