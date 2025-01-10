import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import PhoneInput from 'react-native-phone-number-input'
import { appTheme } from 'src/config/theme'
import { Link, router, useNavigation } from 'expo-router'
import DropDownPicker from 'react-native-dropdown-picker'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { RESET_AUTH, registerUserSlice } from 'src/redux/auth/authSlice'

interface FormData {
  id?: number | null
  fullName: string
  email: string
  phone: string
  role: string | null
  address?: string | undefined
  password: string
  confirmPassword: string
  profileImage?: string
}

const initialState: FormData = {
  id: null,
  fullName: '',
  email: '',
  phone: '',
  role: null,
  address: '',
  password: '',
  confirmPassword: '',
  profileImage: ''
}

const Register: React.FC = () => {
  const [userData, setUserData] = useState<FormData>(initialState)

  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const [errors, setErrors] = useState<{ [key in keyof FormData]?: string }>({})

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

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      Alert.alert('Registration Successful.')
      router.navigate('/')
    }

    dispatch(RESET_AUTH())
  }, [isSuccess, isLoggedIn, dispatch])

  const handleRegister = async () => {
    if (userData.password !== userData.confirmPassword) {
      return Alert.alert('Passwords do not match')
    }

    const formData = {
      ...userData,
      address: userData.address ?? null
    }

    console.log(userData)

    await dispatch(registerUserSlice(formData))
  }

  return (
    <View style={styles.authContainer}>
      <View style={styles.topBar}>
        <View style={styles.titleCover}>
          <Text style={styles.title}>Welcome</Text>
        </View>
      </View>

      <View style={styles.inputContainer}>
        {/* {currentStep === 1 && ( */}
        <>
          <TextInput
            placeholder="Full Name"
            value={userData.fullName}
            onChangeText={(value) => handleInputChange('fullName', value)}
            placeholderTextColor={appTheme.themeGray}
            onBlur={() => handleBlur('fullName')}
            style={styles.input}
          />
          {errors.fullName && <Text style={{ color: 'red' }}>{errors.fullName}</Text>}

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
            value={userData.phone}
            onChangeText={(value) => handleInputChange('phone', value)}
          />

          <View style={styles.addressContainer}>
            <Ionicons name="location" size={20} color="grey" style={styles.addressIcon} />
            <TextInput
              placeholder="Address"
              value={userData.address}
              onChangeText={(value) => handleInputChange('address', value)}
              placeholderTextColor={appTheme.themeGray}
              style={styles.addressInput}
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
              value={userData.confirmPassword}
              onChangeText={(value) => handleInputChange('confirmPassword', value)}
              placeholderTextColor={appTheme.themeGray}
              onBlur={() => handleBlur('confirmPassword')}
              style={styles.passwordInput}
              secureTextEntry={!confirmPasswordVisible}
            />

            <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
              <Ionicons name={passwordVisible ? 'eye-off' : 'eye'} size={20} color="grey" style={styles.inputIcon} />
            </TouchableOpacity>
          </View>
          {errors.confirmPassword && <Text style={{ color: 'red' }}>{errors.confirmPassword}</Text>}
        </>

        <>
          {/* <LinkButton href="/StylistHomeScreen" text="Register" onPress={handleRegister} /> */}
          <TouchableOpacity style={styles.btnCover} onPress={handleRegister}>
            <Text style={styles.btnText}>Register</Text>
          </TouchableOpacity>
        </>

        <Text style={styles.belowTextCover}>
          Already have an account?{' '}
          <Link href={'/(auth)/login'} style={styles.belowText}>
            Login
          </Link>
        </Text>
      </View>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    // justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: appTheme.secondary,
    // backgroundColor: 'red',
    paddingTop: 100
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

  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingLeft: 10,
    marginVertical: 8
    // marginBottom: 50
  },

  addressInput: {
    flex: 1,
    padding: 24,
    fontSize: 18
  },

  addressIcon: {
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

  belowTextCover: {
    textAlign: 'center',
    // marginTop: 20,
    marginBottom: 100,
    fontSize: 16
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
