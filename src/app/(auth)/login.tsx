import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { appTheme } from 'src/config/theme'
import LinkButton from 'src/components/LinkButton'

export default function Login({ title }: { title: string }) {
  const [passwordVisible, setPasswordVisible] = useState(false)

  return (
    <View style={styles.authContainer}>
      {/* <Text style={styles.authTitle}>{title}</Text> */}

      <View style={styles.inputContainer}>
        <Text style={styles.authTitle}>Welcome Back</Text>

        <TextInput placeholder="Email" placeholderTextColor={appTheme.themeGray} style={styles.input} />
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            placeholderTextColor={appTheme.themeGray}
            style={styles.passwordInput}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Ionicons name={passwordVisible ? 'eye-off' : 'eye'} size={20} color="grey" style={styles.inputIcon} />
          </TouchableOpacity>
        </View>

        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>

        <LinkButton href="/login" text="Login" />
      </View>

      <View>
        <Text style={styles.belowTextCover}>
          Don't have an account?{' '}
          <Link href={'/(auth)/register'} style={styles.belowText}>
            Sign Up
          </Link>
        </Text>
      </View>
    </View>
  )
}

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

  belowTextCover: {
    textAlign: 'center',
    marginTop: -50
  },

  belowText: {
    fontWeight: 'bold',
    color: appTheme.primary
  }
})
