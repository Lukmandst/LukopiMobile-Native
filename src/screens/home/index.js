/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  GetAllProduct,
  GetCoffeeProduct,
  GetFavProduct,
  GetFoodsProduct,
  GetNonCoffeeProduct,
} from '../../modules/api';
import CardComponent from '../../components/cardComponent';
import Header from '../../components/headerDrawer';
import HeaderDrawer from '../../components/headerDrawer';
import FeatherIcon from 'react-native-vector-icons/Feather';

const Home = props => {
  const [category, setCategory] = useState('Fav');
  const {Fav, loadingFav} = GetFavProduct();
  const {All, loadingAll} = GetAllProduct('ASC', 'created_at');
  const {Coffee, loadingCoffee} = GetCoffeeProduct('ASC', 'created_at');
  const {NonCoffee, loadingNonCoffee} = GetNonCoffeeProduct(
    'ASC',
    'created_at',
  );
  const {Foods, loadingFoods} = GetFoodsProduct('ASC', 'created_at');
  const anjay =
    category === 'Fav'
      ? ['Favourite', 'Coffee', 'Non Coffee', 'Foods', 'All Menu']
      : category === 'Coffee'
      ? ['Coffee', 'Favourite', 'Non Coffee', 'Foods', 'All Menu']
      : category === 'Non'
      ? ['Non Coffee', 'Favourite', 'Coffee', 'Foods', 'All Menu']
      : category === 'Foods'
      ? ['Foods', 'Favourite', 'Coffee', 'Non Coffee', 'All Menu']
      : ['All Menu', 'Favourite', 'Coffee', 'Non Coffee', 'Foods'];

  // console.log(Fav);

  return (
    <ScrollView style={style.container}>
      <HeaderDrawer navigation={props.navigation} />
      <Text style={{fontFamily: 'Poppins-Black', color: '#000', fontSize: 35}}>
        A good coffee is a good day
      </Text>
      <View
        style={{
          position: 'relative',
          paddingHorizontal: 15,
          flexDirection: 'row',
          backgroundColor: 'rgba(239, 238, 238, 1)',
          borderRadius: 20,
          flex: 1,
          alignItems: 'center',
          // justifyContent: 'center',
        }}>
        <FeatherIcon name="search" size={20} color="grey" />
        <TextInput
          placeholder="Search"
          placeholderTextColor={'rgba(151, 151, 151, 1)'}
          style={{
            flex: 1,
            fontFamily: 'Poppins-Medium',
            color: '#000',
          }}
        />
      </View>
      <View>
        <ScrollView contentContainerStyle={style.filterContainer}>
          <Text
            onPress={() => setCategory('Fav')}
            style={
              category === 'Fav' ? style.filterValueActive : style.filterValue
            }>
            Favourite
          </Text>
          <Text
            style={
              category === 'All' ? style.filterValueActive : style.filterValue
            }
            onPress={() => setCategory('All')}>
            All Menu
          </Text>
          <Text
            style={
              category === 'Coffee'
                ? style.filterValueActive
                : style.filterValue
            }
            onPress={() => setCategory('Coffee')}>
            Coffee
          </Text>
          <Text
            style={
              category === 'Non' ? style.filterValueActive : style.filterValue
            }
            onPress={() => setCategory('Non')}>
            Non Coffee
          </Text>
          <Text
            style={
              category === 'Foods' ? style.filterValueActive : style.filterValue
            }
            onPress={() => setCategory('Foods')}>
            Foods
          </Text>
        </ScrollView>
        <View style={{marginBottom: 50}}>
          <ScrollView>
            {anjay.map((items, i) => (
              <View key={i} style={{marginBottom: 15}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 15,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Bold',
                      fontSize: 16,
                      color: '#6A4029',
                    }}>
                    {items}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'right',
                      fontFamily: 'Poppins-Reguler',
                      fontSize: 14,
                      color: '#6A4029',
                    }}
                    onPress={() =>
                      props.navigation.navigate('seeMore', {title: items})
                    }>
                    See More{' '}
                  </Text>
                </View>
                {loadingFav ||
                loadingAll ||
                loadingCoffee ||
                loadingFoods ||
                loadingNonCoffee ? (
                  <ActivityIndicator size={'large'} color="#6A4029" />
                ) : (
                  <FlatList
                    horizontal={true}
                    data={
                      items === 'Favourite'
                        ? Fav
                        : items === 'Coffee'
                        ? Coffee
                        : items === 'Non Coffee'
                        ? NonCoffee
                        : items === 'Foods'
                        ? Foods
                        : All
                    }
                    renderItem={({item}) => (
                      <CardComponent
                        item={item}
                        navigation={props.navigation}
                      />
                    )}
                    keyExtractor={item2 => item2.id}
                    initialNumToRender={5}
                    maxToRenderPerBatch={10}
                  />
                )}
              </View>
            ))}
          </ScrollView>
          {/* <FlatList
            horizontal={false}
            data={anjay}
            renderItem={({item, index}) => (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 15,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Bold',
                      fontSize: 16,
                      color: '#6A4029',
                    }}>
                    {item}
                  </Text>
                  <Text style={{textAlign: 'right'}}>See More </Text>
                </View>
                {loadingFav ||
                loadingAll ||
                loadingCoffee ||
                loadingFoods ||
                loadingNonCoffee ? (
                  <ActivityIndicator size={'large'} color="#6A4029" />
                ) : (
                  <FlatList
                    horizontal={true}
                    data={
                      item === 'Favourite'
                        ? Fav
                        : item === 'Coffee'
                        ? Coffee
                        : item === 'Non Coffee'
                        ? NonCoffee
                        : item === 'Foods'
                        ? Foods
                        : All
                    }
                    renderItem={renderItem}
                    keyExtractor={item2 => item2.id}
                    initialNumToRender={5}
                    maxToRenderPerBatch={10}
                  />
                )}
              </>
            )}
            keyExtractor={({item, index}) => index}
            initialNumToRender={5}
            maxToRenderPerBatch={10}
          /> */}
        </View>
        {/* {category === 'Fav'?
      : category === 'Coffee' ? :
      category === 'Non' ? :
      category === 'Foods' ? :
      } */}
        {/* <View style={style.cardContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 15,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                fontSize: 16,
                color: '#6A4029',
              }}>
              Favourite
            </Text>
            <Text style={{textAlign: 'right'}}>See More </Text>
          </View>
          {loadingFav ? (
            <ActivityIndicator size={'large'} color="#6A4029" />
          ) : (
            <FlatList
              horizontal={true}
              data={Fav}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              initialNumToRender={5}
              maxToRenderPerBatch={10}
            />
          )}
        </View>
        <View style={style.cardContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 15,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                fontSize: 16,
                color: '#6A4029',
              }}>
              Coffee
            </Text>
            <Text style={{textAlign: 'right'}}>See More </Text>
          </View>
          {loadingCoffee ? (
            <ActivityIndicator size={'large'} color="#6A4029" />
          ) : (
            <FlatList
              horizontal={true}
              data={Coffee}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              initialNumToRender={5}
              maxToRenderPerBatch={10}
            />
          )}
        </View>
        <View style={style.cardContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 15,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                fontSize: 16,
                color: '#6A4029',
              }}>
              Non Coffee
            </Text>
            <Text style={{textAlign: 'right'}}>See More </Text>
          </View>
          {loadingNonCoffee ? (
            <ActivityIndicator size={'large'} color="#6A4029" />
          ) : (
            <FlatList
              horizontal={true}
              data={NonCoffee}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              initialNumToRender={5}
              maxToRenderPerBatch={10}
            />
          )}
        </View>
        <View style={style.cardContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 15,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                fontSize: 16,
                color: '#6A4029',
              }}>
              Foods
            </Text>
            <Text style={{textAlign: 'right'}}>See More </Text>
          </View>
          {loadingFoods ? (
            <ActivityIndicator size={'large'} color="#6A4029" />
          ) : (
            <FlatList
              horizontal={true}
              data={Foods}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              initialNumToRender={5}
              maxToRenderPerBatch={10}
            />
          )}
        </View> */}
      </View>
    </ScrollView>
  );
};

export default Home;

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // padding: 10,
    paddingHorizontal: 30,
    paddingVertical: 15,
    // justifyContent: 'space-between',
  },
  text: {
    fontSize: 36,
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  filterValue: {
    color: '#9A9A9D',
    fontFamily: 'Poppins-Regular',
  },
  filterValueActive: {
    color: '#6A4029',
    fontFamily: 'Poppins-Bold',
    borderBottomWidth: 2,
    borderBottomColor: '#6A4029',
  },
  cardContainer: {
    paddingVertical: 20,
  },
  card: {
    padding: 10,
    marginTop: 20,
    marginHorizontal: 10,
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
