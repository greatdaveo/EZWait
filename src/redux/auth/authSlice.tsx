import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import authService from './authService'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface PasswordData {
  current_password: string
  new_password: string
  confirm_password: string
}

export interface UserProfile {
  name?: string
  email?: string
  number?: string
  location?: string
  profile_picture?: string
}

export interface UserData {
  name: string | null
  email: string | null
  role: string | null
  number: string | null
  location?: string | null
  password: string | null
  confirm_password: string | null
  profile_picture?: string | null
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
    // console.log('Login Slice Error', error)
    const message = error.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const logoutUserSlice = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    return await authService.logoutService()
  } catch (error: string | any) {
    const message = error.response?.data?.message || error.message || error.toString()
    console.log('logoutUserSlice: ', message)
    
    return thunkAPI.rejectWithValue(message)
  }
})

export const deleteProfileSlice = createAsyncThunk('auth/delete-account', async (_, thunkAPI) => {
  try {
    return await authService.deleteAccountService()
  } catch (error: string | any) {
    console.log('Edit Profile Slice Error', error)
    const message = error.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const changePasswordSlice = createAsyncThunk('auth/change-password', async (passwordData: PasswordData, thunkAPI) => {
  try {
    return await authService.changePasswordService(passwordData)
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const editUserProfileSlice = createAsyncThunk('auth/edit-profile', async (userData: UserProfile, thunkAPI) => {
  try {
    return await authService.editUserProfileService(userData)
  } catch (error: string | any) {
    console.log('Edit Profile Slice Error', error)
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
        state.isLoading = true
      })
      .addCase(registerUserSlice.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isLoggedIn = true
        state.user = action.payload
        console.log('registerSlice success user:', state.user)

        // console.log('registerSlice fulfilled:', action.payload)
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
        Alert.alert('Login Successful.')
        // console.log(action.payload);
      })

      .addCase(loginUserSlice.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload as string
        state.user = null
        Alert.alert('Error ❌', 'Invalid Credentials')
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
        Alert.alert('Logout Successful ✅', 'We hope to see you again soon! ☹️')
      })

      .addCase(logoutUserSlice.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload as string
      })

      .addCase(deleteProfileSlice.pending, (state) => {
        state.isLoading = true
      })

      .addCase(deleteProfileSlice.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isLoggedIn = false
        state.user = null
        Alert.alert('Logout Successful ✅', 'We hope to see you again soon! ☹️')
      })

      .addCase(deleteProfileSlice.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload as string
      })

      .addCase(changePasswordSlice.pending, (state) => {
        state.isLoading
      })

      .addCase(changePasswordSlice.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.user = action.payload?.data
        // console.log(action.payload)
        Alert.alert('Saved ✅', 'Your profile has been updated.')
      })

      .addCase(changePasswordSlice.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload as string
        // state.user = null
        // Alert.alert('❌ Error ❌', 'Unable to change your password')
      })

      .addCase(editUserProfileSlice.pending, (state) => {
        state.isLoading
      })

      .addCase(editUserProfileSlice.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.user = action.payload?.data
        Alert.alert('Saved ✅', 'Your profile has been updated.')
      })

      .addCase(editUserProfileSlice.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload as string
        // state.user = null
        Alert.alert('Profile Editing Fail! ❌')
      })
  }
})

export const { RESET_AUTH } = authSlice.actions

export default authSlice.reducer
