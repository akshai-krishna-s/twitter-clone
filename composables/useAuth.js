import jwt_decode from 'jwt-decode'

export default () => {
  const useAuthToken = () => useState('auth_token')
  const useAuthUser = () => useState('auth_user')
  const useAuthLoading = () => useState('auth_loading', () => true)

  const setToken = (token) => {
    const authToken = useAuthToken()
    authToken.value = token
  }

  const setUser = (user) => {
    const authUser = useAuthUser()
    authUser.value = user
  }

  const setIsLoading = (isLoading) => {
    const authLoading = useAuthLoading()
    authLoading.value = isLoading
  }

  const login = ({ username, password }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch('/api/auth/login', {
          method: 'POST',
          body: {
            username,
            password,
          },
        })
        setToken(data.access_token)
        setUser(data.user)

        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  const refreshToken = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch('/api/auth/refresh')
        setToken(data.access_token)

        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  const getUser = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await useFetchApi('/api/auth/user')
        setUser(data.user)
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  const reRefreshAccessToken = () => {
    const authToken = useAuthToken()
    if (!authToken.value) return

    const jwt = jwt_decode(authToken.value)

    const newRefreshTime = jwt.exp - 60000

    setTimeout(async () => {
      await refreshToken()
      reRefreshAccessToken()
    }, newRefreshTime)
  }

  const initAuth = () => {
    return new Promise(async (resolve, reject) => {
      setIsLoading(true)
      try {
        await refreshToken()
        await getUser()
        reRefreshAccessToken()
        resolve(true)
      } catch (error) {
        reject(error)
      } finally {
        setIsLoading(false)
      }
    })
  }

  const logout = () => {
    return new Promise(async (resolve, reject) => {
      try {
        await useFetchApi('/api/auth/logout', {
          method: 'POST',
        })
        setToken(null)
        setUser(null)
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  return { login, useAuthUser, initAuth, useAuthToken, useAuthLoading, logout }
}
