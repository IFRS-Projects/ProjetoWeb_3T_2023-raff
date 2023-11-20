/** @type {import('next').NextConfig} */
const nextConfig = {

  async redirects() {
    return [{
      source: '/',
      destination: '/home',
      permanent: true
    }]
  },
  images: {
    domains: ['127.0.0.1', 'localhost', 'i.scdn.co'],
  },
}

module.exports = nextConfig
