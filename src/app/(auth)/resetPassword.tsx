import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import React, { useState } from 'react'
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { appTheme } from 'src/config/theme'

const ResetPassword = () => {
  const [email, setEmail] = useState('')

  const resetPassword = async () => {
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      console.log('Password reset email sent to: ', email)
      Alert.alert('Password reset email sent. Check your inbox')
    } catch (error: any) {
      console.error('Error sending password reset email:', error)
      alert('Unable to reset password')
      // throw error
    }
  }

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.instructions}>Enter your email address to receive a reset link.</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor={appTheme.themeGray}
        style={styles.input}
      />
      <Button title="Send Reset Email" onPress={resetPassword} />
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: appTheme.secondary
  },

  input: {
    backgroundColor: '#f2f2f2',
    borderColor: '#ddd',
    padding: 24,
    fontSize: 18,
    borderRadius: 8,
    marginVertical: 8
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333'
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666'
  }
})

export default ResetPassword
