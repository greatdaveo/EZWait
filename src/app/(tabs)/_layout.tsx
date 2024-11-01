import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { SafeAreaView, StyleSheet } from 'react-native'
import { appTheme } from 'src/config/theme'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: appTheme.primary,
        tabBarInactiveTintColor: appTheme.primary,
        headerShown: false
        // headerStyle: {
        //   backgroundColor: '#25292e'
        // },
        // headerShadowVisible: false,
        // headerTintColor: 'green',
        // tabBarStyle: {
        //   // backgroundColor: '#25292e'
        // }
      }}>
        
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerTitle: 'Home Page',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={appTheme.primary} size={24} />
        }}
      />

      <Tabs.Screen
        name="DashboardScreen"
        options={{
          title: 'Dashboard',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'person' : 'person-outline'} color={appTheme.primary} size={24} />
        }}
      />

      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          headerTitle: 'Calendar Page',
          // tabBarLabel: 'Auth',
          headerShown: true,
          tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'calendar' : 'calendar-outline'} color={appTheme.primary} size={24} />
        }}
      />

      <Tabs.Screen
        name="SettingsScreen"
        options={{
          title: 'Settings',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'settings' : 'settings-outline'} color={appTheme.primary} size={24} />
        }}
      />
    </Tabs>
  )
}
