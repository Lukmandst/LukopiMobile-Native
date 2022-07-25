/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {GetHistory} from '../../modules/api';
import {useSelector} from 'react-redux';
import {currencyFormatter} from '../../helpers/formatter';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {HOST_API} from '@env';
import Header from '../../components/header';

const HistoryPage = ({navigation}) => {
  const [id, setId] = useState([]);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const {token} = useSelector(state => state.auth);

  const {history, loadingHistory, errorHistory} = GetHistory(token);
  let splitID = Array.isArray(id) && id.toString();
  console.log(splitID, 'split');
  // console.log(id);

  const deleteHandler = async () => {
    try {
      setLoading(true);
      const result = await axios({
        method: 'DELETE',
        url: `${HOST_API}/transaction/multiple`,
        data: {id: splitID},
      });
      setLoading(false);
      setId([]);
      Toast.show({
        type: 'success',
        text1: 'Request Success! 🙌',
        text2: 'Transactions has been deleted 👋',
      });
      setModal(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Oopss 😓',
        text2: `${error.response.data?.err.msg}`,
      });
    }
  };

  const renderItem = ({item}) => {
    return (
      <Pressable style={styles.card}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={{uri: item.image}}
            style={styles.img}
            resizeMode="cover"
          />
          <View style={styles.info}>
            <Text style={styles.name}>{item.product_name}</Text>
            <Text style={styles.price}>
              {' '}
              {currencyFormatter.format(item.total_price)}
            </Text>
            <Text style={styles.textNormal}>Regular</Text>
            <Text style={styles.textNormal}>{item.delivery}</Text>
          </View>
        </View>
        <Icon
          name={
            !id.includes(item.id) ? 'checkbox-blank-outline' : 'checkbox-marked'
          }
          size={30}
          color="#6A4029"
          onPress={() => {
            let newId = [...id];
            if (!id.includes(item.id)) {
              setId([...id, item.id]);
            } else {
              setId(newId.filter(result => result !== item.id));
            }
          }}
        />
      </Pressable>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <Header navigation={navigation} title={'Order History'} />
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            color: '#000',
            textAlign: 'center',
          }}>
          <Icon name="hand-pointing-up" size={20} />
          Select an item to delete
        </Text>
        <View style={styles.historyContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Text
              style={{fontFamily: 'Poppins-Bold', color: 'red'}}
              onPress={() => setModal(!modal)}>
              Delete
            </Text>
          </View>
          {loadingHistory ? (
            <ActivityIndicator size={'large'} color="#6A4029" />
          ) : (
            <FlatList
              indicatorStyle="black"
              refreshing={true}
              data={history}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              initialNumToRender={5}
              maxToRenderPerBatch={10}
            />
          )}
        </View>
        <Modal
          animationType="fade"
          visible={modal}
          onRequestClose={() => setModal(!modal)}
          transparent={true}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View>
                <Text style={styles.warningTitle}>Warning!</Text>
                <Text style={styles.bodyInfo}>
                  Are you sure want to delete your history?
                </Text>
                <View
                  style={{
                    marginTop: 40,
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={deleteHandler}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {loading ? (
                        <ActivityIndicator size={'small'} color="#6A4029" />
                      ) : (
                        <Text style={styles.secBtnText}>Yes</Text>
                      )}
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
                      <Text style={styles.mainBtnText}>No</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default HistoryPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingHorizontal: 25,
    paddingVertical: 15,
    // marginBottom: 15,
  },
  card: {
    marginVertical: 10,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginHorizontal: 10,
    backgroundColor: '#fff',
  },
  name: {fontFamily: 'Poppins-Bold', fontSize: 20, color: '#000'},
  price: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#6A4029',
  },
  textNormal: {
    fontFamily: 'Poppins-Medium',
    color: '#6A4029',
    fontSize: 14,
  },
  historyContainer: {
    flex: 1,
    paddingHorizontal: 15,
    // paddingBottom: 15,
    // marginBottom: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: 344,
    height: 192,
    margin: 20,
    backgroundColor: '#F5F5F8',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  bodyInfo: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: '#000',
  },
  mainBtn: {
    width: 105,
    height: 40,
    backgroundColor: '#6A4029',
    borderRadius: 20,
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
  secBtnText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#9F9F9F',
  },
  warningTitle: {
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 22,
    color: 'red',
  },
});
