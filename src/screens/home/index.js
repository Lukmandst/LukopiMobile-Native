/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';

const Home = () => {
  return (
    <View style={style.container}>
      <Text style={{fontFamily: 'Poppins-Black', color: '#000', fontSize: 35}}>
        A good coffee is a good day
      </Text>
      <View>
        <View style={style.filterContainer}>
          <Text style={style.filterValue}>Favourite</Text>
          <Text style={style.filterValue}>All Menu</Text>
          <Text style={style.filterValue}>Coffee</Text>
          <Text style={style.filterValue}>Non Coffee</Text>
          <Text style={style.filterValue}>Foods</Text>
        </View>
        <View style={style.cardContainer}>
          <Text style={{textAlign: 'right'}}>See More</Text>
          <View style={style.card}>
            <View style={style.cardImage}></View>
            <View style={style.cardInfo}>
              <Text style={style.cardName}>Creamy Ice Latte</Text>
              <Text style={style.cardPrice}>10000</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Home;

import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    padding: 10,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 36,
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterValue: {
    color: '#9A9A9D',
    fontFamily: 'Poppins-Regular',
  },
  cardContainer: {
    paddingVertical: 20,
  },
  card: {
    padding: 10,
    marginTop: 20,
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
    position: 'relative',
    top: -30,
    backgroundColor: '#000',
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
});
