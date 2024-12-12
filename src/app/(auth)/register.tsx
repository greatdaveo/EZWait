import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import PhoneInput from 'react-native-phone-number-input'
import { appTheme } from 'src/config/theme'
import { Calendar } from 'react-native-calendars'
import { launchImageLibrary } from 'react-native-image-picker'
import LinkButton from 'src/components/LinkButton'
import { Link, router, useNavigation } from 'expo-router'
import { doc, setDoc } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { db } from 'src/firebase/firebaseConfig'

interface UserData {
  name: string
  email: string
  phone: string
  address?: string
  password: string
  confirmPassword: string
  profileImage?: string
}

const onboardingSteps = [
  { step: 1, label: 'Step 1' },
  { step: 2, label: 'Step 2' }
  // { step: 3, label: 'Step 3' }
  // { step: 4, label: 'Step 4' },
  // { step: 5, label: 'Step 5' }
]

const Register: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    profileImage: ''
  })

  // const [email, setEmail] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  // const [profileImage, setProfileImage] = useState<string | null>(null)
  const [serviceType, setServiceType] = useState('')
  const [errors, setErrors] = useState<{ [key in keyof UserData]?: string }>({})
  const navigate = useNavigation()

  const handleBlur = (field: keyof UserData) => {
    if (!userData[field]) {
      setErrors((prev) => ({ ...prev, [field]: `${field} is required` }))
    } else {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  // To navigate to the next step
  const handleNextStep = () => {
    if (currentStep < onboardingSteps.length) {
      registerUserData()
      setCurrentStep((prevStep) => prevStep + 1)
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1)
    }
  }

  const handleImageUpload = async () => {}

  const handleInputChange = (field: keyof UserData, value: string) => {
    setUserData((prev) => ({ ...prev, [field]: value }))
  }

  const registerUserData = async () => {
    const { name, email, password, confirmPassword, address, profileImage } = userData

    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    try {
      const auth = getAuth()
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredentials.user

      await setDoc(doc(db, 'users', user.uid), {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        profileImage: userData.profileImage
      })

      alert('User saved successfully!')
    } catch (error: any) {
      console.log('Error saving user: ', error)
      alert('Error Saving User Data')
    }
  }

  //   const navigation = useNavigation()

  return (
    <View style={styles.authContainer}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handlePreviousStep}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.titleCover}>
          <Text style={styles.title}>Register</Text>
        </View>
      </View>

      <View style={styles.stepsContainer}>
        {onboardingSteps.map((step, i) => (
          <Ionicons
            key={i}
            name={step.step <= currentStep ? 'ellipse' : 'ellipse-outline'}
            size={20}
            color={step.step <= currentStep ? appTheme.primary : 'gray'}
            style={styles.stepIcon}
          />
        ))}
      </View>

      {/* <Text style={styles.authTitle}>{title}</Text> */}
      {/* <Text style={styles.authTitle}>Personal Information</Text> */}

      <View style={styles.inputContainer}>
        {currentStep === 1 && (
          <>
            <TextInput
              placeholder="Full Name"
              value={userData.name}
              onChangeText={(value) => handleInputChange('name', value)}
              placeholderTextColor={appTheme.themeGray}
              onBlur={() => handleBlur('name')}
              style={styles.input}
            />
            {errors.name && <Text style={{ color: 'red' }}>{errors.name}</Text>}

            <TextInput
              placeholder="Email"
              value={userData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              placeholderTextColor={appTheme.themeGray}
              onBlur={() => handleBlur('email')}
              style={styles.input}
            />
            {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}

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
          </>
        )}
        {/* For Step 2: To Upload Picture */}
        {currentStep === 2 && (
          <View style={styles.imageUploadContainer}>
            <View>
              <Text style={styles.formTitle}>Upload Your Picture</Text>
              <TouchableOpacity onPress={handleImageUpload} style={styles.chooseFileButton}>
                <Ionicons name="add-circle" size={20} color="gray" style={styles.uploadIcon} />
                <Text style={styles.chooseFileText}>Choose File</Text>
              </TouchableOpacity>
            </View>

            {/* To display Profile Image if Selected */}
            {/* {profileImage && <Image source={{ uri: profileImage }} style={styles.profileImage} />} */}
          </View>
        )}
      </View>

      <View>
        {currentStep < onboardingSteps.length ? (
          <>
            <TouchableOpacity style={styles.nextButton} onPress={handleNextStep}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <LinkButton href="/HomeScreen" text="Register" onPress={registerUserData} />
          </>
        )}

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
    paddingTop: 60
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
    marginVertical: 8,
    marginBottom: 50
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
  }
})
