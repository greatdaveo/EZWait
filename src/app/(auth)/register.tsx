import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import PhoneInput from 'react-native-phone-number-input'
import { appTheme } from 'src/config/theme'
import { Link, router, useNavigation } from 'expo-router'
import DropDownPicker from 'react-native-dropdown-picker'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { RESET_AUTH, registerUserSlice } from 'src/redux/auth/authSlice'
import * as Location from 'expo-location'
import axios from 'axios'

interface FormData {
  name: string
  email: string
  number: string
  role: string | null
  location?: string | undefined
  password: string
  confirm_password: string
  // profileImage?: string
}

const initialState: FormData = {
  name: '',
  email: '',
  number: '',
  role: null,
  location: '',
  password: '',
  confirm_password: ''
  // profileImage: ''
}

const Register: React.FC = () => {
  const [userData, setUserData] = useState<FormData>(initialState)

  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const [errors, setErrors] = useState<{ [key in keyof FormData]?: string }>({})
  const [loading, setLoading] = useState(false)

  const { isLoading, isLoggedIn, isSuccess, isError } = useSelector((state: RootState) => state.auth)

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigation()

  const [open, setOpen] = useState(false)
  const [dropdownItems, setDropdownItems] = useState([
    { label: 'Customer', value: 'customer' },
    { label: 'Stylist', value: 'stylist' }
  ])

  const handleBlur = (field: keyof FormData) => {
    if (!userData[field]) {
      setErrors((prev) => ({ ...prev, [field]: `${field} is required` }))
    } else {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setUserData((prev) => ({ ...prev, [field]: value }))
  }

  // const fetchLocation = async () => {
  //   try {
  //     setLoading(true)
  //     const {} = await Location.requestForegroundPermissionsAsync()
  //     if (status != 'granted') {
  //       Alert.alert('Permission Denied', 'Location access is required.')
  //       return
  //     }

  //     const location = await Location.getCurrentPositionAsync({})
  //     const { latitude, longitude } = location.coords

  //     const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
  //       params: {
  //         latlng: `${latitude},${longitude}`,
  //         key: 'MY_API_KEY'
  //       }
  //     })

  //     const address = response.data.results[0]?.formatted_address || 'Unknown'
  //     handleInputChange('location', address)
  //   } catch (error) {
  //     Alert.alert('Error', 'Unable to fetch location.')
  //     console.error(error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  useEffect(() => {
    // fetchLocation()

    if (isSuccess && isLoggedIn) {
      Alert.alert('Registration Successful.')
      router.navigate('/(auth)/login')
    }

    dispatch(RESET_AUTH())
  }, [isSuccess, isLoggedIn, dispatch])

  const handleRegister = async () => {
    const { name, email, number, role, password, confirm_password, location } = userData

    if (!name || !email || !number || !role || !password || !confirm_password) {
      return Alert.alert('All fields are required.')
    }

    if (password !== confirm_password) {
      return Alert.alert('Passwords do not match.')
    }

    const payload = {
      name,
      email,
      number,
      role,
      location: location || null,
      password,
      confirm_password
    }

    // console.log(userData)

    await dispatch(registerUserSlice(payload))
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={appTheme.primary} />
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.authContainer}>
      <View style={styles.topBar}>
        <View style={styles.titleCover}>
          <Text style={styles.title}>Welcome</Text>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <>
          <TextInput
            placeholder="Full Name"
            value={userData.name}
            onChangeText={(value) => handleInputChange('name', value)}
            placeholderTextColor={appTheme.themeGray}
            onBlur={() => handleBlur('name')}
            style={styles.input}
          />

          {errors.name && <Text style={{ color: 'red' }}>{errors.name} </Text>}

          <TextInput
            placeholder="Email"
            value={userData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            placeholderTextColor={appTheme.themeGray}
            onBlur={() => handleBlur('email')}
            style={styles.input}
          />
          {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}

          <DropDownPicker
            open={open}
            value={userData.role}
            items={dropdownItems}
            setOpen={setOpen}
            placeholder="Select a role"
            // setValue={(callback) => handleInputChange('role', callback(userData.role))}
            setValue={(callback) => {
              const value = callback(userData.role)
              handleInputChange('role', value)
            }}
            setItems={setDropdownItems}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            textStyle={styles.dropdownText}
            labelStyle={styles.dropdownLabel}
            // onChangeValue={(value) => handleInputChange('role', value)}
          />

          <PhoneInput
            defaultCode="GB"
            layout="first"
            containerStyle={styles.phoneInputContainer}
            textContainerStyle={styles.phoneTextInput}
            textInputStyle={styles.phoneTextInputInner}
            placeholder="Phone Number"
            value={userData?.number}
            onChangeFormattedText={(value) => handleInputChange('number', value)}
          />

          <View style={styles.locationContainer}>
            <Ionicons name="location" size={20} color="grey" style={styles.locationIcon} />
            <TextInput
              placeholder="Location"
              value={userData.location}
              onChangeText={(value) => handleInputChange('location', value)}
              placeholderTextColor={appTheme.themeGray}
              style={styles.locationInput}
              editable={!loading}
            />
          </View>

          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Password"
              value={userData.password}
              onChangeText={(value) => handleInputChange('password', value)}
              placeholderTextColor={appTheme.themeGray}
              style={styles.passwordInput}
              onBlur={() => handleBlur('password')}
              secureTextEntry={!passwordVisible}
            />

            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
              <Ionicons name={passwordVisible ? 'eye-off' : 'eye'} size={20} color="grey" style={styles.inputIcon} />
            </TouchableOpacity>
          </View>
          {errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}

          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Confirm Password"
              value={userData.confirm_password}
              onChangeText={(value) => handleInputChange('confirm_password', value)}
              placeholderTextColor={appTheme.themeGray}
              onBlur={() => handleBlur('confirm_password')}
              style={styles.passwordInput}
              secureTextEntry={!confirmPasswordVisible}
            />

            <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
              <Ionicons name={passwordVisible ? 'eye-off' : 'eye'} size={20} color="grey" style={styles.inputIcon} />
            </TouchableOpacity>
          </View>

          {errors.confirm_password && <Text style={{ color: 'red' }}>{errors.confirm_password}</Text>}
        </>

        <>
          {/* <LinkButton href="/StylistHomeScreen" text="Register" onPress={handleRegister} /> */}
          <TouchableOpacity style={styles.btnCover} onPress={handleRegister}>
            <Text style={styles.btnText}>Register</Text>
          </TouchableOpacity>
        </>

        <View style={styles.belowCover}>
          <Text style={styles.belowTextCover}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text style={styles.belowText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default Register

const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: appTheme.secondary,
    paddingTop: 80
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7'
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },

  titleCover: {
    flexDirection: 'row'
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: '36%'
  },

  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
    // marginVertical: 20
  },

  stepIcon: {
    marginHorizontal: 5
  },

  authTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center'
  },

  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    margin: 20
    // marginTop: -120
  },

  input: {
    backgroundColor: '#f2f2f2',
    padding: 24,
    fontSize: 18,
    borderRadius: 8,
    marginVertical: 8
  },

  // Dropdown

  dropdown: {
    // height: 50,
    borderRadius: 8,
    borderColor: 'white',
    backgroundColor: '#f2f2f2',
    marginBottom: 5,
    paddingVertical: 20,
    paddingHorizontal: 20
  },

  dropdownContainer: {
    borderColor: '#f2f2f2',
    // backgroundColor: '#f2f2f2',
    paddingVertical: 2,
    paddingHorizontal: 10
  },

  dropdownText: {
    fontSize: 18,
    color: '#aaa'
  },

  dropdownLabel: {
    // fontWeight: 'bold',
    fontSize: 14,
    color: '#333'
  },

  // :::::::::::::::

  passwordInput: {
    flex: 1,
    padding: 24,
    fontSize: 18
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10
  },

  inputIcon: {
    marginRight: 12
  },

  phoneInputContainer: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
    marginTop: 10
  },
  phoneTextInput: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8
  },
  phoneTextInputInner: {
    fontSize: 16
  },

  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingLeft: 10,
    marginVertical: 8
    // marginBottom: 50
  },

  locationInput: {
    flex: 1,
    padding: 24,
    fontSize: 18
  },

  locationIcon: {
    marginRight: -10,
    marginLeft: 20
  },

  authButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20
  },

  nextButton: {
    backgroundColor: appTheme.semi,
    borderWidth: 1,
    borderColor: appTheme.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20
  },
  nextButtonText: {
    color: appTheme.primary,
    fontSize: 16,
    fontWeight: '600',
    padding: 10
  },

  forgotPasswordText: {
    textAlign: 'right',
    margin: 10,
    marginBottom: 35
  },

  belowCover: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    marginTop: 10
    // marginTop: -50
  },

  belowTextCover: {
    textAlign: 'center'
  },

  belowText: {
    fontWeight: 'bold',
    color: appTheme.primary
  },

  // For Step 2
  imageUploadContainer: {
    // justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: -200
  },

  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  chooseFileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'gray',
    borderStyle: 'dotted',
    marginTop: 15,
    marginBottom: 200
  },

  chooseFileText: {
    fontSize: 16,
    color: 'gray',
    marginLeft: 5
  },

  uploadIcon: {
    marginRight: 5
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 10
  },

  // For Step 3
  preferencesContainer: {
    marginVertical: 20,
    marginBottom: 10,
    marginTop: -100
  },

  availabilityText: {
    fontSize: 16,
    marginVertical: 10
  },

  btnCover: {
    backgroundColor: appTheme.primary,
    alignItems: 'center',
    // paddingVertical: 20,
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20
  },

  btnText: {
    fontSize: 20,
    color: appTheme.secondary,
    textAlign: 'center',
    fontWeight: '600'
  }
})
