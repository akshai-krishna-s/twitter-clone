// This middleware is used to get the user from the jwt token
// and set it in the context. It's used by the /api/auth/user
// endpoint.

import UrlPattern from 'url-pattern'
import { decodeAccessToken } from '../utils/jwt.js'
import { getUserById } from '../db/users.js'

export default defineEventHandler(async (event) => {
  const endpoints = ['/api/auth/user', '/api/user/tweets', '/api/tweets']

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
    return sendError(
      event,
      createError({
        statusMessage: 'Unauthorized',
        statusCode: 401,
      })
    )
  }

  try {
    const userId = decoded.userId
    const user = await getUserById(userId)

    event.context.auth = { user }
  } catch (error) {
    return
  }
})
