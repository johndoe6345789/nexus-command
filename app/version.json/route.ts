import { DEPLOY_VERSION } from '@/constants'

export const dynamic = 'force-static'

export function GET() {
  return Response.json({ version: DEPLOY_VERSION })
}
