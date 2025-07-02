import { appTheme } from 'src/config/theme'
import { Alert, Platform, StyleSheet } from 'react-native'
import { Provider } from 'react-redux'
import store from 'src/redux/store'
import InnerLayout from './InnerLayout'
import * as Notifications from 'expo-notifications'
import { useEffect } from 'react'

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: false,
      shouldSetBadge: true
    }
  }
})

export default function AppLayout() {
  useEffect(() => {
    async function configurePushNotifications() {
      const { status } = await Notifications.getPermissionsAsync()
      let finalStatus = status

      if (finalStatus != 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }

      if (finalStatus != 'granted') {
        console.log('No permission')
        Alert.alert('Permission required', 'Push notifications need the appropriate permissions')
        return
      }

      const pushTokenData = await Notifications.getExpoPushTokenAsync()
      console.log('👉 pushTokenData: ', pushTokenData)

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.DEFAULT
        })
      }
    }

    scheduleNotificationHandler()
    configurePushNotifications()
  }, [])

  useEffect(() => {
    const subscription1 = Notifications.addNotificationReceivedListener((notification) => {
      // console.log('NOTIFICATION RECEIVED')
      // console.log(notification)
      // console.log(notification.request.content.data)
    })

    const subscription2 = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('NOTIFICATION RESPONSE RECEIVED')
      // console.log(response)
    })

    return () => {
      subscription1.remove()
      subscription2.remove()
    }
  }, [])

  function scheduleNotificationHandler() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Testing Notification',
        body: 'This is the body of the notification',
        data: { userName: 'Dave' }
      },

      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 5
        // repeats: false
      }
    })
  }

  return (
    <Provider store={store}>
      <InnerLayout />
    </Provider>
  )
}

const s = StyleSheet.create({
  AppWrapper: {
    flex: 1,
    backgroundColor: appTheme.secondary,
    paddingTop: 0
  }
})
