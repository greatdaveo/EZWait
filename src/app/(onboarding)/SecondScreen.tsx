import LinkButton from 'src/components/LinkButton'
import ScreenLayout from 'src/components/ScreenLayout'
import { Image, ImageBackground, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { appTheme } from 'src/config/theme'
import { Link } from 'expo-router'

export default function SecondScreen() {
  return (
    <ScreenLayout testID="home-screen-layout">
      <View style={styles.Content}>
        <ImageBackground source={require('../../assets/images/backgroundImg.png')} style={styles.backgroundImage}>
          <LinearGradient colors={['transparent', 'white']} style={styles.gradient}>
            <View style={styles.overlay}>
              <Image source={require('../../assets/images/Logo.png')} style={styles.logo} />
              <Text style={styles.title}>Book in seconds with EZWait</Text>
              <Text style={styles.subtitle}>Schedule easily within a second. Reserve and manage your appointments</Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
    </ScreenLayout>
  )
}

const styles = StyleSheet.create({
  Content: {
    flex: 1
    // backgroundColor: '#fff'
  },

  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '90%',
    justifyContent: 'space-between'

  },

  gradient: {
    ...StyleSheet.absoluteFillObject
  },

  logo: {},

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },

  title: {
    color: appTheme.secondary,
    fontSize: 42,
    paddingHorizontal: 30,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20
  },

  subtitle: {
    color: appTheme.secondary2,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20
  }
})
