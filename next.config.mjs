import { createMongoServer } from './__tests__/mocks/MockMongoServer.mjs'

/** @type {string | undefined} */
let mockMongoServerUri
if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
  const mockServer = await createMongoServer()
  // global.MOCK_MONGO_SERVER = mockServer
  mockMongoServerUri = mockServer.getUri()
  // eslint-disable-next-line no-console
  console.log(`MongoDB Memory Server started at ${mockMongoServerUri}`)
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Note: `process.env.NODE_ENV` from command line is only used in this file and not transmitted down when doing page build. It is forced to === 'production' in `next build`, and === 'developement' when running `next dev`. Need to define a custom env variable here to transmit that information
  env: {
    IS_TEST_BUILD: process.env.NODE_ENV === 'test',
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
