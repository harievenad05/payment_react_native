import {LoginAction} from './action_types';
//import {stat} from 'fs';

// Initial Statt
const initialState = {
  loading: false,
  details: {},
  userToken: '',
  errorLogin: '',
  message:'',
  logedInUserData: {},
  isLoggedIn: false,
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LoginAction.LOGIN:
      return {
        ...state,
        loading: false,
        details: action.payload.details,
      };
    case LoginAction.SHOWLOADING:
      return {
        ...state,
        loading: action.payload.isLoading,
      };
    case LoginAction.LOGIN_SUCCESS:
      return {
        // loading: false,
        ...state,
        userToken: action.payload.userToken,
        details: action.payload.details,
        loginSuccessDetails: action.payload.details,
        driverId: action.payload.driverId,
        isLoggedIn: action.payload.isLoggedIn,
        message: action.payload.message,
        logedInUserData: action.payload
      };
    case LoginAction.LOGED_USER_INFO:
      return {
        ...state,
        loading: false,
        logedInUserData: action.payload,
      };
    case LoginAction.LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        errorLogin: action.payload.message,
      };

    case LoginAction.USER_TOKEN:
      return {
        ...state,
        userToken: action.payload.userToken,
      };
    case LoginAction.LOGIN_FULLNAME:
      return {
        ...state,
        fullName: action.payload,
      };

    case LoginAction.SET_EXPIRY_DATE_INFO:
      return {
        ...state,
        expiryDateInfo: action.payload,
      };
    case LoginAction.REMOVE_USER_TOKEN:
      return {
        ...state,
        userToken: '',
      };
    case LoginAction.LOGOUT:
      return {
        ...state,
        loading: false,
        details: {},
        userToken: '',
        errorLogin: '',
        message:'',
        logedInUserData: {},
        isLoggedIn: false,
      };
    case LoginAction.ON_ERROR:
      return {
        ...state,
        loading: false,
      };
    default: {
      return state;
    }
  }
};

// Exports
export default LoginReducer;
