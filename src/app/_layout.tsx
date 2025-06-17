import { appTheme } from 'src/config/theme'
import { StyleSheet } from 'react-native'
import { Provider } from 'react-redux'
import store from 'src/redux/store'
import InnerLayout from './InnerLayout'
import registerNNPushToken from 'native-notify'

export default function AppLayout() {
  registerNNPushToken(30765, 'bDP9weu620CNS7kFSopbGO')

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
