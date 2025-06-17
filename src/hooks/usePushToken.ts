import { useEffect, useState } from 'react'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
import { Platform } from 'react-native'
import { sendPushTokenToBackend } from 'src/redux/notification/notification'
import { appTheme } from 'src/config/theme'

export function usePushToken(enabled: boolean) {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled) return
    ;(async () => {
      // To ask for permission
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
        finalStatus = status
      }
      if (finalStatus != 'granted') {
        console.warn('Push notifications permission denied')
        return
      }

      //   To get the token
      const tokenObj = await Notifications.getExpoPushTokenAsync()
      const pushToken = tokenObj.data
      setExpoPushToken(pushToken)

      //   To send it to your backend
      await sendPushTokenToBackend(pushToken)

      //   For Android
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: appTheme.primary
        })
      }
    })()
  }, [enabled])

  return expoPushToken
}
