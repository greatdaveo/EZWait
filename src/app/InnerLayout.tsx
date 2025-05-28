import { Stack } from 'expo-router'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'

export default function InnerLayout() {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth)

  return (
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
  )
}
