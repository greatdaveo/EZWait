import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RESET_PROFILE, getStylistProfileSlice } from 'src/redux/profile/profileSlice'
import { AppDispatch, RootState } from 'src/redux/store'

const StylistProfileScreen: React.FC = () => {
  const { id } = useLocalSearchParams() as { id: string }
  const navigation = useNavigation()
  const dispatch = useDispatch<AppDispatch>()
  const { stylistProfile, isLoading } = useSelector((state: RootState) => state.profile)
  const { user, isLoggedIn, isSuccess, isError } = useSelector((state: RootState) => state.auth)

  const router = useRouter()

  // console.log('stylistProfile: ', stylistProfile)

  useEffect(() => {
    dispatch(getStylistProfileSlice(id))

    return () => {
      dispatch(RESET_PROFILE())
    }
  }, [dispatch, id])

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#9747FF" />
        <Text>Loading Stylist Profile...</Text>
      </View>
    )
  }

  if (!stylistProfile) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No profile data available</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    )
  }

  const { data }: any = stylistProfile
  // console.log('Stylist user id: ', data?.user?.id)
  // console.log('Stylist user id: ', data?.stylist?.stylist_id)
  // console.log('Customer user id: ', user?.id)

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Stylist Profile</Text>

      {/* Personal Details Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Personal Details</Text>
        <Text style={styles.detail}>Name: {data?.user?.name}</Text>
        <Text style={styles.detail}>Email: {data?.user?.email}</Text>
        <Text style={styles.detail}>Phone: {data?.user?.number}</Text>
        <Text style={styles.detail}>Location: {data?.user?.location}</Text>
        <Text style={styles.detail}>Joined: {new Date(data?.user?.created_at).toLocaleDateString()}</Text>
      </View>

      {/* Stylist Details Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Stylist Details</Text>
        <Text style={styles.detail}>Services: {data?.stylist?.services}</Text>
        <Text style={styles.detail}>Availability: {data?.stylist?.availability}</Text>
        <Text style={styles.detail}>Ratings: {data?.stylist?.ratings}</Text>
      </View>

      {/* Statistics Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Statistics</Text>
        <Text style={styles.detail}>Total Bookings: {data?.stylist?.no_of_customer_bookings}</Text>
        <Text style={styles.detail}>Current Customers: {data?.stylist?.no_of_current_customers}</Text>
      </View>

      <Button title="Go Back" onPress={() => navigation.goBack()} />
      <Button
        title="Make Booking"
        onPress={() =>
          router.push({
            pathname: '(tabs)/ScheduleScreen',
            params: { stylist_id: data?.stylist?.stylist_id }
          })
        }
      />
    </ScrollView>
  )
}

export default StylistProfileScreen

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    padding: 20,
    backgroundColor: '#f7f7f7'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9747FF',
    marginBottom: 10
  },
  detail: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5
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
})
