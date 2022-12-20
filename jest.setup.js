import '@testing-library/jest-dom/extend-expect' // extending for jest-dom custom matchers
import { TextDecoder, TextEncoder } from 'util'

// MongoDB: Providing an implementation for TextEncoder & TextDecoder
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// TextEncoder & TextDecoder needs to be defined before using MongoClient
const { MyMongoClient } = require('./src/utils/MyMongoClient')
const { MockMongoServer } = require('./__tests__/mocks/MockMongoServer')

beforeAll(async () => {
  await MockMongoServer.init()
})

beforeEach(async () => {
  localStorage.clear()
  await MockMongoServer.resetDB()
})

afterAll(async () => {
  if (MyMongoClient.client) {
    await MyMongoClient.client.close()
  }
  if (MockMongoServer.server) {
    await MockMongoServer.server.stop()
  }
})
