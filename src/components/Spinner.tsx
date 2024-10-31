import { ActivityIndicator, View, StyleSheet } from 'react-native'
import { appTheme } from 'src/config/theme'

export default function Spinner() {
  return (
    <View style={styles.spinner} testID="spinner">
      <ActivityIndicator testID="activity-indicator" color={appTheme.primary} size="large" />
    </View>
  )
}

const styles = StyleSheet.create({
  spinner: {
    backgroundColor: appTheme.primary,
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
