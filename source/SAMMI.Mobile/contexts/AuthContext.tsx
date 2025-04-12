// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Expo Router Import
import { useRouter, usePathname } from 'expo-router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig, { LIST_PUBLIC_PAGE } from '@/configs/auth'

// ** Types
import { AuthValuesType, ErrCallbackType, UserDataType } from './types'
import { getLoginUser, loginAuth, logoutAuth, loginAdminAuth } from '@/services/auth'
import { API_ENDPOINT } from '@/configs/api'
import { removeLocalUserData, setLocalUserData, setTemporaryToken } from '@/helpers/storage'
import instance from '@/helpers/axios'
import { updateProductToCart } from '@/stores/order'
import { AppDispatch } from '@/stores'
import { useDispatch } from 'react-redux'
import { LoginParams } from '@/types/auth'
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  loginAdmin: () => Promise.resolve(),
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
  const pathname = usePathname()
  const { t } = useTranslation()

  //redux
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = await AsyncStorage.getItem(authConfig.storageTokenKeyName);
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
          if (!pathname?.includes('login')) {
            router.replace('/login' as any);
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
        await setLocalUserData(
          JSON.stringify(userData || {}),
          accessToken,
          response.result?.refreshToken || null
        );
      } else {
        await setTemporaryToken(accessToken);
      }

      Toast.show({
        text1: t('login_success'),
        type: 'success'
      });

      const returnUrl = params.returnUrl || '/';
      const redirectURL = returnUrl !== '/' ? returnUrl : '/';
      router.replace(redirectURL as any);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      if (errorCallback) errorCallback(err);
      Toast.show({
        text1: t('login_error'),
        type: 'error'
      });
    }
  };

  const handleAdminLogin = async (params: LoginParams, errorCallback?: ErrCallbackType) => {
    setLoading(true);
    try {
      const response = await loginAdminAuth({
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
        await setLocalUserData(
          JSON.stringify(userData || {}),
          accessToken,
          response.result?.refreshToken || null
        );
      } else {
        await setTemporaryToken(accessToken);
      }

      Toast.show({
        text1: t('login_success'),
        type: 'success'
      });

      const returnUrl = params.returnUrl || '/';
      const redirectURL = returnUrl !== '/' ? returnUrl : '/';
      router.replace(redirectURL as any);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      if (errorCallback) errorCallback(err);
      Toast.show({
        text1: t('login_error'),
        type: 'error'
      });
    }
  };

  const handleLogout = async () => {
    try {
      await logoutAuth();
      setUser(null);
      await removeLocalUserData();
      delete instance.defaults.headers.common['Authorization'];
      dispatch(updateProductToCart({
        orderItems: []
      }));

      if (!LIST_PUBLIC_PAGE?.some((item) => pathname?.includes(item))) {
        router.replace('/login' as any);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    loginAdmin: handleAdminLogin
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
