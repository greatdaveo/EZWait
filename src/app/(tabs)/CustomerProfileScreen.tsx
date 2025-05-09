import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Button, TextInput } from 'react-native'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { appTheme } from 'src/config/theme'
import { Switch } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { logoutUserSlice } from 'src/redux/auth/authSlice'
import { useRouter } from 'expo-router'
import { ScrollView } from 'react-native'

export default function ProfileScreen() {
  const [isReminderOn, setIsReminderOn] = useState(false)
  const { isLoading, isLoggedIn, user } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const handleUpdatedPassword = () => {
    if (isLoggedIn) {
      dispatch(logoutUserSlice())
    }
  }

  const handleLogout = () => {
    if (isLoggedIn) {
      dispatch(logoutUserSlice())
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{
              uri: !user?.profile_picture
                ? 'https://i.ibb.co/Ch0KY50/default-avatar-photo-placeholder-profile-icon-vector.jpg'
                : user?.profile_picture
            }}
            style={styles.img}
          />
        </View>

        <View style={styles.profileNameCover}>
          <View style={styles.profileNameContainer}>
            <Text style={styles.profileName}>{user?.name}</Text>
            <Text style={styles.profileEmail}>{user?.email}</Text>
          </View>

          <TouchableOpacity style={styles.pencilIcon} onPress={() => router.push('/profileInfo')}>
            <Ionicons name="pencil-outline" color={appTheme.primary} size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notification Preferences</Text>

        <View>
          <TouchableOpacity style={styles.sectionItem} onPress={() => setIsReminderOn((prevState) => !prevState)}>
            <Switch
              value={isReminderOn}
              onValueChange={() => setIsReminderOn((prevState) => !prevState)}
              // thumbColor={isReminderOn ? '#D2D5DA' : appTheme.primary}
              trackColor={{ true: appTheme.primary, false: '#ffffff' }}
            />

            <Text style={styles.itemText}>Appointment Reminders</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security Settings</Text>

        <View style={styles.passwordCover}>
          <Text style={styles.subSectionText}>Change Password</Text>
          <TextInput placeholder="Current Password" placeholderTextColor="#BABABA" style={styles.textInput} />
          <TextInput placeholder="New Password" placeholderTextColor="#BABABA" style={styles.textInput} />
          <TextInput placeholder="Confirm Password" placeholderTextColor="#BABABA" style={styles.textInput} />
        </View>

        <TouchableOpacity style={styles.updateBtnCover} onPress={handleUpdatedPassword}>
          <Text style={styles.updateBtn}>Update Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.updateBtnCover} onPress={handleLogout}>
          <Text style={styles.updateBtn}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.sectionTitle}>Delete Account</Text>
        <Text style={styles.subSectionText}>Permanently delete your account and all associated data. This action cannon be undone.</Text>
        <TouchableOpacity>
          <Text style={styles.deleteBtn}>Delete account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexGrow: 1,
    marginHorizontal: 20
  },

  topBar: {
    paddingTop: 80,
    borderBottomWidth: 2,
    borderBottomColor: '#E3E3E3',
    paddingBottom: 20
  },

  title: {
    textAlign: 'center',
    fontSize: 18
    // fontWeight: 'bold'
  },

  settings: {
    padding: 7,
    borderRadius: 50,
    position: 'relative'
  },

  // :::::::::::::::::

  profileSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 50,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
    paddingHorizontal: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#E3E3E3',
    paddingBottom: 30
  },

  profileImageContainer: {
    position: 'relative'
  },

  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10
  },

  plusIcon: {
    position: 'absolute',
    bottom: 15,
    right: 5,
    backgroundColor: appTheme.secondary,
    borderRadius: 15,
    padding: 1,
    elevation: 2
  },

  profileNameCover: {
    position: 'relative'
  },

  profileNameContainer: {
    marginRight: 10,
    marginLeft: -250
  },

  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: appTheme.themeBlack,
    marginBottom: 5
  },

  profileEmail: {
    fontSize: 16,
    color: '#757575',
    fontWeight: 500
  },

  pencilIcon: {
    position: 'absolute',
    right: 1,
    top: -30,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: '#E3E3E3',
    padding: 5
  },

  // ::::::::::::::::::::::::::

  section: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#E3E3E3',
    paddingBottom: 30
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 8,
    gap: 10
    // paddingVertical: 15
  },

  itemText: {
    fontSize: 16
  },

  passwordCover: {
    gap: 30
  },

  subSectionText: {
    fontSize: 16,
    marginVertical: 15
  },

  textInput: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#959292',
    fontSize: 16
  },

  updateBtnCover: {
    marginTop: 35,
    marginBottom: 25
  },

  updateBtn: {
    color: 'white',
    fontSize: 20,
    // fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: appTheme.primary,
    paddingVertical: 18,
    borderRadius: 10
  },

  deleteBtn: {
    color: '#FF0000',
    paddingVertical: 10,
    paddingBottom: 30,
    fontSize: 16
  }
})
