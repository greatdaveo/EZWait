import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { appTheme } from 'src/config/theme'
import { RootState } from 'src/redux/store'

export default function TabLayout() {
  const { user } = useSelector((state: RootState) => state.auth)
  const [userRole, setUserRole] = useState<string>(user?.role)
  // console.log(user?.data?.role)
  // console.log(userRole)

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
        name="CustomerHomeScreen"
        options={{
          title: 'Home',
          href: userRole === 'stylist' ? null : undefined,
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} color={focused ? appTheme.primary : appTheme.primary} size={24} />
          )
        }}
      />

      <Tabs.Screen
        name="StylistHomeScreen"
        options={{
          title: 'Home',
          href: userRole === 'customer' ? null : undefined,
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} color={focused ? appTheme.primary : appTheme.primary} size={24} />
          )
        }}
      />

      <Tabs.Screen
        name="BookingScreen"
        options={{
          title: 'Bookings',
          href: userRole === 'customer' ? null : undefined,
          headerTitle: 'Booking dashboard',
          // tabBarLabel: 'Auth',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'calendar' : 'calendar-outline'} color={appTheme.primary} size={24} />
        }}
      />

      <Tabs.Screen
        name="ScheduleScreen"
        options={{
          title: 'Schedule',
          href: userRole === 'stylist' ? null : undefined,
          headerTitle: 'Schedule Bookings',
          // tabBarLabel: 'Auth',
          headerShown: true,
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
