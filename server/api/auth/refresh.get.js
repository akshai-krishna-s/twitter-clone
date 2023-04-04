// getRefreshTokenByToken is a function that queries the database for a refresh token from the database
// decodeRefreshToken decodes the refresh token and returns the payload
// getUserById is a function that queries the database for a user by the user's ID
// generateTokens is a function that generates a new access token and refresh token
// sendError is a function that sends an error response
// createError is a function that creates a new error object

import { getRefreshTokenByToken } from '../../db/refreshTokens.js'
import { decodeRefreshToken, generateTokens } from '../../utils/jwt.js'
import { getUserById } from '../../db/users.js'

export default defineEventHandler(async (event) => {
  const refreshToken = getCookie(event, 'refresh_token')
  if (!refreshToken) {
    return sendError(
      event,
      createError({
        statusMessage: 'Refresh token is invalid',
        statusCode: 401,
      })
    )
  }

  const rToken = await getRefreshTokenByToken(refreshToken)

  if (!rToken) {
    return sendError(
      event,
      createError({
        statusMessage: 'Refresh token is invalid',
        statusCode: 401,
      })
    )
  }

  const token = decodeRefreshToken(refreshToken)

  try {
    const user = await getUserById(token.userId)

    const { accessToken } = generateTokens(user)

    return {
      access_token: accessToken,
    }
  } catch (error) {
    return sendError(
      event,
      createError({
        statusMessage: 'Something went wrong',
        statusCode: 500,
      })
    )
  }
})
