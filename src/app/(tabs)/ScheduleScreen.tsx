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
import { Link, useLocalSearchParams, useRouter } from 'expo-router'
import RadioGroup from 'react-native-radio-buttons-group'

const timeData = [
  { id: '1', time: '9:00 AM - 10:00 AM' },
  { id: '2', time: '10:30 AM - 11:30 AM' },
  { id: '3', time: '12:00 PM - 1:00 PM' },
  { id: '4', time: '2:00 PM - 3:00 PM' },
  { id: '5', time: '5:00 PM - 6:00 PM' },
  { id: '6', time: '6:30 PM - 7:30 PM' },
  { id: '7', time: '8:00 PM - 9:00 PM' }
]

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
  const [selectedTime, setSelectedTime] = useState(null)
  const [bookingData, setBookingData] = useState<FormData>(initialState)
  const [nextState, setNextState] = useState<boolean>(false)

  const { user } = useSelector((state: RootState) => state.auth)
  const { stylist_id } = useLocalSearchParams() as { stylist_id: string }

  // console.log('user: ', user, 'Stylist: ', stylist_id)

  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const { isLoading, isLoggedIn, isSuccess, isError } = useSelector((state: RootState) => state.bookings)

  const onDayPress = (day: any) => {
    // console.log(day.dateString)
    setSelectedDate(day.dateString)
  }

  const handleTimeChange = (event: DateTimePickerEvent, time?: Date) => {
    // console.log('Event Type:', event.type, 'Selected Time:', selectedTime)

    if (event.type === 'set' && time) {
      const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      // setSelectedTime(formattedTime)
      setBookingData((prev) => ({ ...prev, booking_time: formattedTime }))
    }
  }

  const [selectedId, setSelectedId] = useState(null)

  const radioButtons = timeData.map((item) => ({
    id: item.id,
    value: item.time,
    label: `🕒 ${item.time}` // Show time directly
  }))

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

  const handlePreviousStep = () => {
    router.back()
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={handlePreviousStep} style={styles.iconCover}>
            <Ionicons name="chevron-back-outline" size={28} color={appTheme.primary} />
          </TouchableOpacity>

          <View style={styles.titleCover}>
            <Text style={styles.title}>Book Your Appointment</Text>
          </View>
        </View>

        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>Choose a Date</Text>
          <Text style={styles.dateDesc}>Choose from available slots to secure your spot with your preferred barber.</Text>
        </View>

        <View style={styles.calendarCover}>
          <Calendar onDayPress={(day) => onDayPress(day)} />
        </View>

        <View style={styles.buttonContainerCover}>
          <TouchableOpacity style={styles.cancelBtn}>
            <Link href="/(auth)/login" style={styles.cancelBtnText}>
              Cancel
            </Link>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextBtn} onPress={() => setNextState(true)}>
            <Text style={styles.nextBtnText}>Next</Text>
          </TouchableOpacity>
        </View>
      </>

      {nextState && (
        <>
          <View style={styles.topBar}>
            <TouchableOpacity onPress={handlePreviousStep} style={styles.iconCover}>
              <Ionicons name="chevron-back-outline" size={28} color={appTheme.primary} />
            </TouchableOpacity>

            <View style={styles.titleCover}>
              <Text style={styles.title}>Book Your Appointment</Text>
            </View>
          </View>

          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>Available Time Slots</Text>
            <Text style={styles.dateDesc}>Pick a time slot that fits your schedule. Availability is limited, so book now to secure your spot.</Text>
          </View>

          <View style={styles.calendarCover}>
            <Text>Time Slots</Text>

            <RadioGroup selectedId={selectedId} onPress={setSelectedId} radioButtons={radioButtons} />
            {selectedId && <Text style={styles.selectedText}>Selected Time: {timeData.find((t) => t.id === selectedId)?.time}</Text>}
          </View>

          <View style={styles.buttonContainerCover}>
            <TouchableOpacity style={styles.cancelBtn}>
              <Link href="/(auth)/login" style={styles.cancelBtnText}>
                Cancel
              </Link>
            </TouchableOpacity>

            <TouchableOpacity style={styles.nextBtn} onPress={saveBooking}>
              <Text style={styles.nextBtnText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding: 20
    // backgroundColor: '#f7f7f7'
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

  // ::::::::::::::::::

  dateContainer: {},

  dateText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18
  },

  dateDesc: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
    width: '75%',
    margin: 'auto'
    // fontSize: 16
  },

  // :::::::::::::::

  buttonContainerCover: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
    gap: 20
  },

  cancelBtn: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderRadius: 10,
    paddingHorizontal: 60
  },

  cancelBtnText: {
    fontSize: 16,
    fontWeight: 'medium'
  },

  nextBtn: {
    backgroundColor: appTheme.primary,
    padding: 20,
    borderRadius: 10,
    paddingHorizontal: 60
  },

  nextBtnText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'medium'
  },

  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
    // marginRight: 5
  },

  calendarCover: {}
})

export default ScheduleScreen
