import axios from "axios"
import { API_ENDPOINT } from "src/configs/api"
import instance from "src/helpers/axios"
import { TParamsCreateOrder, TParamsGetAllOrders } from "src/types/order"


export const getAllOrders = async (data: {params: TParamsGetAllOrders  }) => {
    try {
        const res = await instance.get(`${API_ENDPOINT.MANAGE_ORDER.ORDER.INDEX}/me`, data)
        return res.data
    } catch (error) {
        return error
    }
}

export const getOrderDetail = async (id: string) => {
    try {
        const res = await instance.get(`${API_ENDPOINT.MANAGE_ORDER.ORDER.INDEX}/me/${id}`)
        return res.data
    } catch (error) {
        return error
    }
}


export const createOrder = async (data: TParamsCreateOrder) => {
    try {
        const res = await instance.post(`${API_ENDPOINT.MANAGE_ORDER.ORDER.INDEX}`, data)
        return res.data
    }
    catch (error: any) {
        return error?.response?.data
    }
}


// export const updateOrder = async (data: TParamsUpdateOrder) => {
//     const { id, ...rests } = data
//     try {
//         const res = await instance.put(`${API_ENDPOINT.MANAGE_ORDER.ORDER.INDEX}/${id}`, rests)
//         return res.data
//     } catch (error: any) {
//         return error?.response?.data
//     }
// }


// export const deleteOrder = async (id: string) => {
//     try {
//         const res = await instance.delete(`${API_ENDPOINT.MANAGE_ORDER.ORDER.INDEX}/${id}`)
//         return res.data
//     } catch (error: any) {
//         return error?.response?.data
//     }
// }

// export const getOrderDetail = async (id: string) => {
//     try {
//         const res = await instance.get(`${API_ENDPOINT.MANAGE_ORDER.ORDER.INDEX}/${id}`)
//         return res.data
//     } catch (error: any) {
//         return error?.response?.data
//     }
// }

// export const getOrderDetailPublic = async (id: string) => {
//     try {
//         const res = await axios.get(`${API_ENDPOINT.MANAGE_ORDER.ORDER.INDEX}/public/${id}`)
//         return res.data
//     } catch (error: any) {
//         return error?.response?.data
//     }
// }

// export const getOrderDetailPublicBySlug = async (slug: string) => {
//     try {

//         const data = {params: {isPublic: true}}

//         const res = await axios.get(`${API_ENDPOINT.MANAGE_ORDER.ORDER.INDEX}/public/slug/${slug}`, data)
//         return res.data
//     } catch (error: any) {
//         return error?.response?.data
//     }
// }

// export const getListRelatedOrderBySlug = async (data: {params: TParamsGetRelatedOrder}) => {
//     try {
//         const res = await axios.get(`${API_ENDPOINT.MANAGE_ORDER.ORDER.INDEX}/related`, data)
//         return res.data
//     } catch (error: any) {
//         return error?.response?.data
//     }
// }


// export const deleteMultipleOrders = async (data: TParamsDeleteMultipleOrders) => {
//     try {
//         const res = await instance.delete(`${API_ENDPOINT.MANAGE_ORDER.ORDER.INDEX}/delete-many`, {data})
//         if(res?.data?.status === "Success") {
//             return {
//                 data: []
//             }
//         }
//         return {
//             data: null
//         }
//     } catch (error: any) {
//         return error?.response?.data
//     }
// }


// export const likeOrder = async (data: {OrderId: string }) => {
//     try {
//         const res = await instance.post(`${API_ENDPOINT.MANAGE_ORDER.ORDER.INDEX}/like`, data)
//         if(res?.data?.status === "Success") {
//             return {
//                 data: {id: 1}
//             }
//         }
//         return {
//             data: null
//         }
//     } catch (error: any) {
//         return error?.response?.data
//     }
// }

// export const unlikeOrder = async (data: {OrderId: string }) => {
//     try {
//         const res = await instance.post(`${API_ENDPOINT.MANAGE_ORDER.ORDER.INDEX}/unlike`, data)
//         if(res?.data?.status === "Success") {
//             return {
//                 data: {_id: 1}
//             }
//         }
//         return {
//             data: null
//         }
//     } catch (error: any) {
//         return error?.response?.data
//     }
// }


// export const getAllLikedOrder = async (data: {params: TParamsGetAllOrders}) => {
//     try {
//         const res = await instance.get(`${API_ENDPOINT.MANAGE_ORDER.ORDER.INDEX}/liked/me`, data)
//         return res.data
//     } catch (error: any) {
//         return error?.response?.data
//     }
// }

// export const getAllViewedOrder = async (data: {params: TParamsGetAllOrders}) => {
//     try {
//         const res = await instance.get(`${API_ENDPOINT.MANAGE_ORDER.ORDER.INDEX}/viewed/me`, data)
//         return res.data
//     } catch (error: any) {
//         return error?.response?.data
//     }
// }