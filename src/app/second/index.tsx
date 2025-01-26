import { Stack } from 'expo-router'
import LinkButton from 'src/components/LinkButton'
import ScreenLayout from 'src/components/ScreenLayout'
import { View, Text, StyleSheet } from 'react-native'
import { appTheme } from 'src/config/theme'

export default function SecondScreen() {
  return (
    <ScreenLayout testID="second-screen-layout">
      <View style={styles.content} testID="second-screen-content">
        <Stack.Screen options={{ title: 'Second Screen' }} />

        <Text style={styles.title} testID="second-screen-title">
          🥈
        </Text>
        <Text style={styles.text} testID="second-screen-text">
          Go to app/second/index.tsx to edit
        </Text>

        {/* <LinkButton href="/" text="Go To Home Screen" /> */}
      </View>
    </ScreenLayout>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: appTheme.primary,
    fontFamily: 'helvetica',
    fontWeight: '900',
    fontSize: 40, // Replace with your desired size
    marginBottom: 10 // Replace with your desired margin
  },
  text: {
    color: appTheme.primary,
    fontFamily: 'helvetica',
    fontWeight: '600',
    fontSize: 15, // Replace with your desired size
    marginBottom: 15 // Replace with your desired margin
  }
})
