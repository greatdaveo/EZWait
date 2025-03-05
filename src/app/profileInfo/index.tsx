import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { appTheme } from 'src/config/theme'

const Index = () => {
  const router = useRouter()

  const handlePreviousStep = () => {
    router.back()
  }

  const handleUpdatedProfile = () => {}

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={handlePreviousStep} style={styles.iconCover}>
            <Ionicons name="chevron-back-outline" size={28} color={appTheme.primary} />
          </TouchableOpacity>

          <View style={styles.titleCover}>
            <Text style={styles.title}>Edit Profile</Text>
          </View>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: 'https://i.ibb.co/Ch0KY50/default-avatar-photo-placeholder-profile-icon-vector.jpg' }} style={styles.img} />
            <TouchableOpacity style={styles.plusIcon}>
              <Ionicons name="add-circle" color={appTheme.primary} size={28} />
            </TouchableOpacity>
          </View>

          <View style={styles.profileNameCover}>
            <View style={styles.profileNameContainer}>
              <Text style={styles.profileName}>David Olowomeye</Text>
              <Text style={styles.profileEmail}>davidolowo2@gmail.com</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Information</Text>

          <View style={styles.passwordCover}>
            <Text style={styles.subSectionText}>
              Make sure your details are correct. Your email is used for account verification and notifications.
            </Text>
            <TextInput placeholder="David Olowomeye" placeholderTextColor="#BABABA" style={styles.textInput} />
            <TextInput placeholder="davidolowo2@gmail.com" placeholderTextColor="#BABABA" style={styles.textInput} />
            <TextInput placeholder="Enter Service" placeholderTextColor="#BABABA" style={styles.textInput} />
          </View>

          <TouchableOpacity style={styles.updateBtnCover} onPress={handleUpdatedProfile}>
            <Text style={styles.updateBtn}>Save Changes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.buttonContainer, styles.cancelButton]} onPress={() => router.back()}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding: 20,
    backgroundColor: '#FFFFFF',
    height: '100%'
    // position: 'static'
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

  // :::::::::::::::::

  profileSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 50,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
    paddingHorizontal: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#E3E3E3',
    paddingBottom: 30
  },

  profileImageContainer: {
    position: 'relative'
  },

  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10
  },

  plusIcon: {
    position: 'absolute',
    bottom: 15,
    right: 5,
    backgroundColor: appTheme.secondary,
    borderRadius: 15,
    padding: 1,
    elevation: 2
  },

  profileNameCover: {
    position: 'relative'
  },

  profileNameContainer: {
    marginRight: 10,
    marginLeft: -250
  },

  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: appTheme.themeBlack,
    marginBottom: 5
  },

  profileEmail: {
    fontSize: 16,
    color: '#757575',
    fontWeight: 500
  },

  pencilIcon: {
    position: 'absolute',
    right: 1,
    top: -30,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: '#E3E3E3',
    padding: 5
  },

  // ::::::::::::::::::::::::::

  section: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#E3E3E3',
    paddingBottom: 30
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: appTheme.themeBlack,
    marginBottom: 10
  },

  sectionItems: {
    borderRadius: 10,
    padding: 10,
    elevation: 2
  },

  sectionItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 8,
    gap: 10
    // paddingVertical: 15
  },

  itemText: {
    fontSize: 16
  },

  passwordCover: {
    gap: 30
  },

  subSectionText: {
    fontSize: 16,
    marginVertical: 15
  },

  textInput: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#959292',
    fontSize: 16
  },

  updateBtnCover: {
    marginTop: 35,
    marginBottom: 25
  },

  updateBtn: {
    color: 'white',
    fontSize: 20,
    // fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: appTheme.primary,
    paddingVertical: 18,
    borderRadius: 10
  },

  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 25,
    borderRadius: 10,
    marginBottom: 15
  },

  cancelButton: {
    // backgroundColor: '#ddd',
    borderWidth: 2,
    borderColor: '#ddd',
    marginBottom: 80
  },

  cancelText: {
    color: '#333',
    // fontWeight: 'bold',
    fontSize: 18
  }
})
export default Index
