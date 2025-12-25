/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@github/spark', 'three'],
  output: 'export',  // Enable static export
}

export default nextConfig
