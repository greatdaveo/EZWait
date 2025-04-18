import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Button, Alert, ScrollView, ActivityIndicator } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { appTheme } from 'src/config/theme'
import { getFirestore, doc, setDoc, collection, addDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { Calendar, CalendarList } from 'react-native-calendars'
import moment from 'moment'
import { useNavigation, useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { getAllBookingsSlice, getSingleBookingSlice } from 'src/redux/bookings/bookingSlice'

export default function ScheduleScreen() {
  const router = useRouter()

  const { isLoggedIn } = useSelector((state: RootState) => state.auth)
  const { isLoading, bookings, booking } = useSelector((state: RootState) => state.bookings)
  const dispatch = useDispatch<AppDispatch>()
  const navigation = useNavigation()

  console.log('Bookings: ', bookings)
  console.log('Booking: ', booking)

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getAllBookingsSlice())
      // dispatch(getSingleBookingSlice(bookings?.data?.id))
    }
  }, [isLoggedIn, dispatch])

  const acceptBookings = () => {
    router.push('/appointment')
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#9747FF" />
        <Text>Loading Bookings Data...</Text>
      </View>
    )
  }

  if (!bookings) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No bookings data available</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    )
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        {/* <View style={styles.upcomingAppointments}>
          <View style={styles.appointmentHeader}>
            <Text>Upcoming Appointments ------------------------------</Text>
          </View>

          <TouchableOpacity style={styles.appointmentDetailsCover} onPress={viewBookingDetails}>
            <View style={styles.detailsCover}>
              <Ionicons name="create-outline" color={appTheme.themeBlack} size={28} />

              <View style={styles.customerDetails}>
                <Text style={styles.customerName}>Jane Smith</Text>
                <Text style={styles.date}>March, 12, 2025</Text>
                <Text style={styles.time}>🕒 2:00 PM - 3:00 PM</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.acceptBtn} onPress={acceptBookings}>
              <Text style={styles.btnText}>Accept</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View> */}

        <View style={styles.upcomingAppointments}>
          <View>
            <Text>Completed Appointments ------------------------------</Text>
          </View>

          {bookings?.data?.map((item: any, i: number) => {
            console.log('item.id: ', item.id)
            return (
              <TouchableOpacity key={i} style={styles.appointmentDetailsCover} onPress={() => router.push(`screens/appointment/${item.id}`)}>
                <View style={styles.detailsCover}>
                  <Ionicons name="create-outline" color={appTheme.themeBlack} size={28} />

                  <View style={styles.customerDetails}>
                    <Text style={styles.customerName}>{item.user?.name}</Text>
                    <Text style={styles.date}>{moment(item.booking_day).format('MMMM D, YYYY')}</Text>
                    <Text style={styles.time}>
                      🕒 {moment(item.start_time).format('h:mm A')} - {moment(item.end_time).format('h:mm A')}
                    </Text>
                  </View>
                </View>

                {item.booking_status === 'pending' ? (
                  <TouchableOpacity style={styles.acceptBtn} onPress={acceptBookings}>
                    <Text style={styles.btnText}>Accept</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.acceptBtn}>
                    <Text style={styles.btnText}>Confirmed</Text>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
    // padding: 60
  },

  // ::::::::::::::::
  upcomingAppointments: {
    marginTop: 40,
    padding: 20
  },

  appointmentHeader: {
    marginBottom: 10
  },

  appointmentDetailsCover: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 30,
    gap: 5,
    marginTop: 30,
    padding: 30
  },

  detailsCover: {
    flexDirection: 'row',
    gap: 20
  },

  customerDetails: {
    gap: 15
  },

  customerName: {
    fontWeight: 'bold',
    fontSize: 16
  },

  date: {
    fontWeight: 'medium',
    fontSize: 16,
    color: '#757575'
  },

  time: {
    fontWeight: 'medium',
    fontSize: 16,
    color: '#757575'
  },

  acceptBtn: {
    // padding: 10
    marginLeft: 10
  },

  btnText: {
    color: appTheme.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: appTheme.primary,
    padding: 10,
    fontSize: 14,
    paddingHorizontal: 20,
    borderRadius: 30
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7'
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7'
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center'
  }

  // ::::::::::::::::
})
