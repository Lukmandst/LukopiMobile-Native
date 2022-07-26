/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  GetAllProduct,
  GetCoffeeProduct,
  GetFavProduct,
  GetFoodsProduct,
  GetNonCoffeeProduct,
} from '../../modules/api';
import {FlatList} from 'react-native-gesture-handler';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import CardComponent from '../../components/cardComponent';

const SeeMorePage = ({navigation, route}) => {
  const [limit, setLimit] = useState(5);
  const {title} = route.params;
  const [modal, setModal] = useState(false);
  const [sort, setSort] = useState('ASC');
  const [name, setName] = useState('');
  const [nameAll, setNameAll] = useState('');
  const [nameCoffee, setNameCoffee] = useState('');
  const [nameNon, setNameNon] = useState('');
  const [nameFoods, setNameFoods] = useState('');
  const [filter, setFilter] = useState('created_at');
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(false);

  const {Fav, loadingFav} = GetFavProduct(name);
  const {All, loadingAll, AllMeta} = GetAllProduct(
    nameAll,
    sort,
    filter,
    limit,
  );
  const {Coffee, loadingCoffee} = GetCoffeeProduct(nameCoffee, sort, filter);
  const {NonCoffee, loadingNonCoffee} = GetNonCoffeeProduct(
    nameNon,
    sort,
    filter,
  );
  const {Foods, loadingFoods} = GetFoodsProduct(nameFoods, sort, filter);
  console.log(AllMeta);

  const loadMore = () => {
    if (!loading && data.length > 4 && AllMeta?.nextPage) {
      setLimit(limit + 5);
    }
  };
  useEffect(() => {
    if (title === 'Favourite') {
      if (!Fav) {
        setLoading(true);
      }
      setLoading(false);
      setData(Fav);
    } else if (title === 'All Menu') {
      if (!All) {
        setLoading(true);
      }
      setLoading(false);
      setData(All);
    } else if (title === 'Coffee') {
      if (!Coffee) {
        setLoading(true);
      }
      setLoading(false);
      setData(Coffee);
    } else if (title === 'Foods') {
      if (!Foods) {
        setLoading(true);
      }
      setLoading(false);
      setData(Foods);
    } else {
      if (!NonCoffee) {
        setLoading(true);
      }
      setLoading(false);
      setData(NonCoffee);
    }
  }, [
    All,
    Coffee,
    Fav,
    Foods,
    NonCoffee,
    // loadingAll,
    // loadingCoffee,
    // loadingFav,
    // loadingFoods,
    // loadingNonCoffee,
    title,
  ]);
  return (
    <View style={styles.container}>
      <View style={styles.customHeader}>
        <FeatherIcon
          name="chevron-left"
          size={30}
          color="grey"
          onPress={() => navigation.goBack()}
        />
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
            onChangeText={value => {
              title === 'Favourite'
                ? setName(value)
                : title === 'Coffee'
                ? setNameCoffee(value)
                : title === 'Non Coffee'
                ? setNameNon(value)
                : title === 'Foods'
                ? setNameFoods(value)
                : All;
              setNameAll(value);
            }}
            placeholder="Search"
            placeholderTextColor={'rgba(151, 151, 151, 1)'}
            style={{
              flex: 1,
              fontFamily: 'Poppins-Medium',
              color: '#000',
            }}
          />
        </View>
        <FeatherIcon
          name="shopping-cart"
          size={30}
          color="grey"
          style={{marginRight: 10, marginLeft: 10}}
          onPress={() => navigation.navigate('cart')}
        />
      </View>
      <View style={styles.filterdll}>
        <Pressable style={styles.filterBtn} onPress={() => setModal(!modal)}>
          <FeatherIcon name="filter" size={30} color="#fff" />
        </Pressable>
        <Text
          style={{
            fontFamily: 'Poppins-Black',
            fontSize: 30,
            color: '#000',
            textAlign: 'center',
          }}>
          {title}
        </Text>
        {sort === 'ASC' ? (
          <Pressable style={styles.filterBtn} onPress={() => setSort('DESC')}>
            <FAIcon
              name="sort-alpha-down"
              size={30}
              color="#fff"
              // onPress={() => navigation.goBack()}
            />
            {/* <Text style={styles.fiterName}>Filter</Text> */}
          </Pressable>
        ) : (
          <Pressable style={styles.filterBtn} onPress={() => setSort('ASC')}>
            <FAIcon
              name="sort-alpha-up"
              size={30}
              color="#fff"
              // onPress={() => navigation.goBack()}
            />
            {/* <Text style={styles.fiterName}>Filter</Text> */}
          </Pressable>
        )}
      </View>
      {loading ? (
        //  (title === 'Favourite' && loadingFav) ||
        //   (title === 'All Menu' && loadingAll) ||
        //   (title === 'Coffee' && loadingCoffee) ||
        //   (title === 'Foods' && loadingFoods) ||
        //   (title === 'Non Coffee' && loadingNonCoffee)
        <ActivityIndicator size={'large'} color="#6A4029" />
      ) : !data ? (
        // (title === 'Favourite' && !Fav) ||
        // (title === 'All Menu' && !All) ||
        // (title === 'Coffee' && !Coffee) ||
        // (title === 'Foods' && !Foods) ||
        // (title === 'Non Coffee' && !NonCoffee)
        <View style={styles.infoWrapperBottom}>
          <View style={styles.infoWrapper3}>
            <MaterialIcon
              name="food-off-outline"
              size={100}
              color="grey"
              style={{marginRight: 25}}
            />
            <Text style={styles.infoKey2}>Product Not Found :(</Text>
            <Text style={styles.infoValue3}>
              Sorry, the product you are looking for is currently unavailable{' '}
            </Text>
          </View>
        </View>
      ) : (
        <FlatList
          numColumns={2}
          data={
            // title === 'Favourite'
            //   ? Fav
            //   : title === 'Coffee'
            //   ? Coffee
            //   : title === 'Non Coffee'
            //   ? NonCoffee
            //   : title === 'Foods'
            //   ? Foods
            //   : All
            data
          }
          renderItem={({item}) => (
            <CardComponent item={item} navigation={navigation} />
          )}
          onEndReachedThreshold={0.2}
          onEndReached={loadMore}
          keyExtractor={item2 => item2.id}
          initialNumToRender={5}
          maxToRenderPerBatch={4}
        />
      )}
      <Modal
        animationType="slide"
        visible={modal}
        onRequestClose={() => setModal(!modal)}
        transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.warningTitle}>Filter</Text>
            <View style={styles.bodyInfo}>
              <View style={styles.filterMenu}>
                {title !== 'Favourite' && (
                  <TouchableOpacity
                    style={
                      filter === 'created_at'
                        ? styles.mainBtn2Active
                        : styles.mainBtn2
                    }
                    onPress={() => {
                      setFilter('created_at');
                      setSort('DESC');
                    }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {/* <FeatherIcon name="camera" size={18} color="#fff" /> */}
                      <Text style={styles.mainBtnText2}>Latest Product</Text>
                    </View>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={
                    filter === 'price' && sort === 'ASC'
                      ? styles.mainBtn2Active
                      : styles.mainBtn2
                  }
                  onPress={() => {
                    setFilter('price');
                    setSort('ASC');
                  }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {/* <FeatherIcon name="image" size={18} color="#fff" /> */}

                    <Text style={styles.mainBtnText2}>Cheapest</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    filter === 'price' && sort === 'DESC'
                      ? styles.mainBtn2Active
                      : styles.mainBtn2
                  }
                  onPress={() => {
                    setFilter('price');
                    setSort('DESC');
                  }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {/* <FeatherIcon name="camera" size={18} color="#fff" /> */}
                    <Text style={styles.mainBtnText2}>Most Expensive</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    filter === 'name' ? styles.mainBtn2Active : styles.mainBtn2
                  }
                  onPress={() => {
                    setFilter('name');
                    setSort('ASC');
                  }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {/* <FeatherIcon name="image" size={18} color="#fff" /> */}

                    <Text style={styles.mainBtnText2}>Name</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                marginTop: 20,
                // flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                // backgroundColor: 'red',
              }}>
              <TouchableOpacity
                style={styles.secondaryBtn}
                onPress={() => {
                  // setPicture(false);
                  setModal(!modal);
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.secBtnText}>Cancel</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.mainBtn}
                onPress={() => setModal(!modal)}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.mainBtnText}>Confirm</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SeeMorePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // backgroundColor: '#000',
    // padding: 10,
    // paddingHorizontal: 15,
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
  customHeader: {
    // flex: 0.5,
    flexDirection: 'row',
    // backgroundColor: 'red',
    paddingVertical: 20,
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterdll: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    // backgroundColor: 'red',
    justifyContent: 'space-between',
  },
  filterBtn: {
    borderRadius: 20,
    width: 50,
    height: 50,
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#6A4029',
    alignItems: 'center',
  },
  fiterName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#fff',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '90%',
    height: '30%',
    margin: 20,
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F8',
    borderRadius: 20,
    padding: 25,

    elevation: 5,
  },
  bodyInfo: {
    flex: 1,
    paddingVertical: 10,
    // textAlign: 'center',
    flexDirection: 'row',
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: '#000',
    justifyContent: 'space-around',
    alignItems: 'center',
    // backgroundColor: 'blue',
    marginTop: 5,
  },
  mainBtn: {
    width: 105,
    height: 40,
    backgroundColor: '#6A4029',
    borderRadius: 20,
  },
  filterMenu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // backgroundColor: '#fff',
  },
  mainBtn2: {
    width: 105,
    height: 40,
    backgroundColor: '#fff',
    elevation: 1,
    borderRadius: 20,
    marginVertical: 10,
  },
  mainBtn2Active: {
    width: 105,
    height: 40,
    backgroundColor: '#FFBA33',
    borderRadius: 20,
    marginVertical: 10,
  },
  secondaryBtn: {
    width: 105,
    height: 40,
    backgroundColor: '#fff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#9F9F9F',
    borderRadius: 20,
  },
  mainBtnText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
  },
  mainBtnText2: {
    fontFamily: 'Poppins-SemiBold',
    // marginLeft: 10,
    color: '#000',
  },
  secBtnText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#9F9F9F',
  },
  warningTitle: {
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 22,
    color: '#6A4029',
  },
  infoWrapperBottom: {
    flex: 1,
    padding: 20,
  },
  infoWrapper3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoKey2: {
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#000',
  },
  infoValue3: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: 'grey',
  },
});
