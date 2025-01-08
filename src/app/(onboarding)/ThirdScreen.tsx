import LinkButton from 'src/components/LinkButton'
import ScreenLayout from 'src/components/ScreenLayout'
import { Button, ImageBackground, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { appTheme } from 'src/config/theme'
import { Link, router, useNavigation } from 'expo-router'
import { Image } from 'react-native'

export default function ThirdScreen() {
  const onPress = () => {}

  return (
    // <ScreenLayout testID="home-screen-layout">
    <View style={styles.Content}>
      <ImageBackground source={require('../../assets/images/backgroundImg.png')} style={styles.backgroundImage}>
        <LinearGradient colors={['transparent', 'white']} style={styles.gradient}>
          <View style={styles.overlay}>
            <Image source={require('../../assets/images/Logo.png')} style={styles.logo} />

            <Text style={styles.title}>EZWait Got You.</Text>
            <Text style={styles.subtitle}>No more waiting time at the barber's shop</Text>
          </View>
        </LinearGradient>

        <View style={styles.buttonContainer}>
          <LinkButton href="/(auth)/login" text="Get Started" onPress={onPress} />
        </View>

        {/* <View style={styles.buttonContainer}>
          <LinkButton href="/screens/UserHomeScreen" text="Get Started" onPress={onPress} />
        </View> */}
      </ImageBackground>
    </View>
    //  </ScreenLayout>
  )
}

const styles = StyleSheet.create({
  Content: {
    flex: 1
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
  },

  buttonContainer: {
    gap: 15,
    textAlign: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 700
  }
})
