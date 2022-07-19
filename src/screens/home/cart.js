import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {currencyFormatter} from '../../helpers/formatter';

const Cart = ({navigation}) => {
  const [quantity, setQuantity] = useState(1);
  const {cart} = useSelector(state => state.cart);
  // console.log(cart.product_price);
  const handlePlus = () => {
    setQuantity(quantity + 1);
  };
  const handleMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  let subtotal = Array.isArray(cart).product_price * quantity;
  let tax = subtotal * 0.1;
  let total = subtotal + tax;

  const handlerCheckout = () => {
    navigation.navigate('checkout', {
      product_id: cart.product_id,
      subtotal1: subtotal,
      tax1: tax,
      total1: total,
      quantity: quantity,
    });
  };

  return (
    <View style={styles.container}>
      {Array.isArray(cart) ? (
        <>
          <View>
            <View style={styles.productContainer}>
              <View style={styles.productCard}>
                <View style={styles.imageWrapper}>
                  <Image
                    style={styles.img}
                    source={{uri: Array.isArray(cart).product_image}}
                    resizeMode="cover"
                  />
                  <Text
                    style={{
                      marginTop: 10,
                      fontFamily: 'Poppins-Bold',
                      fontSize: 16,
                      color: '#6A4029',
                      textAlign: 'center',
                    }}>
                    {currencyFormatter.format(
                      Array.isArray(cart)?.product_price,
                    )}
                  </Text>
                </View>
                <View style={styles.wrapperQuan}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Bold',
                      fontSize: 18,
                      textAlign: 'center',
                      color: '#6A4029',
                    }}>
                    {Array.isArray(cart).product_name}
                  </Text>
                  <View style={styles.valueWrapper}>
                    <TouchableOpacity
                      style={styles.quantityBtn}
                      onPress={handleMinus}>
                      <Text style={styles.quantity}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityBtn}
                      onPress={handlePlus}>
                      <Text style={styles.quantity}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View>
            <View
              style={{
                marginTop: 10,
                paddingLeft: 10,
                paddingRight: 10,
                flexDirection: 'row',
                marginBottom: 15,
              }}>
              <TouchableOpacity
                // onPress={() => navigation.navigate('cart')}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#FFBA33',
                  padding: 10,
                  borderRadius: 20,
                  height: 70,
                  flex: 1,
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    fontSize: 16,
                    color: '#6A4029',
                  }}>
                  Apply delivery Coupons
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.infoWrapper}>
            <View style={styles.infoWrapper2}>
              <Text style={styles.infoKey}>Item Total</Text>
              <Text style={styles.infoValue}>
                {currencyFormatter.format(subtotal)}
              </Text>
            </View>
            <View style={styles.infoWrapper2}>
              <Text style={styles.infoKey}>Delivery Charge</Text>
              <Text style={styles.infoValue}>
                {' '}
                {currencyFormatter.format(0)}
              </Text>
            </View>
            <View style={styles.infoWrapper2}>
              <Text style={styles.infoKey}>Tax</Text>
              <Text style={styles.infoValue}>
                {currencyFormatter.format(tax)}
              </Text>
            </View>
          </View>
          <View style={styles.infoWrapperBottom}>
            <View style={styles.infoWrapper2}>
              <Text style={styles.infoKey2}>Total :</Text>
              <Text style={styles.infoValue2}>
                {currencyFormatter.format(total)}
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
                onPress={handlerCheckout}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#FFBA33',
                  padding: 10,
                  borderRadius: 20,
                  height: 70,
                  flex: 1,
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Bold',
                    fontSize: 16,
                    color: '#6A4029',
                  }}>
                  CHECKOUT
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <>
          <View style={styles.infoWrapperBottom}>
            <View style={styles.infoWrapper2}>
              <Text style={styles.infoKey2}>Your Cart is Empty :(</Text>
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
                onPress={() => navigation.navigate('Home')}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#FFBA33',
                  padding: 10,
                  borderRadius: 20,
                  height: 70,
                  flex: 1,
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Bold',
                    fontSize: 16,
                    color: '#6A4029',
                  }}>
                  Start Ordering Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  productContainer: {
    justifyContent: 'center',
    height: 170,
    // backgroundColor: 'blue',
  },
  productCard: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    // justifyContent: 'space-around',
    alignItems: 'center',
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 100,
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 80,
  },
  quantityBtn: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: 'rgba(231, 170, 54, 0.52)',
    // textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  infoWrapper: {
    flex: 1,
    padding: 20,
    // height: 500,
    borderStyle: 'solid',
    // borderWidth: 1,
    borderTopWidth: 3,
    borderTopColor: '#E0E0E2',
    // backgroundColor: 'red',
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
  infoKey: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#ADADAF',
  },
  infoValue: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#000',
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
  quantity: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#6A4029',
  },
  wrapperQuan: {
    justifyContent: 'space-evenly',
    flex: 1,
  },
});
