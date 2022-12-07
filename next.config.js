/** @type {import('next').NextConfig} */

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // // ESLint
  // eslint: {
  //   dirs: ['pages', 'components', 'store', '__tests__', 'utils'],
  // },

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

// Webpack bundle analyzer
// To use it, run `ANALYZE=true yarn build`
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })

// PWA
const withPWA = require('next-pwa')({
  dest: 'public',
})

module.exports = phase => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return nextConfig
  }
  return withPWA(nextConfig)
}
