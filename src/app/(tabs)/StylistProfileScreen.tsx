import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Button, TextInput, Modal, Alert, ActivityIndicator } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Ionicons } from '@expo/vector-icons'
import { appTheme } from 'src/config/theme'
import { Switch } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { useRouter } from 'expo-router'
import { ScrollView } from 'react-native'
import { useRoute } from '@react-navigation/native'
import Checkbox from 'expo-checkbox'
import { upload } from 'cloudinary-react-native'
import { Cloudinary } from '@cloudinary/url-gen'
import * as ImageManipulator from 'expo-image-manipulator'

import { editStylistSlice, getStylistProfileSlice, updateStylistSlice } from 'src/redux/profile/profileSlice'
import { CLOUD_NAME, UPLOAD_PRESET } from '@env'

export default function StylistProfileScreen() {
  const [isReminderOn, setIsReminderOn] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [servicesModalVisible, setServicesModalVisible] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [image, setImage] = useState<string | null>(null)
  const [sampleImages, setSampleImages] = useState<string[]>([])
  const [caption, setCaption] = useState('')
  const [isChecked, setChecked] = useState(false)
  const [uploadType, setUploadType] = useState('')
  const [showProfileDetails, setShowProfileDetails] = useState(false)
  const [sampleOfServices, setSampleOfServices] = useState<{ img_url: string; caption: string }[]>([])

  const { stylistProfile, isLoading }: any = useSelector((state: RootState) => state.profile)
  const { user, isLoggedIn } = useSelector((state: RootState) => state.auth)

  // console.log('user: ', user)
  // console.log('stylistProfile: ', stylistProfile)

  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getStylistProfileSlice(user.id))
    }
  }, [user, dispatch, isLoggedIn])

  const editProfile = () => {
    setShowProfileDetails(false)
  }

  const { data, user: stylistUser = {} } = stylistProfile || {}
  // console.log(stylistProfile)
  const {
    active_status,
    available_time_slots,
    no_of_current_customers,
    no_of_customer_bookings,
    profile_picture,
    // ratings,
    sample_of_services,
    services
  } = data || {}

  const [updatedProfile, setUpdatedProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    location: user?.location || '',
    number: user?.number || '',
    active_status: active_status || false,
    available_time_slots: available_time_slots || [],
    no_of_current_customers,
    no_of_customer_bookings,
    profile_picture: profile_picture || 'https://i.ibb.co/Ch0KY50/default-avatar-photo-placeholder-profile-icon-vector.jpg',
    // ratings,
    sample_of_services: sample_of_services || [],
    services: services || []
  })

  // For Available Time Slots
  const [timeSlots, setTimeSlots] = useState(
    available_time_slots?.map((slot: string) => {
      const [start, end] = slot.split(' - ')
      return { start, end }
    }) || []
  )

  // console.log(timeSlots)

  const updateTimeSlot = (i: number, key: 'start' | 'end', value: string) => {
    const newSlots = [...timeSlots]
    if (!newSlots[i]) {
      newSlots[i] = { start: '', end: '' }
    }
    newSlots[i][key] = value
    setTimeSlots([...newSlots])
  }

  // To compress the size of the upload images
  const compressImage = async (uri: string) => {
    const manipResult = await ImageManipulator.manipulateAsync(uri, [{ resize: { width: 800 } }], {
      compress: 0.7,
      format: ImageManipulator.SaveFormat.JPEG
    })

    return manipResult.uri
  }

  // For Profile Image
  const pickProfileImg = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1
    })

    if (!result.canceled) {
      const uri = result.assets[0].uri

      const fileSize = result.assets[0]?.fileSize
      if (fileSize && fileSize > 10485760) {
        Alert.alert('Image Too Large', 'Please choose an image less than 10MB')
        return
      }

      // Optionally compress the image:
      // uri = await compressImage(uri)

      setImage(uri)
      setUploadType('profile')
      setModalVisible(true)
      console.log('pickProfileImg Image Uri', uri)
    }
  }

  const uploadImageToCloudinary = async (imageUri: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const cld = new Cloudinary({
        cloud: { cloudName: CLOUD_NAME },
        url: { secure: true }
      })
      const options = {
        upload_preset: UPLOAD_PRESET,
        unsigned: true
      }

      upload(cld, {
        file: imageUri,
        options,
        callback: (error: any, response: any) => {
          if (error) {
            console.error('uploadImageToCloudinary Error Uploading Image: ', error)
            reject(error)
          } else {
            console.log('Uploaded Image URL: ', response.secure_url)
            resolve(response.secure_url)
          }
        }
      })
    })
  }

  const uploadProfileImg = async (imageUri: string) => {
    if (!imageUri) {
      console.log('No Image')
      return
    }
    setUploading(true)
    try {
      const uploadUrl = await uploadImageToCloudinary(imageUri)
      setUpdatedProfile((prev) => ({ ...prev, profile_picture: uploadUrl }))
      setModalVisible(false)
    } catch (error: any) {
      console.error('Upload failed:', error)
    } finally {
      setUploading(false)
    }
  }

  // For Work Sample Image
  const pickWorkSampleImg = async () => {
    // if (sample_of_services.length > 2) {
    //   Alert.alert('You can only upload 2 images')
    // }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1
    })

    if (!result.canceled) {
      const uri = result.assets[0].uri
      if (sampleImages.length >= 2) {
        Alert.alert('Error', 'You can only upload 2 images.')
        return
      }

      setSampleImages((prev) => [...prev, uri])
      setSampleOfServices((prevServices) => [...prevServices, { caption: '', img_url: uri }])
      setUploadType('sample')
      if (sampleImages.length + 1 === 2) {
        setModalVisible(true)
      }
      // console.log('pickWorkSampleImg Image Uri', result.assets[0].uri)
    }
  }

  const uploadSampleWorkImg = async () => {
    if (sampleOfServices.some((service) => !service.caption || !service.img_url)) {
      Alert.alert('Error', 'Please provide captions for all images')
    }

    if (sampleOfServices.length < 2 || sampleOfServices.length !== 2) {
      Alert.alert('Error', 'Please select exactly 2 images for your work samples.')
      return
    }

    setUploading(true)
    try {
      const uploadedImages = await Promise.all(sampleOfServices.map((service) => uploadImageToCloudinary(service.img_url)))

      const updatedSampleOfServices = sampleOfServices.map((service, i) => ({
        caption: service.caption,
        img_url: uploadedImages[i]
      }))

      setUpdatedProfile((prev) => ({
        ...prev,
        sample_of_services: updatedSampleOfServices
      }))
      //   dispatch(updateStylistProfileSlice({ profile_picture: uploadedUrl }))
      setModalVisible(false)
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleUpload = () => {
    if (uploadType === 'profile') {
      // Use the image from state
      uploadProfileImg(image!)
    } else if (uploadType === 'sample') {
      uploadSampleWorkImg()
    }
  }

  const saveEditedProfile = () => {
    try {
      const formData = {
        ...updatedProfile,
        available_time_slots: timeSlots.map((slot: any) => `${slot.start}-${slot.end}`)
      }
      console.log('saveEditedProfile: ', formData)
      dispatch(updateStylistSlice({ id: user.id, formData }))
      Alert.alert('Success', 'Profile Updated Successfully!')
    } catch (error: any) {
      console.log('saveEditedProfile Error: ', error)
    }
  }

  const handleCancelModal = () => {
    setModalVisible(false)
    if (uploadType === 'profile') {
      setImage(null)
    } else if (uploadType === 'sample') {
      setSampleImages([])
      setCaption('')
    } else {
      return
    }
  }

  // ::::::::::: To Manage Services Edited :::::::::::
  const [tempServices, setTempServices] = useState(updatedProfile.services)
  const openServicesModal = () => {
    setTempServices(updatedProfile.services)
    setServicesModalVisible(true)
  }

  const handleAddService = () => {
    const newService = { name: '', price: 0 }
    setTempServices((prev: any) => [...prev, newService])
    Alert.alert('Service Added', 'A new service field has been added.')
  }

  const handleRemoveService = (index: number) => {
    setTempServices((prev: any) => prev.filter((_: any, i: number) => i !== index))
    Alert.alert('Service Removed', 'Service removed successfully.')
  }

  const handleUpdateService = (index: number, field: 'name' | 'price', value: string) => {
    const newServices = tempServices.map((service: any, idx: number) => {
      if (idx === index) {
        return { ...service, [field]: field === 'price' ? parseFloat(value) || 0 : value }
      }

      return service
    })

    setTempServices(newServices)
  }

  const saveServices = () => {
    if (!tempServices.length || tempServices.every((s: any) => s.name.trim() === '')) {
      Alert.alert('Error', 'Please add at least one valid service.')
      return
    }

    setUpdatedProfile((prev) => ({ ...prev, services: tempServices }))
    setServicesModalVisible(false)
    Alert.alert('Success', 'Services updated successfully')
  }

  // ::::::::::: End of Services Management :::::::::::

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#9747FF" />
        {/* <Text>Loading Stylist Profile...</Text> */}
      </View>
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.profileSection}>
        <TouchableOpacity style={styles.profileImageContainer} onPress={pickProfileImg}>
          <Image
            source={{
              uri: updatedProfile?.profile_picture
            }}
            style={styles.img}
          />
          <Ionicons name="add-circle" color={appTheme.primary} size={28} style={styles.plusIcon} />
        </TouchableOpacity>

        <View style={styles.profileNameCover}>
          <View style={styles.profileNameContainer}>
            <Text style={styles.profileName}>{user?.name}</Text>
            <Text style={styles.profileEmail}>{user?.email}</Text>
          </View>

          <TouchableOpacity style={styles.pencilIcon} onPress={() => setShowProfileDetails(!showProfileDetails)}>
            <Ionicons name="pencil-outline" color={appTheme.primary} size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        {showProfileDetails && (
          <>
            <Text style={styles.sectionTitle}>Profile Information</Text>
            <Text style={styles.subSectionText}>
              Make sure your details are correct. Your email is used for account verification and notifications.
            </Text>

            <View style={styles.section}>
              <Text style={styles.subSectionText}>Business Name</Text>
              <TextInput
                placeholder="Enter your business name"
                value={updatedProfile.name}
                onChangeText={(text) => setUpdatedProfile({ ...updatedProfile, name: text })}
                placeholderTextColor="#BABABA"
                style={styles.textInput}
              />
              <Text style={styles.subSectionText}>Email</Text>
              <TextInput
                placeholder="Enter your email"
                value={updatedProfile.email}
                onChangeText={(text) => setUpdatedProfile({ ...updatedProfile, email: text })}
                placeholderTextColor="#BABABA"
                style={styles.textInput}
              />
              <Text style={styles.subSectionText}>Number</Text>
              <TextInput
                placeholder="Enter your Number"
                value={updatedProfile.number}
                onChangeText={(text) => setUpdatedProfile({ ...updatedProfile, number: text })}
                placeholderTextColor="#BABABA"
                style={styles.textInput}
              />
            </View>
          </>
        )}

        <View style={styles.locationContainer}>
          {/* <Text style={styles.sectionTitle}>Add Location</Text>

          <TouchableOpacity style={styles.sectionItem}>
            <Switch
              value={updatedProfile.location}
              onValueChange={(value) => setUpdatedProfile({ ...updatedProfile, active_status: value })}
              // thumbColor={isReminderOn ? '#D2D5DA' : appTheme.primary}
              trackColor={{ true: appTheme.primary, false: '#ffffff' }}
            />

            <Text style={styles.itemText}>Use My Current Location</Text>
          </TouchableOpacity> */}

          <TouchableOpacity style={styles.sectionItem}>
            <Switch
              value={updatedProfile.active_status}
              onValueChange={(value) => setUpdatedProfile({ ...updatedProfile, active_status: value })}
              // thumbColor={isReminderOn ? '#D2D5DA' : appTheme.primary}
              trackColor={{ true: appTheme.primary, false: '#ffffff' }}
            />

            <Text style={styles.itemText}>Availability (Online or Away)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sectionItem}>
            <Switch
              value={updatedProfile.location}
              onValueChange={(value) => setUpdatedProfile({ ...updatedProfile, location: value })}
              // thumbColor={isReminderOn ? '#D2D5DA' : appTheme.primary}
              trackColor={{ true: appTheme.primary, false: '#ffffff' }}
            />

            <Text style={styles.itemText}>Enter Address Manually</Text>
          </TouchableOpacity>
          <TextInput placeholder="Enter your location" placeholderTextColor="#BABABA" value={updatedProfile.location} style={styles.textInput} />
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
                <TextInput
                  placeholder="9:00 AM"
                  value={timeSlots[i]?.start}
                  onChangeText={(text) => updateTimeSlot(i, 'start', text)}
                  style={styles.timeInput}
                />
                <TextInput
                  placeholder="10:00 PM"
                  value={timeSlots[i]?.end}
                  onChangeText={(text) => updateTimeSlot(i, 'end', text)}
                  style={styles.timeInput}
                />
              </View>
            </View>
          </View>
        ))}

        <View style={styles.buttonContainerCover}>
          <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveBtn} onPress={saveEditedProfile}>
            <Text style={styles.saveBtnText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upload Your Work</Text>
        <Text style={styles.subSectionText}>Upload high-quality images of your best work such as haircuts, styles etc</Text>

        <>
          <TouchableOpacity style={styles.uploadIconCover} onPress={pickWorkSampleImg}>
            <Ionicons name="images-outline" color={appTheme.primary} size={28} style={styles.uploadIcon} />
            <Text style={styles.uploadText}>Upload media showcasing your best work</Text>
          </TouchableOpacity>
        </>
      </View>

      <View style={styles.serviceSection}>
        <Text style={styles.sectionTitle}>Select Services Offered & Pricing</Text>
        <Text style={styles.subSectionText}>Add the services you provide and set your prices for customers to book easily </Text>

        <TouchableOpacity style={styles.manageBtn} onPress={openServicesModal}>
          <Text style={styles.manageBtnText}>Manage Services</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Image Upload Preview */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Ionicons name="close-outline" color={appTheme.primary} size={28} style={styles.closeIcon} onPress={handleCancelModal} />
            <Text style={styles.modalTitle}>
              {uploadType === 'sample' ? 'Preview the sample images before uploading' : 'Check the profile image before uploading'}
            </Text>

            {uploadType === 'profile' ? (
              <Image source={{ uri: image || '' }} style={styles.uploadPreview} />
            ) : (
              <View>
                <View style={styles.samplePreviewContainer}>
                  {sampleOfServices.map((service, i) => (
                    <View key={i}>
                      <Image source={{ uri: service.img_url }} style={styles.samplePreview} key={i} />

                      <Text style={styles.modalSubTile}>Add Caption</Text>
                      <TextInput
                        placeholder="Low Cut"
                        style={styles.captionInput}
                        value={service.caption}
                        onChangeText={(text) => {
                          const updatedServices = [...sampleOfServices]
                          updatedServices[i].caption = text
                          setSampleOfServices(updatedServices)
                        }}
                      />
                    </View>
                  ))}
                </View>
                {/* {sampleImages.length < 2 && (
                  <TouchableOpacity onPress={pickWorkSampleImg} style={styles.addMoreButton}>
                    <Text style={styles.addMoreText}>Add More Image</Text>
                  </TouchableOpacity>
                )} */}
              </View>
            )}

            {/* <Text style={styles.modalSubTile}>Add Captions</Text> */}
            {/* <TextInput placeholder="Fade Haircut" style={styles.captionInput} value={caption} onChangeText={setCaption} /> */}

            <View style={styles.buttonContainerCover}>
              <TouchableOpacity style={styles.cancelBtn} onPress={handleCancelModal}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveBtn} onPress={handleUpload}>
                <Text style={styles.saveBtnText}>{isLoading ? 'Uploading...' : 'Upload'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal for Managing Services */}
      <Modal visible={servicesModalVisible} transparent={true} animationType="slide">
        <View style={styles.serviceModalContainer}>
          <View style={styles.modalContent}>
            <Ionicons
              name="close-outline"
              color={appTheme.primary}
              size={28}
              style={styles.closeIcon}
              onPress={() => setServicesModalVisible(false)}
            />
            <Text style={styles.modalTitle}>Manage Services</Text>
            <ScrollView contentContainerStyle={styles.container}>
              {tempServices.map((service: any, index: number) => (
                <View key={index} style={styles.serviceNameCover}>
                  <Text style={styles.subSectionText}>Service Name</Text>
                  <TextInput
                    placeholder="Fade Haircut"
                    placeholderTextColor="#BABABA"
                    style={styles.textInput}
                    value={service.name}
                    onChangeText={(text) => handleUpdateService(index, 'name', text)}
                  />
                  <Text style={styles.subSectionText}>Price</Text>
                  <TextInput
                    placeholder="£20"
                    placeholderTextColor="#BABABA"
                    style={styles.textInput}
                    value={service.price ? service.price.toString() : ''}
                    onChangeText={(text) => handleUpdateService(index, 'price', text)}
                  />
                  <TouchableOpacity onPress={() => handleRemoveService(index)}>
                    <Text style={{ color: 'red', marginVertical: 5 }}>Remove</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>

            <View style={styles.serviceBtnContainerCover}>
              <TouchableOpacity style={styles.addServiceBtn} onPress={handleAddService}>
                <Text style={styles.addBtnText}>+ Add Service</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveServiceBtn} onPress={saveServices}>
                <Text style={styles.saveBtnText}>Save Services</Text>
              </TouchableOpacity>
            </View>
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

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7'
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

  manageBtn: {
    backgroundColor: appTheme.primary,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center'
  },
  manageBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  },

  // :::::::: Modal ::::::::::::

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)'
  },

  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: 'auto'
  },

  modalTitle: {
    fontSize: 16,
    fontWeight: 'medium',
    marginBottom: 40,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#959292',
    textAlign: 'center'
  },

  closeIcon: {
    alignSelf: 'flex-end'
  },

  uploadPreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 40,
    alignSelf: 'center'
  },

  samplePreviewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  samplePreview: {
    width: 160,
    height: 160,
    borderRadius: 10,
    marginBottom: 40,
    alignSelf: 'center'
  },

  modalSubTile: {
    fontSize: 16,
    fontWeight: 'medium',
    marginBottom: 10,
    textAlign: 'left'
  },

  captionInput: {
    borderWidth: 1,
    borderColor: '#959292',
    fontSize: 16,
    padding: 15,
    borderRadius: 10,

    marginBottom: 20
  },

  serviceModalContainer: {
    // paddingHorizontal: 50,
    marginBottom: 200,
    marginTop: 100,
    flex: 1
  },

  serviceBtnContainerCover: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    // gap: 10,
    paddingTop: 5
  },

  addServiceBtn: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderRadius: 10,
    paddingHorizontal: 20
  },

  saveServiceBtn: {
    backgroundColor: appTheme.primary,
    padding: 20,
    borderRadius: 10,
    paddingHorizontal: 20
  }
})
