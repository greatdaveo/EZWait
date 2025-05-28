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
import AsyncStorage from '@react-native-async-storage/async-storage'

const Login: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState('')
  const { user, isLoggedIn, isLoading, isSuccess, isError } = useSelector((state: RootState) => state.auth)
  const [userRole, setUserRole] = useState<string>(user?.data?.role)

  const dispatch = useDispatch<AppDispatch>()

  const validEMail = (email: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      // Alert.alert('Login Successful.')
      router.navigate(userRole === 'stylist' ? '/(tabs)/StylistHomeScreen' : '/(tabs)/CustomerHomeScreen')
    }

    // if (isError) {
    //   Alert.alert('Incorrect Email or Password')
    // }

    dispatch(RESET_AUTH())
  }, [isSuccess, isLoggedIn, isError, dispatch, userRole])

  const handleLogin = async () => {
    if (!validEMail(email)) {
      Alert.alert('Please enter a valid email')
      return
    }

    const payload = { email, password }
    // console.log(payload)
    await dispatch(loginUserSlice(payload))
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

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7'
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
