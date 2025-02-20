import { Ionicons } from '@expo/vector-icons'
import { Link, useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RESET_PROFILE, getStylistProfileSlice } from 'src/redux/profile/profileSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import StylistProfile from '../../../assets/images/stylists/StylistProfile.png'
import { appTheme } from 'src/config/theme'
import ServiceSvg from 'src/components/svg/ServiceSvg'
// import ServiceSvg from '../../../assets/svg/✂️.svg'

const availableServiceData = [
  {
    service: 'Classic Cut',
    price: '$25'
  },

  {
    service: 'Skin Fade',
    price: '$30'
  },

  {
    service: 'Bread Trim',
    price: '$15'
  },

  {
    service: 'Hot Towel Shave',
    price: '$20'
  }
]

const availableTimeData = [
  {
    day: 'Monday',
    time: '9am - 10pm'
  },
  {
    day: 'Tuesdays',
    time: '9am - 10pm'
  },
  {
    day: 'Wednesdays',
    time: '9am - 10pm'
  }
]

const StylistProfileScreen: React.FC = () => {
  const { id } = useLocalSearchParams() as { id: string }
  const navigation = useNavigation()
  const dispatch = useDispatch<AppDispatch>()
  const { stylistProfile, isLoading } = useSelector((state: RootState) => state.profile)
  const { user, isLoggedIn, isSuccess, isError } = useSelector((state: RootState) => state.auth)
  const [currentStep, setCurrentStep] = useState<number>(1)

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
          <Image source={require('../../../assets/images/stylists/StylistProfile.png')} style={styles.stylistProfile} />
          <Text style={styles.available}>Available Now</Text>
        </View>
        <View style={styles.stylistProfileDetails}>
          <Text style={styles.stylistName}>Mike "The Fade Master"</Text>

          <View style={styles.ratingsIcons}>
            <Ionicons name="star" color="#f0a437" size={18} />
            <Ionicons name="star" color="#f0a437" size={18} />
            <Ionicons name="star" color="#f0a437" size={18} />
            <Ionicons name="star" color="#f0a437" size={18} />
            <Ionicons name="star-outline" color="black" size={18} />
            <Text style={styles.ratingsText}>4.5</Text>
          </View>

          <View style={styles.locationCover}>
            <Ionicons name="location-sharp" color={'#F0433F'} size={18} />
            <Text style={styles.locationText}>Downtown Barbershop</Text>
          </View>
        </View>
      </View>

      <View style={styles.serviceCover}>
        <View style={styles.serviceTextCover}>
          <Text style={styles.serviceOffer}>Services Offered</Text>
          <Text style={styles.workSample}>Work Samples</Text>
        </View>

        <View style={styles.ImgCover}>
          <View style={styles.sampleContainer}>
            <Image source={require('../../../assets/images/stylists/StylistWork1.png')} style={styles.workSampleImg} />
            <Text style={styles.styleName}>Haircut + Bread Trim</Text>
          </View>

          <View style={styles.sampleContainer}>
            <Image source={require('../../../assets/images/stylists/StylistWork2.png')} style={styles.workSampleImg} />
            <Text style={styles.styleName}>Classic Cut</Text>
          </View>
        </View>
      </View>

      <View style={styles.availableServicesCover}>
        <View style={styles.availableServices}>
          <Text style={styles.availableServicesText}>Available Services</Text>
          <TouchableOpacity style={styles.seeAll}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        {availableServiceData.map((data, i) => (
          <View style={styles.serviceDataCover} key={i}>
            <View style={styles.serviceDataCover2}>
              <Text style={styles.scissorsSvg}>✂️</Text>
              <Text style={styles.service}>{data.service}</Text>
            </View>

            <View style={styles.vectorContainer}>
              <Text style={styles.vector}>....................................</Text>
            </View>

            <Text style={styles.servicePrice}>{data.price}</Text>
          </View>
        ))}
      </View>

      <View style={styles.availableServicesCover}>
        <View style={styles.availableServices}>
          <Text style={styles.availableServicesText}>Available Time Slots</Text>
          <TouchableOpacity style={styles.seeAll}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        {availableTimeData.map((data, i) => (
          <View style={styles.serviceDataCover} key={i}>
            <View style={styles.serviceDataCover2}>
              <Text style={styles.service}>{data.day}</Text>
            </View>

            <Text style={styles.servicePrice}>{data.time}</Text>
          </View>
        ))}
      </View>

      <View style={styles.availableServicesCover}>
        <View style={styles.availableServices}>
          <Text style={styles.availableServicesText}>Customer Stats</Text>
        </View>

        <Text style={styles.service}>Current Customers in Queue: 3</Text>
      </View>

      <TouchableOpacity style={styles.buttonContainer}>
        <Link href="/(tabs)/ScheduleScreen" style={styles.btnText}>
          Book Appointment
        </Link>
      </TouchableOpacity>
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

  stylistProfile: {
    width: 100,
    height: 115,
    borderRadius: '100%'
  },

  stylistProfileCover: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    gap: -200,
    padding: 20
  },

  profileImg: {
    position: 'relative'
  },

  available: {
    color: '#1CC95A',
    backgroundColor: '#EBFCED',
    padding: 5,
    position: 'absolute',
    bottom: 1,
    left: 12,
    borderRadius: 5,
    fontSize: 10
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
