import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import { appTheme } from 'src/config/theme'
import { router } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { TextInput } from 'react-native-paper'
import { getStylistProfileSlice, updateStylistSlice } from 'src/redux/profile/profileSlice'
import { useDebounce } from 'src/hooks/useDebounce'
import { UserTopContent } from '../utils/UserTopContent'

const StylistHomeScreen: React.FC = () => {
  const { stylistProfile }: any = useSelector((state: RootState) => state.profile)
  const { user, isLoggedIn, isSuccess, isError } = useSelector((state: RootState) => state.auth)
  // console.log(user)

  const [userName, setUserName] = useState<string>(user?.name)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { data, user: stylistUser = {} } = stylistProfile || {}
  const { no_of_current_customers, no_of_customer_bookings } = data || {}

  const [customerCount, setCustomerCount] = useState(no_of_current_customers || 0)
  const debouncedCustomerCount = useDebounce(customerCount, 3000)
  const dispatch = useDispatch<AppDispatch>()

  const searchItem = (query: string) => {
    setSearchQuery(query)
    console.log('Searching for: ', query)
  }

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getStylistProfileSlice(user?.id))
    }
  }, [user?.id, dispatch])

  useEffect(() => {
    if (debouncedCustomerCount !== no_of_current_customers) {
      dispatch(
        updateStylistSlice({
          id: user?.id,
          formData: {
            ...data,
            no_of_current_customers: debouncedCustomerCount
          }
        })
      )
      console.log('Auto-updated count:', debouncedCustomerCount)
    }
  }, [debouncedCustomerCount])

  const increaseCount = () => {
    const newCount = customerCount + 1
    setCustomerCount(newCount)
  }
  const decreaseCount = () => {
    if (customerCount > 0) {
      const newCount = customerCount - 1
      setCustomerCount(newCount)
    }
  }

  // const updateCountImmediately = (count: number) => {
  //   dispatch(
  //     updateStylistSlice({
  //       id: user?.id,
  //       formData: {
  //         ...data,
  //         no_of_current_customers: count
  //       }
  //     })
  //   )
  // }

  const saveChanges = () => {
    dispatch(
      updateStylistSlice({
        id: user?.id,
        formData: {
          ...data,
          no_of_current_customers: customerCount
        }
      })
    )
    Alert.alert('Saved', 'Customer count updated')
  }

  return (
    <View>
      <UserTopContent showSearch={showSearch} setShowSearch={setShowSearch} />

      <View style={styles.contentContainerCover}>
        <Text style={styles.title}>Current Customer in Queue Today</Text>

        <View style={styles.contentContainer}>
          <Text> • Total Booked Clients Today: {typeof no_of_customer_bookings === 'number' ? no_of_customer_bookings : 'Loading...'}</Text>
        </View>

        <View style={styles.contentContainer}>
          <Text> • Total No of Current Customers: {typeof no_of_current_customers === 'number' ? no_of_current_customers : 'Loading...'}</Text>
        </View>

        <View style={styles.textContent}>
          <Text style={styles.title}>Adjust Customer Count</Text>

          <View style={styles.customerContainer}>
            <TouchableOpacity onPress={decreaseCount} style={styles.icons}>
              <Ionicons name="remove-outline" size={30} color={appTheme.primary} />
            </TouchableOpacity>

            <TextInput
              keyboardType="numeric"
              value={customerCount.toString()}
              onChangeText={(text) => {
                const value = parseInt(text)
                if (!isNaN(value)) {
                  setCustomerCount(value)
                }
              }}
              style={styles.countInput}
            />

            <TouchableOpacity onPress={increaseCount} style={styles.icons}>
              <Ionicons name="add-outline" size={30} color={appTheme.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.buttonContainer} onPress={saveChanges}>
          <Text style={styles.btnText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    padding: 5
  },

  contentContainerCover: {
    marginTop: 40,
    padding: 10,
    justifyContent: 'space-between'
  },

  contentContainer: {
    padding: 10,
    justifyContent: 'space-between'
  },

  textContent: {
    padding: 10
  },

  title: {
    marginBottom: 10,
    fontWeight: 'bold'
  },

  countInput: {
    borderColor: '#959292',
    fontSize: 16,
    paddingHorizontal: 10,
    minWidth: '60%',
    textAlign: 'center',
    fontWeight: 'bold'
  },

  customerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30
  },

  icons: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 50
  },

  // :::::::::::::::::::::::::

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appTheme.primary,
    width: '100%',
    margin: 'auto',
    padding: 25,
    marginTop: 30,
    marginBottom: 100,
    borderRadius: 20,
    gap: 10
  },

  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
    // marginRight: 5
  }
  // :::::::::::::::::::::::
})

export default StylistHomeScreen
