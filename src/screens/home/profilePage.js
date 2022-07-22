/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {GetHistory, GetUser} from '../../modules/api';
import {useSelector} from 'react-redux';
import Ionicon from 'react-native-vector-icons/SimpleLineIcons';

const ProfilePage = ({navigation}) => {
  const {token} = useSelector(state => state.auth);
  const {user, loadingUser, isError} = GetUser(token);
  const {history, loadingHistory, errorHistory} = GetHistory(token);
  // console.log(history);

  const renderItem = ({item, index}) => {
    return (
      <View key={index}>
        <Image
          resizeMode="cover"
          style={{
            width: 70,
            height: 70,
            borderRadius: 20,
            marginHorizontal: 10,
          }}
          source={{uri: item.image}}
        />
      </View>
    );
  };
  useEffect(() => {
    if (!token) {
      navigation.replace('Home');
    }
  }, [token]);
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={{position: 'relative'}}>
          <TouchableOpacity style={styles.editIcon}>
            <Ionicon name="pencil" size={15} color="#fff" />
          </TouchableOpacity>
          <Image
            resizeMode="cover"
            style={styles.profileImg}
            source={
              !user[0].picture
                ? require('../../assets/images/defaultImage.png')
                : {
                    uri: `${user[0].picture}`,
                  }
            }
          />
        </View>
        <Text style={styles.name}>
          {!user[0].display_name ? 'Hi Fellas!' : user[0].display_name}
        </Text>
        <Text style={styles.email}>{user[0].email}</Text>
        <Text style={styles.email}>{user[0].phone_number}</Text>
        <Text style={styles.email}>{user[0].delivery_address}</Text>
      </View>
      <View style={styles.historyWrapper}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 15,
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-Bold',
              fontSize: 16,
              color: '#6A4029',
            }}>
            Order History
          </Text>
          <Text
            style={{
              textAlign: 'right',
              fontFamily: 'Poppins-Reguler',
              fontSize: 14,
              color: '#6A4029',
            }}
            onPress={() => navigation.navigate('seeMore', {title: 'History'})}>
            See More{' '}
          </Text>
        </View>
        {loadingHistory ? (
          <ActivityIndicator size={'large'} color="#6A4029" />
        ) : (
          <FlatList
            horizontal={true}
            data={history}
            renderItem={renderItem}
            keyExtractor={({item, index}) => index}
            initialNumToRender={5}
            maxToRenderPerBatch={10}
          />
        )}
      </View>
      <View style={styles.menuWrapper}>
        <View
          style={{
            // marginTop: 10,
            paddingLeft: 10,
            paddingRight: 10,
            flexDirection: 'row',
            // marginBottom: 15,
          }}>
          <TouchableOpacity
            // onPress={() => navigation.navigate('Home')}
            style={{
              elevation: 10,
              justifyContent: 'center',
              // alignItems: 'center',
              backgroundColor: '#fff',
              padding: 10,
              borderRadius: 10,
              height: 40,
              flex: 1,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                fontSize: 16,
                color: '#6A4029',
              }}>
              Edit Password
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            // marginTop: 10,
            paddingLeft: 10,
            paddingRight: 10,
            flexDirection: 'row',
            // marginBottom: 15,
          }}>
          <TouchableOpacity
            // onPress={() => navigation.navigate('Home')}
            style={{
              elevation: 10,
              justifyContent: 'center',
              // alignItems: 'center',
              backgroundColor: '#fff',
              padding: 10,
              borderRadius: 10,
              height: 40,
              flex: 1,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                fontSize: 16,
                color: '#6A4029',
              }}>
              FAQ
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            // marginTop: 10,
            paddingLeft: 10,
            paddingRight: 10,
            flexDirection: 'row',
            // marginBottom: 15,
          }}>
          <TouchableOpacity
            // onPress={() => navigation.navigate('Home')}
            style={{
              elevation: 10,
              justifyContent: 'center',
              // alignItems: 'center',
              backgroundColor: '#fff',
              padding: 10,
              borderRadius: 10,
              height: 40,
              flex: 1,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                fontSize: 16,
                color: '#6A4029',
              }}>
              Help
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            // marginTop: 10,
            paddingLeft: 10,
            paddingRight: 10,
            flexDirection: 'row',
            // marginBottom: 15,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={{
              elevation: 10,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#6A4029',
              padding: 10,
              borderRadius: 10,
              height: 40,
              flex: 1,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                fontSize: 16,
                color: '#fff',
              }}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  headerWrapper: {
    justifyContent: 'center',
    position: 'relative',
    flex: 1,
    // backgroundColor: 'red',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  editIcon: {
    zIndex: 100,
    position: 'absolute',
    top: 70,
    // left: 200,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: '#6A4029',
  },
  historyWrapper: {
    flex: 0.6,
    // backgroundColor: 'blue',
    borderTopWidth: 15,
    borderBottomWidth: 15,
    borderStyle: 'solid',
    borderTopColor: 'rgba(186, 186, 186, 0.5)',
    borderBottomColor: 'rgba(186, 186, 186, 0.5)',
  },
  menuWrapper: {
    flex: 1,
    // backgroundColor: 'grey',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#6A4029',
  },
  email: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular,',
    color: '#6A4029',
  },
});
