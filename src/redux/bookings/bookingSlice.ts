import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { bookingService } from './bookingService'
import { Alert } from 'react-native'

export interface BookingData {
  stylist_id: number | null
  booking_day: string | null
  start_time: string | null
  end_time: string | null
}

interface BookingState {
  booking: any
  bookings: any
  isSuccess: boolean
  isLoggedIn: boolean
  isLoading: boolean
  isError: boolean | null
  message: string | null
}

const initialState: BookingState = {
  booking: null,
  bookings: [],
  isLoggedIn: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const getAllBookingsSlice = createAsyncThunk('bookings/view-bookings', async (_, thunkAPI) => {
  try {
    return await bookingService.getAllBookings()
  } catch (error: string | any) {
    const message = error.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const getSingleBookingSlice = createAsyncThunk('bookings/view-booking', async (bookingId: string, thunkAPI) => {
  try {
    return await bookingService.getSingleBooking(bookingId)
  } catch (error: string | any) {
    const message = error.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const makeBookingSlice = createAsyncThunk('bookings/make-bookings', async (formData: BookingData, thunkAPI) => {
  try {
    return await bookingService.makeBooking(formData)
  } catch (error: string | any) {
    // console.log('Make Booking Slice Error', error)
    const message = error.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const editBookingSlice = createAsyncThunk('bookings/edit-bookings', async (id: string, thunkAPI) => {
  try {
    return await bookingService.editBooking(id)
  } catch (error: string | any) {
    console.log('Edit Booking Slice Error', error)
    const message = error.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const deleteBookings = createAsyncThunk('bookings/delete-bookings', async (id: string, thunkAPI) => {
  try {
    return await bookingService.deleteBooking(id)
  } catch (error: string | any) {
    console.log('Delete Booking Slice Error', error)
    const message = error.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const updateBookingStatusSlice = createAsyncThunk(
  'bookings/update-status',
  async ({ id, newStatus }: { id: string; newStatus: string }, thunkAPI) => {
    try {
      return await bookingService.updateBookingStatus(id, newStatus)
    } catch (error: string | any) {
      const message = error.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    RESET_BOOKINGS(state) {
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message = ''
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllBookingsSlice.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllBookingsSlice.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isLoggedIn = true
        state.isError = false
        state.bookings = action.payload
        console.log('Fulfilled bookings fetched:', action.payload)
      })
      .addCase(getAllBookingsSlice.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload as string
        console.log('Unable to Fetch Booking! ❌')
      })

      .addCase(getSingleBookingSlice.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSingleBookingSlice.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isLoggedIn = true
        state.isError = false
        state.booking = action.payload
        console.log('Fulfilled booking fetched:', action.payload)
      })

      .addCase(getSingleBookingSlice.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload as string
        console.log('Unable to Fetch Booking! ❌')
      })

      .addCase(makeBookingSlice.pending, (state) => {
        state.isLoading = true
      })

      .addCase(makeBookingSlice.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isLoggedIn = true
        state.isError = false
        state.booking = action.payload
        console.log(state.booking)
        Alert.alert('Bookings Scheduled Successful! ✅')
      })
      .addCase(makeBookingSlice.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload as string
        state.booking = null
        console.log(action.payload)
        Alert.alert('Bookings Scheduled Fail! ❌')
      })

      .addCase(editBookingSlice.pending, (state) => {
        state.isLoading
      })
      .addCase(editBookingSlice.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isSuccess = true
        state.isError = false
        state.booking = action.payload
        Alert.alert('Bookings Edited Successful! ✅')
      })
      .addCase(editBookingSlice.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload as string
        state.booking = null
        Alert.alert('Bookings Editing Fail! ❌')
      })

      .addCase(deleteBookings.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteBookings.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.booking = action.payload
        Alert.alert('Bookings Deleted Successful! ✅')
      })
      .addCase(deleteBookings.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload as string
        state.booking = null
        Alert.alert('Unable to Delete Bookings! ❌')
      })

      .addCase(updateBookingStatusSlice.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateBookingStatusSlice.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.booking = action.payload
        Alert.alert('Bookings Status Updated Successful! ✅')
      })
      .addCase(updateBookingStatusSlice.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload as string
        state.booking = null
        Alert.alert('Unable to Booking Status! ❌')
      })
  }
})

export const { RESET_BOOKINGS } = bookingSlice.actions

export default bookingSlice.reducer
