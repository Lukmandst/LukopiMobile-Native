import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const Auth = ({navigation}) => {
  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <StatusBar backgroundColor={'transparent'} translucent />
      <ImageBackground
        style={{flex: 1}}
        resizeMode="cover"
        source={require('../../assets/images/welcome2.png')}>
        <View
          style={{
            paddingTop: 120,
            paddingVertical: 50,
            flex: 1,
            // alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'space-between',
          }}>
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
              Welcome!
            </Text>
            <Text
              style={{
                //   marginTop: 100,
                fontFamily: 'Poppins-Regular',
                color: '#fff',
                fontSize: 16,
                textAlign: 'center',
              }}>
              Get a cup of coffee for free{`\n`}every sunday morning
            </Text>
          </View>
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
                onPress={() => navigation.navigate('signup')}
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
                    fontSize: 16,
                    color: '#fff',
                  }}>
                  Create New Account
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                // marginTop: 0,
                paddingLeft: 10,
                paddingRight: 10,
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('signin')}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#FFBA33',

                  padding: 10,
                  borderRadius: 20,
                  height: 70,
                  flex: 1,
                }}>
                <Text style={{fontFamily: 'Poppins-Bold', fontSize: 17}}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Auth;
