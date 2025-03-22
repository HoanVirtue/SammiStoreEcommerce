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
import district from 'src/stores/district'
import ward from 'src/stores/ward'
import productCategory from 'src/stores/product-category'
import product from 'src/stores/product'
import order from 'src/stores/order'
import review from 'src/stores/review'
import brand from 'src/stores/brand'
import employee from 'src/stores/employee'
import customer from 'src/stores/customer'
import supplier from 'src/stores/supplier'
import address from 'src/stores/address'

export const store = configureStore({
  reducer: {
    user,
    auth,
    role,
    city,
    deliveryMethod,
    paymentMethod,
    province,
    district,
    productCategory,
    product,
    order,
    review,
    ward,
    brand,
    employee,
    customer,
    supplier,
    address
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
