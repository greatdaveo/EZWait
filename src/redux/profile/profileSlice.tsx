import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { profileService } from './profileService'
import { Alert } from 'react-native'

export interface ProfileData {
  stylistProfile: any | null
  allStylists: { data: any[] } | null
  isSuccess: boolean
  isLoggedIn: boolean
  isLoading: boolean
  isError: boolean | null
  message: string | null
}

const initialState: ProfileData = {
  stylistProfile: null,
  allStylists: null,
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

export const getAllStylistProfileSlice = createAsyncThunk('all-stylists/profile', async (_, thunkAPI) => {
  try {
    return await profileService.viewAllStylistProfile()
  } catch (error: string | any) {
    console.log('getStylistProfileSlice: ', error)
    const message = error.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const editStylistSlice = createAsyncThunk('edit/stylist-profile', async (id: string, thunkAPI) => {
  try {
    return await profileService.editStylistProfile(id)
  } catch (error: string | any) {
    console.log('getStylistProfileSlice: ', error)
    const message = error.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const updateStylistSlice = createAsyncThunk('update/stylist-profile', async ({ id, formData }: any, thunkAPI) => {
  console.log(id, formData)
  try {
    return await profileService.updateStylistProfile(id, formData)
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

      .addCase(getAllStylistProfileSlice.pending, (state) => {
        state.isLoading = true
      })

      .addCase(getAllStylistProfileSlice.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.allStylists = action.payload
        // console.log('Fulfilled All Stylists fetched:', action.payload)
      })

      .addCase(getAllStylistProfileSlice.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload as string
        // console.log('Unable to fetch All Stylist data ❌')
      })

      .addCase(editStylistSlice.pending, (state) => {
        state.isLoading = true
      })

      .addCase(editStylistSlice.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.stylistProfile = action.payload
        // console.log('Stylist Profile Edited Data:', action.payload)
      })

      .addCase(editStylistSlice.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload as string
        console.log('Unable to Edit Stylist data ❌')
      })

      .addCase(updateStylistSlice.pending, (state) => {
        state.isLoading = true
      })

      .addCase(updateStylistSlice.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        // state.stylistProfile = action.payload
        console.log('Stylist Profile Updated Data:', action.payload)
      })

      .addCase(updateStylistSlice.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload as string
        console.log('Unable to Update Stylist data ❌')
      })
  }
})

export const { RESET_PROFILE } = profileSlice.actions

export default profileSlice.reducer
