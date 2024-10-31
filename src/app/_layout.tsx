import 'expo-dev-client'
import { ThemeProvider as NavProvider } from '@react-navigation/native'
import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import styled, { ThemeProvider, type DefaultTheme } from 'styled-components/native'
import { appTheme, navTheme } from 'src/config/theme'
import { SafeAreaView, StyleSheet } from 'react-native'

export default function AppLayout() {
  return (
    <ThemeProvider theme={appTheme as DefaultTheme}>
      <StatusBar style="light" />
      <SafeAreaView style={s.AppWrapper}>
        <NavProvider value={navTheme}>
          <Slot screenOptions={{ headerShown: false }} />
        </NavProvider>
      </SafeAreaView>
    </ThemeProvider>
  )
}

const s = StyleSheet.create({
  AppWrapper: {
    flex: 1,
    // flexDirection: 'column',
    backgroundColor: appTheme.secondary
  }
})
