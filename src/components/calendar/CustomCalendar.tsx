import React, { useState } from 'react'
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import moment from 'moment'
import { appTheme } from 'src/config/theme'
import { Ionicons } from '@expo/vector-icons'

const bookedDates = ['2024-04-10', '2024-04-15', '2024-04-20']

const CustomCalendar = () => {
  const [currentMonthAndYear, setCurrentMonthAndYear] = useState(moment())
  const [showMonthPicker, setShowMonthPicker] = useState(false)

  const totalDaysInAMonth = currentMonthAndYear.daysInMonth()
  const firstDayIndex = currentMonthAndYear.startOf('month').day()
  const todayDate = moment().format('YYYY-MM-DD')

  const changeMonth = (direction: 'prev' | 'next') => {
    setCurrentMonthAndYear((prev) => (direction === 'prev' ? prev.clone().subtract(1, 'months') : prev.clone().add(1, 'months')))
  }

  const isBooked = (date: string) => bookedDates.includes(date)

  const daysArray: (number | null)[] = new Array(firstDayIndex).fill(null)

  for (let i = 1; i <= totalDaysInAMonth; i++) {
    daysArray.push(i)
  }

  const toggleMonthPicker = () => setShowMonthPicker(!showMonthPicker)
  const selectMonth = (month: number) => {
    setCurrentMonthAndYear((prev) => prev.clone().month(month))
    setShowMonthPicker(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.monthTextCover} onPress={toggleMonthPicker}>
          <Text style={styles.monthText}>{currentMonthAndYear.format('MMMM, YYYY')}</Text>
          <Ionicons name="chevron-down-outline" size={20} color={'#383838'} />
        </TouchableOpacity>

        <View style={styles.navButtons}>
          <TouchableOpacity onPress={() => changeMonth('prev')}>
            <Text style={styles.arrow}>{'<'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeMonth('next')}>
            <Text style={styles.arrow}>{'>'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.weekRow}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'].map((day) => (
          <Text key={day} style={styles.weekDay}>
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.daysGrid}>
        {daysArray.map((day: number | null, i: number) => {
          if (day === null) {
            return <View key={i} style={styles.emptyDay} />
          }

          const dateStr = currentMonthAndYear.clone().date(day).format('YYYY-MM-DD')
          const isToday = dateStr === todayDate
          const booked = isBooked(dateStr)

          return (
            <TouchableOpacity key={dateStr} style={[styles.day, booked ? styles.booked : isToday ? styles.today : styles.available]}>
              <Text style={styles.dayText}>{day}</Text>
            </TouchableOpacity>
          )
        })}
      </View>

      {/* Month Picker Modal */}
      <Modal visible={showMonthPicker} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={moment.months()}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity style={styles.modalItem} onPress={() => selectMonth(index)}>
                  <Text style={styles.modalText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#F5F5F5',
    borderRadius: 20
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25
  },

  monthTextCover: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8
  },

  monthText: {
    fontSize: 18
  },

  navButtons: {
    flexDirection: 'row',
    gap: 15
  },

  arrow: {
    fontSize: 18
  },

  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 25
  },

  weekDay: {
    fontSize: 16
  },

  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5
    // width: '100%',
    // margin: 'auto'
  },

  emptyDay: {
    width: '18%',
    aspectRatio: 1
  },

  day: {
    width: '14%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    borderRadius: 5
  },

  dayText: {
    fontSize: 16
  },

  available: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#DEDEDE',
    padding: 10,
    borderRadius: 15
  },

  today: {
    backgroundColor: appTheme.primary,
    borderWidth: 1,
    borderColor: '#DEDEDE',
    padding: 10,
    borderRadius: 15
  },

  booked: {
    backgroundColor: '#EEF2F5'
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },

  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    maxHeight: 300
  },

  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD'
  },

  modalText: {
    fontSize: 18,
    textAlign: 'center'
  }
})

export default CustomCalendar
