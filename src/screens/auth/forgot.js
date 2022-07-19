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
import React, {useEffect, useState} from 'react';
import {HOST_API} from '@env';
import Toast from 'react-native-toast-message';
import axios from 'axios';

const Forgot = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  console.log(email);
  const forgotHandler = async () => {
    const body = {email: email};
    console.log(body);
    try {
      setLoading(true);
      const result = await axios({
        method: 'POST',
        url: `${HOST_API}/auth/forgot`,
        data: body,
      });
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Request Success! 🙌',
        text2: `${result.data.msg} 👋`,
      });
      setTimeout(() => {
        setSuccess(true);
      }, 2000);
      console.log(result.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Oopss 😓',
        text2: `${error.response.data?.err.msg}`,
      });
    }
  };

  useEffect(() => {
    if (success) {
      navigation.replace('reset', {
        email: email,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

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
              Enter your email adress to get reset password codes
            </Text>
          </View>
          {/* Input */}
          <View style={{paddingLeft: 20, paddingRight: 20}}>
            <TextInput
              value={email}
              onChangeText={value => setEmail(value)}
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
                onPress={forgotHandler}
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
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Forgot;
