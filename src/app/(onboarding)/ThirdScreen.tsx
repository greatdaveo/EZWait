import { ImageBackground, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { appTheme } from 'src/config/theme'
import { Link, router, useNavigation } from 'expo-router'
import { Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function ThirdScreen() {
  return (
    <View style={styles.Content}>
      <LinearGradient colors={['transparent', 'white']} style={styles.gradient}>
        <ImageBackground source={require('../../assets/images/onboarding/Stylist1.png')} style={styles.backgroundImage}>
          <View style={styles.overlay}>
            <View style={styles.titleCover}>
              <Image source={require('../../assets/images/Logo.png')} style={styles.logo} />
              <Text style={styles.title}>EzWait</Text>
            </View>

            <Text style={styles.subtitle}>Book top stylist easily and stay sharp. Your perfect style is a tap away!</Text>

            <TouchableOpacity style={styles.buttonContainer} onPress={() => router.push('/(auth)/login')}>
              <Text style={styles.btnText}>Get Started</Text>
              <Ionicons name="arrow-forward" color={'white'} size={20} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </LinearGradient>
    </View>
  )
}

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
    marginBottom: 20,
    maxWidth: '60%'
  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appTheme.primary,
    width: 'auto',
    margin: 'auto',
    padding: 15,
    marginTop: 30,
    marginBottom: 100,
    borderRadius: 10,
    gap: 10
  },

  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
    // marginRight: 5
  }
})
