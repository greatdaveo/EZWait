import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Button, Alert, ScrollView } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { appTheme } from 'src/config/theme'
import { getFirestore, doc, setDoc, collection, addDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { Calendar, CalendarList } from 'react-native-calendars'
import moment from 'moment'
import { useNavigation, useRouter } from 'expo-router'

export default function ScheduleScreen() {
  const router = useRouter()
  const navigate = useNavigation()

  const data = [
    {
      name: 'Daniel Mayowa',
      time: '4:30pm - 5:00pm',
      service: 'Beard trimming',
      img: require('../../assets/images/Frame1.png')
    },

    {
      name: 'Angel erl',
      time: '5:10pm - 5:40pm',
      service: 'Braids',
      img: require('../../assets/images/Frame2.png')
    },

    {
      name: 'Benson',
      time: '6:00pm - 6:40pm',
      service: 'Low cut and dye',
      img: require('../../assets/images/Frame3.png')
    },

    {
      name: 'Benson',
      time: '6:00pm - 6:40pm',
      service: 'Low cut and dye',
      img: require('../../assets/images/Frame2.png')
    },

    {
      name: 'Daniel',
      time: '4:30pm - 5:00pm',
      service: 'Beard trimming',
      img: require('../../assets/images/Frame1.png')
    },

    {
      name: 'Benson',
      time: '6:00pm - 6:40pm',
      service: 'Low cut and dye',
      img: require('../../assets/images/Frame2.png')
    }
  ]

  const [date, setDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'))
  const [currentWeek, setCurrentWeek] = useState(moment().startOf('week'))
  const [selectedTime, setSelectedTime] = useState('')

  const [currentStep, setCurrentStep] = useState(1)
  const [profileType, setProfileType] = useState('Appointment')

  const acceptBookings = () => {
    router.push('/appointment')
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.upcomingAppointments}>
          <View style={styles.appointmentHeader}>
            <Text>Upcoming Appointments ------------------------------</Text>
          </View>

          <View style={styles.appointmentDetailsCover}>
            <View style={styles.detailsCover}>
              <Ionicons name="create-outline" color={appTheme.themeBlack} size={28} />

              <View style={styles.customerDetails}>
                <Text style={styles.customerName}>Jane Smith</Text>
                <Text style={styles.date}>March, 12, 2025</Text>
                <Text style={styles.time}>🕒 2:00 PM - 3:00 PM</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.acceptBtn} onPress={acceptBookings}>
              <Text style={styles.btnText}>Accept</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.upcomingAppointments}>
          <View>
            <Text>Completed Appointments ------------------------------</Text>
          </View>

          <View style={styles.appointmentDetailsCover}>
            <View style={styles.detailsCover}>
              <Ionicons name="create-outline" color={appTheme.themeBlack} size={28} />

              <View style={styles.customerDetails}>
                <Text style={styles.customerName}>Jane Smith</Text>
                <Text style={styles.date}>March 12, 2025</Text>
                <Text style={styles.time}>🕒 2:00 PM - 3:00 PM</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.acceptBtn} onPress={() => router.back()}>
              <Text style={styles.btnText}>Accept</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
    // padding: 60
  },

  // ::::::::::::::::
  upcomingAppointments: {
    marginTop: 40,
    padding: 20
  },

  appointmentHeader: {
    marginBottom: 10
  },

  appointmentDetailsCover: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 30,
    gap: 5,
    marginTop: 30,
    padding: 30
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
    color: '#757575'
  },

  time: {
    fontWeight: 'medium',
    fontSize: 16,
    color: '#757575'
  },

  acceptBtn: {
    // padding: 10
    marginLeft: 10
  },

  btnText: {
    color: appTheme.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: appTheme.primary,
    padding: 10,
    fontSize: 14,
    paddingHorizontal: 20,
    borderRadius: 30
  }

  // ::::::::::::::::
})
