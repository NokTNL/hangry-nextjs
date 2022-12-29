import { MongoClient } from 'mongodb'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mockDB from './mockDB.mjs'

export async function createMongoServer() {
  const serverInstance = await MongoMemoryServer.create()

  /* Inject DB */
  const dataInjectionClient = await MongoClient.connect(serverInstance.getUri())
  const db = dataInjectionClient.db(process.env.DB_NAME)
  await db.collection('stores').insertMany(mockDB)
  void dataInjectionClient.close()

  return serverInstance
}

// TODO: fix this
// export async function resetDB() {
//   if (!global.MOCK_MONGO_SERVER) {
//     throw Error('global.MOCK_MONGO_SERVER is undefined')
//   }
//   const eraserClient = await MongoClient.connect(
//     global.MOCK_MONGO_SERVER.getUri()
//   )
//   const db = await eraserClient.db(process.env.DB_NAME)
//   await db.collection('stores').deleteMany({})
//   await db.collection('stores').insertMany(mockDB)
//   void eraserClient.close()
// }
