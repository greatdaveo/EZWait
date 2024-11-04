import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Button, Alert } from 'react-native'
import { Calendar } from 'react-native-calendars'
// import DatePicker from 'react-native-date-picker'
import { appTheme } from 'src/config/theme'
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { getFirestore, doc, setDoc, collection, addDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// import { db } from 'src/firebase/firebaseConfig'

export default function HistoryScreen() {
  return (
    <View>
      <Text>Dashboard</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
