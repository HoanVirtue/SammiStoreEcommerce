import { createSlice } from '@reduxjs/toolkit';
import { getFavouritesAsync, removeFavouriteAsync } from './action';

const initialState = {
  loading: false,
  data: [] as any[],
  total: 0,
  isSuccessRemove: false,
  isErrorRemove: false,
  errorMessageRemove: '',
};

export const favouriteSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    resetInitialState: (state) => {
      state.loading = false;
      state.data = [];
      state.total = 0;
      state.isSuccessRemove = false;
      state.isErrorRemove = false;
      state.errorMessageRemove = '';
    },
  },
  extraReducers: (builder) => {
    // Get favourites
    builder.addCase(getFavouritesAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFavouritesAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload?.data || [];
      state.total = action.payload?.total || 0;
    });
    builder.addCase(getFavouritesAsync.rejected, (state) => {
      state.loading = false;
      state.data = [];
      state.total = 0;
    });

    // Remove favourite
    builder.addCase(removeFavouriteAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeFavouriteAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.isSuccessRemove = true;
      state.data = state.data.filter(item => item.id !== action.payload);
    });
    builder.addCase(removeFavouriteAsync.rejected, (state, action) => {
      state.loading = false;
      state.isErrorRemove = true;
      state.errorMessageRemove = action.error?.message || 'Error removing favourite';
    });
  },
});

export default favouriteSlice.reducer; 