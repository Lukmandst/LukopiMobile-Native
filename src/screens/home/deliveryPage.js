/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {currencyFormatter} from '../../helpers/formatter';

const DeliveryPage = ({navigation, route}) => {
  const [delivery, setDelivery] = useState(false);
  const [method, setMethod] = useState('Dine In');
  const {subtotal1, tax1, total1, quantity} = route.params;
  console.log(route.params);
  let ship = delivery ? 10000 : 0;
  let finalTotal = total1 + ship;
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 34, fontFamily: 'Poppins-Bold', color: '#000'}}>
        Delivery
      </Text>
      <View style={styles.addressWrapper}>
        <View style={styles.addressHead}>
          <Text style={styles.textBold}>Address details</Text>
          <Text style={{color: '#6A4029', fontFamily: 'Poppins-Medium'}}>
            change
          </Text>
        </View>
        <View style={styles.addressInfo}>
          <Text style={styles.textNormal}>Iskandar Street</Text>
          <Text style={styles.textNormal}>
            Km 5 refinery road oppsite re public road, effurun, Jakarta
          </Text>
          <Text style={styles.textNormal}>089978987908</Text>
        </View>
      </View>
      <View style={styles.deliveryWrapper}>
        <View style={styles.addressHead}>
          <Text style={styles.textBold}>Delivery methods</Text>
        </View>
        <View style={styles.deliveryInfo}>
          <TouchableOpacity
            onPress={() => {
              setDelivery(true);
              setMethod('Delivery');
            }}>
            <View style={styles.deliveryValWrapper}>
              <Icon
                name={delivery ? 'circle' : 'circle-o'}
                style={{marginRight: 15}}
                color={delivery && '#6A4029'}
              />
              <Text style={styles.textNormal}>Door Delivery</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setDelivery(false);
              setMethod('Pick Up');
            }}>
            <View style={styles.deliveryValWrapper}>
              <Icon
                name={method === 'Pick Up' ? 'circle' : 'circle-o'}
                style={{marginRight: 15}}
                color={method === 'Pick Up' && '#6A4029'}
              />
              <Text style={styles.textNormal}>Pick up at Store</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setDelivery(false);
              setMethod('Dine In');
            }}>
            <View style={styles.deliveryValWrapper}>
              <Icon
                name={method === 'Dine In' ? 'circle' : 'circle-o'}
                solid="true"
                color={method === 'Dine In' && '#6A4029'}
                style={{marginRight: 15}}
              />
              <Text style={styles.textNormal}>Dine In</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.infoWrapperBottom}>
        <View style={styles.infoWrapper2}>
          <Text style={styles.infoKey2}>Total :</Text>
          <Text style={styles.infoValue2}>
            {currencyFormatter.format(finalTotal)}
          </Text>
        </View>
        <View
          style={{
            // marginTop: 10,
            paddingLeft: 10,
            paddingRight: 10,
            flexDirection: 'row',
            // marginBottom: 15,
          }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('payment', {
                finalTotal: finalTotal,
                delivery: method,
                subtotal1: subtotal1,
                tax1: tax1,
                total1: total1,
                quantity: quantity,
              })
            }
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
              Proceed to Payment
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DeliveryPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  infoWrapperBottom: {
    flex: 1,
    padding: 20,
  },
  infoWrapper2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoKey2: {
    fontSize: 25,
    fontFamily: 'Poppins-Bold',
    color: '#000',
  },
  infoValue2: {
    fontSize: 25,
    fontFamily: 'Poppins-Bold',
    color: '#000',
  },
  addressHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addressWrapper: {
    flex: 1,
  },
  addressInfo: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  deliveryWrapper: {
    flex: 1,
  },
  deliveryInfo: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  deliveryValWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textNormal: {
    fontFamily: 'Poppins-Medium',
    color: '#000',
    fontSize: 14,
  },
  textBold: {
    fontFamily: 'Poppins-Bold',
    color: '#000',
    fontSize: 18,
  },
});
