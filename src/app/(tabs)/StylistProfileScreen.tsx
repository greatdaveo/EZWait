import React, { useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Button, TextInput, Modal } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { appTheme } from 'src/config/theme'
import { Switch } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { logoutUserSlice } from 'src/redux/auth/authSlice'
import { useRouter } from 'expo-router'
import { ScrollView } from 'react-native'
import { useRoute } from '@react-navigation/native'
import Checkbox from 'expo-checkbox'
import { uploadImageToCloudinary } from 'src/utils/cloudinaryService'

export default function StylistProfileScreen() {
  const [isReminderOn, setIsReminderOn] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [image, setImage] = useState<string | null>(null)
  const [caption, setCaption] = useState('')
  const [isChecked, setChecked] = useState(false)

  const { stylistProfile }: any = useSelector((state: RootState) => state.profile)
  const { isLoading, isLoggedIn } = useSelector((state: RootState) => state.auth)

  console.log('stylistProfile: ', stylistProfile)

  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  useEffect(() => {}, [])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
      setModalVisible(true)
    }
  }

  const handleUpload = async () => {
    if (!image) return

    setUploading(true)

    try {
      const uploadUrl = await uploadImageToCloudinary(image)
      //   dispatch(updateStylistProfileSlice({ profile_picture: uploadedUrl }))
      setModalVisible(false)
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setUploading(false)
    }
  }

  const editProfile = () => {}

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          <Image source={{ uri: 'https://i.ibb.co/Ch0KY50/default-avatar-photo-placeholder-profile-icon-vector.jpg' }} style={styles.img} />
          <TouchableOpacity style={styles.plusIcon}>
            <Ionicons name="add-circle" color={appTheme.primary} size={28} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileNameCover}>
          <View style={styles.profileNameContainer}>
            <Text style={styles.profileName}>David Olowomeye</Text>
            <Text style={styles.profileEmail}>davidolowo2@gmail.com</Text>
          </View>

          <TouchableOpacity style={styles.pencilIcon} onPress={editProfile}>
            <Ionicons name="pencil-outline" color={appTheme.primary} size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Information</Text>
        <Text style={styles.subSectionText}>Make sure your details are correct. Your email is used for account verification and notifications.</Text>

        <View style={styles.section}>
          <Text style={styles.subSectionText}>Business Name</Text>
          <TextInput placeholder="ABC Cut's Ltd" placeholderTextColor="#BABABA" style={styles.textInput} />
        </View>

        <View style={styles.locationContainer}>
          <Text style={styles.sectionTitle}>Add Location</Text>

          <TouchableOpacity style={styles.sectionItem} onPress={() => setIsReminderOn((prevState) => !prevState)}>
            <Switch
              value={isReminderOn}
              onValueChange={() => setIsReminderOn((prevState) => !prevState)}
              // thumbColor={isReminderOn ? '#D2D5DA' : appTheme.primary}
              trackColor={{ true: appTheme.primary, false: '#ffffff' }}
            />

            <Text style={styles.itemText}>Use My Current Location</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sectionItem} onPress={() => setIsReminderOn((prevState) => !prevState)}>
            <Switch
              value={isReminderOn}
              onValueChange={() => setIsReminderOn((prevState) => !prevState)}
              // thumbColor={isReminderOn ? '#D2D5DA' : appTheme.primary}
              trackColor={{ true: appTheme.primary, false: '#ffffff' }}
            />

            <Text style={styles.itemText}>Enter Address Manually</Text>
          </TouchableOpacity>
          <TextInput placeholder="123 Main Street, Cityville" placeholderTextColor="#BABABA" style={styles.textInput} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Set Available Working Hours</Text>
        <Text style={styles.subSectionText}>Set your working hours for customers to know when to book.</Text>
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, i) => (
          <View style={styles.availabilityCover} key={i}>
            <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} color={isChecked ? appTheme.primary : undefined} />
            <View style={styles.dayAndTime}>
              <Text style={styles.dayText}>{day}</Text>

              <View style={styles.timeInputCover}>
                <TextInput placeholder="9:00 AM" style={styles.timeInput} />
                <TextInput placeholder="10:00 PM" style={styles.timeInput} />
              </View>
            </View>
          </View>
        ))}

        <View style={styles.buttonContainerCover}>
          <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveBtn} onPress={() => router.back()}>
            <Text style={styles.saveBtnText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upload Your Work</Text>
        <Text style={styles.subSectionText}>Upload high-quality images of your best work such as haircuts, styles etc</Text>

        <>
          <TouchableOpacity style={styles.uploadIconCover}>
            <Ionicons name="images-outline" color={appTheme.primary} size={28} style={styles.uploadIcon} />
            <Text style={styles.uploadText}>Upload media showcasing your best work</Text>
          </TouchableOpacity>
        </>
      </View>

      <View style={styles.serviceSection}>
        <Text style={styles.sectionTitle}>Select Services Offered & Pricing</Text>
        <Text style={styles.subSectionText}>Add the services you provide and set your prices for customers to book easily </Text>

        <View style={styles.serviceNameCover}>
          <Text style={styles.subSectionText}>Service Name</Text>
          <TextInput placeholder="Fade Haircut" placeholderTextColor="#BABABA" style={styles.textInput} />
          <Text style={styles.subSectionText}>Price</Text>
          <TextInput placeholder="£20" placeholderTextColor="#BABABA" style={styles.textInput} />
        </View>

        <View style={styles.buttonContainerCover}>
          <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
            <Text style={styles.addBtnText}>+ {'  '} Add</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveBtn} onPress={() => router.back()}>
            <Text style={styles.saveBtnText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Text>Check the files below before uploading</Text>
          <View style={styles.modalContent}>
            <Ionicons name="close-outline" color={appTheme.primary} size={28} style={styles.uploadIcon} />
            <Image source={{ uri: 'to preview the uploaded image' }} style={styles.uploadPreview} />
          </View>

          <Text style={styles.modalTitle}>Add Caption</Text>
          <TextInput placeholder="Fade Haircut" style={styles.captionInput} value={caption} onChangeText={setCaption} />

          <View style={styles.buttonContainerCover}>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveBtn} onPress={() => router.back()}>
              <Text style={styles.saveBtnText}>Upload</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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

  serviceSection: {
    marginBottom: 20,
    paddingBottom: 30
  },

  serviceNameCover: {
    // gap: 30
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
  },

  checkbox: {
    // margin: 10
  },

  availabilityCover: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 15,
    alignItems: 'center',
    marginTop: 25
  },

  dayAndTime: {
    gap: 15
  },

  dayText: {
    fontSize: 16
  },

  timeInputCover: {
    flexDirection: 'row',
    gap: 25
  },

  timeInput: {
    fontSize: 16,
    borderBottomWidth: 1
  },

  buttonContainerCover: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
    marginTop: 50
    // bottom: 50
  },

  cancelBtn: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderRadius: 10,
    paddingHorizontal: 60
  },

  cancelBtnText: {
    fontSize: 16,
    fontWeight: 'medium'
  },

  saveBtn: {
    backgroundColor: appTheme.primary,
    padding: 20,
    borderRadius: 10,
    paddingHorizontal: 60
  },

  saveBtnText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'medium'
  },

  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
    // marginRight: 5
  },

  //   ::::LOCATION::::
  locationContainer: {
    gap: 10,
    marginVertical: 30
  },

  //   :::::UPLOAD::::
  uploadIconCover: {
    padding: 40,
    // paddingVertical: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: appTheme.primary,
    borderRadius: 10,
    gap: 50,
    marginVertical: 20
  },

  uploadIcon: {
    marginTop: 60
  },

  uploadText: {
    marginTop: 30,
    marginBottom: 10,
    fontSize: 16,
    color: '#8A8A8A'
  },

  addBtnText: {
    color: appTheme.primary,
    fontSize: 16,
    fontWeight: 'bold'
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)'
  },

  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%'
  },

  closeIcon: {
    alignSelf: 'flex-end'
  },

  uploadPreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 15
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },

  captionInput: {
    borderBottomWidth: 1,
    fontSize: 16,
    width: '100%',
    textAlign: 'center',
    marginBottom: 20
  }
})
