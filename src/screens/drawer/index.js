/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {DrawerItemList} from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {HOST_API} from '@env';
import Toast from 'react-native-toast-message';
import {resetAuth} from '../../redux/actions/authActions';
import ProfileHeaderAfterLogin from './headerAfterLogin';

const MyDrawer = props => {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const {token} = useSelector(state => state.auth);

  const logoutHandler = async () => {
    try {
      setLoading(true);
      const result = await axios({
        method: 'DELETE',
        url: `${HOST_API}/auth`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Request Success! 🙌',
        text2: `${result.data.msg} 👋`,
      });
      setTimeout(() => {
        setModal(!modal);
        dispatch(resetAuth());
      }, 2000);
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Oopss 😓',
        text2: `${error.response.data?.err.msg}`,
      });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {token ? (
          <ProfileHeaderAfterLogin />
        ) : (
          <View style={{alignItems: 'center', padding: 20}}>
            <Image
              style={styles.profileImg}
              source={require('../../assets/images/defaultImage.png')}
            />
            <Text style={styles.name}>Hi Fellas!</Text>
            <Text style={styles.email}>Welcome to Lukopi!</Text>
          </View>
        )}
        <View style={styles.drawerItemList}>
          <DrawerItemList {...props} />
        </View>
      </View>
      {token ? (
        <TouchableOpacity
          style={{marginBottom: 30}}
          onPress={() => setModal(!modal)}>
          <View style={styles.logoutCont}>
            <MaterialIcons
              name="logout"
              size={22}
              color="#6A4029"
              style={{marginEnd: 15}}
            />
            <Text style={styles.logout}>Log Out</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{marginBottom: 30}}
          onPress={() => props.navigation.navigate('signin')}>
          <View style={styles.logoutCont}>
            <MaterialIcons
              name="login"
              size={22}
              color="#6A4029"
              style={{marginEnd: 15}}
            />
            <Text style={styles.logout}>Log In</Text>
          </View>
        </TouchableOpacity>
      )}
      <Modal
        animationType="fade"
        visible={modal}
        onRequestClose={() => setModal(!modal)}
        transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Text style={styles.warningTitle}>Warning!</Text>
              <Text style={styles.bodyInfo}>Are you sure want to log out?</Text>
              <View
                style={{
                  marginTop: 40,
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  style={styles.secondaryBtn}
                  onPress={logoutHandler}>
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
  );
};

export default MyDrawer;

export const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'space-between'},
  header: {
    alignContent: 'center',
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#6A4029',
    minHeight: 230,
    // paddingVertical: 25,
  },
  profileImg: {
    width: 130,
    height: 130,
    borderRadius: 130,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
  },
  email: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular,',
    color: '#fff',
  },
  drawerItemList: {
    backgroundColor: '#fff',
    // alignItems: 'flex-start',
  },
  logoutCont: {
    flexDirection: 'row',
    padding: 20,
  },
  logout: {
    fontFamily: 'Poppins-Medium',
    color: '#6A4029',
    fontSize: 15,
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
