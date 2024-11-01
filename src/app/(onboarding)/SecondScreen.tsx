import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const SecondScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Welcome to Screen 2</Text>
      {/* <Button title="Get Started" onPress={() => router.push('(onboarding)/SecondScreen')} /> */}
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

export default SecondScreen
