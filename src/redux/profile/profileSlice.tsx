import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Alert } from 'react-native'
import { profileService } from './profileService'

export interface ProfileData {
  stylistProfile: null
  isSuccess: boolean
  isLoggedIn: boolean
  isLoading: boolean
  isError: boolean | null
  message: string | null
}

const initialState: ProfileData = {
  stylistProfile: null,
  isLoggedIn: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const getStylistProfileSlice = createAsyncThunk('stylist/profile', async (id: string, thunkAPI) => {
  try {
    return await profileService.viewStylistProfile(id)
  } catch (error: string | any) {
    console.log('getStylistProfileSlice: ', error)
    const message = error.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    RESET_PROFILE(state) {
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message = ''
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getStylistProfileSlice.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getStylistProfileSlice.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isLoggedIn = true
        state.isError = false
        state.stylistProfile = action.payload
        // console.log('Fulfilled Stylist fetched:', action.payload)
      })
      .addCase(getStylistProfileSlice.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload as string
        console.log('Unable to fetch Stylist data ❌')
      })
  }
})

export const { RESET_PROFILE } = profileSlice.actions

export default profileSlice.reducer
