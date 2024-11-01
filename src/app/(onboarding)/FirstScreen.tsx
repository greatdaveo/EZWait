import { useRouter } from 'expo-router'
import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

const FirstScreen = () => {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <Text>Welcome to Screen 1</Text>
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

export default FirstScreen

// import { View, Text } from 'react-native'
// import React from 'react'
// import { Redirect } from 'expo-router'

// const StartPage = () => {
//   return <Redirect href="/home" />
// }
