import { Image, ImageBackground, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { appTheme } from 'src/config/theme'

export default function SecondScreen() {
  return (
    <View style={styles.Content}>
      <LinearGradient colors={['transparent', 'white']} style={styles.gradient}>
        <ImageBackground source={require('../../assets/images/onboarding/Stylist3.png')} style={styles.backgroundImage}>
          <View style={styles.overlay}>
            <View style={styles.titleCover}>
              <Image source={require('../../assets/images/Logo.png')} style={styles.logo} />
              <Text style={styles.title}>EzWait</Text>
            </View>

            <Text style={styles.subtitle}>Schedule easily within a second. Reserve and manage your appointments</Text>
          </View>
        </ImageBackground>
      </LinearGradient>
    </View>
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
    marginBottom: 200,
    maxWidth: '60%'
  }
})
