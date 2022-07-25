import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeaderDrawer from '../../components/headerDrawer';

const SecurityPage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <HeaderDrawer navigation={navigation} />
      <Text>SecurityPage</Text>
    </View>
  );
};

export default SecurityPage;

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
