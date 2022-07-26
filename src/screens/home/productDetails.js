import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {GetInfoProduct} from '../../modules/api';
import {useDispatch} from 'react-redux';
import {addItemToCart1} from '../../redux/actions/cartActions';
import {currencyFormatter} from '../../helpers/formatter';
import Header from '../../components/customHeader/header';

const ProductDetails = ({navigation, route}) => {
  const [size, setSize] = useState('Regular');
  const {id} = route.params;
  // console.log(route.params);
  const dispatch = useDispatch();
  const {product, loadingProduct} = GetInfoProduct(id);

  const addTocartHandler = async () => {
    await dispatch(
      addItemToCart1({
        size: size,
        productid: id,
        product_image: product[0].image,
        product_price: product[0].price,
        product_name: product[0].name,
      }),
    );
    setTimeout(() => {
      navigation.navigate('cart');
    }, 1000);
  };
  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        title={product && product[0].name}
        color={'#fff'}
      />
      {loadingProduct ? (
        <ActivityIndicator size={'large'} color="#fff" />
      ) : (
        <View style={styles.bodyInfo}>
          <View style={styles.header}>
            <View style={styles.price}>
              <Text style={styles.priceValue}>
                {currencyFormatter.format(product[0].price)}
              </Text>
            </View>
            <View>
              <Image
                style={styles.productImg}
                source={{uri: product[0].image}}
              />
              <Text style={styles.name}>{product[0].name}</Text>
            </View>
          </View>
          <View style={styles.infoWrapper}>
            <Text style={styles.infoValue2}>
              Delivery only on Monday to friday at 1 - 7 pm
            </Text>
            <Text style={styles.infoValue}>{product[0].details}</Text>
          </View>
          <View style={styles.footer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginBottom: 30,
              }}>
              <TouchableOpacity
                style={size === 'Regular' ? styles.sizeActive : styles.size}
                onPress={() => setSize('Regular')}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Bold',
                    fontSize: 16,
                    color: '#6A4029',
                    textAlign: 'center',
                  }}>
                  R
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={size === 'Large' ? styles.sizeActive : styles.size}
                onPress={() => setSize('Large')}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Bold',
                    fontSize: 16,
                    color: '#6A4029',
                    textAlign: 'center',
                  }}>
                  L
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={size === 'Extra Large' ? styles.sizeActive : styles.size}
                onPress={() => setSize('Extra Large')}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Bold',
                    fontSize: 16,
                    color: '#6A4029',
                    textAlign: 'center',
                  }}>
                  XL
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: 10,
                paddingLeft: 10,
                paddingRight: 10,
                flexDirection: 'row',
                marginBottom: 15,
              }}>
              <TouchableOpacity
                onPress={addTocartHandler}
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
                  Add to Cart
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default ProductDetails;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#362115',
  },
  bodyInfo: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 150,
    borderTopRightRadius: 80,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  productImg: {
    width: 200,
    height: 200,
    borderRadius: 200,
    marginBottom: 10,
  },
  header: {
    // backgroundColor: 'blue',
    position: 'relative',
    top: -100,
    // height: 400,
    flexDirection: 'row',
    // flex: 1,
    // alignItems: '',
    justifyContent: 'space-between',
  },
  price: {
    marginTop: 46,
    backgroundColor: '#FFBA33',
    width: 147,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
  priceValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#000',
  },
  name: {
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#000',
  },
  infoWrapper: {
    top: 180,
    left: 20,
    position: 'absolute',
    paddingHorizontal: 10,
  },
  infoValue: {
    fontFamily: 'Poppins-SemiBold',
    color: '#6A4029',
    fontSize: 20,
  },
  infoValue2: {
    fontFamily: 'Poppins-Regular',
    color: '#6A4029',
    fontSize: 18,
    marginBottom: 20,
  },
  size: {
    elevation: 15,
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeActive: {
    elevation: 15,
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: '#FFBA33',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 0.5,
    // backgroundColor: 'red',
  },
});
