import { Link } from 'expo-router'
import { openURL } from 'expo-linking'
import { Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native'
import { appTheme } from 'src/config/theme'

interface Props {
  href: string
  text: string
}

export default function LinkButton({ href, text }: Props) {
  return href.substring(0, 1) === '/' ? (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { borderColor: pressed ? appTheme.primary : appTheme.secondary, backgroundColor: pressed ? appTheme.semi : appTheme.primary }
      ]}>
      {({ pressed }) => (
        <Link testID="link-button" href={href} style={styles.internalLink}>
          <Text testID="link-button-text" style={[styles.buttonText, pressed && styles.buttonTextPressed]}>
            {text}
          </Text>
        </Link>
      )}
    </Pressable>
  ) : (
    <TouchableOpacity testID="link-button" onPress={() => openURL(href)} style={styles.externalLink}>
      <Text testID="link-button-text" style={styles.linkText}>
        {text}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  externalLink: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: appTheme.primary,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'transparent'
  },
  internalLink: {
    gap: 15,
    textAlign: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20
    // marginTop: 600
  },

  button: {
    padding: 20,
    borderRadius: 10,
    borderWidth: 2
  },

  buttonText: {
    fontSize: 20,
    color: appTheme.secondary,
    textAlign: 'center',
    fontWeight: '600'
  },

  buttonTextPressed: {
    color: appTheme.primary
  },

  linkText: {
    fontSize: 20,
    color: appTheme.secondary,
    textAlign: 'center',
    fontWeight: '600'
  }
})
