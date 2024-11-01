import { useRouter } from 'expo-router'
import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

const ThirdScreen = () => {
  const router = useRouter()
  return (
    <View style={styles.container}>
      <Text>Welcome to Screen 3</Text>
      <Button title="Get Started" onPress={() => router.push('(auth)/login')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
})
export default ThirdScreen
