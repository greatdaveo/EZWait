import { Ionicons } from '@expo/vector-icons'
import { Link, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { appTheme } from 'src/config/theme'

const BookingsSummary = () => {
  const [modalVisible, setModalVisible] = useState(true)
  const router = useRouter()

  const confirmAppointment = () => {
    setModalVisible(true)
  }

  return (
    <View style={styles.container}>
      <View style={[styles.summaryContent, modalVisible && styles.blurBackground]}>
        <View>
          <Text style={styles.header}>Review & Confirm Your Appointment</Text>
          <Text style={styles.subText}>
            Double-check your details before booking. If everything looks good, tap 'Confirm Appointment' to finalize your booking.
          </Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Appointment Details</Text>
          <Text style={styles.detail}>
            • Barber: <Text style={styles.bold}>Mike "The Fade Master"</Text>
          </Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailText}>• Date: 📅 Wednesday, February 7, 2025</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailText}>• Time: 🕒 2:00 PM - 3:00PM</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailText}>• Location: 📍 123 Main Street, City</Text>
          </View>

          <Text style={styles.detail}>
            • Contact: <Text style={styles.bold}>📞 +123 343 43234</Text>
          </Text>
        </View>

        <View>
          <TouchableOpacity style={[styles.buttonContainer, styles.confirmButton]} onPress={confirmAppointment}>
            <Link href="/(tabs)/ScheduleScreen" style={styles.btnText}>
              Confirm Appointment
            </Link>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.buttonContainer, styles.cancelButton]} onPress={() => router.back()}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <>
                <Image source={require('../../assets/images/bookings/SuccessfulBookings.png')} style={styles.checkmarkImage} />

                <Text style={styles.modalHeader}>Appointment Confirmed!</Text>
                <Text style={styles.modalText}>Your appointment with Mike "The Fade Master" has been successfully booked!</Text>
              </>

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.buttonContainer, styles.confirmButton]}>
                  <Text style={styles.btnText}>View Appointment</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.buttonContainer, styles.backHomeBtn]} onPress={() => setModalVisible(false)}>
                  <Text style={styles.cancelText}>Back Home</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 100,
    justifyContent: 'space-between'
    // justifyContent: 'center'
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
    // marginBottom: -50,
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

export default BookingsSummary
