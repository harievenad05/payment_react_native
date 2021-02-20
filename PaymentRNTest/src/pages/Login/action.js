
import {LoginAction} from './action_types';

export const CustomerLogin = ({details, onSuccess, onError}) => ({
  type: LoginAction.LOGIN,
  payload: {details, onSuccess, onError},
});

export const getUserInfoLogin = ({token, onSuccessLogin, onErrorLogin}) => ({
  type: LoginAction.FETCH_USERINFO,
  payload: {token: token, onSuccess: onSuccessLogin, onError: onErrorLogin},
});

export const loginSuccess = ({message, userToken, userId, details, logedInUserData, isLoggedIn}) => ({
  type: LoginAction.LOGIN_SUCCESS,
  payload: {message, userToken, userId, details, logedInUserData, isLoggedIn },
});

export const loginError = ({message, onError}) => ({
  type: LoginAction.LOGIN_ERROR,
  payload: {message, onError},
});

export const setUserToken = userToken => ({
  type: LoginAction.USER_TOKEN,
  payload: {userToken},
});

export const setFullname = (firstName, lastName, isSocialSignIn) => ({
  type: LoginAction.LOGIN_FULLNAME,
  payload: {
    firstName: firstName,
    lastName: lastName,
    isSocialSignIn: isSocialSignIn,
  },
});

export const loadingData = isLoading => ({
  type: LoginAction.SHOWLOADING,
  payload: {isLoading: isLoading},
});

export const logedInUserData = userData => ({
  type: LoginAction.LOGED_USER_INFO,
  payload: userData,
});

export const setExpiryDateInfo = dateInfo => ({
  type: LoginAction.SET_EXPIRY_DATE_INFO,
  payload: dateInfo,
});

export const removeUserToken = () => ({
  type: LoginAction.REMOVE_USER_TOKEN,
});

export const doLogout = () => ({
  type: LoginAction.LOGOUT,
});
