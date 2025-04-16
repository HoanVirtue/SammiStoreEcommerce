import React from "react";
import axios from "axios";
import { BASE_URL, API_ENDPOINT } from '../../configs/api';
import { getLocalUserData, getTemporaryToken, removeLocalUserData, removeTemporaryToken, setLocalUserData, setTemporaryToken } from "../storage";
import { jwtDecode } from 'jwt-decode'
import { useRouter, usePathname } from "expo-router";
import { UserDataType } from "@/contexts/types";
import { useAuth } from "@/hooks/useAuth";

type TAxiosInterceptor = {
    children: React.ReactNode
}

const instance = axios.create({ baseURL: BASE_URL })

const handleRedirectToLogin = (router: ReturnType<typeof useRouter>, pathname: string, setUser: (data: UserDataType | null) => void) => {
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
    setUser(null)
    removeLocalUserData()
    removeTemporaryToken()
}

const AxiosInterceptor: React.FC<TAxiosInterceptor> = ({ children }) => {
    const router = useRouter()
    const pathname = usePathname()
    const { setUser, user } = useAuth()

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
                                    setLocalUserData(JSON.stringify(user), newAccessToken, refreshToken)
                                }
                            } else {
                                handleRedirectToLogin(router, pathname, setUser)
                            }
                        } catch (error) {
                            handleRedirectToLogin(router, pathname, setUser)
                        }
                    } else {
                        handleRedirectToLogin(router, pathname, setUser)
                    }
                } else {
                    handleRedirectToLogin(router, pathname, setUser)
                }
            }
        } else if (!isPublicApi) {
            handleRedirectToLogin(router, pathname, setUser)
        }
        return config
    })

    instance.interceptors.response.use((response) => {
        console.log('Instance Response:', {response});
        return response
    }, (error) => {
        console.log('Instance Error:', {error});
        if (error.response?.status === 401) {
            handleRedirectToLogin(router, pathname, setUser)
        }
        return Promise.reject(error)
    })

    return <>{children}</>
}

export default instance
export { AxiosInterceptor }