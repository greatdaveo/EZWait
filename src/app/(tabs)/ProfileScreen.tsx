import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Button } from 'react-native'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { appTheme } from 'src/config/theme'
import { Switch } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { logoutUserSlice } from 'src/redux/auth/authSlice'
import { useRouter } from 'expo-router'

export default function ProfileScreen() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isReminderOn, setIsReminderOn] = useState(false)
  const { isLoading, isLoggedIn } = useSelector((state: RootState) => state.auth)

  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1)
    }
  }

  const handleNavigate = (page: any) => {
    console.log(`Navigating to ${page}`)
  }

  const handleLogout = () => {
    // console.log('Logout')

    if (isLoggedIn) {
      dispatch(logoutUserSlice())
    }

    router.push('/(onboarding)/ThirdScreen')
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handlePreviousStep}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settings}>
          <Ionicons name="settings-outline" color={appTheme.themeBlack} size={28} />
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          <Image source={{ uri: 'https://i.ibb.co/Ch0KY50/default-avatar-photo-placeholder-profile-icon-vector.jpg' }} style={styles.img} />
          <TouchableOpacity style={styles.cameraIcon}>
            <Ionicons name="camera-outline" color={appTheme.themeBlack} size={28} />
          </TouchableOpacity>
        </View>

        <Text style={styles.profileName}>David Olowomeye</Text>
        <Text style={styles.profileEmail}>davidolowo2@gmail.com</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account settings</Text>

        <View>
          <TouchableOpacity style={styles.sectionItem} onPress={() => handleNavigate('EditProfile')}>
            <Text style={styles.itemText}>Edit Profile</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.sectionItem} onPress={() => handleNavigate('Security')}>
            <Text style={styles.itemText}>Security</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.sectionItem} onPress={() => handleNavigate('EmailNotification')}>
            <Text style={styles.itemText}>Email Notification</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.sectionItem} onPress={() => setIsReminderOn((prevState) => !prevState)}>
            <Text style={styles.itemText}>Turn on Reminder</Text>

            <Switch
              value={isReminderOn}
              onValueChange={() => setIsReminderOn((prevState) => !prevState)}
              thumbColor={isReminderOn ? appTheme.primary : '#f4f3f4'}
              trackColor={{ true: appTheme.semi, false: '#ddd' }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Help and Support</Text>

        <View>
          <TouchableOpacity style={styles.sectionItem} onPress={() => handleNavigate('EditProfile')}>
            <Text style={styles.itemText}>Set Time Availability</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.sectionItem} onPress={() => handleNavigate('Security')}>
            <Text style={styles.itemText}>Share the EZWait App</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.sectionItem} onPress={() => handleNavigate('EmailNotification')}>
            <Text style={styles.itemText}>Language Preferences</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.sectionItem} onPress={() => handleNavigate('TurnOnReminder')}>
            <Text style={styles.itemText}>View Booking History</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButtonCover} onPress={handleLogout}>
        <Text style={styles.logoutButton}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: appTheme.primary,
    // borderBottomWidth: 2,
    paddingTop: 60
    // marginHorizontal: 20
  },

  settings: {
    padding: 7,
    borderRadius: 50,
    position: 'relative'
  },

  // :::::::::::::::::

  profileSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30
  },

  profileImageContainer: {
    position: 'relative'
  },

  img: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10
  },

  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: appTheme.secondary,
    borderRadius: 15,
    padding: 3,
    elevation: 2
  },

  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: appTheme.themeBlack,
    marginBottom: 5
  },

  profileEmail: {
    fontSize: 16,
    color: appTheme.themeGray,
    fontWeight: 500
  },

  // ::::::::::::::::::::::::::

  section: {
    marginBottom: 20
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: appTheme.themeBlack,
    marginBottom: 10
  },

  sectionItems: {
    borderRadius: 10,
    padding: 10,
    elevation: 2
  },

  sectionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
    // paddingVertical: 15
  },

  itemText: {
    fontSize: 16
  },

  logoutButtonCover: {
    marginTop: 10
  },

  logoutButton: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: appTheme.primary,
    paddingVertical: 15,
    width: '45%',
    margin: 'auto',
    borderRadius: 20
  }
})
