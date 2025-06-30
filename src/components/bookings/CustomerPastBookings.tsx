import { Ionicons } from '@expo/vector-icons'
import React, { useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, ActivityIndicator, Button } from 'react-native'
import { appTheme } from 'src/config/theme'
import moment from 'moment'
import { useRouter, useNavigation } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBookingsSlice, updateBookingStatusSlice } from 'src/redux/bookings/bookingSlice'
import { AppDispatch, RootState } from 'src/redux/store'

export default function CustomerPastBookings() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const navigation = useNavigation()

  const { isLoggedIn } = useSelector((s: RootState) => s.auth)
  const { isLoading, bookings } = useSelector((s: RootState) => s.bookings)

  // To fetch all bookings for this user on mount
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getAllBookingsSlice())
    }
  }, [isLoggedIn, dispatch])

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={appTheme.primary} />
        <Text>Loading bookings…</Text>
      </View>
    )
  }

  if (!bookings?.data?.length) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>You have no bookings yet.</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    )
  }

  const now = moment()

  const upcoming = bookings?.data
    .filter((booking: any) => moment(booking.start_time).isAfter(now))
    .sort((a: any, b: any) => moment(a.start_time).diff(b.start_time))

  // console.log('bookings.data:', upcoming.stylist.name)

  const completed = bookings.data
    .filter((booking: any) => !moment(booking.start_time).isAfter(now))
    .sort((a: any, b: any) => moment(b.start_time).diff(a.start_time))

  const cancelBooking = (id: number) => {
    Alert.alert(
      'Cancel this booking?',
      '',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () =>
            dispatch(updateBookingStatusSlice({ id: id.toString(), newStatus: 'cancelled' }))
              .unwrap()
              .then(() => dispatch(getAllBookingsSlice()))
              .catch((error: any) => {
                console.log('cancelBooking: ', error)
                Alert.alert('❌ Error', 'Could not cancel')
              })
        }
      ],
      { cancelable: true }
    )
  }

  const editBooking = (id: number) => {
    router.push(`/screens/schedule/${id}`)
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.upcomingAppointments}>
          <View>
            <Text style={styles.appointmentHeader}>Upcoming Appointments ------------------------------</Text>
          </View>

          {upcoming.map((booking: any, i: number) => (
            <View key={i} style={styles.appointmentDetailsCover}>
              <View style={styles.detailsCover}>
                <Ionicons name="calendar-outline" size={28} color={appTheme.themeBlack} />

                <View style={styles.customerDetails}>
                  <Text style={styles.customerName}>{booking.stylist?.name}</Text>
                  <Text style={styles.date}>{moment(booking.start_time).format('MMMM D, YYYY')}</Text>
                  <Text style={styles.time}>
                    🕒 {moment(booking.start_time).format('h:mm A')} – {moment(booking.end_time).format('h:mm A')}
                  </Text>
                </View>
              </View>

              {booking.booking_status === 'pending' ? (
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <TouchableOpacity style={styles.editBtn} onPress={() => editBooking(booking.id)}>
                    <Text style={styles.editText}>Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.cancelBtn} onPress={() => cancelBooking(booking.id)}>
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              ) : booking.booking_status === 'cancelled' ? (
                <View style={styles.acceptBtn}>
                  <Text style={styles.cancelText}>Cancelled</Text>
                </View>
              ) : (
                <View style={styles.acceptBtn}>
                  <Text style={styles.btnText}>Confirmed</Text>
                </View>
              )}
            </View>
          ))}

          {/* For Past Appointments */}
          <View style={styles.passAppointments}>
            <View>
              <Text style={styles.appointmentHeader}>Past Appointments ------------------------------</Text>
            </View>

            {completed.map((b: any, i: number) => (
              <View key={i} style={styles.appointmentDetailsCover}>
                <View style={styles.detailsCover}>
                  <Ionicons name="checkmark-done-outline" size={28} color={appTheme.themeGray} />

                  <View style={styles.customerDetails}>
                    <Text style={styles.customerName}>{b.stylist?.name || b.user?.name}</Text>
                    <Text style={styles.date}>{moment(b.start_time).format('MMMM D, YYYY')}</Text>
                    <Text style={styles.time}>
                      🕒 {moment(b.start_time).format('h:mm A')} – {moment(b.end_time).format('h:mm A')}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.acceptBtn} disabled>
                  <Text style={styles.btnText}>Completed</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },

  // ::::::::::::::::
  upcomingAppointments: {
    marginTop: 15,
    padding: 20
  },

  passAppointments: {
    marginTop: 10,
    padding: 20
  },

  appointmentHeader: {
    marginBottom: 10,
    fontWeight: 'bold'
  },

  appointmentDetailsCover: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 30,
    gap: 5,
    backgroundColor: '#f7f7f7',
    marginTop: 20,
    padding: 20
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

  editBtn: {
    // marginLeft: 10
  },

  editText: {
    color: appTheme.primary,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: appTheme.primary,
    padding: 10,
    borderRadius: 20,
    fontSize: 12
  },

  cancelBtn: {},

  cancelText: {
    color: 'red',
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: 'red',
    padding: 10,
    borderRadius: 20,
    fontSize: 12
  },

  acceptBtn: {
    // marginLeft: 10
  },

  btnText: {
    color: appTheme.primary,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: appTheme.primary,
    padding: 10,
    borderRadius: 30,
    fontSize: 12
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
})
