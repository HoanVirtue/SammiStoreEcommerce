// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig, { LIST_PUBLIC_PAGE } from 'src/configs/auth'

// ** Types
import { AuthValuesType, ErrCallbackType, UserDataType } from './types'
import { getLoginUser, loginAuth, logoutAuth } from 'src/services/auth'
import { API_ENDPOINT } from 'src/configs/api'
import { removeLocalUserData, setLocalUserData, setTemporaryToken } from 'src/helpers/storage'
import instance from 'src/helpers/axios'
import toast from 'react-hot-toast'
import { updateProductToCart } from 'src/stores/order'
import { AppDispatch } from 'src/stores'
import { useDispatch } from 'react-redux'
import { LoginParams } from 'src/types/auth'
import { t } from 'i18next'
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
  const router = useRouter()
  const { t } = useTranslation()

  //redux
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName);
      if (storedToken) {
        setLoading(true);
        try {
          instance.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
          const response = await getLoginUser();
          setUser({ ...response.result });
          setLoading(false);
        } catch (error) {
          removeLocalUserData();
          delete instance.defaults.headers.common['Authorization'];
          setUser(null);
          setLoading(false);
          if (!router.pathname.includes('login')) {
            router.replace('/login');
          }
        }
      } else {
        setLoading(false);
      }
    }

    initAuth()
  }, [])

  const handleLogin = async (params: LoginParams, errorCallback?: ErrCallbackType) => {
    setLoading(true);
    try {
      const response = await loginAuth({
        username: params.username,
        password: params.password,
        rememberMe: params.rememberMe,
        returnUrl: params.returnUrl,
        isEmployee: params.isEmployee,
      });

      const accessToken = response.result?.accessToken;
      if (!accessToken) throw new Error('No access token received');

      instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      const userResponse = await getLoginUser();
      setUser({ ...userResponse.result });

      const userData = userResponse.result;
      if (params.rememberMe) {
        setLocalUserData(
          JSON.stringify(userData || {}),
          accessToken,
          response.result?.refreshToken || null
        );
      } else {
        setTemporaryToken(accessToken);
      }

      toast.success(t('login_success'));
      const returnUrl = params.returnUrl || router.query.returnUrl || '/';
      const redirectURL = returnUrl !== '/' ? returnUrl : '/';
      router.replace(redirectURL as string);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      if (errorCallback) errorCallback(err);
      toast.error(t('login_error'));
    }
  };

  const handleLogout = () => {
    logoutAuth().then((res) => {
      setUser(null)
      removeLocalUserData()
      delete instance.defaults.headers.common['Authorization'];
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
