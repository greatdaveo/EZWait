import { View, Button, Text } from 'react-native'
import { useRouter } from 'expo-router'

export default function Login() {
  const router = useRouter()

  const handleLogin = () => {
    // Perform login logic here
    router.replace('(tabs)/dashboard') // Replace to remove from stack history
  }

  return (
    <View>
      <Text>Login Screen</Text>
      <Button title="Login" onPress={handleLogin} />
    </View>
  )
}
