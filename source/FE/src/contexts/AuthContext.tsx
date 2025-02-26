// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig, { LIST_PUBLIC_PAGE } from 'src/configs/auth'

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType } from './types'
import { loginAuth, logoutAuth } from 'src/services/auth'
import { API_ENDPOINT } from 'src/configs/api'
import { removeLocalUserData, setLocalUserData, setTemporaryToken } from 'src/helpers/storage'
import instance from 'src/helpers/axios'
import toast from 'react-hot-toast'
import { updateProductToCart } from 'src/stores/order'
import { AppDispatch } from 'src/stores'
import { useDispatch } from 'react-redux'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  //redux
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      if (storedToken) {
        setLoading(true)
        await instance
          .get(API_ENDPOINT.AUTH.AUTH_ME)
          .then(async response => {
            setLoading(false)
            setUser({ ...response.data.data })
          })
          .catch(() => {
            removeLocalUserData()
            setUser(null)
            setLoading(false)
            // if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
            if (!router.pathname.includes('login')) {
              router.replace('/login')
            }
          })
      } else {
        setLoading(false)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    loginAuth({ username: params.username, password: params.password })
      .then(async response => {
        if (params.rememberMe) {
          // setLocalUserData(
          //   JSON.stringify(response.data.user),
          //   response.data.access_token,
          //   response.data.refresh_token)
        } else {
          console.log("resss", response)
          setTemporaryToken(response.result.access_token)
        }
        toast.success('Login success')
        const returnUrl = router.query.returnUrl
        // setUser({ ...response.data.user })
        // params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.user)) : null
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        router.replace(redirectURL as string)
      })
      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    logoutAuth().then((res) => {
      setUser(null)
      removeLocalUserData()
      dispatch(updateProductToCart({
        orderItems: []
      }))
      // if (!LIST_PUBLIC_PAGE?.some((item) => router.asPath.includes(item))) {
      //   if (router.asPath !== '/') {
      //     router.replace({
      //       pathname: '/login',
      //       query: {
      //         returnUrl: router.asPath
      //       }
      //     })
      //   } else {
      //     router.replace('/login')
      //   }
      // }
    })
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
