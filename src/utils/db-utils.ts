import { Db, MongoClient } from 'mongodb'

/**
 * Wrapper for using the MongoDB client
 * @param callback the callback to be called after connecting to the db
 * @template R result returned from the callback
 */
export async function connectMongoDB<R>(callback: (db: Db) => Promise<R>) {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.woa4fgk.mongodb.net/?retryWrites=true&w=majority`
  )
  const db = client.db('hangry-nextjs')

  const resultData = await callback(db)

  return resultData
}
