/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/customHeader/header';
import Icon from 'react-native-vector-icons/Entypo';
import {GetUser} from '../../modules/api';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import {HOST_API} from '@env';
import axios from 'axios';

const EditPassPage = ({navigation}) => {
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [loading, setLoading] = useState(false);

  const [eye, setEye] = useState(false);
  const [eye1, setEye1] = useState(false);

  const {token} = useSelector(state => state.auth);
  const {user, loadingUser, isError} = GetUser(token);

  const updateHandler = async () => {
    try {
      if (newPass !== confirmPass) {
        Toast.show({
          type: 'error',
          text1: 'Oopss, both passwords should be the same 😓',
        });
      } else {
        setLoading(true);
        const result = await axios({
          method: 'PATCH',
          url: `${HOST_API}/user/editPass`,
          data: {newPassword: newPass},
          headers: {Authorization: `Bearer ${token}`},
        });
        setLoading(false);
        Toast.show({
          type: 'success',
          text1: `${result.data.msg} 👋`,
        });
        // setTimeout(() => {
        //   navigation.replace('signin');
        // }, 2000);
      }
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: `${error.response.data?.err.msg}`,
      });
    }
  };
  return (
    <View style={styles.container}>
      <Header navigation={navigation} title={'Edit Password'} />
      <View style={styles.headerWrapper2}>
        <View style={{position: 'relative'}}>
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
      </View>
      <View style={styles.inputWrapper}>
        <View style={{paddingLeft: 20, paddingRight: 20}}>
          <Text style={styles.inputName}>New Password:</Text>
          <View style={{position: 'relative'}}>
            <TextInput
              value={newPass}
              onChangeText={value => setNewPass(value)}
              placeholder="Enter your new password"
              autoCapitalize="none"
              secureTextEntry={!eye}
              autoComplete="password"
              placeholderTextColor={'rgba(151, 151, 151, 1)'}
              style={{
                fontFamily: 'Poppins-Regular',
                color: '#000',
                borderBottomWidth: 2,
                borderBottomColor: 'rgba(151, 151, 151, 1)',
              }}
            />
            <Icon
              style={{position: 'absolute', right: 5, top: 15}}
              onPress={() => setEye(!eye)}
              name={!eye ? 'eye-with-line' : 'eye'}
              size={25}
              color={!eye ? 'grey' : '#000'}
            />
          </View>
        </View>
        <View style={{paddingLeft: 20, paddingRight: 20}}>
          <Text style={styles.inputName}>Confirm Password:</Text>
          <View style={{position: 'relative'}}>
            <TextInput
              value={confirmPass}
              onChangeText={value => setConfirmPass(value)}
              placeholder="Confirm your new password"
              autoCapitalize="none"
              secureTextEntry={!eye1}
              autoComplete="password"
              placeholderTextColor={'rgba(151, 151, 151, 1)'}
              style={{
                fontFamily: 'Poppins-Regular',
                color: '#000',
                borderBottomWidth: 2,
                borderBottomColor: 'rgba(151, 151, 151, 1)',
              }}
            />
            <Icon
              style={{position: 'absolute', right: 5, top: 15}}
              onPress={() => setEye1(!eye1)}
              name={!eye1 ? 'eye-with-line' : 'eye'}
              size={25}
              color={!eye1 ? 'grey' : '#000'}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          // marginTop: 10,
          paddingLeft: 10,
          paddingRight: 10,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          // marginBottom: 15,
        }}>
        <TouchableOpacity
          onPress={updateHandler}
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
          {loading ? (
            <ActivityIndicator size={'large'} color="#fff" />
          ) : (
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                fontSize: 16,
                color: '#fff',
              }}>
              Save and Update
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditPassPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
    paddingHorizontal: 25,
    paddingVertical: 10,
    justifyContent: 'space-around',
  },
  inputWrapper: {
    flex: 1,
    // backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 25,
    justifyContent: 'space-around',
  },
  inputName: {
    fontFamily: 'Poppins-Bold',
    color: 'rgba(151, 151, 151, 1)',
  },
  headerWrapper2: {
    justifyContent: 'center',
    position: 'relative',
    flex: 1,
    // backgroundColor: 'red',
    alignItems: 'center',
    paddingHorizontal: 15,
    // paddingBottom: 10,
  },
  profileImg: {
    width: 140,
    height: 140,
    borderRadius: 140,
    marginBottom: 10,
    borderColor: 'rgba(175, 172, 174, 0.25)',
    borderStyle: 'solid',
    borderWidth: 2,
  },
});
