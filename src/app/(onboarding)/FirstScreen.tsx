import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { Link, useRouter } from 'expo-router'
import React from 'react'
import { View, Text, Button, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native'
import LinkButton from 'src/components/LinkButton'
import ScreenLayout from 'src/components/ScreenLayout'
import { appTheme } from 'src/config/theme'

const FirstScreen = () => {
  // const router = useRouter()

  return (
    <View style={styles.Content}>
      <LinearGradient colors={['transparent', 'white']} style={styles.gradient}>
        <ImageBackground source={require('../../assets/images/onboarding/Stylist2.png')} style={styles.backgroundImage}>
          <View style={styles.overlay}>
            <View style={styles.titleCover}>
              <Image source={require('../../assets/images/Logo.png')} style={styles.logo} />
              <Text style={styles.title}>EzWait</Text>
            </View>

            <Text style={styles.subtitle}>Wait For Your Stylist Easily...</Text>
          </View>
        </ImageBackground>
      </LinearGradient>
    </View>
  )
}

export default FirstScreen

const styles = StyleSheet.create({
  Content: {
    flex: 1
  },

  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end'
  },

  gradient: {
    ...StyleSheet.absoluteFillObject
  },

  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },

  titleCover: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
    // marginBottom: 100
  },

  logo: {
    width: 40,
    height: 35,
    resizeMode: 'contain',
    marginRight: 4
  },

  title: {
    color: appTheme.secondary,
    fontSize: 40,
    fontWeight: '500',
    textAlign: 'center'
    // marginBottom: 10
  },

  subtitle: {
    color: appTheme.secondary2,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 200
    // maxWidth: '60%',
    // fontWeight: 'bold'
  }
})
