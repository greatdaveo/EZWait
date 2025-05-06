import { Ionicons } from '@expo/vector-icons'
import { Link, useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RESET_PROFILE, getStylistProfileSlice } from 'src/redux/profile/profileSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { appTheme } from 'src/config/theme'

const StylistProfileScreen: React.FC = () => {
  const { id } = useLocalSearchParams() as { id: string }
  const navigation = useNavigation()
  const dispatch = useDispatch<AppDispatch>()
  const { stylistProfile, isLoading } = useSelector((state: RootState) => state.profile)
  const { user, isLoggedIn } = useSelector((state: RootState) => state.auth)
  const [showAll, setShowAll] = useState(false)
  const router = useRouter()

  console.log('stylistProfile: ', stylistProfile)

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

  const fixedDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const { data, user: stylistUser }: any = stylistProfile
  const { profile_picture, services, available_time_slots, sample_of_service_img, ratings, location } = data
  const displayedServices = showAll ? services : services.slice(0, 2)
  const displayedDays = showAll ? fixedDays : fixedDays.slice(0, 2)

  const handlePreviousStep = () => {
    router.back()
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handlePreviousStep} style={styles.iconCover}>
          <Ionicons name="chevron-back-outline" size={28} color={appTheme.primary} />
        </TouchableOpacity>

        <View style={styles.titleCover}>
          <Text style={styles.title}>Register</Text>
        </View>
      </View>

      <View style={styles.stylistProfileCover}>
        <View style={styles.profileImg}>
          <Image source={{ uri: profile_picture }} style={styles.stylistProfile} />

          <Text style={[styles.available, data.active_status ? styles.availableText : styles.unavailableText]}>
            {data.active_status ? 'Available Now' : 'Unavailable'}
          </Text>
        </View>
        <View style={styles.stylistProfileDetails}>
          <Text style={styles.stylistName}>{stylistUser.name}</Text>

          <View style={styles.ratingsIcons}>
            {[...Array(5)].map((_, i) => (
              <Ionicons key={i} name={i < ratings ? 'star' : 'star-outline'} color="#f0a437" size={18} />
            ))}
            <Text style={styles.ratingsText}>{ratings}</Text>
          </View>

          <View style={styles.locationCover}>
            <Ionicons name="location-sharp" color={'#F0433F'} size={18} />
            <Text style={styles.locationText}>{stylistUser.location}</Text>
          </View>
        </View>
      </View>

      <View style={styles.serviceCover}>
        <View style={styles.serviceTextCover}>
          <Text style={styles.serviceOffer}>Services Offered</Text>
          <Text style={styles.workSample}>Work Samples</Text>
        </View>

        <View style={styles.ImgCover}>
          {sample_of_service_img?.map((img: string, index: number) => (
            <View key={index} style={styles.sampleContainer}>
              <Image source={{ uri: img }} style={styles.workSampleImg} />
              <Text style={styles.styleName}>Haircut + Bread Trim</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.availableServicesCover}>
        <View style={styles.availableServices}>
          <Text style={styles.availableServicesText}>Available Services</Text>
          <TouchableOpacity style={styles.seeAll} onPress={() => setShowAll(!showAll)}>
            <Text style={styles.seeAllText}>{showAll ? 'Show Less' : 'See All'}</Text>
          </TouchableOpacity>
        </View>

        {displayedServices.map((service: { name: string; price: number }, i: number) => (
          <View style={styles.serviceDataCover} key={i}>
            <View style={styles.serviceDataCover2}>
              <Text style={styles.scissorsSvg}>✂️</Text>
              <Text style={styles.service}>{service.name}</Text>
            </View>

            <View style={styles.vectorContainer}>
              <Text style={styles.vector}>..............................</Text>
            </View>

            <Text style={styles.servicePrice}>${service.price}</Text>
          </View>
        ))}
      </View>

      <View style={styles.availableServicesCover}>
        <View style={styles.availableServices}>
          <Text style={styles.availableServicesText}>Available Time Slots</Text>
          <TouchableOpacity style={styles.seeAll} onPress={() => setShowAll(!showAll)}>
            <Text style={styles.seeAllText}>{showAll ? 'Show Less' : 'See All'}</Text>
          </TouchableOpacity>
        </View>

        {displayedDays.map((day, i) => {
          const time = available_time_slots[i] || 'No slots available'
          return (
            <View style={styles.serviceDataCover} key={i}>
              <View style={styles.serviceDataCover2}>
                <Text style={styles.service}>{day}</Text>
              </View>

              <Text style={styles.servicePrice}>{time}</Text>
            </View>
          )
        })}
      </View>

      <View style={styles.availableServicesCover}>
        <View style={styles.availableServices}>
          <Text style={styles.availableServicesText}>Customer Stats</Text>
        </View>

        <Text style={styles.service}>Current Customers in Queue: {data.no_of_current_customers}</Text>
        {/* <Text style={styles.service}>Total Bookings: {data.no_of_customer_bookings}</Text> */}
      </View>

      <TouchableOpacity style={styles.buttonContainer} onPress={() => router.push(`/screens/schedule/${id}`)}>
        <Text style={styles.btnText}>Book Appointment</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default StylistProfileScreen

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 20
    // backgroundColor: '#f7f7f7'
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#EBEBEB',
    paddingBottom: 30
  },

  iconCover: {
    backgroundColor: '#F4EDFF',
    padding: 5,
    borderRadius: 50
  },

  stylistProfileCover: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    gap: -200,
    padding: 20
  },

  stylistProfile: {
    width: 100,
    height: 115,
    borderRadius: '100%'
  },

  profileImg: {
    position: 'relative'
  },

  available: {
    // color: '#1CC95A',
    // backgroundColor: '#EBFCED',
    padding: 5,
    // paddingVertical: 8,
    position: 'absolute',
    bottom: 0,
    left: 15,
    borderRadius: 5,
    fontSize: 10,
    fontWeight: 'bold'
  },

  availableText: {
    color: '#1CC95A', // Green for available
    backgroundColor: '#EBFCED'
  },

  unavailableText: {
    color: '#D9534F', // Red for unavailable
    backgroundColor: '#FADBD8'
  },

  stylistProfileDetails: {
    gap: 15
  },

  stylistName: {
    fontSize: 16,
    fontWeight: 'bold'
  },

  ratingsIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2
  },

  ratingsText: {
    fontSize: 16,
    marginLeft: 3
  },

  locationCover: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 1
  },

  locationText: {
    fontSize: 14,
    color: '#757575'
  },

  // :::::::::::::::::::::::

  serviceCover: {
    padding: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#E3E3E3',
    paddingBottom: 50
  },

  serviceTextCover: {
    gap: 20
  },

  serviceOffer: {
    fontSize: 16,
    fontWeight: 'bold'
  },

  workSample: {
    color: '#757575',
    fontSize: 14
  },

  ImgCover: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 35
  },

  sampleContainer: {
    gap: 18
  },

  workSampleImg: {
    width: 150,
    height: 159,
    borderRadius: 12
  },

  styleName: {
    color: '#383838',
    fontSize: 14
  },

  availableServicesCover: {
    padding: 10
  },

  availableServices: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingTop: 50
  },

  availableServicesText: {
    fontSize: 18,
    fontWeight: 'bold'
  },

  seeAll: {
    backgroundColor: appTheme.semi,
    padding: 10,
    borderRadius: 10
  },

  seeAllText: {
    color: appTheme.primary
  },

  serviceDataCover: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10
  },

  serviceDataCover2: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1
  },

  scissorsSvg: {
    fontSize: 18,
    marginRight: 8
  },

  service: {
    fontSize: 16,
    fontWeight: '500'
  },

  vectorContainer: {
    flex: 1,
    alignItems: 'center'
  },

  vector: {
    fontSize: 14,
    color: '#999',
    alignContent: 'center'
  },

  servicePrice: {
    fontSize: 16
  },

  // :::::::::::::::::::::::::

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
  },
  // :::::::::::::::::::::::

  // :::::::::::::::::::::::::
  titleCover: {
    flexDirection: 'row'
    // justifyContent: 'center',
    // alignItems: 'center'
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: '36%'
    // marginBottom: 4
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
