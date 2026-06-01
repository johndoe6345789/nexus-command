/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  output: 'export',  // Enable static export
  trailingSlash: true,
}

export default nextConfig
