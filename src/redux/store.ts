import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import bookingReducer from './bookings/bookingSlice'
import profileReducer from './profile/profileSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    bookings: bookingReducer,
    profile: profileReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
