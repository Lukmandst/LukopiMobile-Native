import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {currencyFormatter} from '../../helpers/formatter';
import Octicons from 'react-native-vector-icons/Octicons';
import axios from 'axios';
import {HOST_API} from '@env';
import Toast from 'react-native-toast-message';
import {resetCart} from '../../redux/actions/cartActions';
import {sendLocalNotification} from '../../helpers/notification';
import Header from '../../components/customHeader/header';

const PaymentPage = ({navigation, route}) => {
  const [payment, setPayment] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const {token} = useSelector(state => state.auth);
  const {cart} = useSelector(state => state.cart);
  const {subtotal1, finalTotal, quantity, delivery} = route.params;
  console.log(route.params);
  // console.log(cart);

  const paymentHandler = async () => {
    setLoading(false);
    const body = {
      product_id: cart.product_id,
      product_size: cart.size,
      quantity: quantity,
      delivery: delivery,
      total_price: finalTotal,
    };
    console.log(body);
    try {
      setLoading(true);
      const result = await axios({
        method: 'POST',
        url: `${HOST_API}/transaction`,
        headers: {Authorization: `Bearer ${token}`},
        data: body,
      });
      setLoading(false);
      // Toast.show({
      //   type: 'success',
      //   text1: 'Transaction Success! 🙌',
      //   text1: 'Thank you for your purchase! 👋',
      // });
      sendLocalNotification(
        'Transaction Success! 🙌',
        'Thank you for your purchase! 👋',
      );
      setTimeout(() => {
        dispatch(resetCart());
        navigation.reset({index: 1, routes: [{name: 'HomeScreen'}]});
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.error(error.response);
      Toast.show({
        type: 'error',
        text1: `${error.response.data?.err}`,
      });
    }
  };
  return (
    <View style={styles.container}>
      <Header navigation={navigation} title="Payment" />

      {cart ? (
        <>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>Products</Text>
          </View>
          <View style={styles.card}>
            <Image
              source={{uri: cart.product_image}}
              style={styles.img}
              resizeMode="cover"
            />
            <View style={styles.productInfo}>
              <Text style={styles.item}>
                {cart.product_name ? cart.product_name : 'Hazelnut Latte'}
              </Text>
              <Text style={styles.item}>{`x${quantity}`}</Text>
              <Text style={styles.item}>{cart.size}</Text>
            </View>
            <Text style={styles.price}>
              {currencyFormatter.format(subtotal1)}
            </Text>
          </View>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>Payment method</Text>
          </View>
          <View style={styles.methodCard}>
            <TouchableOpacity
              style={styles.deliveryValWrapper}
              onPress={() => setPayment('card')}>
              <Octicons
                name={payment === 'card' ? 'dot-fill' : 'dot'}
                size={25}
                color={'#6A4029'}
              />
              <Text style={styles.delivery}>Card</Text>
            </TouchableOpacity>
            <View style={styles.border} />
            <TouchableOpacity
              style={styles.deliveryValWrapper}
              onPress={() => setPayment('bank')}>
              <Octicons
                name={payment === 'bank' ? 'dot-fill' : 'dot'}
                size={25}
                color={'#6A4029'}
              />
              <Text style={styles.delivery}>Bank account</Text>
            </TouchableOpacity>
            <View style={styles.border} />
            <TouchableOpacity
              style={styles.deliveryValWrapper}
              onPress={() => setPayment('cod')}>
              <Octicons
                name={payment === 'cod' ? 'dot-fill' : 'dot'}
                size={25}
                color={'#6A4029'}
              />
              <Text style={styles.delivery}>Cash on delivery</Text>
            </TouchableOpacity>
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
                // paddingLeft: 10,
                // paddingRight: 10,
                flexDirection: 'row',
                // marginBottom: 15,
              }}>
              <TouchableOpacity
                onPress={paymentHandler}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#6A4029',
                  padding: 10,
                  borderRadius: 20,
                  height: 70,
                  flex: 1,
                }}>
                {loading ? (
                  <ActivityIndicator size={'large'} color="#fff" />
                ) : (
                  <Text
                    style={{
                      fontFamily: 'Poppins-Bold',
                      fontSize: 16,
                      color: '#fff',
                    }}>
                    Proceed to Payment
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <></>
      )}
    </View>
  );
};

export default PaymentPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 34,
    color: '#000000',
  },
  img: {
    width: 70,
    height: 70,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  subtitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
    color: '#000000',
  },
  card: {
    elevation: 10,
    padding: 5,
    flex: 0.5,
    // alignSelf: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: '5%',
    // paddingVertical: 20,
    borderRadius: 15,
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  item: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: '#000000',
  },
  price: {
    fontFamily: 'Poppins-Medium',
    fontSize: 17,
    color: '#000000',
  },
  methodCard: {
    elevation: 10,
    flex: 1,
    justifyContent: 'space-around',
    // width: '90%',
    // alignSelf: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: '5%',
    paddingVertical: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  border: {
    borderWidth: 1,
    borderColor: '#000000',
    opacity: 0.1,
    marginVertical: 5,
  },
  delivery: {
    fontFamily: 'Poppins-Regular',
    fontSize: 17,
    color: '#000000',
    marginVertical: 5,
    marginLeft: 15,
  },
  paymentBtn: {
    backgroundColor: '#6A4029',
    width: '70%',
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentTxt: {
    elevation: 10,
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
    color: '#ffffff',
    textAlign: 'center',
  },
  totalContainer: {
    paddingHorizontal: '5%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoWrapperBottom: {
    flex: 0.5,
    paddingHorizontal: 20,
    // padding: 20,
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
  deliveryValWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'grey',
  },
});
