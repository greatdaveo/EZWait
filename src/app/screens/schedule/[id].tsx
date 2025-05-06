import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Button, Alert, ScrollView, ActivityIndicator, Platform } from 'react-native'
import { Calendar, DateData } from 'react-native-calendars'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { appTheme } from 'src/config/theme'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { getAllBookingsSlice, makeBookingSlice } from 'src/redux/bookings/bookingSlice'
import { Link, useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { getStylistProfileSlice } from 'src/redux/profile/profileSlice'
import moment from 'moment'

const ScheduleScreen = () => {
  const { id } = useLocalSearchParams() as { id: string }
  console.log('Stylist ID: ', id)

  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const navigate = useNavigation()

  const { stylistProfile, isLoading: loadingProfile } = useSelector((state: RootState) => state.profile)
  const { bookings, isLoading: loadingBookings } = useSelector((state: RootState) => state.bookings)

  const [selectedDate, setSelectedDate] = useState<string>('')
  const [startTime, setStartTime] = useState<Date>(new Date())
  const [showTimePicker, setShowTimePicker] = useState(false)

  // To fetch stylist slots and bookings
  useEffect(() => {
    dispatch(getStylistProfileSlice(id))
    dispatch(getAllBookingsSlice())
  }, [dispatch, id])

  // Loading indicator until both slices arrive
  if (loadingProfile || loadingBookings) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={appTheme.primary} />
      </View>
    )
  }

  // To map out days tat are already booked
  const bookedDays = bookings.data?.map((b: any) => b.booking_day.slice(0, 10)) || []
  const marked: Record<string, any> = {}
  bookedDays.forEach((d: any) => {
    marked[d] = { disabled: true, disableTouchEvent: true, marked: true, dotColor: 'red' }
  })

  // To highlight the selected day
  if (selectedDate) {
    marked[selectedDate] = { ...(marked[selectedDate] || {}), selected: true, selectedColor: appTheme.primary }
  }

  const confirmBooking = () => {
    if (!selectedDate) {
      return Alert.alert('Pick a date first')
    }
    if (!startTime) {
      return Alert.alert('Pick a start time')
    }
    // end = start + duration
    const DURATION_MINUTES = 20
    const endTime = new Date(startTime.getTime() + DURATION_MINUTES * 60_000)
    const payload = {
      stylist_id: Number(id),
      booking_day: selectedDate,
      start_time: startTime.toISOString(),
      end_time: endTime.toISOString()
    }

    console.log('payload: ', payload)

    dispatch(makeBookingSlice(payload))
      .unwrap()
      .then(() => {
        Alert.alert('Booked!', 'You appointment is pending confirmation.')
        router.push('/(tabs)/Bookings')
      })
      .catch((err: any) => {
        console.log(err)
        // Alert.alert('Error', err.message || err.toString())
      })
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconCover}>
            <Ionicons name="chevron-back-outline" size={28} color={appTheme.primary} />
          </TouchableOpacity>

          <View style={styles.titleCover}>
            <Text style={styles.title}>Book Your Appointment</Text>
          </View>
        </View>

        <View style={styles.contentCover}>
          <View>
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>Choose a Date</Text>
            </View>

            <View style={styles.calendarCover}>
              <Calendar
                onDayPress={(day: DateData) => {
                  setSelectedDate(day.dateString)
                }}
                minDate={moment().format('YYYY-MM-DD')}
                markedDates={marked}
                theme={{ todayTextColor: appTheme.primary }}
              />
            </View>
          </View>

          <View>
            <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Select Time</Text>

            <TouchableOpacity style={styles.timeButton} onPress={() => setShowTimePicker(true)}>
              <Text style={styles.timeButtonText}>{startTime ? moment(startTime).format('h:mm A') : 'Select time'}</Text>
            </TouchableOpacity>

            {showTimePicker && (
              <DateTimePicker
                value={startTime}
                mode="time"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(_, time) => {
                  if (time) setStartTime(time)
                  setShowTimePicker(false)
                }}
              />
            )}
          </View>

          <TouchableOpacity
            style={[styles.confirmBtn, (!selectedDate || !startTime) && { backgroundColor: '#ccc' }]}
            disabled={!selectedDate || !startTime}
            onPress={confirmBooking}>
            <Text style={styles.confirmTxt}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding: 20,
    backgroundColor: '#FFFFFF'
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#EBEBEB',
    paddingBottom: 30
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7'
  },

  iconCover: {
    backgroundColor: '#F4EDFF',
    padding: 5,
    borderRadius: 50
  },

  titleCover: {
    flexDirection: 'row'
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 50
    // marginBottom: 4
  },

  dateText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 30
  },

  sectionTitle: {
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    fontSize: 18
  },

  // ::::::::::::::::::

  contentCover: {
    justifyContent: 'space-between',
    gap: 30
  },

  dateContainer: {
    marginTop: 20
  },

  // :::::::::::::::

  calendarCover: {
    borderWidth: 2,
    borderColor: '#F5F5F5',
    marginTop: -5
  },

  timeButton: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20
  },

  timeButtonText: {
    fontSize: 16
  },

  confirmBtn: {
    backgroundColor: appTheme.primary,
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 30,
    marginBottom: 10
  },

  confirmTxt: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default ScheduleScreen
