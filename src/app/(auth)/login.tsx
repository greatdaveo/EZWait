import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Button, Pressable, ActivityIndicator } from 'react-native'
import { Link, router, useNavigation } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { appTheme } from 'src/config/theme'
import LinkButton from 'src/components/LinkButton'
import { fetchSignInMethodsForEmail, getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { RESET_AUTH, loginUserSlice } from 'src/redux/auth/authSlice'
import { AppDispatch, RootState } from 'src/redux/store'

// interface FormData {
//   name: string
//   email: string
// }

// const initialState: FormData = {
//   name: '',
//   email: ''
// }

const Login: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { isLoggedIn, isSuccess, isError } = useSelector((state: RootState) => state.auth)

  const dispatch = useDispatch<AppDispatch>()

  // const navigation = useNavigation()

  const validEMail = (email: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      Alert.alert('Login Successful.')
      router.navigate('/(tabs)/BookingScreen')
    }

    if (isError) {
      Alert.alert('Invalid Email or Password')
    }

    dispatch(RESET_AUTH())
  }, [isSuccess, isLoggedIn, isError, dispatch])

  const handleLogin = async () => {
    if (!validEMail(email)) {
      Alert.alert('Please enter a valid email')
      return
    }

    const payload = { email, password }
    await dispatch(loginUserSlice(payload))
  }

  if (isLoading) {
    return <ActivityIndicator size="large" color={appTheme.primary} />
  }

  return (
    <View style={styles.authContainer}>
      {/* <Text style={styles.authTitle}>{title}</Text> */}

      <View style={styles.inputContainer}>
        <Text style={styles.authTitle}>Welcome Back</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text)
            setError('')
          }}
          placeholderTextColor={appTheme.themeGray}
          style={styles.input}
          autoCapitalize="none"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            onChangeText={(text) => {
              setPassword(text)
              setError('')
            }}
            placeholderTextColor={appTheme.themeGray}
            style={styles.passwordInput}
            secureTextEntry={!passwordVisible}
          />

          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Ionicons name={passwordVisible ? 'eye-off' : 'eye'} size={20} color="grey" style={styles.inputIcon} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push('resetPassword')}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonCover}>
          <Button title="Login" onPress={handleLogin} color={appTheme.secondary} />
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.belowTextCover}>
          Don't have an account?{' '}
          <Link href="/(auth)/register" style={styles.belowText}>
            Sign Up
          </Link>
        </Text>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    paddingTop: 150,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 50,
    backgroundColor: appTheme.secondary
  },

  inputContainer: {
    margin: 20
  },

  authTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center'
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
    backgroundColor: '#f2f2f2',
    padding: 24,
    fontSize: 18,
    borderRadius: 8,
    marginVertical: 8
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

  forgotPasswordText: {
    textAlign: 'right',
    margin: 10,
    marginBottom: 35
  },

  buttonCover: {
    gap: 15,
    textAlign: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: appTheme.primary,
    color: appTheme.secondary,
    padding: 15,
    borderRadius: 10
  },

  belowTextCover: {
    textAlign: 'center',
    marginTop: -50
  },

  belowText: {
    fontWeight: 'bold',
    color: appTheme.primary
  }
})
