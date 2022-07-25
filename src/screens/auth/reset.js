/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import {HOST_API} from '@env';
import Toast from 'react-native-toast-message';

const Reset = ({route, navigation}) => {
  const {email} = route.params;
  // console.log(email);

  const [code, setCode] = useState('');
  // const [email, setEmail] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const [eye, setEye] = useState(false);
  const [eye1, setEye1] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const confirmHandler = async () => {
    try {
      setLoading(true);
      const result = await axios({
        method: 'POST',
        url: `${HOST_API}/auth/confirm-pass/${email}`,
        data: {confirmCode: code},
      });
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Request Success! 🙌',
        text2: `${result.data.msg} 👋`,
      });
      setTimeout(() => {
        setConfirm(true);
      }, 2000);
    } catch (error) {
      setLoading(false);
      // console.log(error.response.data.err.msg);
      Toast.show({
        type: 'error',
        text1: 'Oopss 😓',
        text2: `${error.response.data?.err.msg}`,
      });
    }
  };
  const updatePassword = async () => {
    try {
      if (newPass !== confirmPass) {
        Toast.show({
          type: 'error',
          text1: 'Oopss 😓',
          text2: 'Both passwords should be the same',
        });
      } else {
        setLoading(true);
        const result = await axios({
          method: 'POST',
          url: `${HOST_API}/auth/reset/${email}`,
          data: {confirmCode: code, newPassword: newPass},
        });
        setLoading(false);
        Toast.show({
          type: 'success',
          text1: 'Request Success! 🙌',
          text2: `${result.data.msg} 👋`,
        });
        setTimeout(() => {
          navigation.replace('signin');
        }, 2000);
      }
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Oopss 😓',
        text2: `${error.response.data?.err.msg}`,
      });
    }
  };

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <StatusBar backgroundColor={'transparent'} translucent />
      <ImageBackground
        style={{flex: 1}}
        resizeMode="cover"
        source={require('../../assets/images/forgot.png')}>
        <View
          style={{
            paddingTop: 120,
            paddingVertical: 50,
            flex: 1,
            // alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'space-between',
          }}>
          {/* Header */}
          <View>
            <Text
              style={{
                //   marginTop: 100,
                fontFamily: 'Poppins-Bold',
                color: '#fff',
                fontSize: 65,
                lineHeight: 73,
                letterSpacing: -2.7,
                textAlign: 'center',
              }}>
              Don’t {'\n'} Worry!
            </Text>
            <Text
              style={{
                //   marginTop: 100,
                fontFamily: 'Poppins-Reguler',
                color: '#fff',
                fontSize: 14,
                textAlign: 'center',
              }}>
              We’ve just sent code to your email {'\n'} to request a new
              password
            </Text>
          </View>
          {/* Input */}
          {!confirm ? (
            <View style={{paddingLeft: 20, paddingRight: 20}}>
              <TextInput
                value={code}
                onChangeText={value => setCode(value)}
                placeholder="Enter your codes"
                keyboardType="number-pad"
                placeholderTextColor={'rgba(151, 151, 151, 1)'}
                style={{
                  textAlign: 'center',
                  fontFamily: 'Poppins-Regular',
                  color: '#fff',
                  borderBottomWidth: 2,
                  borderBottomColor: '#fff',
                }}
              />
            </View>
          ) : (
            <View style={{paddingLeft: 20, paddingRight: 20}}>
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
                    color: '#fff',
                    borderBottomWidth: 2,
                    borderBottomColor: '#fff',
                  }}
                />
                <Icon
                  style={{position: 'absolute', right: 5, top: 15}}
                  onPress={() => setEye(!eye)}
                  name={!eye ? 'eye-with-line' : 'eye'}
                  size={25}
                  color={!eye ? 'grey' : '#fff'}
                />
              </View>
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
                    color: '#fff',
                    borderBottomWidth: 2,
                    borderBottomColor: '#fff',
                  }}
                />
                <Icon
                  style={{position: 'absolute', right: 5, top: 15}}
                  onPress={() => setEye1(!eye1)}
                  name={!eye1 ? 'eye-with-line' : 'eye'}
                  size={25}
                  color={!eye1 ? 'grey' : '#fff'}
                />
              </View>
            </View>
          )}

          {/* Button */}
          <View>
            <View
              style={{
                // marginTop: 0,
                paddingLeft: 10,
                paddingRight: 10,
                flexDirection: 'row',
                marginBottom: 10,
              }}>
              {!confirm ? (
                <TouchableOpacity
                  onPress={confirmHandler}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#FFBA33',
                    padding: 10,
                    borderRadius: 20,
                    height: 70,
                    flex: 1,
                  }}>
                  {loading ? (
                    <ActivityIndicator size={'large'} color="#fff" />
                  ) : (
                    <Text
                      style={{
                        fontFamily: 'Poppins-Bold',
                        fontSize: 16,
                        color: '#6A4029',
                      }}>
                      Confirm
                    </Text>
                  )}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={updatePassword}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#FFBA33',
                    padding: 10,
                    borderRadius: 20,
                    height: 70,
                    flex: 1,
                  }}>
                  {loading ? (
                    <ActivityIndicator size={'large'} color="#fff" />
                  ) : (
                    <Text
                      style={{
                        fontFamily: 'Poppins-Bold',
                        fontSize: 16,
                        color: '#6A4029',
                      }}>
                      Change Password
                    </Text>
                  )}
                </TouchableOpacity>
              )}
            </View>
            <View
              style={{
                // position: 'relative',
                // marginTop: 0,
                paddingLeft: 10,
                paddingRight: 10,
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('forgot')}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#6A4029',

                  padding: 10,
                  borderRadius: 20,
                  height: 70,
                  flex: 1,
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Bold',
                    fontSize: 17,
                    color: '#fff',
                  }}>
                  Resend Code
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Reset;
