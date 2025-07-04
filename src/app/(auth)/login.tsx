import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Button, Pressable, ActivityIndicator, Platform, StatusBar } from 'react-native'
import { Link, router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { appTheme } from 'src/config/theme'
import { useDispatch, useSelector } from 'react-redux'
import { RESET_AUTH, loginUserSlice } from 'src/redux/auth/authSlice'
import { AppDispatch, RootState } from 'src/redux/store'

const Login: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState('')
  const { user, isLoggedIn, isLoading, isSuccess } = useSelector((state: RootState) => state.auth)

  const dispatch = useDispatch<AppDispatch>()
  // const router = useRouter()

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      router.navigate('/(tabs)/ProtectedHomeScreen')
    }

    dispatch(RESET_AUTH())
  }, [isSuccess, isLoggedIn, dispatch])

  const validEMail = (email: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

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

        <TouchableOpacity style={styles.btnCover} onPress={handleLogin}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.belowCover}>
        <Text style={styles.belowTextCover}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
          <Text style={styles.belowText}>Sign Up</Text>
        </TouchableOpacity>
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
  },

  belowCover: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5
    // marginTop: -50
  },

  belowTextCover: {
    textAlign: 'center'
  },

  belowText: {
    fontWeight: 'bold',
    color: appTheme.primary
  }
})
