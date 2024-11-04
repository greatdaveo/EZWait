import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imgCover}>
        <Image source={{ uri: 'https://i.ibb.co/Ch0KY50/default-avatar-photo-placeholder-profile-icon-vector.jpg' }} style={styles.img} />
        <Text style={styles.subtext}>David Olowo</Text>
      </View>

      <View>
        <Text>Barber</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40

    // justifyContent: 'center',
  },

  imgCover: {
    alignItems: 'center',
    gap: 10
  },

  img: {
    width: 70,
    height: 70,
    borderRadius: 50
  },

  subtext: {
    fontWeight: '500',
    fontSize: 18
  }
})

export default DashboardScreen
