import { Ionicons } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native'
import { useRouter } from 'expo-router'
import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { appTheme } from 'src/config/theme'

const Index = () => {
  const router = useRouter()

  const handlePreviousStep = () => {
    router.back()
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={handlePreviousStep} style={styles.iconCover}>
            <Ionicons name="chevron-back-outline" size={28} color={appTheme.primary} />
          </TouchableOpacity>

          <View style={styles.titleCover}>
            <Text style={styles.title}>Notifications</Text>
          </View>
        </View>

        <View>
          <Text>Notification Screen</Text>
        </View>
      </>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding: 20,
    backgroundColor: '#FFFFFF',
    height: '100%'
    // position: 'static'
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#EBEBEB',
    paddingBottom: 30
  },

  iconCover: {
    backgroundColor: '#F4EDFF',
    padding: 5,
    borderRadius: 50,
    left: -65
  },

  titleCover: {
    // flexDirection: 'row'
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 50,
    textAlign: 'center'
    // marginBottom: 4
  }

  // ::::::::::::::::::
})

export default Index
