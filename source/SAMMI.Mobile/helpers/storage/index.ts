import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACCESS_TOKEN, REFRESH_TOKEN, TEMPORARY_TOKEN, USER_DATA } from "@/configs/auth"
import { LOCAL_PRODUCT_CART } from "@/configs/product"
import { TItemOrderProduct } from "@/types/order"
import product from '@/stores/product';

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

export const setTemporaryToken = (accessToken: string) => {
    if(typeof window !== 'undefined'){
        window.localStorage.setItem(TEMPORARY_TOKEN, accessToken)
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

export const removeTemporaryToken = () => {
    if(typeof window !== 'undefined'){
        return {
            temporaryToken: window.localStorage.removeItem(TEMPORARY_TOKEN),
        }
    }
    return {
        temporaryToken: "",
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