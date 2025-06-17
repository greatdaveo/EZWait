import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Button, TextInput, Alert, ActivityIndicator } from 'react-native'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { appTheme } from 'src/config/theme'
import { Switch } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { changePasswordSlice, deleteProfileSlice, logoutUserSlice } from 'src/redux/auth/authSlice'
import { useRouter } from 'expo-router'
import { ScrollView } from 'react-native'

export default function CustomerProfile() {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)
  const [isReminderOn, setIsReminderOn] = useState<boolean>(false)
  const { isLoading, isLoggedIn, user } = useSelector((state: RootState) => state.auth)
  const [updating, setUpdating] = useState(false)

  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const [passwords, setPasswords] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  })

  const handleUpdatedPassword = async () => {
    if (!passwords.current_password || !passwords.new_password || !passwords.confirm_password) {
      return Alert.alert('Error ❌', 'Please fill all fields.')
    }

    if (passwords.new_password !== passwords.confirm_password) {
      return Alert.alert('Error ❌', 'New passwords do not match')
    }

    try {
      setUpdating(true)
      await dispatch(changePasswordSlice(passwords)).unwrap()
      Alert.alert('Success ✅', 'Your password has been changed.')
      setPasswords({ current_password: '', new_password: '', confirm_password: '' })
      setUpdating(false)
      // router.back()
    } catch (error: any) {
      setUpdating(false)
      // Alert.alert('Error ❌', error)
      Alert.alert('Error ❌', 'Your current password is incorrect')
      // console.log('changePasswordSlice Error: ', error)
    }
  }

  const handleLogout = () => {
    Alert.alert(
      'Log out?',
      'Are you sure you want to log out?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: async () => {
            if (isLoggedIn) {
              await dispatch(logoutUserSlice())
            }
            router.push('(auth)/login')
          }
        }
      ],
      { cancelable: true }
    )
  }

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete account?',
      'This action is irreversible. Are you sure you want to permanently delete your account?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: async () => {
            if (isLoggedIn) {
              try {
                await dispatch(deleteProfileSlice()).unwrap()
                // after successful deletion, send back to login/onboarding
                router.replace('(auth)/login')
              } catch (err: any) {
                Alert.alert('Error', err.message || 'Could not delete account.')
              }
            }
          }
        }
      ],
      { cancelable: true }
    )
  }

  if (isLoading || updating) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={appTheme.primary} />
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Current Password"
              placeholderTextColor="#BABABA"
              style={styles.textInput}
              secureTextEntry={!passwordVisible}
              value={passwords.current_password}
              onChangeText={(text) => setPasswords((p) => ({ ...p, current_password: text }))}
            />

            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
              <Ionicons name={passwordVisible ? 'eye-off' : 'eye'} size={20} color="grey" style={styles.inputIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="New Password"
              placeholderTextColor="#BABABA"
              style={styles.textInput}
              secureTextEntry={!passwordVisible}
              value={passwords.new_password}
              onChangeText={(text) => setPasswords((p) => ({ ...p, new_password: text }))}
            />

            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
              <Ionicons name={passwordVisible ? 'eye-off' : 'eye'} size={20} color="grey" style={styles.inputIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="#BABABA"
              style={styles.textInput}
              secureTextEntry={!passwordVisible}
              value={passwords.confirm_password}
              onChangeText={(text) => setPasswords((p) => ({ ...p, confirm_password: text }))}
            />

            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
              <Ionicons name={passwordVisible ? 'eye-off' : 'eye'} size={20} color="grey" style={styles.inputIcon} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.updateBtnCover} onPress={handleUpdatedPassword}>
          <Text style={styles.updateBtn}>Update Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutBtnCover} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.sectionTitle}>Delete Account</Text>
        <Text style={styles.subSectionText}>Permanently delete your account and all associated data. This action cannon be undone.</Text>
        <TouchableOpacity onPress={handleDeleteAccount}>
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

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7'
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
    flex: 1,
    padding: 20,
    borderRadius: 10,
    fontSize: 16
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#f2f2f2',
    borderColor: '#959292',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10
  },

  inputIcon: {
    marginRight: 12
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

  logoutBtnCover: {},

  logoutText: {
    color: 'white',
    backgroundColor: '#FF0000',
    textAlign: 'center',
    paddingVertical: 18,
    borderRadius: 10,
    fontSize: 20
  },

  deleteBtn: {
    color: '#FF0000',
    paddingVertical: 10,
    paddingBottom: 30,
    fontSize: 16
  }
})
