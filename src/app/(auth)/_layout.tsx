import { Stack } from 'expo-router'

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
          title: 'Login'
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          headerShown: false,
          title: 'Register'
        }}
      />
      <Stack.Screen
        name="resetPassword"
        options={{
          headerShown: true,
          headerTitle: 'Reset Password',
          headerBackTitle: 'Back'
        }}
      />
    </Stack>
  )
}
