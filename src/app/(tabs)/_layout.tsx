import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { useSelector } from 'react-redux'
import { appTheme } from 'src/config/theme'
import { RootState } from 'src/redux/store'

export default function TabLayout() {
  const { user, isLoggedIn, isLoading, isSuccess } = useSelector((state: RootState) => state.auth)
  const role = user?.role

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
        name="ProtectedHomeScreen"
        options={{
          title: 'Home',
          headerShown: role === 'stylist' ? true : false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} color={focused ? appTheme.primary : appTheme.primary} size={24} />
          )
        }}
      />

      <Tabs.Screen
        name="ProtectedBookingsScreen"
        options={{
          title: 'Your Bookings',
          headerShown: true,
          tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'calendar' : 'calendar-outline'} color={appTheme.primary} size={24} />
        }}
      />

      <Tabs.Screen
        name="ProtectedProfileScreen"
        options={{
          title: 'Profile',
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person-sharp' : 'person-outline'} color={appTheme.primary} size={focused ? 32 : 32} />
          )
        }}
      />
    </Tabs>
  )
}
