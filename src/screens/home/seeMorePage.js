import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {
  GetAllProduct,
  GetCoffeeProduct,
  GetFavProduct,
  GetFoodsProduct,
  GetNonCoffeeProduct,
} from '../../modules/api';
import {FlatList} from 'react-native-gesture-handler';
import {currencyFormatter} from '../../helpers/formatter';

const SeeMorePage = ({navigation, route}) => {
  const {title} = route.params;
  const {Fav, loadingFav} = GetFavProduct();
  const {All, loadingAll} = GetAllProduct();
  const {Coffee, loadingCoffee} = GetCoffeeProduct();
  const {NonCoffee, loadingNonCoffee} = GetNonCoffeeProduct();
  const {Foods, loadingFoods} = GetFoodsProduct();

  const renderItem = ({item, index}) => {
    return (
      <Pressable
        style={styles.card}
        onPress={() => navigation.navigate('details', {id: item.id})}>
        <Image
          style={styles.cardImage}
          resizeMode="cover"
          source={{uri: item.image}}
        />
        <View style={styles.cardInfo}>
          <Text style={styles.cardName}>{item.name}</Text>
          <Text style={styles.cardPrice}>
            {currencyFormatter.format(item.price)}
          </Text>
        </View>
      </Pressable>
    );
  };
  return (
    <View style={styles.container}>
      <View>
        <Text>Filter</Text>
      </View>
      {loadingFav ||
      loadingAll ||
      loadingCoffee ||
      loadingFoods ||
      loadingNonCoffee ? (
        <ActivityIndicator size={'large'} color="#6A4029" />
      ) : (
        <FlatList
          numColumns={2}
          data={
            title === 'Favourite'
              ? Fav
              : title === 'Coffee'
              ? Coffee
              : title === 'Non Coffee'
              ? NonCoffee
              : title === 'Foods'
              ? Foods
              : All
          }
          renderItem={renderItem}
          keyExtractor={item2 => item2.id}
          initialNumToRender={5}
          maxToRenderPerBatch={10}
        />
      )}
    </View>
  );
};

export default SeeMorePage;

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
});
