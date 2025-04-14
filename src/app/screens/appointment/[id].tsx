import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams, useNavigation, Link, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { ActivityIndicator, Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBookingsSlice } from 'src/redux/bookings/bookingSlice'
import { AppDispatch, RootState } from 'src/redux/store'

const Appointment: React.FC = () => {
  const { id } = useLocalSearchParams() as { id: string }
  const navigation = useNavigation()
  const dispatch = useDispatch<AppDispatch>()
  const { booking, isLoading } = useSelector((state: RootState) => state.bookings)
  const [showAll, setShowAll] = useState(false)
  const router = useRouter()

  console.log('Customer Booking: ', booking)

  useEffect(() => {
    dispatch(getAllBookingsSlice())
  }, [])

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#9747FF" />
        <Text>Loading Stylist Profile...</Text>
      </View>
    )
  }

  if (!booking) {
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

  return (
    <ScrollView>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handlePreviousStep} style={styles.iconCover}>
          <Ionicons name="chevron-back-outline" size={28} color={appTheme.primary} />
        </TouchableOpacity>

        <View style={styles.titleCover}>
          <Text style={styles.title}>Upcoming Appointment</Text>
        </View>
      </View>

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
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({})

export default Appointment
