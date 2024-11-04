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
        name="DashboardScreen"
        options={{
          title: 'Dashboard',
          headerTitle: 'Dashboard',
          headerShown: true,
          tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'person-sharp' : 'person-outline'} color={appTheme.primary} size={24} />
        }}
      />

      <Tabs.Screen
        name="ScheduleScreen"
        options={{
          title: 'Schedule',
          headerTitle: 'Schedule',
          // tabBarLabel: 'Auth',
          headerShown: true,
          tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'calendar' : 'calendar-outline'} color={appTheme.primary} size={24} />
        }}
      />

      <Tabs.Screen
        name="HistoryScreen"
        options={{
          title: 'History',
          headerTitle: 'History',
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'notifications' : 'notifications-outline'} color={appTheme.primary} size={24} />
          )
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
