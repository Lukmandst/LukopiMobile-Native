/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {HOST_API} from '@env';
import Toast from 'react-native-toast-message';

import React, {useState} from 'react';
import axios from 'axios';
const Signup = ({navigation}) => {
  const [eye, setEye] = useState(false);
  const [loading, setLoading] = useState(false);
  const [body, setBody] = useState({
    email: '',
    pass: '',
    phone_number: '',
  });

  const registHandler = async () => {
    let emailFormat = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
    let passFormat = /(?=.*[0-9])/;
    try {
      Toast.hide();
      if (!body.email.match(emailFormat)) {
        Toast.show({
          type: 'error',
          text1: 'Oopss 😓',
          text2: 'Email format should be mail@mail.com !',
        });
      } else if (body.pass.length < 3) {
        Toast.show({
          type: 'error',
          text1: 'Oopss 😓',
          text2: 'Password should be at least 3 characters',
          text2NumberOfLines: 1,
        });
      } else if (!body.pass.match(passFormat)) {
        Toast.show({
          type: 'error',
          text1: 'Oopss 😓',
          text2: 'Password should includes at least 1 numeric character !',
          text2NumberOfLines: 1,
        });
      } else {
        setLoading(true);
        const result = await axios({
          method: 'POST',
          url: `${HOST_API}/auth/signup`,
          data: body,
        });
        setLoading(false);
        Toast.show({
          type: 'success',
          text1: 'Request Success! 🙌',
          text2: `${result.data.msg} 👋`,
        });
        setTimeout(() => {
          navigation.navigate('signin');
        }, 2000);
      }
      // console.log(result);
    } catch (error) {
      setLoading(false);
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Oopss 😓',
        text2: `${error.response.data?.err.msg}`,
      });
      // console.error(error.response.data);
    }
  };
  // console.log(HOST_API);

  // console.log(body);

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <StatusBar backgroundColor={'transparent'} translucent />
      <ImageBackground
        style={{flex: 1}}
        resizeMode="cover"
        source={require('../../assets/images/signup.png')}>
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
              Sign Up
            </Text>
          </View>
          {/* Input */}
          <View style={{paddingLeft: 20, paddingRight: 20}}>
            <TextInput
              value={body.email}
              onChangeText={value =>
                setBody({
                  ...body,
                  email: value,
                })
              }
              placeholder="Enter your email address"
              keyboardType="email-address"
              autoComplete="email"
              placeholderTextColor={'rgba(151, 151, 151, 1)'}
              style={{
                fontFamily: 'Poppins-Regular',
                color: '#fff',
                borderBottomWidth: 2,
                borderBottomColor: '#fff',
              }}
            />
            <View style={{position: 'relative'}}>
              <TextInput
                value={body.pass}
                onChangeText={value =>
                  setBody({
                    ...body,
                    pass: value,
                  })
                }
                placeholder="Enter your password"
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
            <TextInput
              value={body.phone}
              // onChange={value => {
              //   value.preventDefault();
              //   setBody({
              //     ...body,
              //     phone: value,
              //   });
              // }}
              onChangeText={value =>
                setBody({
                  ...body,
                  phone: value,
                })
              }
              placeholder="Enter your phone number"
              autoComplete="tel"
              keyboardType="phone-pad"
              placeholderTextColor={'rgba(151, 151, 151, 1)'}
              style={{
                fontFamily: 'Poppins-Regular',
                color: '#fff',
                borderBottomWidth: 2,
                borderBottomColor: '#fff',
              }}
            />
          </View>

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
              <TouchableOpacity
                onPress={registHandler}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#6A4029',
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
                      color: '#fff',
                    }}>
                    Create Account
                  </Text>
                )}
              </TouchableOpacity>
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
                // onPress={() => navigation.navigate('signin')}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#fff',

                  padding: 10,
                  borderRadius: 20,
                  height: 70,
                  flex: 1,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={{
                      height: 25,
                      width: 25,
                      marginEnd: 10,
                    }}
                    source={require('../../assets/images/google.png')}
                  />
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      fontSize: 17,
                      color: '#000',
                    }}>
                    Create With Google
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Signup;
