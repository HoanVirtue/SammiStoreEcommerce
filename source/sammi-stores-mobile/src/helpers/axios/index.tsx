import React from "react";
import axios from "axios";
import { BASE_URL, API_ENDPOINT } from '../../configs/api';
import { getLocalUserData, getTemporaryToken, removeLocalUserData, removeTemporaryToken, setLocalUserData, setTemporaryToken } from "../storage";
import { jwtDecode } from 'jwt-decode'
import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";
import { UserDataType } from "../../contexts/types";
import { useAuth } from "../../hooks/useAuth";

type TAxiosInterceptor = {
    children: React.ReactNode
}

const instance = axios.create({ baseURL: BASE_URL })

const handleRedirectToLogin = (navigation: NavigationProp<ParamListBase>, setUser: (data: UserDataType | null) => void) => {
    const currentRoute = (navigation as any).getCurrentRoute()?.name
    if (currentRoute !== 'Home') {
        (navigation as any).replace('Login', {
            returnUrl: currentRoute
        })
    } else {
        (navigation as any).replace('Login')
    }
    setUser(null)
    removeLocalUserData()
    removeTemporaryToken()
}

const AxiosInterceptor: React.FC<TAxiosInterceptor> = ({ children }) => {
    const navigation = useNavigation<NavigationProp<ParamListBase>>()
    const { setUser, user } = useAuth() as { setUser: (data: UserDataType | null) => void, user: UserDataType }

    instance.interceptors.request.use(async (config) => {
        const { accessToken, refreshToken } = getLocalUserData()
        const { temporaryToken } = getTemporaryToken()
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
                        //call api return new access token
                        await axios.post(`${API_ENDPOINT.AUTH.INDEX}/refreshtoken`, { refreshToken }, {
                            headers: {
                                Authorization: `Bearer ${refreshToken ? accessToken : temporaryToken}`
                            }
                        }).then((response) => {
                            const newAccessToken = response?.data?.data?.access_token
                            if (newAccessToken) {
                                config.headers.Authorization = `Bearer ${newAccessToken}`
                                if (accessToken) {
                                    setLocalUserData(JSON.stringify(user), newAccessToken, refreshToken)
                                }
                                // else {   
                                //     setLocalUserData(JSON.stringify(user), "", refreshToken)
                                //     setTemporaryToken(newAccessToken)
                                // }
                            } else {
                                handleRedirectToLogin(navigation, setUser)
                            }
                        }).catch(() => {
                            handleRedirectToLogin(navigation, setUser)
                        })
                    } else {
                        handleRedirectToLogin(navigation, setUser)
                    }
                } else {
                    handleRedirectToLogin(navigation, setUser)
                }
            }
        } else {
            handleRedirectToLogin(navigation, setUser)
        }
        return config
    })

    instance.interceptors.response.use((response) => {
        return response
    })
    return <>{children}</>
}

export default instance
export { AxiosInterceptor }