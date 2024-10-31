import { Link } from 'expo-router'
import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import LinkButton from 'src/components/LinkButton'
import { Ionicons } from '@expo/vector-icons'
import PhoneInput from 'react-native-phone-number-input'
import { appTheme } from 'src/config/theme'
import { launchImageLibrary } from 'react-native-image-picker'

const onboardingSteps = [
  { step: 1, label: 'Step 1' },
  { step: 2, label: 'Step 2' },
  { step: 3, label: 'Step 3' },
  { step: 4, label: 'Step 4' },
  { step: 5, label: 'Step 5' }
]

export default function AuthScreen({ title }: { title: string }) {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [profileImage, setProfileImage] = useState<string | null>(null)

  // To navigate to the next step
  const handleNextStep = () => {
    if (currentStep < onboardingSteps.length) {
      setCurrentStep((prevStep) => prevStep + 1)
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1)
    }
  }

  return (
    <View style={styles.authContainer}>
      {/* Top Bar with Back Icon and Title */}
      {title === 'Personal Information' && (
        <View style={styles.topBar}>
          <TouchableOpacity onPress={handlePreviousStep}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          <View style={styles.titleCover}>
            <Text style={styles.title}>Register</Text>
          </View>
        </View>
      )}

      {/* Onboarding Steps */}
      {title === 'Personal Information' && (
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
      )}

      <View style={styles.inputContainer}>
        <Text style={styles.authTitle}>{title}</Text>
        {title === 'Personal Information' && <TextInput placeholder="Full Name" style={styles.input} />}
        <TextInput placeholder="Email" style={styles.input} />
        <View style={styles.passwordContainer}>
          <TextInput placeholder="Password" style={styles.passwordInput} secureTextEntry={!passwordVisible} />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Ionicons name={passwordVisible ? 'eye-off' : 'eye'} size={20} color="grey" style={styles.inputIcon} />
          </TouchableOpacity>
        </View>
        {title === 'Welcome Back' && <Text style={styles.forgotPasswordText}>Forgot Password?</Text>}
        {title === 'Personal Information' && (
          <View style={styles.passwordContainer}>
            <TextInput placeholder="Confirm Password" style={styles.passwordInput} secureTextEntry={!confirmPasswordVisible} />

            <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
              <Ionicons name={passwordVisible ? 'eye-off' : 'eye'} size={20} color="grey" style={styles.inputIcon} />
            </TouchableOpacity>
          </View>
        )}
        {title === 'Personal Information' && (
          <PhoneInput
            defaultCode="GB"
            layout="first"
            containerStyle={styles.phoneInputContainer}
            textContainerStyle={styles.phoneTextInput}
            textInputStyle={styles.phoneTextInputInner}
            placeholder="Phone Number"
          />
        )}

        {title === 'Personal Information' && (
          <View style={styles.addressContainer}>
            <Ionicons name="location" size={20} color="grey" style={styles.addressIcon} />
            <TextInput placeholder="Address" style={styles.addressInput} secureTextEntry={!confirmPasswordVisible} />
          </View>
        )}

        {/* Only show this when it is to Register */}
        {title === 'Personal Information' && currentStep < onboardingSteps.length ? (
          <TouchableOpacity style={styles.nextButton} onPress={handleNextStep}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <View>
            {title === 'Personal Information' && <LinkButton href="/register" text="Register" />}
            {/* Only show this when it is to Login */}
            {title === 'Welcome Back' && <LinkButton href="/login" text={title === 'Welcome Back' ? 'Login' : 'Register'} />}
          </View>
        )}
      </View>

      {currentStep === 2 && (
        <View style={styles.imageUploadContainer}>
          <Text>Upload Your Picture</Text>

          <TouchableOpacity>
            {profileImage ? <Image source={{ uri: profileImage }} style={styles.profileImage} /> : <Ionicons name="person" size={100} color="gray" />}
          </TouchableOpacity>

          <Text>Upload Profile Picture</Text>
        </View>
      )}

      <View>
        {title === 'Welcome Back' && (
          <Text style={styles.belowTextCover}>
            Don't have an account?{' '}
            <Link href={'/auth/register'} style={styles.belowText}>
              {title === 'Welcome Back' ? 'Register now' : 'Login'}
            </Link>
          </Text>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },

  titleCover: {
    flexDirection: 'row'
    // justifyContent: 'center',
    // alignItems: 'center'
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: '36%'
  },

  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20
  },

  stepIcon: {
    marginHorizontal: 5
  },

  authContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20
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
  },

  input: {
    // flex: 1,
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
    // marginVertical: 8
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
    alignItems: 'center'
    // marginTop: 20,
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
    textAlign: 'center'
  },

  belowText: {
    fontWeight: 'bold'
  },

  // For Step 2
  imageUploadContainer: {},

  profileImage: {}
})
