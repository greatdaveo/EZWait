import { Ionicons } from '@expo/vector-icons'
import { getAuth } from 'firebase/auth'
import { collection, getDocs, getFirestore, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Button, Alert } from 'react-native'
import CalendarList from 'react-native-calendars/src/calendar-list/new'

const db = getFirestore()
const auth = getAuth()
const user = auth.currentUser

export default function HistoryScreen() {
  const [bookings, setBookings] = useState({})
  const [selectedDateBookings, setSelectedDateBookings] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchBookings = async () => {
    console.log(user?.email)

    if (!user?.email) {
      console.log('No user is signed in')
      return
    }

    const querySnapshot = await getDocs(collection(db, 'user', user?.uid, 'schedule'))
    console.log(querySnapshot)

    querySnapshot.forEach((doc) => {
      // console.log(doc.data())
      console.log(doc.id, '->', doc.data())
    })
  }

  return (
    <View>
      <Text>Dashboard</Text>
      <Button title="Fetch Booking" onPress={fetchBookings} />
    </View>
  )
}

const styles = StyleSheet.create({})
