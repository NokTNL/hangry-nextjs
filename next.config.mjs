import { createMongoServer } from './__tests__/mocks/MockMongoServer.mjs'

const isTestBuild =
  process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development'

/** @type {string | undefined} */
let mockMongoServerUri
if (isTestBuild) {
  const mockServer = await createMongoServer()
  // global.MOCK_MONGO_SERVER = mockServer
  mockMongoServerUri = mockServer.getUri()
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Note: `process.env.NODE_ENV` is forced to === 'production' during collecting page data in `next build`, and === 'developement' when running `next dev` , so need to define a custom env variable here for use in next dev & build:test
  env: {
    IS_TEST_BUILD: isTestBuild,
    MOCK_MONGODB_SERVER_URI: mockMongoServerUri,
  },

  // Prevent next dev && next build clashes by using the same directory
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',

  // SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

export default nextConfig

// Webpack bundle analyzer
// To use it, run `ANALYZE=true yarn build`
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })

// module.exports = withBundleAnalyzer(nextConfig)
