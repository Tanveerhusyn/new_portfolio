const { withContentlayer } = require('next-contentlayer')

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  experimental: {
    webpackBuildWorker: true,
    serverActions: {
      enabled: true
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'developersdens.com',
        pathname: '/assets/**'
      }
    ]
  },
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  redirects() {
    return [
      {
        source: '/about/personal.ts',
        destination: '/about',
        permanent: true
      },
      {
        source: '/about/work.ts',
        destination: '/about',
        permanent: true
      },
      {
        source: '/about/gear.ts',
        destination: '/about',
        permanent: true
      }
    ]
  }
}

module.exports = withContentlayer(nextConfig)
