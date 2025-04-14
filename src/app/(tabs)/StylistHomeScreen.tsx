import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { Button, Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import { appTheme } from 'src/config/theme'
import DropDownPicker from 'react-native-dropdown-picker'
import LinkButton from 'src/components/LinkButton'
import { Link, router } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { getAllBookingsSlice } from 'src/redux/bookings/bookingSlice'
import { TextInput } from 'react-native-paper'

const DashboardScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { stylistProfile }: any = useSelector((state: RootState) => state.profile)
  const { bookings, isLoading } = useSelector((state: RootState) => state.bookings)
  const [showSearch, setShowSearch] = useState(false)
  const [stylistName, setStylistName] = useState<{ [key: number]: string }>({})
  const [searchQuery, setSearchQuery] = useState('')

  const { user, isLoggedIn, isSuccess, isError } = useSelector((state: RootState) => state.auth)
  const [userName, setUserName] = useState<string>(user?.name)

  const searchItem = (query: string) => {
    setSearchQuery(query)
    console.log('Searching for: ', query)
  }

  const viewNotification = () => {
    router.push('/notification')
  }

  useEffect(() => {
    console.log(bookings)

    if (stylistProfile?.stylist?.id) {
      dispatch(getAllBookingsSlice())
    }
  }, [dispatch])

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topBarContainer}>
        <View style={styles.imgCover}>
          <Image source={require('../../assets/images/customers/CustomerImg.png')} style={styles.img} />

          <View style={styles.greetingsCover}>
            <Text style={styles.subtext}>Good Afternoon, 👋 </Text>
            <Text style={styles.nameText}>{userName}</Text>
          </View>
        </View>

        <View style={styles.iconCover}>
          <TouchableOpacity onPress={() => setShowSearch(!showSearch)}>
            <Ionicons name="search-outline" size={30} color={'#757575'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={viewNotification}>
            <Ionicons name="notifications-outline" size={30} color={'#757575'} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Current Customer in Queue Today</Text>

        <View style={styles.contentContainer}>
          <Text>• Total Booked Clients Today: 5</Text>
          <Text>• Available Slots Left: 2</Text>
        </View>

        <View style={styles.textContent}>
          <Text style={styles.title}>Adjust Customer Count</Text>

          <View style={styles.customerContainer}>
            <TouchableOpacity onPress={() => setShowSearch(!showSearch)} style={styles.icons}>
              <Ionicons name="remove-outline" size={30} color={appTheme.primary} />
            </TouchableOpacity>

            {/* <TextInput /> */}
            <Text style={styles.textInput}>2</Text>

            <TouchableOpacity onPress={() => setShowSearch(!showSearch)} style={styles.icons}>
              <Ionicons name="add-outline" size={30} color={appTheme.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.buttonContainer}>
          <Link href="/(tabs)/ScheduleScreen" style={styles.btnText}>
            Save Changes
          </Link>
        </TouchableOpacity>
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

  // ::::::::::::::::::::::::::::::::::
  topBarContainer: {
    marginTop: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 30
  },

  imgCover: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },

  img: {
    width: 50,
    height: 50,
    borderRadius: 50
  },

  greetingsCover: {
    gap: 5
  },

  iconCover: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },

  alarmIcon: {
    width: 30,
    height: 30
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

  // :::::::::::::::::::::::::::::::

  contentContainer: {
    padding: 10
  },

  textContent: {
    padding: 10
  },

  title: {
    marginBottom: 10,
    fontWeight: 'bold'
  },

  textInput: {
    borderWidth: 1,
    borderColor: '#959292',
    fontSize: 16,
    padding: 15,
    paddingHorizontal: 10,
    borderRadius: 30,
    minWidth: '60%',
    textAlign: 'center',
    fontWeight: 'bold'
    // marginBottom: 20
  },

  customerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30
  },

  icons: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 50
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
  }
  // :::::::::::::::::::::::
})

export default DashboardScreen
