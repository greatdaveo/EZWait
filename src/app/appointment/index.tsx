import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams, useNavigation, Link, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Button, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { appTheme } from 'src/config/theme'
import { getAllBookingsSlice } from 'src/redux/bookings/bookingSlice'
import { AppDispatch, RootState } from 'src/redux/store'

const Appointment: React.FC = () => {
  const { id } = useLocalSearchParams() as { id: string }
  const navigation = useNavigation()
  const dispatch = useDispatch<AppDispatch>()
  const { booking, isLoading } = useSelector((state: RootState) => state.bookings)
  const [showAll, setShowAll] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const router = useRouter()

  console.log('Customer Booking: ', booking)

  useEffect(() => {
    // dispatch(getAllBookingsSlice())
  }, [])

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#9747FF" />
        <Text>Loading Stylist Profile...</Text>
      </View>
    )
  }

  if (booking) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No profile data available</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    )
  }

  const handlePreviousStep = () => {
    router.back()
  }

  const acceptBooking = () => {
    setModalVisible(true)
  }

  const confirmAppointment = () => {
    setModalVisible(false)
    Alert.alert('Appointment Confirmed ✅')
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handlePreviousStep} style={styles.iconCover}>
          <Ionicons name="chevron-back-outline" size={28} color={appTheme.primary} />
        </TouchableOpacity>

        <View style={styles.titleCover}>
          <Text style={styles.title}>Upcoming Appointment</Text>
        </View>
      </View>

      <View style={styles.container}>
        <View style={[styles.summaryContent, modalVisible && styles.blurBackground]}>
          <View>
            <Text style={styles.header}>Your Upcoming Appointment</Text>
            <Text style={styles.subText}>You’ll receive a notification 1 hour before your appointment to help you stay prepared. </Text>
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.sectionTitle}>Appointment Details</Text>
            <Text style={styles.detail}>
              • Client: <Text style={styles.bold}>Jane Smith</Text>
            </Text>

            <View style={styles.detailRow}>
              <Text style={styles.detailText}>• Date: 📅 Wednesday, February 7, 2025</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailText}>• Time: 🕒 2:00 PM - 3:00PM</Text>
            </View>

            <Text style={styles.detail}>
              • Contact: <Text style={styles.bold}>📞 +123 343 43234</Text>
            </Text>

            <View style={styles.detailRow}>
              <Text style={styles.detailText}>• Status: ⏳ Pending Confirmation</Text>
            </View>
          </View>

          <View>
            <TouchableOpacity style={[styles.buttonContainer, styles.confirmButton]} onPress={acceptBooking}>
              <Link href="/(tabs)/ScheduleScreen" style={styles.btnText}>
                Accept Booking
              </Link>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.buttonContainer, styles.cancelButton]} onPress={() => router.back()}>
              <Text style={styles.cancelText}>Decline Booking</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <>
                <Text style={styles.modalHeader}>Confirn Appointment!</Text>
                <Text style={styles.modalText}>
                  You are about to accept this booking. The client will be notified, and the appointment will be added to your schedule.
                </Text>
              </>

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.buttonContainer, styles.confirmButton]} onPress={confirmAppointment}>
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
  // ::::::::::::

  topBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 80,
    borderBottomWidth: 2,
    borderBottomColor: '#EBEBEB',
    paddingBottom: 20
  },

  iconCover: {
    backgroundColor: '#F4EDFF',
    padding: 5,
    borderRadius: 50,
    left: -5
  },

  titleCover: {
    // flexDirection: 'row'
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 50,
    textAlign: 'center'
    // marginBottom: 4
  },
  // ::::::::::
  //   container: {
  //     flex: 1,
  //     padding: 20,
  //     marginTop: 100,
  //     justifyContent: 'space-between'
  //     // justifyContent: 'center'
  //   },

  container: {
    marginTop: 30,
    padding: 20,
    // backgroundColor: '#FFFFFF',
    height: '100%'
    // position: 'static'
  },

  summaryContent: {
    flex: 1
  },

  blurBackground: {
    opacity: 0.5
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
    marginBottom: 50,
    maxWidth: '80%',
    marginHorizontal: 'auto'
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
    // flexDirection: 'row',
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
  }
})
export default Appointment
