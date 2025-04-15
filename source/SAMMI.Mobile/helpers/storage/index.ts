import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACCESS_TOKEN, REFRESH_TOKEN, TEMPORARY_TOKEN, USER_DATA } from "@/configs/auth"
import { LOCAL_PRODUCT_CART } from "@/configs/product"
import { TItemOrderProduct } from "@/types/order"


export const setLocalUserData = async (userData: string, accessToken: string, refreshToken: string) => {
    try {
        await AsyncStorage.setItem(USER_DATA, userData);
        await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
        await AsyncStorage.setItem(REFRESH_TOKEN, refreshToken);
    } catch (error) {
        console.error('Error setting user data:', error);
    }
}

export const getLocalUserData = async () => {
    try {
        const [userData, accessToken, refreshToken] = await Promise.all([
            AsyncStorage.getItem(USER_DATA),
            AsyncStorage.getItem(ACCESS_TOKEN),
            AsyncStorage.getItem(REFRESH_TOKEN)
        ]);
        console.log('userData', userData);
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);
        return {
            userData: userData || "",
            accessToken: accessToken || "",
            refreshToken: refreshToken || ""
        };
    } catch (error) {
        console.error('Error getting user data:', error);
        return {
            userData: "",
            accessToken: "",
            refreshToken: ""
        };
    }
}

export const removeLocalUserData = async () => {
    const userData = await AsyncStorage.getItem(USER_DATA);
    const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
    const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN);

    if (userData !== null && accessToken !== null && refreshToken !== null) {
        try {
            await Promise.all([
                AsyncStorage.removeItem(USER_DATA),
                AsyncStorage.removeItem(ACCESS_TOKEN),
                AsyncStorage.removeItem(REFRESH_TOKEN)
            ]);
        } catch (error) {
            console.error('Error removing user data:', error);
        }
    }
}

export const setTemporaryToken = async (accessToken: string) => {
    try {
        await AsyncStorage.setItem(TEMPORARY_TOKEN, accessToken);
    } catch (error) {
        console.error('Error setting temporary token:', error);
    }
}

export const getTemporaryToken = async () => {
    try {
        const temporaryToken = await AsyncStorage.getItem(TEMPORARY_TOKEN);
        return {
            temporaryToken: temporaryToken || ""
        };
    } catch (error) {
        console.error('Error getting temporary token:', error);
        return {
            temporaryToken: ""
        };
    }
}

export const removeTemporaryToken = async () => {
    try {
        await AsyncStorage.removeItem(TEMPORARY_TOKEN);
        return {
            temporaryToken: null
        };
    } catch (error) {
        console.error('Error removing temporary token:', error);
        return {
            temporaryToken: null
        };
    }
}

export const setLocalProductToCart = async (data: Record<string, TItemOrderProduct>) => {
    try {
        await AsyncStorage.setItem(LOCAL_PRODUCT_CART, JSON.stringify(data));
    } catch (error) {
        console.error('Error setting cart data:', error);
    }
}

export const getLocalProductFromCart = async () => {
    try {
        const cartData = await AsyncStorage.getItem(LOCAL_PRODUCT_CART);
        return cartData || "";
    } catch (error) {
        console.error('Error getting cart data:', error);
        return "";
    }
}