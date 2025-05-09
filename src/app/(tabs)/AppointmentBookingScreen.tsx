import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Button, Alert, ScrollView, ActivityIndicator } from 'react-native'
import { appTheme } from 'src/config/theme'
import moment from 'moment'
import { useNavigation, useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { getAllBookingsSlice, getSingleBookingSlice, updateBookingStatusSlice } from 'src/redux/bookings/bookingSlice'

export default function AppointmentBookingScreen() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const navigation = useNavigation()

  const { isLoggedIn } = useSelector((state: RootState) => state.auth)
  const { isLoading, bookings } = useSelector((state: RootState) => state.bookings)

  // console.log('Bookings: ', bookings)

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getAllBookingsSlice())
      // dispatch(getSingleBookingSlice(bookings?.data?.id))
    }
  }, [isLoggedIn, dispatch])

  const acceptBookings = (bookingId: number) => {
    dispatch(
      updateBookingStatusSlice({
        id: bookingId.toString(),
        newStatus: 'confirmed'
      })
    )
      .unwrap()
      .then(() => {
        dispatch(getAllBookingsSlice())
      })
      .catch((err: any) => {
        Alert.alert('Error ❌', 'Could not update booking.')
      })
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={appTheme.primary} />
        <Text>Loading Bookings Data...</Text>
      </View>
    )
  }

  if (!bookings?.data?.length) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No bookings data available</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    )
  }

  // console.log('bookings.data:', bookings.data)

  // To match each booking to include a JS Date for sorting
  const now = moment()

  // To partition the bookings into upcoming vs completed
  const upcoming = bookings.data
    .filter((booking: any) => moment(booking.start_time).isAfter(now))
    .sort((a: any, b: any) => moment(a.start_time).diff(moment(b.start_time)))

  // console.log('upcoming', upcoming)

  const completed = bookings.data
    .filter((booking: any) => !moment(booking.start_time).isAfter(now))
    .sort((a: any, b: any) => moment(b.start_time).diff(moment(a.start_time)))

  // console.log('completed', completed)

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.upcomingAppointments}>
          <View>
            <Text>Upcoming Appointments ------------------------------</Text>
          </View>

          {upcoming.map((item: any, i: number) => (
            <TouchableOpacity
              key={i}
              onPress={() => router.push(`screens/appointment/${item.id}`)}
              style={[styles.upcomingBooking, styles.appointmentDetailsCover]}
              disabled={item.booking_status === 'confirmed' ? true : false}>
              <View style={styles.detailsCover}>
                <Ionicons name="create-outline" color={appTheme.themeBlack} size={28} />

                <View style={styles.customerDetails}>
                  <Text style={styles.customerName}>{item.user?.name}</Text>
                  <Text style={styles.date}>{moment(item.start_time).format('MMMM D, YYYY')}</Text>
                  <Text style={styles.time}>
                    🕒 {moment(item.start_time).format('h:mm A')} - {moment(item.end_time).format('h:mm A')}
                  </Text>
                </View>
              </View>

              {item.booking_status === 'pending' ? (
                <TouchableOpacity style={styles.acceptBtn} onPress={() => acceptBookings(item.id)}>
                  <Text style={styles.btnText}>Accept</Text>
                </TouchableOpacity>
              ) : item.booking_status === 'cancelled' ? (
                <View style={styles.acceptBtn}>
                  <Text style={styles.btnText}>Cancelled</Text>
                </View>
              ) : (
                <View style={styles.acceptBtn}>
                  <Text style={styles.btnText}>Confirmed</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.upcomingAppointments}>
          <View>
            <Text>Completed Appointments ------------------------------</Text>
          </View>

          {completed.map((item: any, i: number) => (
            <View key={i} style={styles.appointmentDetailsCover}>
              <View style={styles.detailsCover}>
                <Ionicons name="checkmark-done-outline" color={appTheme.themeGray} size={28} />

                <View style={styles.customerDetails}>
                  <Text style={styles.customerName}>{item.user?.name}</Text>
                  <Text style={styles.date}>{moment(item.start_time).format('MMMM D, YYYY')}</Text>
                  <Text style={styles.time}>
                    🕒 {moment(item.start_time).format('h:mm A')} - {moment(item.end_time).format('h:mm A')}
                  </Text>
                </View>
              </View>

              <TouchableOpacity style={styles.acceptBtn} disabled={true}>
                <Text style={styles.btnText}>Confirmed</Text>
              </TouchableOpacity>
            </View>
          ))}
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

  upcomingBooking: {
    backgroundColor: '#f7f7f7'
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
    borderWidth: 1,
    borderColor: appTheme.primary,
    padding: 10,
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
    alignItems: 'center'
  },

  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center'
  }

  // ::::::::::::::::
})
