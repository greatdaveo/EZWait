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
import * as ImageManipulator from 'expo-image-manipulator'

import { getStylistProfileSlice, updateStylistSlice } from 'src/redux/profile/profileSlice'
import { uploadImageToCloudinary } from 'src/utils/cloudinaryService'

type TimeSlot = { start: string; end: string }

export default function StylistProfileScreen() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const { stylistProfile, isLoading }: any = useSelector((state: RootState) => state.profile)
  const { user, isLoggedIn } = useSelector((state: RootState) => state.auth)

  const [updatedProfile, setUpdatedProfile] = useState<{
    name: string
    email: string
    location: string
    number: string
    active_status: boolean
    available_time_slots: string[]
    no_of_current_customers: number
    no_of_customer_bookings: number
    profile_picture: string
    sample_of_services: { img_url: string; caption: string }[]
    services: { name: string; price: number }[]
  } | null>(null)

  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [uploadType, setUploadType] = useState<'profile' | 'sample' | ''>('')
  const [imageUri, setImageUri] = useState<string | null>(null)
  const [sampleImages, setSampleImages] = useState<string[]>([])
  const [sampleOfServices, setSampleOfServices] = useState<{ img_url: string; caption: string }[]>([])
  const [captionInput, setCaptionInput] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [servicesModalVisible, setServicesModalVisible] = useState(false)
  const [tempServices, setTempServices] = useState<{ name: string; price: number }[]>([])
  const [showProfileDetails, setShowProfileDetails] = useState(false)
  const [useCurrentLocation, setUseCurrentLocation] = useState(false)

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getStylistProfileSlice(user.id.toString()))
    }
  }, [dispatch, isLoggedIn, user?.id])

  // To initialize local form state when data arrives
  useEffect(() => {
    const data = stylistProfile?.data

    if (data && user) {
      setUpdatedProfile({
        name: user.name,
        email: user.email,
        location: user.location,
        number: user.number,
        active_status: data.active_status,
        available_time_slots: data.available_time_slots,
        no_of_current_customers: data.no_of_current_customers,
        no_of_customer_bookings: data.no_of_customer_bookings,
        profile_picture: data.profile_picture,
        sample_of_services: data.sample_of_services,
        services: data.services
      })

      if (data) {
        const parsed = data.available_time_slots.map((slot: any) => {
          const [start, end] = slot.split(' - ')
          return { start, end }
        })
        const fullWeek: TimeSlot[] = Array(7)
          .fill(0)
          .map((_, i) => parsed[i] || { start: '', end: '' })
        setTimeSlots(fullWeek)
      }
    }
  }, [stylistProfile, user])

  // To compress the size of the upload images
  const compressImage = async (uri: string) => {
    const manipResult = await ImageManipulator.manipulateAsync(uri, [{ resize: { width: 800 } }], {
      compress: 0.7,
      format: ImageManipulator.SaveFormat.JPEG
    })

    return manipResult.uri
  }

  // To upload Profile Image to cloudinary
  const pickImage = async (type: 'profile' | 'sample', idx?: number) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1
    })

    if (!result.canceled) {
      let uri = result.assets[0].uri
      uri = await compressImage(uri)

      if (type === 'sample') {
        setSampleImages((imgs) => (typeof idx === 'number' ? imgs.map((u, i) => (i === idx ? uri : u)) : imgs.length < 2 ? [...imgs, uri] : imgs))

        setSampleOfServices((svcs) =>
          typeof idx === 'number'
            ? svcs.map((s, i) => (i === idx ? { img_url: uri, caption: s.caption } : s))
            : [...svcs, { img_url: uri, caption: '' }]
        )
      } else {
        setImageUri(uri)
      }

      setUploadType(type)
      setModalVisible(true)

      const fileSize = result.assets[0]?.fileSize
      if (fileSize && fileSize > 10485760) {
        Alert.alert('Image Too Large', 'Please choose an image less than 10MB')
        return
      }
    }
  }

  // console.log('handleUpload:', { uploadType, imageUri, sampleOfServices })

  const handleUpload = async () => {
    if (uploadType === 'profile' && imageUri && updatedProfile) {
      const url = await uploadImageToCloudinary(imageUri)
      setUpdatedProfile((p) => p! && { ...p, profile_picture: url })
      setImageUri(null)
    }

    if (uploadType === 'sample') {
      //  To ensure 2 images and captions
      if (sampleOfServices.length !== 2 || sampleOfServices.some((s) => !s.caption)) {
        return Alert.alert('Error', 'Select 2 images and add captions')
      }

      const urls = await Promise.all(sampleOfServices.map((s) => uploadImageToCloudinary(s.img_url)))
      setUpdatedProfile(
        (p) =>
          p! && {
            ...p,
            sample_of_services: sampleOfServices.map((s, i) => ({ caption: s.caption, img_url: urls[i] }))
          }
      )

      setSampleImages([])
      setSampleOfServices([])
    }
    setModalVisible(false)
    setUploadType('')
  }

  const saveProfile = () => {
    if (!updatedProfile) return
    const payload = {
      ...updatedProfile,
      available_time_slots: timeSlots.map((s) => `${s.start} - ${s.end}`)
    }

    dispatch(updateStylistSlice({ id: user.id, formData: payload }))
      .unwrap()
      .then(() => Alert.alert('Success ✅', 'Profile Updated Successfully!'))
  }

  const handleAddService = () => {
    const newService = { name: '', price: 0 }
    setTempServices((prev: any) => [...prev, newService])
    // Alert.alert('Service Added', 'A new service field has been added.')
  }

  const handleRemoveService = (index: number) => {
    setTempServices((prev: any) => prev.filter((_: any, i: number) => i !== index))
    Alert.alert('Service Removed', 'Service removed successfully.')
  }

  // console.log('Active Status: ', updatedProfile?.active_status)
  // console.log('updatedProfile ', updatedProfile)
  // console.log('useCurrentLocation ', useCurrentLocation)

  if (isLoading && !updatedProfile) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={appTheme.primary} />
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
        <TouchableOpacity style={styles.profileImageContainer} onPress={() => pickImage('profile')}>
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
                value={updatedProfile?.name}
                onChangeText={(text) => setUpdatedProfile((p) => p && { ...p, name: text })}
                placeholderTextColor="#BABABA"
                style={styles.textInput}
              />

              <Text style={styles.subSectionText}>Email</Text>
              <TextInput
                placeholder={updatedProfile?.email}
                value={updatedProfile?.email}
                // onChangeText={(text) => setUpdatedProfile((p) => p && { ...p, email: text })}
                placeholderTextColor="#BABABA"
                style={styles.textInput}
                editable={false}
              />

              <Text style={styles.subSectionText}>Number</Text>
              <TextInput
                placeholder="Enter your Number"
                value={updatedProfile?.number}
                onChangeText={(text) => setUpdatedProfile((p) => p && { ...p, number: text })}
                placeholderTextColor="#BABABA"
                style={styles.textInput}
              />

              <Text style={styles.subSectionText}>Location</Text>
              <TextInput
                placeholder="Enter your Address"
                value={updatedProfile?.location}
                onChangeText={(text) => setUpdatedProfile((p) => p && { ...p, number: text })}
                placeholderTextColor="#BABABA"
                style={styles.textInput}
              />
            </View>
          </>
        )}

        <View style={styles.locationContainer}>
          <Text style={styles.sectionTitle}>Add Location</Text>

          <TouchableOpacity style={styles.sectionItem}>
            <Switch
              value={useCurrentLocation}
              onValueChange={(value) => setUseCurrentLocation(!useCurrentLocation)}
              trackColor={{ true: appTheme.primary, false: '#ffffff' }}
            />

            <Text style={styles.itemText}>Use My Current Location</Text>
          </TouchableOpacity>

          <View style={styles.sectionItem}>
            <Switch
              value={updatedProfile?.active_status}
              onValueChange={(value) => setUpdatedProfile((p) => p && { ...p, active_status: value })}
              trackColor={{ true: appTheme.primary, false: '#ffffff' }}
            />

            <Text style={styles.itemText}>Availability (Online or Away)</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Set Available Working Hours</Text>
        <Text style={styles.subSectionText}>Set your working hours for customers to know when to book.</Text>
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, i) => (
          <View style={styles.availabilityCover} key={i}>
            {/* <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} color={isChecked ? appTheme.primary : undefined} /> */}
            <View style={styles.dayAndTime}>
              <Text style={styles.dayText}>{day}</Text>

              <View style={styles.timeInputCover}>
                <TextInput
                  style={styles.timeInput}
                  placeholder="9:00 AM"
                  value={timeSlots[i]?.start}
                  onChangeText={(t) => {
                    const ts = [...timeSlots]
                    ts[i].start = t
                    setTimeSlots(ts)
                  }}
                />
                <TextInput
                  style={styles.timeInput}
                  placeholder="10:00 PM"
                  value={timeSlots[i]?.end}
                  onChangeText={(t) => {
                    const ts = [...timeSlots]
                    ts[i].end = t
                    setTimeSlots(ts)
                  }}
                />
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* === Sample Images === */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preview Your Sample Images: </Text>

        {/* // if we already have images, show them as tappable previews */}
        {updatedProfile?.sample_of_services?.length ? (
          <View style={styles.samplePreviewContainer}>
            {updatedProfile.sample_of_services.map((service, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => pickImage('sample')} // you could pass i here to re-pick that slot
              >
                <Image source={{ uri: service.img_url }} style={styles.samplePreview} />
                <Text style={styles.captionText}>{service.caption}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Upload Your Work</Text>
            <Text style={styles.subSectionText}>Upload high-quality images of your best work such as haircuts, styles etc</Text>

            <TouchableOpacity style={styles.uploadIconCover} onPress={() => pickImage('sample')}>
              <Ionicons name="images-outline" color={appTheme.primary} size={28} style={styles.uploadIcon} />
              <Text style={styles.uploadText}>Upload 2 images showing your best work</Text>
            </TouchableOpacity>
          </>
        )}
        <View style={styles.buttonContainerCover}>
          <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveBtn} onPress={saveProfile}>
            <Text style={styles.saveBtnText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* === Services === */}
      <View style={styles.serviceSection}>
        <Text style={styles.sectionTitle}>Select Services Offered & Pricing</Text>
        <Text style={styles.subSectionText}>Add the services you provide and set your prices for customers to book easily </Text>

        <TouchableOpacity
          style={styles.manageBtn}
          onPress={() => {
            setTempServices(updatedProfile?.services ?? [])
            setServicesModalVisible(true)
          }}>
          <Text style={styles.manageBtnText}>Manage Services</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Image Upload Preview */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Ionicons name="close-outline" color={appTheme.primary} size={28} style={styles.closeIcon} onPress={() => setModalVisible(false)} />
            <Text style={styles.modalTitle}>
              {uploadType === 'sample' ? 'Preview the sample images before uploading' : 'Check the profile image before uploading'}
            </Text>

            {uploadType === 'profile' ? (
              <Image source={{ uri: imageUri! }} style={styles.uploadPreview} />
            ) : (
              <View>
                <View style={styles.samplePreviewContainer}>
                  {sampleOfServices.map((service, i) => (
                    <TouchableOpacity key={i} onPress={() => pickImage('sample', i)}>
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
                    </TouchableOpacity>
                  ))}
                </View>

                {/* {sampleImages.length < 2 && (
                  <TouchableOpacity onPress={() => pickImage('sample')} style={styles.addMoreButton}>
                    <Text style={styles.addMoreText}>Add More Image</Text>
                  </TouchableOpacity>
                )} */}
              </View>
            )}

            <View style={styles.buttonContainerCover}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
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
              {tempServices.map((service: any, i: number) => (
                <View key={i} style={styles.serviceNameCover}>
                  <Text style={styles.subSectionText}>Service Name</Text>
                  <TextInput
                    placeholder="Fade Haircut"
                    placeholderTextColor="#BABABA"
                    style={styles.textInput}
                    value={service.name}
                    onChangeText={(text) => {
                      const arr = [...tempServices]
                      arr[i].name = text
                      setTempServices(arr)
                    }}
                  />
                  <Text style={styles.subSectionText}>Price</Text>
                  <TextInput
                    placeholder="£20"
                    placeholderTextColor="#BABABA"
                    style={styles.textInput}
                    value={service.price.toString()}
                    onChangeText={(text) => {
                      const arr = [...tempServices]
                      arr[i].price = parseFloat(text) || 0
                      setTempServices(arr)
                    }}
                  />
                  <TouchableOpacity onPress={() => handleRemoveService(i)}>
                    <Text style={{ color: 'red', marginVertical: 5 }}>Remove</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>

            <View style={styles.serviceBtnContainerCover}>
              <TouchableOpacity style={styles.addServiceBtn} onPress={handleAddService}>
                <Text style={styles.addBtnText}>+ Add Service</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveServiceBtn}
                onPress={() => {
                  setUpdatedProfile((p) => p! && { ...p, services: tempServices })
                  setServicesModalVisible(false)
                }}>
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

  captionText: {
    fontSize: 16,
    fontWeight: 'medium'
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
    justifyContent: 'space-between',
    marginTop: 10
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
