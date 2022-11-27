// jest.config.js
import nextJest from 'next/jest'
import type { Config as JestConfig } from 'jest'

// Add any custom config to be passed to Jest
const customJestConfig: JestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // extending for jest-dom custom matchers

  // For mocking SVGR objects
  // See https://github.com/vercel/next.js/issues/36682 for the original issue and this PR (https://github.com/vercel/next.js/pull/36787/files) on next/jest closed this issue
  moduleNameMapper: {
    '^.+\\.(svg)$': require.resolve('./__mocks__/svg.js'),
  },
}

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

module.exports = createJestConfig(customJestConfig)
