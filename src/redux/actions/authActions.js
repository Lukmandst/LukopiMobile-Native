import axios from 'axios';

export const POST_USER_LOGIN = 'POST_USER_LOGIN';
export const POST_USER_LOGIN_SUCCESS = 'POST_USER_LOGIN_SUCCESS';
export const POST_USER_LOGIN_FAIL = 'POST_USER_LOGIN_FAIL';
export const DELETE_AUTH = 'DELETE_AUTH';
import {HOST_API} from '@env';

export const authLogin = data => {
  // console.log('2. masuk action');
  return dispatch => {
    //loading
    dispatch({
      type: POST_USER_LOGIN,
      payload: {
        loading: true,
        data: false,
        errorMsg: false,
        token: false,
        isError: false,
        roles_id: false,
      },
    });
    axios({
      method: 'POST',
      url: `${HOST_API}/auth`,
      data: data,
    })
      .then(result => {
        console.log(result.data);
        //success get api
        dispatch({
          type: POST_USER_LOGIN_SUCCESS,
          payload: {
            loading: false,
            data: result.data.data,
            token: result.data.data.token,
            roles_id: result.data.data.roles_id,
            errorMsg: false,
            isError: false,
          },
        });
      })
      .catch(error => {
        // console.error(error.response);
        //failed get api
        dispatch({
          type: POST_USER_LOGIN_FAIL,
          payload: {
            loading: false,
            data: [],
            errorMsg: error.response
              ? error.response.data.err.msg
              : error.message,
            isError: true,
          },
        });
      });
  };
};

export const resetAuth = () => {
  return dispatch => {
    dispatch({
      type: DELETE_AUTH,
    });
  };
};
