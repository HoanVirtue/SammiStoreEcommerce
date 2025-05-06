import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFavourites, removeFavourite } from '@/services/favourite';
import { TParamsGetAllProducts } from '@/types/product';

export const serviceName = 'favourite';

export const getFavouritesAsync = createAsyncThunk(
  `${serviceName}/getFavourites`,
  async (data: { params: TParamsGetAllProducts }) => {
    try {
      const response = await getFavourites(data);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const removeFavouriteAsync = createAsyncThunk(
  `${serviceName}/removeFavourite`,
  async (productId: number) => {
    try {
      const response = await removeFavourite(productId);
      return response;
    } catch (error) {
      throw error;
    }
  }
); 