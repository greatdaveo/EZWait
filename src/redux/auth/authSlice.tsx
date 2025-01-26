import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import authService from './authService'

export interface UserData {
  name: string | null
  email: string | null
  role: string | null
  number: string | null
  location?: string | null
  password: string | null
  confirm_password: string | null
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
    // console.log('Register Slice userData', userData)
    return await authService.registerService(userData)
  } catch (error: string | any) {
    console.log('Registration Slice Error', error)
    const message = error.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const loginUserSlice = createAsyncThunk('auth/login', async (userData: LoginData, thunkAPI) => {
  try {
    // console.log('Login Slice userData', userData)
    return await authService.loginService(userData)
  } catch (error: string | any) {
    console.log('Login Slice Error', error)
    const message = error.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const logoutUserSlice = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    return await authService.logoutService()
  } catch (error: string | any) {
    const message = error.response?.data?.message || error.message || error.toString()
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
        console.log('registerSlice success user:', state.user)

        console.log('registerSlice fulfilled:', action.payload)
      })
      .addCase(registerUserSlice.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload as string
        // state.message = (action.payload as string) ? (action.payload as string) : 'An error occurred during registration.'

        state.user = null
        // console.log('registerSlice error:', state)
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
