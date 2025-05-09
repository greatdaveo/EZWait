import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { appTheme } from 'src/config/theme'
import { editUserProfileSlice } from 'src/redux/auth/authSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'
import { uploadImageToCloudinary } from 'src/utils/cloudinaryService'

const Index = () => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { user, isLoading } = useSelector((state: RootState) => state.auth)
  const [uploading, setUploading] = useState(false)

  const [form, setForm] = useState({
    name: '',
    email: '',
    number: '',
    location: '',
    profile_picture: ''
  })

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        number: user.number,
        location: user.location,
        profile_picture: user.profile_picture
      })
    }
  }, [dispatch])

  const handleUpdatedProfile = async () => {
    try {
      await dispatch(editUserProfileSlice(form)).unwrap()
      // Alert.alert('Saved ✅', 'Your profile has been updated.')
      router.push('(tabs)/CustomerProfileScreen')
    } catch (err: any) {
      // console.error('❌ handleUpdatedProfile caught:', err)
      Alert.alert('Error ❌', err.message || String(err))
    }
  }

  const handlePreviousStep = () => {
    router.back()
  }

  const pickAndUploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1
    })

    if (result.canceled) return

    // compress
    const { uri: compressedUri } = await ImageManipulator.manipulateAsync(result.assets[0].uri, [{ resize: { width: 800 } }], {
      compress: 0.7,
      format: ImageManipulator.SaveFormat.JPEG
    })

    setUploading(true)
    try {
      const secureUrl = await uploadImageToCloudinary(compressedUri)
      setForm((f) => ({ ...f, profile_picture: secureUrl }))
    } catch (err: any) {
      Alert.alert('Upload failed ❌', err.message ?? 'Unable to upload')
    } finally {
      setUploading(false)
    }
  }

  if (isLoading || uploading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={appTheme.primary} />
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={handlePreviousStep} style={styles.iconCover}>
            <Ionicons name="chevron-back-outline" size={28} color={appTheme.primary} />
          </TouchableOpacity>

          <View style={styles.titleCover}>
            <Text style={styles.title}>Edit Profile</Text>
          </View>
        </View>

        <View style={styles.profileSection}>
          <TouchableOpacity style={styles.profileImageContainer} onPress={() => pickAndUploadImage()}>
            <Image
              source={{
                uri: !form?.profile_picture
                  ? 'https://i.ibb.co/Ch0KY50/default-avatar-photo-placeholder-profile-icon-vector.jpg'
                  : form?.profile_picture
              }}
              style={styles.img}
            />

            <View style={styles.plusIcon}>
              <Ionicons name="add-circle" color={appTheme.primary} size={28} />
            </View>
          </TouchableOpacity>

          <View style={styles.profileNameCover}>
            <View style={styles.profileNameContainer}>
              <Text style={styles.profileName}>{user?.name}</Text>
              <Text style={styles.profileEmail}>{user?.email}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Information</Text>

          <View style={styles.passwordCover}>
            <Text style={styles.subSectionText}>
              Make sure your details are correct. Your email is used for account verification and notifications.
            </Text>
            <TextInput
              placeholder="Name"
              value={form?.name}
              onChangeText={(text) => setForm((f) => ({ ...f, name: text }))}
              placeholderTextColor="#BABABA"
              style={styles.textInput}
            />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#BABABA"
              style={styles.textInput}
              keyboardType="email-address"
              value={form?.email}
              onChangeText={(text) => setForm((f) => ({ ...f, email: text }))}
            />
            <TextInput
              placeholder="Number"
              placeholderTextColor="#BABABA"
              style={styles.textInput}
              value={form?.number}
              onChangeText={(text) => setForm((f) => ({ ...f, number: text }))}
            />
            <TextInput
              placeholder="Location"
              placeholderTextColor="#BABABA"
              style={styles.textInput}
              value={form?.location}
              onChangeText={(text) => setForm((f) => ({ ...f, location: text }))}
            />
          </View>

          <TouchableOpacity style={styles.updateBtnCover} onPress={handleUpdatedProfile}>
            <Text style={styles.updateBtn}>Save Changes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.buttonContainer, styles.cancelButton]} onPress={() => router.back()}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 70,
    padding: 20,
    backgroundColor: '#FFFFFF'
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#EBEBEB',
    paddingBottom: 30
  },

  iconCover: {
    backgroundColor: '#F4EDFF',
    padding: 5,
    borderRadius: 50,
    left: -65
  },

  titleCover: {
    // flexDirection: 'row'
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 50,
    textAlign: 'center'
    // marginBottom: 4
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

  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 25,
    borderRadius: 10,
    marginBottom: 15
  },

  cancelButton: {
    // backgroundColor: '#ddd',
    borderWidth: 2,
    borderColor: '#ddd',
    marginBottom: 80
  },

  cancelText: {
    color: '#333',
    // fontWeight: 'bold',
    fontSize: 18
  }
})
export default Index
