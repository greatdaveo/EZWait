import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { appTheme } from 'src/config/theme'
import { RootState } from 'src/redux/store'

export const UserTopContent = ({ showSearch, setShowSearch }: any) => {
  const { user, isLoggedIn, isSuccess, isError } = useSelector((state: RootState) => state.auth)
  const [searchQuery, setSearchQuery] = useState('')

  // console.log(user)

  const router = useRouter()
  const [userName, setUserName] = useState<string>(user?.name)

  const searchItem = (query: string) => {
    setSearchQuery(query)
    console.log('Searching for: ', query)
  }

  const viewNotification = () => {
    router.push('/notification')
  }

  return (
    <View>
      {showSearch ? (
        <View style={styles.searchBarContainer}>
          <View style={styles.searchInputContainer}>
            <TextInput placeholder="Search" placeholderTextColor={'#757575'} style={styles.search} onChangeText={() => searchItem('')} />
            <Ionicons name="search-outline" size={24} color={'#757575'} style={styles.searchIcon} />
          </View>

          <TouchableOpacity onPress={() => setShowSearch(!showSearch)}>
            <Ionicons name="close-outline" size={30} color={'#757575'} style={styles.cancelIcon} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.topBarContainer}>
          <View style={styles.imgCover}>
            <Image
              source={{
                uri: !user?.profile_picture
                  ? 'https://i.ibb.co/Ch0KY50/default-avatar-photo-placeholder-profile-icon-vector.jpg'
                  : user?.profile_picture
              }}
              style={styles.img}
            />
            <View style={styles.greetingsCover}>
              <Text style={styles.subtext}>Hello 👋 </Text>
              <Text style={styles.nameText}>{userName}</Text>
            </View>
          </View>

          <View style={styles.iconCover}>
            <TouchableOpacity onPress={() => setShowSearch(!showSearch)}>
              <Ionicons name="search-outline" size={30} color={'#757575'} />
            </TouchableOpacity>

            <TouchableOpacity onPress={viewNotification} style={styles.notificationCover}>
              <Text style={styles.notificationCount}>0</Text>
              <Ionicons name="notifications-outline" size={30} color={'#757575'} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginTop: 15
  },

  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF8FF',
    borderRadius: 12
  },

  search: {
    flex: 1,
    fontSize: 18,
    color: '#333',
    paddingVertical: 0,
    backgroundColor: '#FAF8FF'
  },

  searchIcon: {
    right: 15,
    alignContent: 'center'
  },

  cancelIcon: {
    alignContent: 'center',
    padding: 10
  },

  // ::::::::::::::::

  topBarContainer: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },

  imgCover: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },

  img: {
    width: 50,
    height: 50,
    borderRadius: 50
  },

  greetingsCover: {
    gap: 5
  },

  iconCover: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3
  },

  notificationCover: {
    width: 30,
    height: 30,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20
  },

  notificationCount: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    backgroundColor: appTheme.primary,
    color: 'white',
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    borderRadius: 10
  },

  nameText: {
    fontWeight: '600',
    fontSize: 20,
    color: appTheme.themeBlack
  },

  subtext: {
    fontWeight: '500',
    fontSize: 20,
    color: appTheme.themeGray
  },

  headerImg: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 30,
    // padding: 10
    marginHorizontal: 20,
    backgroundColor: appTheme.primary,
    borderRadius: 20
  },

  headerImgCover: {
    width: '70%',
    textAlign: 'center',
    paddingLeft: 60
    // marginLeft: 60
  },

  headerImgText: {
    color: appTheme.secondary,
    fontSize: 24,
    fontWeight: 600,
    justifyContent: 'center',
    textAlign: 'center',
    width: '115%',
    marginHorizontal: 'auto',
    marginLeft: 20
  }
})
