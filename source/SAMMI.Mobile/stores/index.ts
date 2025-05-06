// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

// ** Reducers
import user from '@/stores/user'
import auth from '@/stores/auth'
import role from '@/stores/role'
import deliveryMethod from '@/stores/delivery-method'
import paymentMethod from '@/stores/payment-method'
import province from '@/stores/province'
import district from '@/stores/district'
import ward from '@/stores/ward'
import productCategory from '@/stores/product-category'
import product from '@/stores/product'
import order from '@/stores/order'
import review from '@/stores/review'
import brand from '@/stores/brand'
import employee from '@/stores/employee'
import customer from '@/stores/customer'
import supplier from '@/stores/supplier'
import address from '@/stores/address'
import voucher from '@/stores/voucher'
import receipt from '@/stores/receipt'
import banner from '@/stores/banner'
import event from '@/stores/event'
import cart from '@/stores/cart'
import favouriteReducer from './favourite'

export const store = configureStore({
  reducer: { user, auth, role, deliveryMethod, paymentMethod, province, district, productCategory, product, order, review, ward, brand, employee, customer, supplier, address, voucher, receipt, banner, event, cart, favourite: favouriteReducer },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
