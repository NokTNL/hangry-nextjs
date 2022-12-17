import '@testing-library/jest-dom/extend-expect'
import { TextEncoder, TextDecoder } from 'util'

// MongoDB: Providing an implementation for TextEncoder & TextDecoder
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// TextEncoder & TextDecoder needs to be defined before using MongoClient
const { MyMongoClient } = require('./src/utils/MyMongoClient')

beforeAll(async () => {
  await MyMongoClient.connect()
})

beforeEach(async () => {
  localStorage.clear()
  await MyMongoClient.resetDB()
})

afterAll(async () => {
  await MyMongoClient.disconnect()
})
