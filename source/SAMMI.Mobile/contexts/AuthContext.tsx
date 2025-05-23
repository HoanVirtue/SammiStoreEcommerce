// ** React Imports
import { createContext, useEffect, useState, ReactNode, FC, ReactElement, Context } from 'react'

// ** Expo Router Import
import { useRouter, usePathname } from 'expo-router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig, { LIST_PUBLIC_PAGE } from '@/configs/auth'

// ** Types
import { AuthValuesType, ErrCallbackType, RegisterParams, UserDataType } from './types'
import { getLoginUser, loginAuth, logoutAuth, loginAdminAuth, registerAuth } from '@/services/auth'
import { removeLocalUserData, setLocalUserData, setTemporaryToken } from '@/helpers/storage'
import instance from '@/helpers/axios'
import { AppDispatch } from '@/stores'
import { useDispatch } from 'react-redux'
import { LoginParams } from '@/types/auth'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { resetInitialState } from '@/stores/cart'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  loginAdmin: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
}

const AuthContext = createContext<AuthValuesType>(defaultProvider)


type Props = {
  children: ReactNode
}

const AuthProvider: FC<Props> = ({ children }): ReactElement => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()
  const pathname = usePathname()


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
        // Redirect to login if not on a public page and not already on login page
        const isPublicPage = LIST_PUBLIC_PAGE.some(page => pathname?.startsWith(page));
        if (!isPublicPage && !pathname?.includes('login')) {
          router.replace('/login' as any);
        }
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
      const refreshToken = response.result?.refreshToken;


      if (!accessToken) throw new Error('No access token received');

      instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;


      const userResponse = await getLoginUser();
      setUser({ ...userResponse.result });

      const userData = userResponse.result;

      // if (params.rememberMe) {
      if (true) {
        await setLocalUserData(
          JSON.stringify(userData || {}),
          accessToken,
          refreshToken
        );
      } else {
        await setTemporaryToken(accessToken);
      }
      Toast.show({
        text1: 'Đăng nhập thành công',
        type: 'success',
        text2: ''
      });

      const returnUrl = params.returnUrl || '/(tabs)';
      const redirectURL = returnUrl !== '/(tabs)' ? returnUrl : '/(tabs)';
      router.replace(redirectURL as any);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      if (errorCallback) errorCallback(err);
      Toast.show({
        type: 'error',
        text1: 'Đăng nhập thất bại',
        text2: err?.message || 'Đã có lỗi xảy ra',
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
      // if (params.rememberMe) {
      if (true) {
        await setLocalUserData(
          JSON.stringify(userData || {}),
          accessToken,
          response.result?.refreshToken || null
        );
      } else {
        await setTemporaryToken(accessToken);
      }

      Toast.show({
        text1: 'Đăng nhập thành công',
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
        text1: 'Đăng nhập thất bại',
        type: 'error'
      });
    }
  };

  const handleLogout = () => {

    setUser(null)
    removeLocalUserData()
    delete instance.defaults.headers.common['Authorization'];
    dispatch(resetInitialState())
  }

  const handleRegister = async (params: RegisterParams, errorCallback?: ErrCallbackType) => {
    setLoading(true);
    try {
      const response = await registerAuth(params);
      if(!!response.isSuccess) {
        Toast.show({
          text1: 'Đăng ký tài khoản thành công. Vui lòng xác thực email để đăng nhập',
          type: 'success',
          text2: ''
        });
        router.replace('/login' as any);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Đăng ký tài khoản thất bại',
          text2: response.message,
        });
      }
      
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      if (errorCallback) errorCallback(err);
      Toast.show({
        text1: err?.message || 'Đã có lỗi xảy ra',
        type: 'error'
      });
    }
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    loginAdmin: handleAdminLogin,
    register: handleRegister
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
