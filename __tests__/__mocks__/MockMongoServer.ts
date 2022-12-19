import { MongoClient } from 'mongodb'
import { MongoMemoryServer } from 'mongodb-memory-server'

export class MockMongoServer {
  static server: MongoMemoryServer
  static client: MongoClient

  static async init() {
    this.server = await MongoMemoryServer.create()
    this.client = await MongoClient.connect(this.server.getUri())
  }
}
