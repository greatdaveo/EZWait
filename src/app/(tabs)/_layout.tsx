import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { useState } from 'react'
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import { appTheme } from 'src/config/theme'

export default function TabLayout() {
  const [userRole, setUserRole] = useState('stylist')

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: appTheme.primary,
        tabBarInactiveTintColor: appTheme.primary,
        headerShown: false
        // headerStyle: {
        //   backgroundColor: '#25292e'
        // }
        // headerShadowVisible: false,
        // headerTintColor: 'green',
        // tabBarStyle: {
        //   backgroundColor: '#25292e'
        // }
      }}>
      <Tabs.Screen
        name="StylistHomeScreen"
        options={{
          title: 'Home',
          headerTitle: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} color={focused ? appTheme.primary : appTheme.primary} size={24} />
          ),

          tabBarButton: (props) => (userRole === 'stylist' ? <TouchableOpacity {...props} /> : null)
        }}
      />

      <Tabs.Screen
        name="CustomerHomeScreen"
        options={{
          title: 'Home',
          headerTitle: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} color={focused ? appTheme.primary : appTheme.primary} size={24} />
          ),

          tabBarButton: (props) => (userRole === 'customer' ? <TouchableOpacity /> : null)
        }}
      />

      <Tabs.Screen
        name="BookingScreen"
        options={{
          title: 'Bookings',
          headerTitle: 'Booking dashboard',
          // tabBarLabel: 'Auth',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'calendar' : 'calendar-outline'} color={appTheme.primary} size={24} />
        }}
      />

      <Tabs.Screen
        name="SearchScreen"
        options={{
          title: 'Search',
          headerTitle: 'Search',
          headerShown: true,
          tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'search-sharp' : 'search-outline'} color={appTheme.primary} size={24} />
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
        name="ProfileScreen"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person-circle-sharp' : 'person-circle-outline'} color={appTheme.primary} size={focused ? 32 : 32} />
          )
        }}
      />
    </Tabs>
  )
}
