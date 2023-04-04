import { prisma } from '.'

export const createRefreshToken = (refreshTokenData) => {
  return prisma.refreshToken.create({
    data: refreshTokenData,
  })
}

export const getRefreshTokenByToken = (token) => {
  return prisma.refreshToken.findUnique({
    where: {
      token,
    },
  })
}
