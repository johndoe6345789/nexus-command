import packageJson from '../../package.json'

export const APP_VERSION = `v${packageJson.version}`
export const DEPLOY_VERSION = process.env.NEXT_PUBLIC_DEPLOY_VERSION ?? APP_VERSION
export const APP_NAME = 'NEXUS COMMAND'
export const APP_TAGLINE = 'Next Generation Combat'
