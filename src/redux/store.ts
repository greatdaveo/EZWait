import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import bookingReducer from './bookings/bookingSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    bookings: bookingReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
