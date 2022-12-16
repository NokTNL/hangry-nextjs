import '@testing-library/jest-dom/extend-expect'
import { TextEncoder, TextDecoder } from 'util'

// MongoDB: Providing an implementation for TextEncoder & TextDecoder
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

beforeEach(() => {
  localStorage.clear()
})
