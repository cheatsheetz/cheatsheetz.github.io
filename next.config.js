/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  env: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    GITHUB_ACCESS_TOKEN: process.env.GITHUB_ACCESS_TOKEN,
  }
}

module.exports = nextConfig