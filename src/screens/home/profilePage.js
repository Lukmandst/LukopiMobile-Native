/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GetHistory, GetUser} from '../../modules/api';
import {useSelector} from 'react-redux';
import Ionicon from 'react-native-vector-icons/SimpleLineIcons';
import {formatPhoneNumber} from '../../helpers/formatter';
import HeaderDrawer from '../../components/customHeader/headerDrawer';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import {HOST_API} from '@env';
import FoundationIcon from 'react-native-vector-icons/Foundation';

const ProfilePage = ({navigation}) => {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [picture, setPicture] = useState(false);

  const {token} = useSelector(state => state.auth);
  const {user, loadingUser, isError} = GetUser(token);
  const {history, loadingHistory, errorHistory} = GetHistory(token);
  // console.log(picture);

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
  const updateHandler = async () => {
    try {
      const body = new FormData();
      body.append('photo', picture);
      setLoading(true);
      // console.log(body);
      const result = await axios({
        method: 'PATCH',
        url: `${HOST_API}/user/edit`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        data: body,
      });
      setLoading(false);
      setPicture(false);
      // console.log(result.data);
      Toast.show({
        type: 'success',
        text1: 'Request Success! 🙌',
        text2: `${result.data.msg} 👋`,
      });
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

  const renderItem = ({item, index}) => {
    return (
      <View style={{marginHorizontal: 20}}>
        <Image
          resizeMode="cover"
          style={{
            width: '150%',
            height: '100%',
            minHeight: 70,
            minWidth: 70,
            borderRadius: 20,
            borderColor: 'rgba(175, 172, 174, 0.25)',
            borderStyle: 'solid',
            borderWidth: 2,
          }}
          source={{uri: item.image}}
        />
      </View>
    );
  };
  useEffect(() => {
    if (!token) {
      navigation.replace('HomeScreen');
    }
  }, [token]);
  return (
    <>
      {user && (
        <View style={styles.container}>
          <HeaderDrawer navigation={navigation} />
          <View style={styles.headerWrapper}>
            <View style={{position: 'relative'}}>
              <TouchableOpacity
                style={styles.editIcon}
                onPress={() => setModal(!modal)}>
                <Ionicon name="pencil" size={15} color="#fff" />
              </TouchableOpacity>
              <Image
                resizeMode="cover"
                style={styles.profileImg}
                source={
                  picture
                    ? {uri: picture.uri}
                    : !user[0].picture
                    ? require('../../assets/images/defaultImage.png')
                    : {
                        uri: `${user[0].picture}`,
                      }
                }
              />
            </View>
            <Text style={styles.name}>
              {!user[0].display_name ? 'Hi Fellas!' : user[0].display_name}
            </Text>
            <Text style={styles.email}>{user[0].email}</Text>
            <Text style={styles.email}>
              {!user[0].phone_number
                ? ''
                : formatPhoneNumber(user[0].phone_number)}
            </Text>
            <Text style={styles.email}>
              {!user[0].delivery_address ? '' : user[0].delivery_address}
            </Text>
          </View>
          <View style={styles.historyWrapper}>
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
                Order History
              </Text>
              <Text
                style={{
                  textAlign: 'right',
                  fontFamily: 'Poppins-Reguler',
                  fontSize: 14,
                  color: '#6A4029',
                }}
                onPress={() => navigation.navigate('history')}>
                See More{' '}
              </Text>
            </View>
            {!history ? (
              <View style={styles.infoWrapper3}>
                <FoundationIcon
                  name="clipboard-notes"
                  size={60}
                  color="grey"
                  style={{marginRight: 25}}
                />
                <Text style={styles.infoKey2}>No history yet :(</Text>
              </View>
            ) : loadingHistory ? (
              <ActivityIndicator size={'large'} color="#6A4029" />
            ) : (
              <FlatList
                indicatorStyle="black"
                refreshing={true}
                horizontal={true}
                data={history}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                initialNumToRender={5}
                maxToRenderPerBatch={10}
              />
            )}
          </View>
          <View style={styles.menuWrapper}>
            <View
              style={{
                // marginTop: 10,
                paddingLeft: 10,
                paddingRight: 10,
                flexDirection: 'row',
                // marginBottom: 15,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('editProfile')}
                style={{
                  elevation: 10,
                  justifyContent: 'center',
                  // alignItems: 'center',
                  backgroundColor: '#fff',
                  padding: 10,
                  borderRadius: 10,
                  height: 40,
                  flex: 1,
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Bold',
                    fontSize: 16,
                    color: '#6A4029',
                  }}>
                  Edit Profile
                </Text>
              </TouchableOpacity>
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
                onPress={() => navigation.navigate('editPass')}
                style={{
                  elevation: 10,
                  justifyContent: 'center',
                  // alignItems: 'center',
                  backgroundColor: '#fff',
                  padding: 10,
                  borderRadius: 10,
                  height: 40,
                  flex: 1,
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Bold',
                    fontSize: 16,
                    color: '#6A4029',
                  }}>
                  Edit Password
                </Text>
              </TouchableOpacity>
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
                // onPress={() => navigation.navigate('Home')}
                style={{
                  elevation: 10,
                  justifyContent: 'center',
                  // alignItems: 'center',
                  backgroundColor: '#fff',
                  padding: 10,
                  borderRadius: 10,
                  height: 40,
                  flex: 1,
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Bold',
                    fontSize: 16,
                    color: '#6A4029',
                  }}>
                  FAQ
                </Text>
              </TouchableOpacity>
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
                // onPress={() => navigation.navigate('Home')}
                style={{
                  elevation: 10,
                  justifyContent: 'center',
                  // alignItems: 'center',
                  backgroundColor: '#fff',
                  padding: 10,
                  borderRadius: 10,
                  height: 40,
                  flex: 1,
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Bold',
                    fontSize: 16,
                    color: '#6A4029',
                  }}>
                  Help
                </Text>
              </TouchableOpacity>
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
                onPress={updateHandler}
                style={{
                  elevation: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#6A4029',
                  padding: 10,
                  borderRadius: 10,
                  height: 40,
                  flex: 1,
                }}>
                {loading ? (
                  <ActivityIndicator size={'small'} color="#fff" />
                ) : (
                  <Text
                    style={{
                      fontFamily: 'Poppins-Bold',
                      fontSize: 16,
                      color: '#fff',
                    }}>
                    Save
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <Modal
            animationType="slide"
            visible={modal}
            onRequestClose={() => setModal(!modal)}
            transparent={true}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.warningTitle}>Update Profile Picture</Text>
                <View style={styles.bodyInfo}>
                  <TouchableOpacity
                    style={styles.mainBtn2}
                    onPress={openCamera}>
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
                  <TouchableOpacity
                    style={styles.mainBtn2}
                    onPress={openGallery}>
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
        </View>
      )}
    </>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  headerWrapper: {
    justifyContent: 'center',
    position: 'relative',
    flex: 1,
    // backgroundColor: 'red',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  headerWrapper2: {
    justifyContent: 'center',
    position: 'relative',
    flex: 0.5,
    backgroundColor: 'red',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  editIcon: {
    zIndex: 100,
    position: 'absolute',
    top: 80,
    // left: 200,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: '#6A4029',
  },
  historyWrapper: {
    flex: 0.6,
    paddingVertical: 10,
    paddingHorizontal: 15,
    // backgroundColor: 'blue',
    borderTopWidth: 15,
    borderBottomWidth: 15,
    borderStyle: 'solid',
    borderTopColor: 'rgba(186, 186, 186, 0.5)',
    borderBottomColor: 'rgba(186, 186, 186, 0.5)',
    justifyContent: 'space-around',
  },
  menuWrapper: {
    flex: 1,
    // backgroundColor: 'grey',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  profileImg: {
    width: 120,
    height: 120,
    borderRadius: 120,
    marginBottom: 10,
    borderColor: 'rgba(175, 172, 174, 0.25)',
    borderStyle: 'solid',
    borderWidth: 2,
  },
  name: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#6A4029',
  },
  email: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular,',
    color: '#6A4029',
  },
  inputWrapper: {
    flex: 1,
    // backgroundColor: 'blue',W
    paddingVertical: 25,
    paddingHorizontal: 10,
    justifyContent: 'space-evenly',
  },
  inputName: {
    fontFamily: 'Poppins-Bold',
    color: 'rgba(151, 151, 151, 1)',
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
