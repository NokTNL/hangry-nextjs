import { transactionSchema } from '@/src/models/db'
import { MyMongoClient } from '@/src/utils/MyMongoClient'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function transactionHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // TODO: check items array is not empty, possibly in the chekcout page as well
    const reqBody = JSON.parse(req.body)

    const typedBody = transactionSchema.omit({ id: true }).parse(reqBody)

    const db = await MyMongoClient.getDb()
    const collection = db.collection('transactions')
    const insertedDoc = await collection.insertOne(typedBody)

    res.status(201).json({ txId: insertedDoc.insertedId.toString() })
  }
}
