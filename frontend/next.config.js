/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home/user',
        permanent: true,
      },
      {
        source: '/home',
        destination: '/home/user',
        permanent: true,
      },
    ]
  },
  images: {
    domains: ['127.0.0.1', 'localhost', 'i.scdn.co'],
  },
}

module.exports = nextConfig
