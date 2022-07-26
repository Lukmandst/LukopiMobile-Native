/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GetUser} from '../../modules/api';
import {useSelector} from 'react-redux';
import Ionicon from 'react-native-vector-icons/SimpleLineIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {formatPhoneNumber} from '../../helpers/formatter';
import DatePicker from 'react-native-date-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import moment from 'moment';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {HOST_API} from '@env';
import Header from '../../components/customHeader/header';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const AddPromoPage = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [body, setBody] = useState({
    name: '',
    price: '',
    details: '',
    categories_id: '',
  });
  const [category, setCategory] = useState('');
  const [picture, setPicture] = useState(false);
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);

  const openCamera = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 1280,
      maxHeight: 1280,
    };
    launchCamera(options, res => {
      if (res.didCancel) {
        Toast.show({
          type: 'error',
          text1: 'Oopss 😓',
          text2: 'You have not set any picture yet!',
        });
      } else if (res.errorCode) {
        Toast.show({
          type: 'error',
          text1: 'Oopss 😓',
          text2: `${res.errorMessage}`,
        });
        console.log(res.errorMessage);
      } else {
        const data = res.assets[0];
        // console.log(data);
        setPicture({
          uri: data.uri,
          type: data.type,
          name: data.fileName,
        });
        Toast.show({
          type: 'success',
          text1: 'Set Photo Success! 🙌',
        });
      }
    });
  };
  const openGallery = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 1280,
      maxHeight: 1280,
    };
    launchImageLibrary(options, res => {
      if (res.didCancel) {
        Toast.show({
          type: 'error',
          text1: 'Oopss 😓',
          text2: 'You have not set any picture yet!',
        });
      } else if (res.errorCode) {
        Toast.show({
          type: 'error',
          text1: 'Oopss 😓',
          text2: `${res.errorMessage}`,
        });
        console.log(res.errorMessage);
      } else {
        const data = res.assets[0];
        setPicture({
          uri: data.uri,
          type: data.type,
          name: data.fileName,
        });
        Toast.show({
          type: 'success',
          text1: 'Set Photo Success! 🙌',
        });
      }
    });
  };

  const createHandler = async () => {
    try {
      setLoading(true);
      const form = new FormData();
      form.append('name', body.name);
      form.append('price', body.price);
      form.append('details', body.details);
      form.append('category', body.categories_id);
      form.append('photo', picture);
      if (!picture) {
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Oopss, picture cannot be empty! 😓',
        });
      } else {
        const result = await axios({
          method: 'POST',
          url: `${HOST_API}/product`,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          data: form,
        });
        setLoading(false);
        setPicture(false);
        Toast.show({
          type: 'success',
          text1: 'New product has been added! 🙌',
        });
        // setTimeout(() => {
        //   navigation.navigate('Profile');
        // }, 2000);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Oopss 😓',
        text2: `${error.response.data?.err.msg}`,
      });
    }
  };
  const resetHandler = () => {
    setBody({name: '', price: '', details: '', categories_id: ''});
    setPicture(false);
  };
  return (
    <>
      <ScrollView style={styles.container}>
        <Header navigation={navigation} title={'New Promo'} />
        <View style={styles.headerWrapper2}>
          <View style={{position: 'relative'}}>
            <TouchableOpacity
              style={styles.editIcon}
              onPress={() => setModal(!modal)}>
              <MaterialIcon name="plus-thick" size={20} color="#fff" />
            </TouchableOpacity>
            <Image
              resizeMode="cover"
              style={styles.profileImg}
              source={
                picture
                  ? {uri: picture.uri}
                  : require('../../assets/images/bg_camera.png')
              }
            />
          </View>
        </View>
        <View style={styles.inputWrapper}>
          <View style={{paddingLeft: 20, paddingRight: 20}}>
            <Text style={styles.inputName}>Name:</Text>
            <TextInput
              onChangeText={value =>
                setBody({
                  ...body,
                  name: value,
                })
              }
              placeholder="Enter product name"
              placeholderTextColor={'rgba(151, 151, 151, 1)'}
              style={{
                fontFamily: 'Poppins-Regular',
                color: '#000',
                borderBottomWidth: 2,
                borderBottomColor: 'rgba(151, 151, 151, 1)',
              }}
            />
          </View>

          <View style={{paddingLeft: 20, paddingRight: 20}}>
            <Text style={styles.inputName}>Price:</Text>
            <TextInput
              onChangeText={value =>
                setBody({
                  ...body,
                  price: value,
                })
              }
              keyboardType="number-pad"
              placeholder="Enter product price"
              placeholderTextColor={'rgba(151, 151, 151, 1)'}
              style={{
                fontFamily: 'Poppins-Regular',
                color: '#000',
                borderBottomWidth: 2,
                borderBottomColor: 'rgba(151, 151, 151, 1)',
              }}
            />
          </View>
          <View style={{paddingLeft: 20, paddingRight: 20}}>
            <Text style={styles.inputName}>Discount:</Text>
            <TextInput
              onChangeText={value =>
                setBody({
                  ...body,
                  price: value,
                })
              }
              keyboardType="number-pad"
              placeholder="Enter discount price"
              placeholderTextColor={'rgba(151, 151, 151, 1)'}
              style={{
                fontFamily: 'Poppins-Regular',
                color: '#000',
                borderBottomWidth: 2,
                borderBottomColor: 'rgba(151, 151, 151, 1)',
              }}
            />
          </View>

          <View
            style={{paddingLeft: 20, paddingRight: 20, position: 'relative'}}>
            <Text style={styles.inputName}>Expired Date:</Text>
            <Text
              onPress={() => setOpen(true)}
              value={body.birthdate}
              placeholder="Enter your birthdate"
              placeholderTextColor={'rgba(151, 151, 151, 1)'}
              style={{
                fontFamily: 'Poppins-Regular',
                color: '#000',
                paddingVertical: 10,
                paddingHorizontal: 5,
                borderBottomWidth: 2,
                borderBottomColor: 'rgba(151, 151, 151, 1)',
              }}>
              {body.birthdate}
            </Text>
            <Icon
              name="calendar"
              size={20}
              color="rgba(151, 151, 151, 1)"
              style={{position: 'absolute', bottom: 15, right: 30}}
            />
            <DatePicker
              modal
              open={open}
              date={body.birthdate ? new Date(body.birthdate) : new Date()}
              mode="date"
              onConfirm={dates => {
                setOpen(false);
                // console.log(moment(date).format('YYYY-MM-DD'))
                setBody({
                  ...body,
                  birthdate: moment(dates).format('DD/MM/YYYY'),
                });
              }}
              onCancel={() => setOpen(false)}
            />
          </View>

          <View style={{paddingLeft: 20, paddingRight: 20}}>
            <Text style={styles.inputName}>Description:</Text>
            <TextInput
              multiline={true}
              numberOfLines={2}
              value={body.delivery_address}
              onChangeText={value =>
                setBody({
                  ...body,
                  details: value,
                })
              }
              placeholder="Enter promo descriptions"
              placeholderTextColor={'rgba(151, 151, 151, 1)'}
              style={{
                fontFamily: 'Poppins-Regular',
                color: '#000',
                borderBottomWidth: 2,
                borderBottomColor: 'rgba(151, 151, 151, 1)',
              }}
            />
          </View>
        </View>
        <View style={{flex: 0.3, backgroundColor: '#fff', marginTop: 20}}>
          <View
            style={{
              //   flex: 0.2,
              // marginTop: 10,
              paddingHorizontal: 25,

              flexDirection: 'row',
              alignItems: 'center',

              // marginBottom: 15,
            }}>
            <TouchableOpacity
              onPress={resetHandler}
              style={{
                elevation: 2,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'red',
                padding: 10,
                borderRadius: 10,
                height: 40,
                flex: 1,
                flexDirection: 'row',
              }}>
              <MaterialIcon name="trash-can-outline" size={20} color="#fff" />
              <Text
                style={{
                  fontFamily: 'Poppins-Bold',
                  fontSize: 16,
                  color: '#fff',
                }}>
                Clear
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              //   flex: 0.2,
              marginTop: 10,
              paddingHorizontal: 25,

              flexDirection: 'row',
              alignItems: 'center',

              marginBottom: 15,
            }}>
            <TouchableOpacity
              onPress={createHandler}
              style={{
                elevation: 2,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#6A4029',
                padding: 10,
                borderRadius: 10,
                height: 40,
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
                  Add Product
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        visible={modal}
        onRequestClose={() => setModal(!modal)}
        transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.warningTitle}>Add Product Picture</Text>
            <View style={styles.bodyInfo}>
              <TouchableOpacity style={styles.mainBtn2} onPress={openCamera}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FeatherIcon name="camera" size={18} color="#fff" />
                  <Text style={styles.mainBtnText2}>Camera</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.mainBtn2} onPress={openGallery}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FeatherIcon name="image" size={18} color="#fff" />

                  <Text style={styles.mainBtnText2}>Gallery</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: 40,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                // backgroundColor: 'red',
              }}>
              <TouchableOpacity
                style={styles.secondaryBtn}
                onPress={() => {
                  setPicture(false);
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
    </>
  );
};

export default AddPromoPage;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    // paddingHorizontal: 25,
    // paddingVertical: 15,
    // justifyContent: 'space-around',
  },
  container2: {
    height: '100%',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'space-around',
  },
  headerWrapper2: {
    justifyContent: 'center',
    position: 'relative',
    flex: 0.5,
    // backgroundColor: 'red',
    alignItems: 'center',
    paddingHorizontal: 15,
    // paddingBottom: 10,
  },
  editIcon: {
    zIndex: 100,
    position: 'absolute',
    top: 90,
    // left: 200,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#6A4029',
  },
  profileImg: {
    width: 140,
    height: 140,
    borderRadius: 140,
    marginBottom: 10,
    borderColor: 'rgba(175, 172, 174, 0.25)',
    borderStyle: 'solid',
    borderWidth: 2,
  },
  inputWrapper: {
    marginTop: 30,
    flex: 1,
    // backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 25,
    justifyContent: 'space-around',
  },
  inputName: {
    marginTop: 15,
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#000',
  },
  textNormal: {
    fontFamily: 'Poppins-Medium',
    color: '#000',
    fontSize: 14,
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
    // alignItems: 'center',
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
    flex: 1,
    // textAlign: 'center',
    flexDirection: 'row',
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: '#000',
    justifyContent: 'space-around',
    // backgroundColor: 'blue',
    marginTop: 10,
  },
  mainBtn: {
    width: 105,
    height: 40,
    backgroundColor: '#6A4029',
    borderRadius: 20,
  },
  mainBtn2: {
    width: 105,
    height: 40,
    backgroundColor: '#FFBA33',
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
  mainBtnText2: {
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 10,
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
    color: '#6A4029',
  },
  CategoryBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 105,
    height: 40,
    backgroundColor: '#fff',
    // borderStyle: 'solid',
    // borderWidth: 1,
    // borderColor: '#9F9F9F',
    borderRadius: 20,
    elevation: 5,
  },
  CategoryBtnActive: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 105,
    height: 40,
    backgroundColor: '#FFBA33',
    // borderStyle: 'solid',
    // borderWidth: 1,
    // borderColor: '#9F9F9F',
    borderRadius: 20,
    elevation: 5,
  },
  CategoryText: {
    marginLeft: 5,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
  },
});
