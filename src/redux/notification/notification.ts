import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Backend_Url } from '@env'

const API_URL = `${Backend_Url}/api/v1`

export async function sendPushTokenToBackend(token: string) {
  const authToken = await AsyncStorage.getItem('token')
  if (!authToken) throw new Error('Not authenticated')
  await axios.post(
    `${API_URL}/notifications/register-token`,
    { token },
    {
      headers: { Authorization: `Bearer ${authToken}` }
    }
  )
}

export async function savePushToken(token: string) {
  await fetch(`${API_URL}/user/me/push-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ token })
  })
}
export async function removePushToken(token: string) {
  await fetch(`${API_URL}/user/me/push-token`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ token })
  })
}
