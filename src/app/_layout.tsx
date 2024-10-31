import 'expo-dev-client'
import { ThemeProvider as NavProvider } from '@react-navigation/native'
import { Slot, Stack, Tabs } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import styled, { ThemeProvider, type DefaultTheme } from 'styled-components/native'
import { appTheme, navTheme } from 'src/config/theme'
import { Button, SafeAreaView, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function AppLayout() {
  return (
    <SafeAreaView style={s.AppWrapper}>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        {/* <Stack.Screen name="auth/register" options={{ headerShown: false }} /> */}

        <Stack.Screen
          name="+not-found"
          options={{
            title: 'Page Not Found'
          }}
        />

        {/* <Stack.Screen name="auth/index" options={{ title: 'Auth' }} /> */}
      </Stack>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  AppWrapper: {
    flex: 1,
    backgroundColor: appTheme.secondary,
    paddingTop: 0
  }
})
