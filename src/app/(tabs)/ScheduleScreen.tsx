import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Button, Alert, ScrollView } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { appTheme } from 'src/config/theme'
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { UserTopContent } from './CustomerHomeScreen'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { makeBookingSlice } from 'src/redux/bookings/bookingSlice'
import { useLocalSearchParams } from 'expo-router'

const BookingDetail: React.FC<{ icon: any; label: string }> = ({ icon, label }) => (
  <View style={styles.bookingDetails}>
    <Ionicons name={icon} size={24} color={appTheme.primary} />
    <Text style={styles.text}>{label}</Text>
  </View>
)

interface FormData {
  // user_id: number | null
  // stylist_id: number | null
  booking_time: string
  booking_day: string
  booking_status: string
}

const initialState: FormData = {
  // user_id: null,
  // stylist_id: null,
  booking_time: '',
  booking_day: '',
  booking_status: ''
}

const ScheduleScreen: React.FC = () => {
  const [date, setDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [bookingData, setBookingData] = useState<FormData>(initialState)

  const { user } = useSelector((state: RootState) => state.auth)
  const { stylist_id } = useLocalSearchParams() as { stylist_id: string }

  // console.log('user: ', user, 'Stylist: ', stylist_id)

  const dispatch = useDispatch<AppDispatch>()

  const { isLoading, isLoggedIn, isSuccess, isError } = useSelector((state: RootState) => state.bookings)

  const onDayPress = (day: any) => {
    // console.log(day.dateString)
    setSelectedDate(day.dateString)
  }

  const handleTimeChange = (event: DateTimePickerEvent, time?: Date) => {
    // console.log('Event Type:', event.type, 'Selected Time:', selectedTime)

    if (event.type === 'set' && time) {
      const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      setSelectedTime(formattedTime)
      setBookingData((prev) => ({ ...prev, booking_time: formattedTime }))
    }
  }

  const saveBooking = async () => {
    const { booking_time, booking_day, booking_status } = bookingData

    if (!selectedDate || !selectedTime) {
      Alert.alert('Incomplete Fields', 'Please select both date and time for your booking.')
      return
    }

    const payload = {
      user_id: user.id,
      stylist_id: Number(stylist_id),
      booking_time,
      booking_day: selectedDate,
      booking_status: 'pending'
    }

    console.log('Booking Data: ', payload)

    await dispatch(makeBookingSlice(payload))
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <UserTopContent />

        <View>
          <View style={styles.searchCover}>
            <Ionicons name="search-outline" size={18} color={appTheme.themeGray} style={styles.searchIcon} />
            <TextInput style={styles.input} placeholder="Search hair stylist by name" placeholderTextColor={appTheme.themeGray} />
          </View>

          <View style={styles.bookingDetailsCover}>
            <BookingDetail icon="person-outline" label="Barber Abc" />
            <BookingDetail icon="calendar-number-outline" label={selectedDate || '--'} />
            <BookingDetail icon="time-outline" label={selectedTime || '--'} />
          </View>

          <View>
            <View style={styles.preferencesContainer}>
              <View style={styles.availabilityCover}>
                <Text style={styles.availabilityText}>Calendar</Text>

                <View style={styles.timeCover}>
                  <Text>Select Time:</Text>
                  <RNDateTimePicker
                    mode="time"
                    value={date}
                    // display="spinner"
                    // textColor="red"
                    // accentColor={appTheme.primary}
                    // themeVariant="light"
                    onChange={handleTimeChange}
                  />
                </View>
              </View>

              <View style={styles.calendarCover}>
                <Calendar onDayPress={(day) => onDayPress(day)} />
              </View>
            </View>

            <TouchableOpacity onPress={saveBooking} style={styles.saveButton}>
              <Ionicons name="add" color={appTheme.secondary} size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    padding: 15
  },

  headContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  bookingDetailsCover: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    shadowColor: appTheme.primary,
    backgroundColor: appTheme.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10
  },

  bookingDetails: {
    alignItems: 'center',
    gap: 5
  },

  text: {
    // fontSize: 24
  },

  subtext: {
    fontWeight: '500',
    fontSize: 18
  },

  img: {
    width: 50,
    height: 50,
    borderRadius: 50
  },

  searchCover: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'white',
    marginVertical: 10,
    borderRadius: 10,

    shadowColor: appTheme.primary,
    backgroundColor: appTheme.secondary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 10
  },

  searchIcon: {
    marginLeft: 15
  },

  input: {
    padding: 2,
    fontSize: 18,
    marginVertical: 12
  },

  formTitle: {},

  preferencesContainer: {
    marginVertical: 20,
    marginBottom: 10
    // marginTop: -100
  },

  availabilityText: {
    fontSize: 16,
    marginVertical: 10
  },

  availabilityCover: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  timeCover: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  calendarCover: {
    // borderWidth: 1,
    // borderColor: appTheme.primary,
    borderRadius: 10,
    marginTop: 12,
    shadowColor: appTheme.primary,
    backgroundColor: appTheme.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10
  },

  saveButton: {
    backgroundColor: appTheme.primary,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 40,
    position: 'absolute',
    right: 15,
    bottom: -70,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4
  }
})

export default ScheduleScreen
