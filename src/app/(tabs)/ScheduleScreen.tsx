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
import { Link, useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import RadioGroup from 'react-native-radio-buttons-group'
import CustomCalendar from 'src/components/calendar/CustomCalendar'

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
  const [pageIndex, setPageIndex] = useState(0)

  const { user } = useSelector((state: RootState) => state.auth)
  const { stylist_id } = useLocalSearchParams() as { stylist_id: string }

  // console.log('user: ', user, 'Stylist: ', stylist_id)

  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const navigate = useNavigation()

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

  // For Radio Buttons

  const [selectedId, setSelectedId] = useState('')

  const radioButtons = timeData.map((item) => ({
    id: item.id,
    value: item.time,
    label: `🕒 ${item.time}` // Show time directly
  }))

  const saveBooking = async () => {
    router.push('/bookings')

    const { booking_time, booking_day, booking_status } = bookingData

    // if (!selectedDate || !selectedTime) {
    //   Alert.alert('Incomplete Fields', 'Please select both date and time for your booking.')
    //   return
    // }

    // const payload = {
    //   user_id: user.id,
    //   stylist_id: Number(stylist_id),
    //   booking_time,
    //   booking_day: selectedDate,
    //   booking_status: 'pending'
    // }

    // console.log('Booking Data: ', payload)

    // await dispatch(makeBookingSlice(payload))
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

        {pageIndex === 0 && (
          <View style={styles.contentCover}>
            <View>
              <View style={styles.dateContainer}>
                <Text style={styles.dateText}>Choose a Date</Text>
                <Text style={styles.dateDesc}>Choose from available slots to secure your spot with your preferred barber.</Text>
              </View>

              <View style={styles.calendarCover}>
                <Calendar onDayPress={(day) => onDayPress(day)} />
                {/* <CustomCalendar /> */}
              </View>
            </View>

            <View style={styles.buttonContainerCover}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.nextBtn} onPress={() => setPageIndex(1)}>
                <Text style={styles.nextBtnText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </>

      {pageIndex === 1 && (
        <View style={styles.contentCover}>
          <View>
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>Available Time Slots</Text>
              <Text style={styles.dateDesc}>Pick a time slot that fits your schedule. Availability is limited, so book now to secure your spot.</Text>
            </View>

            <View style={styles.timeCover}>
              <Text style={styles.timeSlot}>Time Slots</Text>

              <RadioGroup
                selectedId={selectedId}
                onPress={setSelectedId}
                // layout="column"
                radioButtons={timeData.map((item, i) => ({
                  id: item.id,
                  value: item.id,
                  label: (
                    <View style={styles.radioItem}>
                      <Text style={styles.timeText}> 🕒 {item.time}</Text>
                      <View style={styles.radioButtonContainer} />
                    </View>
                  )
                }))}
              />

              {selectedId && <Text style={styles.selectedTime}>Selected Time: {timeData.find((t) => t.id === selectedId)?.time}</Text>}
            </View>
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
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding: 20,
    backgroundColor: '#FFFFFF',
    height: '100%'
    // position: 'static'
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

  contentCover: {
    justifyContent: 'space-between',
    gap: 180
  },

  dateContainer: {
    marginTop: 20
  },

  dateText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18
  },

  dateDesc: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
    width: '80%',
    margin: 'auto',
    fontSize: 16
  },

  // :::::::::::::::

  calendarCover: {
    borderWidth: 2,
    borderColor: '#F5F5F5',
    marginTop: 30
    // height: '100%'
  },

  timeCover: {
    borderWidth: 2,
    borderColor: '#F5F5F5',
    marginTop: 30,
    padding: 10,
    paddingVertical: 30,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: -80
  },

  timeSlot: {
    fontSize: 16,
    marginBottom: 20
  },

  selectedTime: {},

  buttonContainerCover: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
    bottom: 50
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

  // ::::::RADIO STYLES::::::
  radioStyle: {
    color: 'red'
  },

  radioItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
    // gap: 100
  },

  timeText: {
    fontSize: 16,
    flex: 1,
    marginLeft: 10
  },

  radioButtonContainer: {
    marginLeft: 20
  }
})

export default ScheduleScreen
