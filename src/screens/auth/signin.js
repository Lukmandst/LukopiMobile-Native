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
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';

import React, {useEffect, useState} from 'react';
import {authLogin} from '../../redux/actions/authActions';

const Signin = ({navigation}) => {
  const [body, setBody] = useState({
    email: '',
    pass: '',
  });
  const [eye, setEye] = useState(false);
  // const [loading, setLoading] = useState(false);
  const {loading, token, errorMsg} = useSelector(state => state.auth);
  console.log(token);

  const dispatch = useDispatch();
  const loginHandler = () => {
    let emailFormat = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
    if (!body.email.match(emailFormat)) {
      Toast.show({
        type: 'error',
        text1: 'Oopss 😓',
        text2: 'Email format should be mail@mail.com !',
      });
    } else if (body.pass.length < 1) {
      Toast.show({
        type: 'error',
        text1: 'Oopss 😓',
        text2: 'Password should not be empty !',
      });
    } else {
      dispatch(authLogin(body));
    }
  };
  useEffect(() => {
    if (token) {
      navigation.navigate('HomeScreen');
    }
    if (errorMsg) {
      Toast.show({
        type: 'error',
        text1: 'Oopss 😓',
        text2: `${errorMsg}`,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, errorMsg]);

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <StatusBar backgroundColor={'transparent'} translucent />
      <ImageBackground
        style={{flex: 1}}
        resizeMode="cover"
        source={require('../../assets/images/login.png')}>
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
                paddingStart: 20,
              }}>
              Login
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
            <Text
              onPress={() => navigation.navigate('forgot')}
              style={{
                color: '#fff',
                marginTop: 20,
                textDecorationLine: 'underline',
                fontFamily: 'Poppins-Regular',
                fontSize: 11,
              }}>
              Forgot your password?
            </Text>
          </View>

          {/* Button */}
          <View>
            <View
              style={{
                // marginTop: 0,
                paddingLeft: 10,
                paddingRight: 10,
                flexDirection: 'row',
                // marginBottom: 10,
              }}>
              <TouchableOpacity
                onPress={loginHandler}
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
                      fontSize: 17,
                      color: '#6A4029',
                    }}>
                    Login
                  </Text>
                )}
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginVertical: 10,
                paddingHorizontal: 30,
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  height: 2,
                  borderRadius: 2,
                  backgroundColor: '#fff',
                  flex: 1,
                }}
              />

              <Text
                style={{
                  marginHorizontal: 5,
                  fontFamily: 'Poppins-Bold',
                  fontSize: 17,
                  color: '#fff',
                }}>
                or login in with
              </Text>
              <View
                style={{
                  height: 2,
                  borderRadius: 2,
                  backgroundColor: '#fff',
                  flex: 1,
                }}
              />
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
                    source={require('../../assets/images/google.png')}></Image>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      fontSize: 17,
                      color: '#000',
                    }}>
                    Login With Google
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

export default Signin;
