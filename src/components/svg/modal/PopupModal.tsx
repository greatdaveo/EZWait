import React from 'react'
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const PopupModal = () => {
  return (
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
  )
}

const styles = StyleSheet.create({
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

export default PopupModal
