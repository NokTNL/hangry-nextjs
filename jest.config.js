// jest.config.js
const nextJest = require('next/jest')

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // extending for jest-dom custom matchers

  // to prevent non-test files from being interpreted as test files
  testRegex: '\\.test\\.[jt]sx?$',

  moduleNameMapper: {
    // For mocking SVGR objects
    // See https://github.com/vercel/next.js/issues/36682 for the original issue and this PR (https://github.com/vercel/next.js/pull/36787/files) on next/jest closed this issue
    '^.+\\.(svg)$': require.resolve('./__tests__/__mocks__/svg.js'),
    // Namespaced absolute import
    '^@/(.*)$': '<rootDir>/$1',
    // Prevent errors when using MongoDB memory server
    uuid: require.resolve('uuid'),
  },
}

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

module.exports = createJestConfig(customJestConfig)
