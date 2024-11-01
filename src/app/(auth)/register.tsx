import { View, Button, Text } from 'react-native'
import { useRouter } from 'expo-router'

export default function Register() {
  const router = useRouter()

  const handleRegister = () => {
    // Perform login logic here
    router.replace('(tabs)/dashboard') // Replace to remove from stack history
  }

  return (
    <View>
      <Text>Register Screen</Text>
      <Button title="Register" onPress={handleRegister} />
    </View>
  )
}
