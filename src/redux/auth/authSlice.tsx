import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import authService from './authService'

export interface UserData {
  id: string | null
  fullName: string | null
  email: string | null
  role: string | null
  phone: string | null
  address: string | null
  password: string | null
  confirmPassword: string | null
}

export interface LoginData {
  email: string
  password: string
}

interface AuthState {
  user: any
  isLoggedIn: boolean
  isSuccess: boolean
  isLoading: boolean
  isError: boolean | null
  message: string | null
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  isSuccess: false,
  isLoading: false,
  isError: null,
  message: ''
}

export const registerUserSlice = createAsyncThunk('auth/register', async (userData: UserData, thunkAPI) => {
  try {
    return await authService.registerService(userData)
  } catch (error: string | any) {
    const message = (error.message && error.response.data && error.message.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const loginUserSlice = createAsyncThunk('auth/login', async (userData: LoginData, thunkAPI) => {
  try {
    return await authService.loginService(userData)
  } catch (error: string | any) {
    const message = (error.message && error.response.data && error.message.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const logoutUserSlice = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    return await authService.logoutService()
  } catch (error: string | any) {
    const message = (error.message && error.response.data && error.message.data.message) || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    RESET_AUTH(state) {
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message = ''
    }
    // startLoading(state) {
    //   state.isLoading = true
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserSlice.pending, (state) => {
        state.isLoading
      })
      .addCase(registerUserSlice.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isLoggedIn = true
        state.user = action.payload
      })
      .addCase(registerUserSlice.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload as string
        state.user = null
      })

      // For the User Login
      .addCase(loginUserSlice.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginUserSlice.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isLoggedIn = true
        state.user = action.payload
        // console.log(action.payload);
      })

      .addCase(loginUserSlice.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload as string
        state.user = null
      })

      // For the User Logout
      .addCase(logoutUserSlice.pending, (state) => {
        state.isLoading = true
      })

      .addCase(logoutUserSlice.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isLoggedIn = false
        state.user = null
        // console.log(action.payload);
      })

      .addCase(logoutUserSlice.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload as string
      })
  }
})

export const { RESET_AUTH } = authSlice.actions

export default authSlice.reducer
