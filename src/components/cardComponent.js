import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {currencyFormatter} from '../helpers/formatter';
import Ionicon from 'react-native-vector-icons/SimpleLineIcons';
import {useSelector} from 'react-redux';

const CardComponent = ({item, navigation}) => {
  const {roles_id} = useSelector(state => state.auth);
  // console.log(roles_id);
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('details', {id: item.id})}>
      <Image
        style={styles.cardImage}
        resizeMode="cover"
        source={{uri: item.image}}
      />
      {roles_id === '2' && (
        <TouchableOpacity
          style={styles.editIcon}
          onPress={() => navigation.navigate('editProduct', {id: item.id})}>
          <Ionicon name="pencil" size={20} color="#fff" />
        </TouchableOpacity>
      )}
      <View style={styles.cardInfo}>
        <Text style={styles.cardName}>{item.name}</Text>
        <Text style={styles.cardPrice}>
          {currencyFormatter.format(item.price)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    // padding: 10,
    // paddingHorizontal: 30,
    paddingBottom: 25,
    // justifyContent: 'space-between',
  },
  card: {
    padding: 10,
    // margin: 20,
    marginTop: 30,
    marginEnd: 20,
    position: 'relative',
    backgroundColor: '#fff',
    width: 200,
    minHeight: 275,
    borderRadius: 30,
    elevation: 4, //gantinya shadow
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  cardImage: {
    elevation: 10,
    borderColor: 'rgba(175, 172, 174, 0.25)',
    borderStyle: 'solid',
    borderWidth: 2,
    position: 'relative',
    top: -30,
    // backgroundColor: '#000',
    width: 145,
    height: 160,
    borderRadius: 20,
  },
  cardInfo: {
    alignItems: 'center',
  },
  cardName: {
    fontSize: 18,
    width: 'auto',
    fontFamily: 'Poppins-Black',
    color: '#000',
  },
  cardPrice: {
    // alignItems: 'flex-end',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#6A4029',
  },
  editIcon: {
    zIndex: 100,
    position: 'absolute',
    top: 110,
    // left: 200,
    right: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#6A4029',
  },
});
