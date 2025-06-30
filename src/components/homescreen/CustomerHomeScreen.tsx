import { Ionicons } from '@expo/vector-icons'
import { useNavigation, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { appTheme } from 'src/config/theme'
import { getAllStylistProfileSlice } from 'src/redux/profile/profileSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { UserTopContent } from '../utils/UserTopContent'

const sampleData = [
  {
    img: require('../../assets/images/stylists/image (4).png'),
    caption: 'Fade'
  },
  {
    img: require('../../assets/images/stylists/image (5).png'),
    caption: 'Beard trim'
  },
  {
    img: require('../../assets/images/stylists/image (6).png'),
    caption: 'Kids Cut'
  },
  {
    img: require('../../assets/images/stylists/image (7).png'),
    caption: 'Package Deals'
  },
  {
    img: require('../../assets/images/stylists/image (8).png'),
    caption: 'Buzz Cut'
  }
]

const CustomerHomeScreen = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth)
  const { allStylists } = useSelector((state: RootState) => state.profile)
  // console.log('Stylists Data: ', allStylists?.data)
  const [showSearch, setShowSearch] = useState(false)

  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  useEffect(() => {
    if (isLoggedIn) {
      // dispatch(getAllBookingsSlice())
      dispatch(getAllStylistProfileSlice())
    }
  }, [isLoggedIn, dispatch])

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <UserTopContent showSearch={showSearch} setShowSearch={setShowSearch} />

      <View style={showSearch ? { backgroundColor: '#e0e0e0' } : styles.screenContainer}>
        <View style={styles.headerImg}>
          <View style={styles.headerImgCover}>
            <Text style={styles.headerImgText}>Easily book your next appointments with your stylist</Text>

            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>

          <Image source={require('../../assets/images/HomeImg.png')} style={styles.headerImgRight} resizeMode="cover" />
        </View>

        <View style={styles.servicesContainer}>
          <View style={styles.servicesHeader}>
            <Text style={styles.servicesHeaderText}>Categories</Text>
            <TouchableOpacity style={styles.seeAll}>
              <Text style={styles.seeAllServicesText}>See all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {sampleData.map((sample, i) => (
              <View style={styles.servicesCover} key={i}>
                <View style={styles.stylistCover}>
                  <Image source={sample.img} style={styles.stylistImg} />
                  <Text style={styles.stylistServiceText}>{sample.caption}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.appointmentsCover}>
          <View style={styles.servicesHeader}>
            <Text style={styles.servicesHeaderText}>Available Barbers</Text>

            <TouchableOpacity style={styles.seeAll}>
              <Text style={styles.seeAllServicesText}>See all</Text>
            </TouchableOpacity>
          </View>

          {(allStylists?.data || []).map((stylist: any, i: number) => {
            console.log(stylist.profile_picture)
            return (
              <View style={styles.stylistCardContainer} key={i}>
                <View style={styles.stylistCard}>
                  <Image
                    source={{
                      uri: !stylist?.profile_picture
                        ? 'https://i.ibb.co/Ch0KY50/default-avatar-photo-placeholder-profile-icon-vector.jpg'
                        : stylist.profile_picture
                    }}
                    style={styles.stylistImg}
                  />

                  <View style={styles.detailsCover}>
                    <Text style={styles.nameText}>{stylist.name}</Text>

                    <View style={styles.ratingsIcons}>
                      {[...Array(5)].map((_, i) => (
                        <Ionicons
                          key={i}
                          name={i < stylist.ratings ? 'star' : 'star-outline'}
                          color={i < stylist.ratings ? '#f0a437' : 'black'}
                          size={18}
                        />
                      ))}
                      <Text style={styles.ratingsText}>{stylist.ratings}</Text>
                    </View>

                    <View style={styles.appointmentDetailsCover}>
                      <Ionicons name="location-sharp" color={'#F0433F'} size={24} />
                      <Text style={styles.appointmentText}>{stylist.location}</Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity style={styles.btnCover} onPress={() => router.push(`screens/profile/${stylist.stylist_id}`)}>
                  <Text style={styles.btnText}>Book Now</Text>
                </TouchableOpacity>
              </View>
            )
          })}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 5
  },

  nameText: {
    fontWeight: '600',
    fontSize: 20,
    color: appTheme.themeBlack
  },

  subtext: {
    fontWeight: '500',
    fontSize: 20,
    color: appTheme.themeGray
  },

  headerImg: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 30,
    // padding: 10
    marginHorizontal: 20,
    backgroundColor: appTheme.primary,
    borderRadius: 20
  },

  headerImgCover: {
    width: '70%',
    textAlign: 'center',
    paddingLeft: 60
    // marginLeft: 60
  },

  headerImgText: {
    color: appTheme.secondary,
    fontSize: 24,
    fontWeight: 600,
    justifyContent: 'center',
    textAlign: 'center',
    width: '115%',
    marginHorizontal: 'auto',
    marginLeft: 20
  },

  viewAllButton: {
    marginTop: 15,
    backgroundColor: appTheme.secondary,
    paddingVertical: 10,
    // paddingHorizontal: 20,
    borderRadius: 18,
    alignContent: 'center',
    marginLeft: 80
  },

  viewAllText: {
    color: appTheme.primary,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18
  },

  headerImgRight: {
    width: 170,
    height: 180,
    // paddingVertical: 50,
    marginRight: 70,
    borderRadius: 30
  },

  //   :::::::::::::::::::

  servicesContainer: {
    padding: 20
  },

  servicesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },

  servicesHeaderText: {
    fontSize: 18,
    fontWeight: 'bold'
  },

  seeAll: {
    backgroundColor: appTheme.semi,
    padding: 10,
    borderRadius: 10
  },

  seeAllServicesText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: appTheme.primary
    // backgroundColor: appTheme.semi
  },

  servicesCover: {
    flexDirection: 'row',
    gap: 10
  },

  stylistCover: {
    alignItems: 'center',
    gap: 5,
    marginBottom: 5
  },

  stylistImg: {
    borderRadius: 50,
    height: 100,
    width: 100
  },

  stylistServiceText: {
    fontSize: 16,
    fontWeight: 'medium'
    // textAlign: 'center'
  },

  //   ::::::::::::::::::::::::::::
  appointmentsCover: {
    padding: 20
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: appTheme.themeBlack,
    marginBottom: 10
  },

  stylistCardContainer: {
    marginTop: 10,
    marginBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  stylistCard: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  detailsCover: {
    marginLeft: 10,
    gap: 10
  },

  appointmentDetailsCover: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 1
  },

  appointmentText: {
    fontSize: 16
  },

  ratingsIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: '',
    gap: 2
  },

  ratingsText: {
    fontSize: 16,
    marginLeft: 3
  },

  btnCover: {
    // backgroundColor: appTheme.primary,
    borderWidth: 2,
    borderColor: appTheme.primary,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20
  },

  btnText: {
    color: appTheme.primary,
    fontWeight: 'bold'
    // fontSize: 15
  }
})

export default CustomerHomeScreen
