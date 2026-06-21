/** @type {import('next').NextConfig} */
const deployVersion =
  process.env.NEXT_PUBLIC_DEPLOY_VERSION ??
  process.env.GITHUB_SHA ??
  `local-${Date.now()}`

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  output: 'export',  // Enable static export
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_DEPLOY_VERSION: deployVersion,
  },
}

export default nextConfig
