/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {DrawerItemList} from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const MyDrawer = props => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{alignItems: 'center', padding: 20}}>
          <Image
            style={styles.profileImg}
            source={require('../../assets/images/defaultImage.png')}
          />
          <Text style={styles.name}>zulaikha</Text>
          <Text style={styles.email}>zulaikha17@gmail.com</Text>
        </View>
        <View style={styles.drawerItemList}>
          <DrawerItemList {...props} />
        </View>
      </View>
      <TouchableOpacity style={{marginBottom: 30}}>
        <View style={styles.logoutCont}>
          <MaterialIcons
            name="logout"
            size={22}
            color="#6A4029"
            style={{marginEnd: 15}}
          />
          <Text style={styles.logout}>Log Out</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MyDrawer;

export const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'space-between'},
  header: {
    alignContent: 'center',
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#6A4029',
    // minHeight: 230,
    borderTopRightRadius: 20,
    // paddingVertical: 25,
  },
  profileImg: {
    width: 130,
    height: 130,
    borderRadius: 130,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
  },
  email: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular,',
    color: '#fff',
  },
  drawerItemList: {
    backgroundColor: '#fff',
    // alignItems: 'flex-start',
  },
  logoutCont: {
    flexDirection: 'row',
    padding: 20,
  },
  logout: {
    fontFamily: 'Poppins-Medium',
    color: '#6A4029',
    fontSize: 15,
  },
});
