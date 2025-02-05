import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import Swiper from 'react-native-swiper'
import { useRouter } from 'expo-router'
import FirstScreen from './FirstScreen'
import SecondScreen from './SecondScreen'
import ThirdScreen from './ThirdScreen'
import { appTheme } from 'src/config/theme'

export default function OnboardingScreen() {
  const router = useRouter()

  return (
    <Swiper loop={false} horizontal={true} showsPagination={true} activeDotColor={appTheme.primary} style={styles.wrapper}>
      {/* <FirstScreen /> */}
      {/* <SecondScreen /> */}
      <ThirdScreen />
    </Swiper>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    // flex: 1
  }
})
