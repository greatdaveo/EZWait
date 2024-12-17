import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { appTheme } from 'src/config/theme'

const UserHomeScreen = () => {
  const data = [
    {
      name: 'Daniel Mayowa',
      time: '4:30pm - 5:00pm',
      service: 'Beard trimming',
      ratings: '5-star rating',
      img: require('../../assets/images/Frame1.png')
    },

    {
      name: 'Angel erl',
      time: '5:10pm - 5:40pm',
      service: 'Braids',
      img: require('../../assets/images/Frame2.png')
    },

    {
      name: 'Benson Wonuola',
      time: '6:00pm - 6:40pm',
      service: 'Low cut and dye',
      img: require('../../assets/images/Frame3.png')
    },

    {
      name: 'Benson Wonuola',
      time: '6:00pm - 6:40pm',
      service: 'Low cut and dye',
      img: require('../../assets/images/Frame3.png')
    },

    {
      name: 'Daniel Mayowa',
      time: '4:30pm - 5:00pm',
      service: 'Beard trimming',
      img: require('../../assets/images/Frame1.png')
    },

    {
      name: 'Benson Wonuola',
      time: '6:00pm - 6:40pm',
      service: 'Low cut and dye',
      img: require('../../assets/images/Frame3.png')
    }
  ]
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.headerCover}>
          <View style={styles.imgCover}>
            <Image source={{ uri: 'https://i.ibb.co/Ch0KY50/default-avatar-photo-placeholder-profile-icon-vector.jpg' }} style={styles.img} />

            <View>
              <Text style={styles.nameText}>Hi, David 👍</Text>
              <Text style={styles.subtext}>Good morning</Text>
            </View>
          </View>

          <View style={styles.alarmCover}>
            <View style={styles.alarm}>
              <Ionicons name="notifications-sharp" color={appTheme.themeBlack} size={28} />
            </View>

            <View style={styles.alarmTextCover}>
              <Text style={styles.alarmText}>2</Text>
            </View>
          </View>
        </View>

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
            <Text style={styles.servicesHeaderText}>Service</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllServicesText}>See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.servicesCover}>
              <View style={styles.stylistCover}>
                <Image source={require('../../assets/images/stylists/Barbing.jpeg')} style={styles.stylistImg} />
                <Text style={styles.stylistServiceText}>Hair cuts</Text>
              </View>

              <View style={styles.stylistCover}>
                <Image source={require('../../assets/images/stylists/MakeUp.jpeg')} style={styles.stylistImg} />
                <Text style={styles.stylistServiceText}>Make up</Text>
              </View>

              <View style={styles.stylistCover}>
                <Image source={require('../../assets/images/stylists/Shaving.jpeg')} style={styles.stylistImg} />
                <Text style={styles.stylistServiceText}>Shaving</Text>
              </View>

              <View style={styles.stylistCover}>
                <Image source={require('../../assets/images/stylists/Braiding.jpeg')} style={styles.stylistImg} />
                <Text style={styles.stylistServiceText}>Braiding</Text>
              </View>

              <View style={styles.stylistCover}>
                <Image source={require('../../assets/images/stylists/Haircuts.jpeg')} style={styles.stylistImg} />
                <Text style={styles.stylistServiceText}>Nails</Text>
              </View>
            </View>
          </ScrollView>
        </View>

        <View style={styles.appointmentsCover}>
          <View style={styles.servicesHeader}>
            <Text style={styles.servicesHeaderText}>Top rated stylist</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllServicesText}>See All</Text>
            </TouchableOpacity>
          </View>

          {data.map((appointment, i) => (
            <View style={styles.eachAppointmentCover} key={i}>
              <View style={styles.eachAppointment}>
                <Image source={appointment.img} style={styles.customerImg} />

                <View style={styles.detailsCover}>
                  <Text style={styles.nameText}>{appointment.name}</Text>
                  {/* 
                  <View style={styles.appointmentDetailsCover}>
                    <Ionicons name="time-outline" color={appTheme.themeBlack} size={24} />
                    <Text style={styles.appointmentText}>{appointment.time}</Text>
                  </View> */}

                  <View style={styles.appointmentDetailsCover}>
                    <Ionicons name="cut-outline" color={appTheme.themeBlack} size={24} />
                    <Text style={styles.appointmentText}>{appointment.service}</Text>
                  </View>

                  <View style={styles.ratingsIcons}>
                    <Ionicons name="star-outline" color="#f0a437" size={20} />
                    <Ionicons name="star-outline" color="#f0a437" size={20} />
                    <Ionicons name="star-outline" color="#f0a437" size={20} />
                    <Ionicons name="star-outline" color="#f0a437" size={20} />
                    <Ionicons name="star-outline" color="#f0a437" size={20} />
                  </View>

                  <View style={styles.appointmentDetailsCover}>
                    <Text style={styles.appointmentText}>{appointment.ratings}</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.btnCover}>
                <Text style={styles.btnText}>See Profile</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    padding: 5
  },

  headerCover: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },

  imgCover: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
    // marginHorizontal: 10,
    // paddingHorizontal: 10
  },

  img: {
    width: 60,
    height: 60,
    borderRadius: 50
  },

  alarmCover: {
    // position: 'absolute'
  },

  alarm: {
    backgroundColor: appTheme.themeGray,
    padding: 10,
    borderRadius: 50,
    position: 'relative'
  },

  alarmTextCover: {
    position: 'absolute',
    right: -12,
    top: -10,
    backgroundColor: '#F52933',
    borderRadius: 100,
    padding: 5,
    paddingHorizontal: 10
  },

  alarmText: {
    color: 'white',
    fontWeight: 700,
    fontSize: 16,
    zIndex: 99
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

  seeAllServicesText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: appTheme.primary
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
    width: 80,
    height: 80,
    borderRadius: 50
  },

  stylistServiceText: {
    fontSize: 16,
    fontWeight: 'bold'
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

  eachAppointmentCover: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  eachAppointment: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  customerImg: {
    borderRadius: 10,
    height: 100,
    width: 100
  },

  detailsCover: {
    marginLeft: 10
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
    gap: 2
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
    // color: 'white',
    fontWeight: 'bold'
    // fontSize: 15
  }
})

export default UserHomeScreen
