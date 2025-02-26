import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { appTheme } from 'src/config/theme'

const BookingsSummary = () => {
  const confirmAppointment = () => {}
  return (
    <View>
      <Text>Review & Confirm Your Appointment</Text>

      <Text>Double-check your details before booking. If everything looks good, tap 'Confirm Appointment' to finalize your booking.</Text>

      <View>
        <Text>Appointment Details</Text>
        <Text>• Barber: Mike "The Fade Master"</Text>
        <Text>
          • <Ionicons name={'calendar-outline'} color={appTheme.primary} size={24} /> Wednesday, February 7, 2025
        </Text>

        <Text>• 🕒 Wednesday, February 7, 2025</Text>
        <Text>
          • <Ionicons name={'location-outline'} color={appTheme.primary} size={24} /> Wednesday, February 7, 2025
        </Text>
        <Text>• Contact: +123 343 43234</Text>

        <TouchableOpacity style={styles.buttonContainer}>
          <Link href="/(tabs)/ScheduleScreen" style={styles.btnText}>
            Confirm Appointment
          </Link>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer}>
          <Link href="/(tabs)/ScheduleScreen" style={styles.btnText}>
            Cancel
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appTheme.primary,
    width: '100%',
    margin: 'auto',
    padding: 25,
    marginTop: 30,
    marginBottom: 100,
    borderRadius: 20,
    gap: 10
  },

  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
    // marginRight: 5
  }
})

export default BookingsSummary
