import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { Button, Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import { appTheme } from 'src/config/theme'
import DropDownPicker from 'react-native-dropdown-picker'
import LinkButton from 'src/components/LinkButton'
import { router } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { getAllBookingsSlice } from 'src/redux/bookings/bookingSlice'

const DashboardScreen: React.FC = () => {
  const data = [
    {
      name: 'Daniel Mayowa',
      date: '20/11/24',
      time: '4:30pm - 5:00pm',
      service: 'Beard trimming',
      img: require('../../assets/images/Frame1.png')
    },

    {
      name: 'Angel erl',
      date: '20/11/24',
      time: '5:10pm - 5:40pm',
      service: 'Braids',
      img: require('../../assets/images/Frame2.png')
    },

    {
      name: 'Benson Wonuola',
      date: '20/11/24',
      time: '6:00pm - 6:40pm',
      service: 'Low cut and dye',
      img: require('../../assets/images/Frame3.png')
    },

    {
      name: 'Benson Wonuola',
      date: '20/11/24',
      time: '6:00pm - 6:40pm',
      service: 'Low cut and dye',
      img: require('../../assets/images/Frame3.png')
    },

    {
      name: 'Daniel Mayowa',
      date: '20/11/24',
      time: '4:30pm - 5:00pm',
      service: 'Beard trimming',
      img: require('../../assets/images/Frame1.png')
    },

    {
      name: 'Benson Wonuola',
      date: '20/11/24',
      time: '6:00pm - 6:40pm',
      service: 'Low cut and dye',
      img: require('../../assets/images/Frame3.png')
    }
  ]

  const dispatch = useDispatch<AppDispatch>()
  const { stylistProfile }: any = useSelector((state: RootState) => state.profile)
  const { bookings, isLoading } = useSelector((state: RootState) => state.bookings)

  const [stylistName, setStylistName] = useState<{ [key: number]: string }>({})

  useEffect(() => {
    console.log(bookings)

    if (stylistProfile?.stylist?.id) {
      dispatch(getAllBookingsSlice())
    }
  }, [dispatch])

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text>Stylist Home Screen</Text>
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

  headerLine: {
    borderBottomWidth: 1,
    borderBottomColor: appTheme.themeGray
  },

  headerText: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    padding: 20,
    textAlign: 'center',
    gap: 150
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

  // ::::::::::::::::::::::

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

  btnCover: {
    gap: 10
  },

  acceptBtn: {
    backgroundColor: appTheme.primary,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10
  },
  declineBtn: {
    backgroundColor: '#f52933',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10
  },

  btnText: {
    color: 'white',
    fontWeight: 'bold'
  }
})

export default DashboardScreen
