import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Button, Pressable, ActivityIndicator } from 'react-native'
import { Link, router, useNavigation } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { appTheme } from 'src/config/theme'
import LinkButton from 'src/components/LinkButton'
import { fetchSignInMethodsForEmail, getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const Login: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // const navigation = useNavigation()

  const validEMail = (email: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleLogin = async () => {
    if (!validEMail(email)) {
      Alert.alert('Please enter a valid email')
      return
    }

    try {
      const auth = getAuth()

      const userCredentials = await signInWithEmailAndPassword(auth, email, password)
      setIsLoading(true)
      if (userCredentials) {
        // console.log('Logged in users: ', userCredentials.user)
        router.push('/(tabs)/DashboardScreen')
        setIsLoading(false)
      } else {
        setIsLoading(false)
        Alert.alert('User does not exist, kindly sign up')
        return
      }
    } catch (error: any) {
      setIsLoading(false)
      console.log('Unable to login: ', error.code)
      setError(error.message)
      if (error.code === 'auth/wrong-password') {
        Alert.alert('Incorrect Password', 'The password you entered is incorrect.')
      } else if (error.code === 'auth/user-not-found') {
        Alert.alert('User Not Found', 'No account found with this email address.')
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Invalid Email', 'Please enter a valid email address.')
      } else {
        Alert.alert('Login Error', error.message)
      }
    }
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
