import {View, Text, Image, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import {GetUser} from '../../modules/api';
import {useSelector, useDispatch} from 'react-redux';
import {resetAuth} from '../../redux/actions/authActions';

const ProfileHeaderAfterLogin = () => {
  const {token} = useSelector(state => state.auth);
  const {user, loadingUser, isError} = GetUser(token);
  const dispatch = useDispatch();
  //   console.log(user && user[0].picture);
  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        dispatch(resetAuth());
      }, 2000);
    }
  }, [dispatch, isError]);
  return (
    <>
      <View style={styles.wrapper}>
        {loadingUser || isError ? (
          <ActivityIndicator size={'large'} color="#fff" />
        ) : (
          <>
            <Image
              resizeMode="cover"
              style={styles.profileImg}
              source={
                !user[0].picture
                  ? require('../../assets/images/defaultImage.png')
                  : {
                      uri: `${user[0].picture}`,
                    }
              }
            />
            <Text style={styles.name}>
              {!user[0].display_name ? 'Hi Fellas!' : user[0].display_name}
            </Text>
            <Text style={styles.email}>{user[0].email}</Text>
          </>
        )}
      </View>
    </>
  );
};

export default ProfileHeaderAfterLogin;
export const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    padding: 20,
    minHeight: 230,
  },
  profileImg: {
    width: 130,
    height: 130,
    borderRadius: 130,
    marginBottom: 10,
    borderColor: 'rgba(175, 172, 174, 0.25)',
    borderStyle: 'solid',
    borderWidth: 2,
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
});
