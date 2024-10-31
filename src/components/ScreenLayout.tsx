import Spinner from 'src/components/Spinner'
import useCacheAssets from 'src/hooks/useCacheAssets'
import { StyleSheet, View } from 'react-native'

interface Props {
  children: React.ReactNode
  testID?: string
}

export default function ScreenLayout({ children, testID }: Props) {
  const areAssetsCached = useCacheAssets()

  return (
    <View style={styles.Wrapper} testID={testID}>
      {areAssetsCached ? children : <Spinner />}
    </View>
  )
}

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1
  }
})
