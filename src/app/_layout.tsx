import 'expo-dev-client'
import { Slot, Stack, Tabs } from 'expo-router'
import { appTheme, navTheme } from 'src/config/theme'
import { Button, SafeAreaView, StyleSheet, View } from 'react-native'
import { useState } from 'react'
import { Provider } from 'react-redux'
import store from 'src/redux/store'

export default function AppLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true)

  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        )}

        <Stack.Screen
          name="+not-found"
          options={{
            title: 'Page Not Found'
          }}
        />
      </Stack>
    </Provider>
  )
}

const s = StyleSheet.create({
  AppWrapper: {
    flex: 1,
    backgroundColor: appTheme.secondary,
    paddingTop: 0
  }
})
