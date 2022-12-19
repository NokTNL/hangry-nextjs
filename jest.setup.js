import '@testing-library/jest-dom/extend-expect' // extending for jest-dom custom matchers
import mockDB from '@/__tests__/mocks/mockDB'
import { TextEncoder, TextDecoder } from 'util'

// MongoDB: Providing an implementation for TextEncoder & TextDecoder
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// TextEncoder & TextDecoder needs to be defined before using MongoClient
const { MyMongoClient } = require('./src/utils/MyMongoClient')
const { MockMongoServer } = require('./__tests__/mocks/MockMongoServer')

beforeAll(async () => {
  await MockMongoServer.init()
  /* Inject DB */
  const db = await MyMongoClient.getDb()
  await db.collection('stores').insertMany(mockDB)
})

beforeEach(async () => {
  localStorage.clear()
  /* Reset DB */
  const db = await MyMongoClient.getDb()
  await db.collection('stores').deleteMany({})
  await db.collection('stores').insertMany(mockDB)
})

afterAll(async () => {
  await MockMongoServer.client.close()
  await MockMongoServer.server.stop()
})
