import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Ion from 'react-native-vector-icons/Ionicons';

const HeaderDrawer = ({navigation, title, color = '#000'}) => {
  return (
    <View style={styles.customHeader}>
      <FeatherIcon
        name="align-left"
        size={30}
        color="grey"
        onPress={() => navigation.toggleDrawer()}
      />

      <View style={{flexDirection: 'row'}}>
        <Ion
          name="chatbubble-outline"
          size={30}
          color="grey"
          style={{marginRight: 10}}
          // onPress={() => navigation.navigate('cart')}
        />
        <FeatherIcon
          name="shopping-cart"
          size={30}
          color="grey"
          style={{marginRight: 10}}
          onPress={() => navigation.navigate('cart')}
        />
      </View>
    </View>
  );
};

export default HeaderDrawer;

const styles = StyleSheet.create({
  customHeader: {
    // flex: 0.5,
    flexDirection: 'row',
    // backgroundColor: '#fff',
    paddingVertical: 20,
    // paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
