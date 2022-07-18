/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const Welcome = ({navigation}) => {
  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <StatusBar backgroundColor={'transparent'} translucent />
      <ImageBackground
        style={{flex: 1}}
        resizeMode="cover"
        source={require('../../assets/images/welcome.png')}>
        <View
          style={{
            paddingTop: 120,
            paddingVertical: 50,
            flex: 1,
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'space-between',
          }}>
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
            Coffee for Everyone
          </Text>
          <View
            style={{
              // marginTop: 0,
              paddingLeft: 10,
              paddingRight: 10,
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('auth')}
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
                Get Started
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Welcome;
