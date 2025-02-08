// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import user from 'src/stores/user'
import auth from 'src/stores/auth'
import role from 'src/stores/role'
import city from 'src/stores/city'
import deliveryMethod from 'src/stores/delivery-method'
import paymentMethod from 'src/stores/payment-method'
import province from 'src/stores/province'
import productCategory from 'src/stores/product-category'
import product from 'src/stores/product'
import orderProduct from 'src/stores/order-product'

export const store = configureStore({
  reducer: {
    user,
    auth,
    role,
    city,
    deliveryMethod,
    paymentMethod,
    province,
    productCategory,
    product,
    orderProduct
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
