import { appTheme } from 'src/config/theme'
import { StyleSheet } from 'react-native'
import { Provider } from 'react-redux'
import store from 'src/redux/store'
import InnerLayout from './InnerLayout'

export default function AppLayout() {
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
