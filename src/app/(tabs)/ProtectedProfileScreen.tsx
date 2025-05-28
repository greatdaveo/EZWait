import React, { useEffect, useState } from 'react'
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CustomerProfile from 'src/components/profilescreen/CustomerProfile'
import StylistProfile from 'src/components/profilescreen/StylistProfile'
import { appTheme } from 'src/config/theme'
import { RESET_AUTH } from 'src/redux/auth/authSlice'
import { AppDispatch, RootState } from 'src/redux/store'

const ProtectedProfileScreen = () => {
  const { user, isLoggedIn, isLoading, isSuccess } = useSelector((state: RootState) => state.auth)
  const role = user?.role

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (isSuccess && !isLoggedIn) {
      dispatch(RESET_AUTH())
    }
  }, [dispatch, isSuccess, isLoggedIn])

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={appTheme.primary} />
        <Text>Loading...</Text>
      </View>
    )
  }

  if (!isLoggedIn || !user) {
    return null
  }

  return <SafeAreaView style={styles.container}>{role === 'stylist' ? <StylistProfile /> : <CustomerProfile />}</SafeAreaView>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.secondary
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7'
  }
})

export default ProtectedProfileScreen
