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

  useEffect(() => {
    setUserRole(userRole)
  }, [userRole, user])

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
        name="AppointmentBookingScreen"
        options={{
          title: 'Bookings',
          href: userRole === 'customer' ? null : undefined,
          headerTitle: 'Your Bookings',
          // tabBarLabel: 'Auth',
          headerShown: true,
          tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'calendar' : 'calendar-outline'} color={appTheme.primary} size={24} />
        }}
      />

      {/* <Tabs.Screen
        name="ScheduleScreen"
        options={{
          title: 'Schedule',
          // href: userRole === 'stylist' ? null : undefined,
          href: null,
          headerTitle: 'Schedule Bookings',
          // tabBarLabel: 'Auth',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'calendar' : 'calendar-outline'} color={appTheme.primary} size={24} />
        }}
      /> */}

      <Tabs.Screen
        name="CustomerPastBookings"
        options={{
          title: 'Bookings',
          href: userRole === 'stylist' ? null : undefined,
          // href: null,
          headerTitle: 'Your Bookings',
          // tabBarLabel: 'Auth',
          headerShown: true,
          tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'calendar' : 'calendar-outline'} color={appTheme.primary} size={24} />
        }}
      />

      <Tabs.Screen
        name="CustomerProfileScreen"
        options={{
          title: 'Profile',
          href: userRole === 'stylist' ? null : undefined,
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person-sharp' : 'person-outline'} color={appTheme.primary} size={focused ? 32 : 32} />
          )
        }}
      />

      <Tabs.Screen
        name="StylistProfileScreen"
        options={{
          title: 'Profile',
          href: userRole === 'customer' ? null : undefined,
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person-sharp' : 'person-outline'} color={appTheme.primary} size={focused ? 32 : 32} />
          )
        }}
      />
    </Tabs>
  )
}
