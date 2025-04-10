// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import user from './user'
import auth from './auth'
import role from './role'
import city from './city'
import deliveryMethod from './delivery-method'
import paymentMethod from './payment-method'
import province from './province'
import district from './district'
import ward from './ward'
import productCategory from './product-category'
import product from './product'
import order from './order'
import review from './review'
import brand from './brand'
import employee from './employee'
import customer from './customer'
import supplier from './supplier'
import address from './address'
import voucher from './voucher'
import receipt from './receipt'
import banner from './banner'




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
    address,
    voucher,
    receipt,
    banner
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
