// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import user from 'src/stores/user'
import auth from 'src/stores/auth'
import role from 'src/stores/role'
import city from 'src/stores/city'
import deliveryMethod from 'src/stores/delivery-method'
import paymentMethod from 'src/stores/payment-method'

export const store = configureStore({
  reducer: {
    user,
    auth,
    role,
    city,
    deliveryMethod,
    paymentMethod
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
