import instance from '@/helpers/axios';
import { API_ENDPOINT } from "@/configs/api"
import { TParamsGetAllProducts } from '@/types/product';

export const getFavourites = async (data: { params: TParamsGetAllProducts }) => {
  try {
    data.params.type = 4;
    const response = await instance.get(API_ENDPOINT.FAVOURITE_PRODUCT.INDEX, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeFavourite = async (productId: number) => {
  try {
    const response = await instance.delete(`${API_ENDPOINT.FAVOURITE_PRODUCT.INDEX}/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}; 