import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeaderDrawer from '../../components/customHeader/headerDrawer';

const PrivacyPage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <HeaderDrawer navigation={navigation} />
      <Text>PrivacyPage</Text>
    </View>
  );
};

export default PrivacyPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // padding: 10,
    paddingHorizontal: 30,
    paddingVertical: 15,
    // justifyContent: 'space-between',
  },
});
