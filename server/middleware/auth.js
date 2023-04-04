import UrlPattern from 'url-pattern'
import { decodeAccessToken } from '../utils/jwt.js'

export default defineEventHandler(async (event) => {
  const endpoints = ['api/auth/user']

  const isHandledByThisMiddleware = endpoints.some((endpoint) => {
    const pattern = new UrlPattern(endpoint)
    return pattern.match(event.node.req.url)
  })

  if (!isHandledByThisMiddleware) {
    return
  }

  const token = event.node.req.headers.authorization?.split(' ')[1]
  const decoded = decodeAccessToken(token)
  if (!decoded) {
    return event.node.res.status(401).json({ message: 'Unauthorized' })
  }
})
