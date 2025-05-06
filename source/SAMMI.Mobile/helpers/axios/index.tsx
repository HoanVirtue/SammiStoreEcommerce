import React from "react";
import axios from "axios";
import { BASE_URL, API_ENDPOINT } from '../../configs/api';
import { getLocalUserData, getTemporaryToken, removeLocalUserData, removeTemporaryToken, setLocalUserData } from "../storage";
import { jwtDecode } from 'jwt-decode'
import { useRouter, usePathname } from "expo-router";
import { UserDataType } from "@/contexts/types";

type TAxiosInterceptor = {
    children: React.ReactNode;
    onAuthStateChange: (user: UserDataType | null) => void;
    currentUser: UserDataType | null;
}

const instance = axios.create({ baseURL: BASE_URL })

const handleRedirectToLogin = (router: ReturnType<typeof useRouter>, pathname: string, onAuthStateChange: (user: UserDataType | null) => void) => {
    if (pathname !== '/') {
        // router.push({
        //     pathname: '/(tabs)/login' as const,
        //     params: {
        //         returnUrl: pathname
        //     }
        // })
    } else {
        // router.push('/(tabs)/login' as const)
    }
    onAuthStateChange(null)
    removeLocalUserData()
    removeTemporaryToken()
}

const AxiosInterceptor: React.FC<TAxiosInterceptor> = ({ children, onAuthStateChange, currentUser }) => {
    const router = useRouter()
    const pathname = usePathname()
    
    instance.interceptors.request.use(async (config) => {
        const { accessToken, refreshToken } = await getLocalUserData()
        const { temporaryToken } = await getTemporaryToken()
        const isPublicApi = config?.params?.isPublic

        if (accessToken || temporaryToken) {
            let decodedAccessToken: any = {}
            if (accessToken) {
                decodedAccessToken = jwtDecode(accessToken)
            } else if (temporaryToken) {
                decodedAccessToken = jwtDecode(temporaryToken)
            }

            if (decodedAccessToken?.exp > Date.now() / 1000) {
                config.headers.Authorization = `Bearer ${accessToken}`
            } else {
                if (refreshToken) {
                    const decodedRefreshToken: any = jwtDecode(refreshToken)
                    if (decodedRefreshToken?.exp > Date.now() / 1000) {
                        try {
                            const response = await axios.post(`${API_ENDPOINT.AUTH.INDEX}/refreshtoken`, { refreshToken }, {
                                headers: {
                                    Authorization: `Bearer ${refreshToken ? accessToken : temporaryToken}`
                                }
                            })

                            const newAccessToken = response?.data?.data?.access_token
                            if (newAccessToken) {
                                config.headers.Authorization = `Bearer ${newAccessToken}`
                                if (accessToken) {
                                    setLocalUserData(JSON.stringify(currentUser), newAccessToken, refreshToken)
                                }
                            } else {
                                handleRedirectToLogin(router, pathname, onAuthStateChange)
                            }
                        } catch (error) {
                            handleRedirectToLogin(router, pathname, onAuthStateChange)
                        }
                    } else {
                        handleRedirectToLogin(router, pathname, onAuthStateChange)
                    }
                } else {
                    handleRedirectToLogin(router, pathname, onAuthStateChange)
                }
            }
        } else if (!isPublicApi) {
            handleRedirectToLogin(router, pathname, onAuthStateChange)
        }
        return config
    })

    instance.interceptors.response.use((response) => {
        return response
    }, (error) => {
        if (error.response?.status === 401) {
            handleRedirectToLogin(router, pathname, onAuthStateChange)
        }
        if (error.response?.data) {
            return Promise.reject(error.response.data)
        }
        return Promise.reject(error)
    })

    return <>{children}</>
}

export default instance
export { AxiosInterceptor }