import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';

const Header = ({navigation, title, color = '#000'}) => {
  return (
    <View style={styles.customHeader}>
      <FeatherIcon
        name="chevron-left"
        size={30}
        color="grey"
        onPress={() => navigation.goBack()}
      />
      <Text
        style={{
          fontFamily: 'Poppins-Black',
          fontSize: 30,
          color: color,
          textAlign: 'center',
        }}>
        {title}
      </Text>
      <FeatherIcon
        name="shopping-cart"
        size={30}
        color="grey"
        style={{marginRight: 10}}
        onPress={() => navigation.navigate('cart')}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  customHeader: {
    // flex: 0.5,
    flexDirection: 'row',
    // backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
