import {
  POST_USER_LOGIN,
  POST_USER_LOGIN_SUCCESS,
  POST_USER_LOGIN_FAIL,
  DELETE_AUTH,
} from '../actions/authActions';

const initialState = {
  loading: false,
  // loginData: false,
  isError: false,
  errorMsg: false,
  token: false,
  roles_id: false,
};

const authReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case POST_USER_LOGIN:
      return {
        ...prevState,
        loading: true,
        // loginData: action.payload.data,
        isError: false,
        errorMsg: false,
        token: false,
        roles_id: false,
      };
    case POST_USER_LOGIN_SUCCESS:
      return {
        ...prevState,
        loading: false,
        // loginData: action.payload.data,
        token: action.payload.token,
        isError: false,
        errorMsg: false,
        roles_id: action.payload.roles_id,
      };
    case POST_USER_LOGIN_FAIL:
      return {
        ...prevState,
        loading: false,
        // loginData: action.payload.data,
        token: false,
        isError: true,
        roles_id: false,
        errorMsg: action.payload.errorMsg,
      };
    case DELETE_AUTH:
      return {
        ...initialState,
      };

    default:
      return prevState;
  }
};

export default authReducer;
