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
