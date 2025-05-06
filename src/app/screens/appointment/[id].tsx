import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams, useNavigation, Link, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { Modal, ActivityIndicator, Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { appTheme } from 'src/config/theme'
import { getSingleBookingSlice, updateBookingStatusSlice } from 'src/redux/bookings/bookingSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import moment from 'moment'

const Appointment: React.FC = () => {
  const { id } = useLocalSearchParams() as { id: string }
  const navigation = useNavigation()
  const dispatch = useDispatch<AppDispatch>()
  const { booking, isLoading, isSuccess } = useSelector((state: RootState) => state.bookings)
  const { user, isLoggedIn } = useSelector((state: RootState) => state.auth)
  const [showAll, setShowAll] = useState(false)
  const [modalVisible, setModalVisible] = useState(true)
  const router = useRouter()

  console.log('Customer Booking: ', booking)
  console.log('Booking ID: ', id)
  // const bookingData = booking?.data
  // const id = booking?.data?.id

  const { booking_day, start_time, end_time, booking_status, stylist, user: customer } = booking?.data

  console.log(booking_day, booking_status, end_time, start_time, stylist, customer)

  const dateLabel = moment(booking_day).format('MMMM D, YYYY')
  const startLabel = moment(start_time).format('h:mm A')
  const endLabel = moment(end_time).format('h:mm A')

  useEffect(() => {
    dispatch(getSingleBookingSlice(id))
  }, [dispatch, id, isLoggedIn])

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#9747FF" />
        <Text>Loading Booking Details...</Text>
      </View>
    )
  }

  if (!booking) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No booking data available</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    )
  }

  const handlePreviousStep = () => {
    router.back()
  }

  const confirmBooking = () => {
    dispatch(updateBookingStatusSlice({ id: booking?.data?.id, newStatus: 'confirmed' }))
      .unwrap()
      .then(() => {
        Alert.alert('Success', 'Appointment confirmed.')
        setModalVisible(false)
        router.push('/(tabs)/StylistHomeScreen')
      })
      .catch((err: any) => {
        console.error('Error confirming:', err)
        Alert.alert('Error', 'Could not confirm appointment.')
      })
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handlePreviousStep} style={styles.iconCover}>
          <Ionicons name="chevron-back-outline" size={28} color={appTheme.primary} />
        </TouchableOpacity>

        <View style={styles.titleCover}>
          <Text style={styles.title}>Appointment</Text>
        </View>
      </View>

      <View style={[styles.summaryContent, modalVisible && styles.blurBackground]}>
        <View style={styles.headerText}>
          <Text style={styles.header}>Your Upcoming Appointment</Text>
          <Text style={styles.subText}>You’ll receive a notification 1 hour before your appointment to help you stay prepared.</Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Appointment Details</Text>
          <Text style={styles.detail}>
            • Barber: <Text style={styles.bold}>{customer?.name}</Text>
          </Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailText}>• Date: 📅 {dateLabel}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailText}>
              • Time: 🕒 {startLabel} - {endLabel}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailText}>• Location: 📍 {customer?.location}</Text>
          </View>

          <Text style={styles.detail}>
            • Contact: <Text style={styles.bold}>📞 {customer?.number}</Text>
          </Text>

          <Text style={styles.detail}>
            • Status: <Text style={[styles.bold, { color: booking_status === 'pending' ? appTheme.primary : '#28A745' }]}>⏳ {booking_status}</Text>
          </Text>
        </View>

        <View>
          <TouchableOpacity style={[styles.buttonContainer, styles.confirmButton]} onPress={() => setModalVisible(true)}>
            <Text style={styles.btnText}>Accept Booking</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.buttonContainer, styles.cancelButton]} onPress={() => router.back()}>
            <Text style={styles.cancelText}>Decline Booking</Text>
          </TouchableOpacity>
        </View>

        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <>
                <Text style={styles.modalHeader}>Confirm Appointment?</Text>
                <Text style={styles.modalText}>
                  You are about to accept this booking. The client will be notified, and the appointment will be added to your schedule.
                </Text>
              </>

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.buttonContainer, styles.confirmButton]} onPress={confirmBooking}>
                  <Text style={styles.btnText}>Confirm</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.buttonContainer, styles.backHomeBtn]} onPress={() => setModalVisible(false)}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 20,
    marginTop: 40,
    // backgroundColor: '#f7f7f7',
    justifyContent: 'space-between'
    // justifyContent: 'center'
  },

  topBar: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#EBEBEB',
    paddingBottom: 20
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
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: '30%',
    textAlign: 'center'
    // marginBottom: 4
  },

  summaryContent: {
    flex: 1
  },

  blurBackground: {
    // opacity: 0.5
  },

  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    maxWidth: '80%',
    marginHorizontal: 'auto'
  },

  subText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    // marginBottom: -50,
    maxWidth: '80%',
    marginHorizontal: 'auto'
  },

  headerText: {
    marginBottom: 40,
    marginTop: 20
  },

  detailsContainer: {
    // backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#EBEBEB',
    gap: 20
    // marginTop: -100
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },

  detail: {
    fontSize: 18,
    marginBottom: 5
  },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },

  detailText: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 18,
    marginLeft: 5
  },

  bold: {
    fontWeight: 'bold'
  },

  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 25,
    borderRadius: 10,
    marginBottom: 15
  },

  confirmButton: {
    backgroundColor: appTheme.primary
  },

  cancelButton: {
    // backgroundColor: '#ddd',
    borderWidth: 2,
    borderColor: '#ddd',
    marginBottom: 80
  },

  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  },

  cancelText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 18
  },

  // :::::: MODAL STYLES :::::::
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  modalContent: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    borderRadius: 30,
    paddingTop: 30,
    alignItems: 'center',
    width: '85%',
    marginHorizontal: 'auto',
    gap: 20
  },

  checkmarkImage: {
    width: 80,
    height: 80,
    marginBottom: 20
  },

  modalHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    // color: appTheme.primary,
    marginBottom: 10
  },

  modalText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    width: '75%'
  },

  backHomeBtn: {
    borderWidth: 2,
    borderColor: '#ddd',
    marginBottom: 0
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
  },

  modalBtnCover: {
    // flexDirection: 'row'
  }
})
export default Appointment
