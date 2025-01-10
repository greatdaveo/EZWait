// import { Ionicons } from '@expo/vector-icons'
// import React, { useEffect, useState } from 'react'
// import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Button, Alert, ScrollView } from 'react-native'
// import { Calendar } from 'react-native-calendars'
// // import DatePicker from 'react-native-date-picker'
// import { appTheme } from 'src/config/theme'
// import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
// import { getFirestore, doc, setDoc, collection, addDoc } from 'firebase/firestore'
// import { getAuth } from 'firebase/auth'
// // import { db } from 'src/firebase/firebaseConfig'

// // Global Variable
// // const db = getFirestore()
// // const auth = getAuth()
// // const user = auth.currentUser

// export default function BookingScreen() {
//   const [date, setDate] = useState(new Date())
//   const [selectedDate, setSelectedDate] = useState('')
//   const [selectedTime, setSelectedTime] = useState('')

//   const onDayPress = (day: any) => {
//     // console.log(day.dateString)
//     setSelectedDate(day.dateString)
//   }

//   const handleConfirm = (time: any) => {
//     // console.log(time.toLocaleTimeString())
//     setSelectedTime(time.toLocaleTimeString())
//   }

//   // const saveBooking = async () => {
//   //   if (selectedDate.length < 1 || selectedTime.length < 1) {
//   //     Alert.alert('Please select date and time')
//   //     return
//   //   }

//   //   // console.log('User: ', user)
//   //   // const auth = getAuth()
//   //   // const user = auth.currentUser

//   //   if (!user?.email) {
//   //     Alert.alert('Error", "User not authenticated')
//   //     return
//   //   }

//   //   const scheduleData = {
//   //     time: selectedTime,
//   //     date: selectedDate,
//   //     createdAt: new Date().toISOString()
//   //   }

//   //   try {
//   //     const userRef = collection(db, 'user', user.uid, 'schedule')
//   //     await addDoc(userRef, scheduleData)
//   //     // console.log('Schedule data: ', scheduleData)
//   //     Alert.alert('Success', 'Booking saved successfully!')
//   //   } catch (error: any) {
//   //     console.log('Error saving schedule: ', error)
//   //     Alert.alert('Error', error)
//   //   }
//   // }

//   return (
//     <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//       <View style={styles.container}>
//         <View style={styles.headContainer}>
//           <View>
//             <Text style={styles.text}>Good morning,</Text>
//             <Text style={styles.subtext}>
//               {user?.displayName}
//               {user?.email}
//             </Text>
//           </View>
//           <Image
//             source={{ uri: auth.currentUser?.photoURL || 'https://i.ibb.co/Ch0KY50/default-avatar-photo-placeholder-profile-icon-vector.jpg' }}
//             style={styles.img}
//           />
//         </View>

//         <View>
//           <View style={styles.searchCover}>
//             <Ionicons name="search-outline" size={18} color={appTheme.themeGray} style={styles.searchIcon} />
//             <TextInput style={styles.input} placeholder="Search hair stylist by name" placeholderTextColor={appTheme.themeGray} />
//           </View>

//           <View style={styles.bookingDetailsCover}>
//             <View style={styles.bookingDetails}>
//               {/* <Image source={{ uri: 'https://i.ibb.co/Ch0KY50/default-avatar-photo-placeholder-profile-icon-vector.jpg' }} style={styles.img} /> */}
//               <Ionicons name="person-outline" color={appTheme.primary} size={24} />
//               <Text style={styles.text}>Barber Abc.</Text>
//             </View>

//             <View style={styles.bookingDetails}>
//               <Ionicons name="calendar-number-outline" color={appTheme.primary} size={24} />
//               <Text style={styles.text}>{!selectedDate ? '--' : `${selectedDate}`}</Text>
//             </View>

//             <View style={styles.bookingDetails}>
//               <Ionicons name="time-outline" color={appTheme.primary} size={24} />
//               <Text style={styles.text}>{!selectedDate ? '--' : `${selectedTime}`}</Text>
//             </View>
//           </View>

//           <View>
//             <View style={styles.preferencesContainer}>
//               {/* <Text style={styles.formTitle}>Make a Schedule</Text> */}

//               <View style={styles.availabilityCover}>
//                 <Text style={styles.availabilityText}>Calendar</Text>

//                 <View style={styles.timeCover}>
//                   <Text>Select Time:</Text>
//                   <RNDateTimePicker
//                     mode="time"
//                     value={date}
//                     // display="spinner"
//                     textColor="red"
//                     accentColor={appTheme.primary}
//                     themeVariant="light"
//                     onChange={(event: DateTimePickerEvent, selectedTime) => {
//                       // console.log('Event Type:', event.type, 'Selected Time:', selectedTime)
//                       if (event.type === 'set' && selectedTime) {
//                         handleConfirm(selectedTime)
//                       }
//                     }}
//                   />
//                 </View>
//                 {/* <Text style={styles.availabilityText}>Availability</Text> */}
//               </View>

//               <View style={styles.calendarCover}>
//                 <Calendar onDayPress={(day) => onDayPress(day)} />
//               </View>
//             </View>

//             <TouchableOpacity onPress={saveBooking} style={styles.addIcon}>
//               <Ionicons name="add" color={appTheme.secondary} size={24} />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </ScrollView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10
//   },

//   headContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between'
//   },

//   bookingDetailsCover: {
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     marginTop: 10,
//     borderRadius: 10,
//     padding: 10,
//     shadowColor: appTheme.primary,
//     backgroundColor: appTheme.secondary,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 6,
//     elevation: 10
//   },

//   bookingDetails: {
//     alignItems: 'center',
//     gap: 5
//   },

//   text: {
//     // fontSize: 24
//   },

//   subtext: {
//     fontWeight: '500',
//     fontSize: 18
//   },

//   img: {
//     width: 50,
//     height: 50,
//     borderRadius: 50
//   },

//   searchCover: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     // backgroundColor: 'white',
//     marginVertical: 10,
//     borderRadius: 10,

//     shadowColor: appTheme.primary,
//     backgroundColor: appTheme.secondary,
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 10
//   },

//   searchIcon: {
//     marginLeft: 15
//   },

//   input: {
//     padding: 2,
//     fontSize: 18,
//     marginVertical: 12
//   },

//   formTitle: {},

//   preferencesContainer: {
//     marginVertical: 20,
//     marginBottom: 10
//     // marginTop: -100
//   },

//   availabilityText: {
//     fontSize: 16,
//     marginVertical: 10
//   },

//   availabilityCover: {
//     flexDirection: 'row',
//     justifyContent: 'space-between'
//   },

//   timeCover: {
//     flexDirection: 'row',
//     alignItems: 'center'
//   },

//   calendarCover: {
//     // borderWidth: 1,
//     // borderColor: appTheme.primary,
//     borderRadius: 10,
//     marginTop: 12,
//     shadowColor: appTheme.primary,
//     backgroundColor: appTheme.secondary,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 6,
//     elevation: 10
//   },

//   addIcon: {
//     backgroundColor: appTheme.primary,
//     width: 60,
//     height: 60,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 50,
//     marginTop: 40,
//     position: 'absolute',
//     right: 15,
//     bottom: -70,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4
//   }
// })
