import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { appTheme } from 'src/config/theme'
import DropDownPicker from 'react-native-dropdown-picker'
import LinkButton from 'src/components/LinkButton'
import { router } from 'expo-router'

const DashboardScreen = () => {
  const [profileType, setProfileType] = useState('Barber')
  const [sortOption, setSortOption] = useState('all')

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(null)
  const [items, setItems] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
    { label: 'Grape', value: 'grape' }
  ])

  const onPress = () => {
    router.push('/(tabs)/HistoryScreen')
  }
  return (
    <View style={styles.container}>
      <View style={styles.imgCover}>
        <Image source={{ uri: 'https://i.ibb.co/Ch0KY50/default-avatar-photo-placeholder-profile-icon-vector.jpg' }} style={styles.img} />
        <Text style={styles.subtext}>David Olowo</Text>
      </View>

      <View style={styles.headerLine}>
        <View style={styles.headerText}>
          <TouchableOpacity onPress={() => setProfileType('Barber')}>
            <Text style={styles.subtext}>Barber</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setProfileType('Clients')}>
            <Text style={styles.subtext}>Clients</Text>
          </TouchableOpacity>
        </View>
      </View>

      {profileType === 'Barber' && (
        <>
          <View style={styles.iconCover}>
            <View style={styles.iconTextCover}>
              <Ionicons name="time-outline" color={appTheme.primary} size={24} />
              <Text style={styles.iconText}>8 AM - 9 AM</Text>
            </View>

            <Ionicons name="pencil-outline" color={appTheme.primary} size={24} />
          </View>

          <View style={styles.iconCover}>
            <View style={styles.iconTextCover}>
              <Ionicons name="calendar-number-outline" color={appTheme.primary} size={24} />
              <Text style={styles.iconText}>Monday - Sunday</Text>
            </View>

            <Ionicons name="pencil-outline" color={appTheme.primary} size={24} />
          </View>

          <View style={styles.iconCover}>
            <View style={styles.iconTextCover}>
              <Ionicons name="cut-outline" color={appTheme.primary} size={24} />
              <Text style={styles.iconText}>Haircut, Hair wash, Beard trim</Text>
            </View>

            <Ionicons name="pencil-outline" color={appTheme.primary} size={24} />
          </View>

          <View>
            <LinkButton href="/(tabs)/HistoryScreen" text="View Bookings" onPress={onPress} />
          </View>
        </>
      )}

      {profileType === 'Clients' && (
        <>
          <View style={styles.dropDownCover}>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="Sort by"
              style={styles.dropdown}
            />
          </View>

          <View style={styles.iconCover}>
            <View style={styles.iconTextCover}>
              <Image source={{ uri: 'https://i.ibb.co/Ch0KY50/default-avatar-photo-placeholder-profile-icon-vector.jpg' }} style={styles.clientImg} />
              <Text style={styles.iconText}>John Doe (New)</Text>
            </View>

            <Ionicons name="ellipsis-vertical-outline" color={appTheme.primary} size={24} />
          </View>

          <View style={styles.iconCover}>
            <View style={styles.iconTextCover}>
              <Image source={{ uri: 'https://i.ibb.co/Ch0KY50/default-avatar-photo-placeholder-profile-icon-vector.jpg' }} style={styles.clientImg} />
              <Text style={styles.iconText}>John Doe (New)</Text>
            </View>

            <Ionicons name="ellipsis-vertical-outline" color={appTheme.primary} size={24} />
          </View>

          <View style={styles.iconCover}>
            <View style={styles.iconTextCover}>
              <Image source={{ uri: 'https://i.ibb.co/Ch0KY50/default-avatar-photo-placeholder-profile-icon-vector.jpg' }} style={styles.clientImg} />
              <Text style={styles.iconText}>John Doe (New)</Text>
            </View>

            <Ionicons name="ellipsis-vertical-outline" color={appTheme.primary} size={24} />
          </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40
  },

  imgCover: {
    alignItems: 'center',
    gap: 10
  },

  img: {
    width: 70,
    height: 70,
    borderRadius: 50
  },

  subtext: {
    fontWeight: '500',
    fontSize: 18
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
    // borderBottomWidth: 2,
    // borderBottomColor: appTheme.primary
  },

  dropDownCover: {
    padding: 10,
    zIndex: 99,
    margin: 10
  },

  dropdown: {
    borderWidth: 1,
    borderColor: appTheme.secondary,
    width: '30%',
    marginLeft: 250
  },

  iconCover: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
    marginTop: 10,
    padding: 25,
    borderWidth: 1,
    borderColor: appTheme.primary,
    borderRadius: 10
  },

  iconTextCover: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },

  iconText: {
    fontWeight: 'bold'
  },

  // For client
  clientImg: {
    width: 50,
    height: 50,
    borderRadius: 50
  },

  picker: {
    // height: 50,
    // marginBottom: 16
  }
})

export default DashboardScreen
