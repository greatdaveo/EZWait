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
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handlePreviousStep} style={styles.iconCover}>
          <Ionicons name="chevron-back-outline" size={28} color={appTheme.primary} />
        </TouchableOpacity>

        <View style={styles.titleCover}>
          <Text style={styles.title}>Notifications</Text>
        </View>
      </View>

      <View style={styles.appointmentDetailsCover}>
        <View style={styles.detailsCover}>
          <Ionicons name="calendar-outline" color={appTheme.primary} size={28} />

          <View style={styles.customerDetails}>
            <Text style={styles.customerName}>New Booking Requests</Text>
            <Text style={styles.date}>You have a new appointment request!</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.acceptBtn} disabled={true}>
          <Text style={styles.btnText}>View</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.appointmentDetailsCover}>
        <View style={styles.detailsCover}>
          <View style={styles.notificationCover}>
            <Ionicons name="notifications" size={30} color={appTheme.primary} />
          </View>

          <View style={styles.customerDetails}>
            <Text style={styles.date}>Client Canceled Booking: Michael A. canceled their appointment for March 10.</Text>
          </View>
        </View>
      </View>

      <View style={styles.appointmentDetailsCover}>
        <View style={styles.detailsCover}>
          <View style={styles.notificationCover}>
            <Ionicons name="person" size={30} color={appTheme.primary} />
          </View>

          <View style={styles.customerDetails}>
            <Text style={styles.date}>Your profile has been successfully updated.</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    paddingTop: 20,
    backgroundColor: '#FFFFFF',
    height: '100%'
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
  },

  // ::::::::::::::::::
  appointmentDetailsCover: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 30,
    gap: 5,
    marginTop: 5,
    padding: 30,
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#EBEBEB'
  },

  detailsCover: {
    flexDirection: 'row',
    gap: 20
  },

  customerDetails: {
    gap: 15
  },

  customerName: {
    fontWeight: 'bold',
    fontSize: 16
  },

  date: {
    fontWeight: 'medium',
    fontSize: 16,
    maxWidth: '90%',
    color: '#757575'
  },

  acceptBtn: {
    // marginLeft: 10
  },

  btnText: {
    color: appTheme.primary,
    fontWeight: 'bold',
    fontSize: 16,
    borderWidth: 1,
    borderColor: appTheme.primary,
    padding: 10,
    borderRadius: 30
  },

  notificationCover: {
    backgroundColor: appTheme.semi,
    borderRadius: '50%',
    padding: 8
  }
})

export default Index
