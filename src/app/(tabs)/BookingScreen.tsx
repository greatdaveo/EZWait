import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Button, Alert, ScrollView } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { appTheme } from 'src/config/theme'
import { getFirestore, doc, setDoc, collection, addDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { Calendar, CalendarList } from 'react-native-calendars'
import moment from 'moment'

// Global Variable
// const db = getFirestore()
// const auth = getAuth()
// const user = auth.currentUser

export default function ScheduleScreen() {
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

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1)
    }
  }

  // To get the days in the current week
  const getWeekDays = () => {
    const weekDays = []
    for (let i = 0; i < 7; i++) {
      weekDays.push(moment(currentWeek).add(i, 'days'))
    }

    return weekDays
  }

  const handlePrevWeek = () => {
    setCurrentWeek(moment(currentWeek).subtract(1, 'week'))
  }

  const handleNextWeek = () => {
    setCurrentWeek(moment(currentWeek).add(1, 'week'))
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handlePreviousStep}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.titleCover}>
          <Text style={styles.title}>Bookings</Text>
        </View>

        <View style={styles.alarmCover}>
          <View style={styles.alarm}>
            <Ionicons name="notifications-sharp" color={appTheme.themeBlack} size={28} />
          </View>

          <View style={styles.alarmTextCover}>
            <Text style={styles.alarmText}>2</Text>
          </View>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity onPress={handlePrevWeek}>
            <Text style={styles.arrow}>&lt;</Text>
          </TouchableOpacity>

          <Text style={styles.monthText}>{moment(currentWeek).format('MMMM, YYYY')}</Text>

          <TouchableOpacity onPress={handleNextWeek}>
            <Text style={styles.arrow}>&gt;</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.weekContainer}>
          {getWeekDays().map((day, i) => (
            <TouchableOpacity key={i} style={[styles.dayContainer, selectedDate === day.format('YYYY-MM-DD') && styles.selectedDay]}>
              <Text style={[styles.dayText, selectedDate === day.format('YYYY-MM-DD') && styles.activeDate]}>{day.format('ddd')}</Text>
              <Text style={[styles.dateText, selectedDate === day.format('YYYY-MM-DD') && styles.activeDate]}>{day.format('D')}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.headerText}>
          <TouchableOpacity
            style={[styles.button, profileType === 'Appointment' ? styles.activeButton : styles.inactiveButton]}
            onPress={() => setProfileType('Appointment')}>
            <Text style={[styles.subtext, profileType === 'Appointment' ? styles.activeText : styles.inactiveText]}>Appointment</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, profileType === 'Reminder' ? styles.activeButton : styles.inactiveButton]}
            onPress={() => setProfileType('Reminder')}>
            <Text style={[styles.subtext, profileType === 'Reminder' ? styles.activeText : styles.inactiveText]}>Reminder</Text>
          </TouchableOpacity>
        </View>

        {profileType === 'Appointment' && (
          <View style={styles.appointmentContainer}>
            <Text style={styles.sectionTitle}>Pending Appointments</Text>

            {data.map((appointment, i) => (
              <View style={styles.eachAppointmentCover} key={i}>
                <View style={styles.eachAppointment}>
                  <Image source={appointment.img} style={styles.customerImg} />

                  <View style={styles.detailsCover}>
                    <Text style={styles.nameText}>{appointment.name}</Text>

                    <View style={styles.appointmentDetailsCover}>
                      <Ionicons name="time-outline" color={appTheme.themeBlack} size={24} />
                      <Text>{appointment.time}</Text>
                    </View>

                    <View style={styles.appointmentDetailsCover}>
                      <Ionicons name="cut-outline" color={appTheme.themeBlack} size={24} />
                      <Text>{appointment.service}</Text>
                    </View>

                    <TouchableOpacity style={styles.acceptBtn}>
                      <Text style={styles.btnText}>Confirm</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {profileType === 'Reminder' && (
          <View style={styles.appointmentContainer}>
            {data.map((appointment, i) => (
              <View style={styles.eachAppointmentCover} key={i}>
                <View style={styles.eachAppointment}>
                  <Image source={appointment.img} style={styles.customerImg} />

                  <View style={styles.detailsCover}>
                    <Text style={styles.nameText}>{appointment.name}</Text>

                    <View style={styles.appointmentDetailsCover}>
                      <Ionicons name="time-outline" color={appTheme.themeBlack} size={24} />
                      <Text>{appointment.time}</Text>
                    </View>

                    <View style={styles.appointmentDetailsCover}>
                      <Ionicons name="cut-outline" color={appTheme.themeBlack} size={24} />
                      <Text>{appointment.service}</Text>
                    </View>

                    <TouchableOpacity style={styles.acceptBtn}>
                      <Text style={styles.btnText}>Notify me</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // padding: 60
  },

  // ::::::::::::::::

  topBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 20,
    borderBottomColor: appTheme.primary,
    borderBottomWidth: 2,
    padding: 60,
    paddingTop: 60,
    paddingBottom: 20
  },

  titleCover: {
    // flexDirection: 'row'
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: '36%'
  },

  alarmCover: {
    // position: 'absolute'
  },

  alarm: {
    backgroundColor: appTheme.themeGray,
    padding: 7,
    borderRadius: 50,
    position: 'relative'
  },

  alarmTextCover: {
    position: 'absolute',
    right: -12,
    top: -10,
    backgroundColor: '#F52933',
    borderRadius: 100,
    padding: 5,
    paddingHorizontal: 10
  },

  alarmText: {
    color: 'white',
    fontWeight: 700,
    fontSize: 14,
    zIndex: 99
  },

  // ::::::::::::::::
  calendarHeader: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15
  },

  monthText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333'
  },

  arrow: {
    fontSize: 20,
    color: appTheme.primary
  },

  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 2
  },

  dayContainer: {
    alignItems: 'center',
    margin: 'auto',
    borderWidth: 1,
    borderColor: appTheme.themeGray,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5
    // width: 40,
  },

  selectedDay: {
    backgroundColor: appTheme.primary,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5
  },

  dayText: {
    fontSize: 16,
    fontWeight: '500'
  },

  dateText: {
    fontSize: 16,
    fontWeight: '500'
  },

  activeDate: {
    color: appTheme.secondary
  },

  // ::::::::::::::::::

  headerText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    marginHorizontal: 20,
    textAlign: 'center',
    borderRadius: 10,
    gap: 0,
    backgroundColor: '#E8E8EB'
  },

  button: {
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 50
  },

  activeButton: {
    backgroundColor: appTheme.primary
  },
  inactiveButton: {
    // backgroundColor: appTheme.themeGray
  },
  subtext: {
    fontWeight: '500',
    fontSize: 18
  },
  activeText: {
    color: appTheme.secondary
  },
  inactiveText: {
    color: appTheme.themeGray
  },

  // :::::::::::::::::

  appointmentContainer: {
    marginBottom: 20
  },

  sectionTitle: {
    padding: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: appTheme.themeBlack,
    marginBottom: -20
  },

  eachAppointmentCover: {
    borderWidth: 2,
    borderColor: appTheme.primary,
    borderRadius: 10,
    padding: 25,
    marginHorizontal: 20,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  eachAppointment: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  customerImg: {
    borderRadius: 10,
    height: 100,
    width: 100,
    borderWidth: 1,
    borderColor: appTheme.primary
  },

  detailsCover: {
    marginLeft: 10
  },

  nameText: {
    fontWeight: '600',
    fontSize: 20,
    color: appTheme.themeBlack
  },

  appointmentDetailsCover: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 1
  },

  acceptBtn: {
    // paddingHorizontal: 1,
  },

  btnText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: appTheme.primary,
    paddingVertical: 5,
    borderRadius: 10
  }
})
