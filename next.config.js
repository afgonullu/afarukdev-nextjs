/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
    ],
  },
  experimental: {
    fontLoaders: [
      { loader: 'next/font/google', options: { subsets: ['latin'] } },
    ],
  },
}

module.exports = nextConfig
