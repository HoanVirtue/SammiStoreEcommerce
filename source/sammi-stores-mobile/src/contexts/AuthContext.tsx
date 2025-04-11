// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Navigation
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native'

// ** Axios
import axios from 'axios'

// ** Config
import { LIST_PUBLIC_PAGE } from '../configs/auth'

// ** Types
import { AuthValuesType, ErrCallbackType, UserDataType } from './types'
import { getLoginUser, loginAuth, logoutAuth } from '../services/auth'
import { API_ENDPOINT } from '../configs/api'
import { getLocalUserData, removeLocalUserData, setLocalUserData, setTemporaryToken } from '../helpers/storage'
import instance from '../helpers/axios'
import toast from 'react-native-toast-message'
import { updateProductToCart } from '../stores/order'
import { AppDispatch } from '../stores'
import { useDispatch } from 'react-redux'
import { LoginParams } from '../types/auth'
import { useTranslation } from 'react-i18next'

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
  const navigation = useNavigation<NavigationProp<ParamListBase>>()
  const { t } = useTranslation()

  //redux
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const { accessToken } = getLocalUserData()
      if (accessToken) {
        setLoading(true)
        try {
          instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
          const response = await getLoginUser()
          setUser({ ...response.result })
          setLoading(false)
        } catch (error) {
          removeLocalUserData()
          delete instance.defaults.headers.common['Authorization']
          setUser(null)
          setLoading(false)
          const currentRoute = (navigation as any).getCurrentRoute()?.name
          if (currentRoute !== 'Login') {
            navigation.navigate('Login')
          }
        }
      } else {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  const handleLogin = async (params: LoginParams, errorCallback?: ErrCallbackType) => {
    setLoading(true)
    try {
      const response = await loginAuth({
        username: params.username,
        password: params.password,
        rememberMe: params.rememberMe,
        returnUrl: params.returnUrl,
        isEmployee: params.isEmployee,
      })

      const accessToken = response.result?.accessToken
      if (!accessToken) throw new Error('No access token received')

      instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

      const userResponse = await getLoginUser()
      setUser({ ...userResponse.result })

      const userData = userResponse.result
      if (params.rememberMe) {
        setLocalUserData(
          JSON.stringify(userData || {}),
          accessToken,
          response.result?.refreshToken || null
        )
      } else {
        setTemporaryToken(accessToken)
      }

      toast.show({
        type: 'success',
        text1: t('login_success')
      })
      
      const returnUrl = params.returnUrl || 'Home'
      navigation.navigate(returnUrl)
      setLoading(false)
    } catch (err: any) {
      setLoading(false)
      if (errorCallback) errorCallback(err)
      toast.show({
        type: 'error',
        text1: t('login_error')
      })
    }
  }

  const handleLogout = () => {
    logoutAuth().then((res) => {
      setUser(null)
      removeLocalUserData()
      delete instance.defaults.headers.common['Authorization']
      dispatch(updateProductToCart({
        orderItems: []
      }))
      navigation.navigate('Login')
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
