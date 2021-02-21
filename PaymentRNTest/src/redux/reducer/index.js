import {combineReducers} from 'redux';
import LoginReducer from '../../pages/Login/reducer';
import PaymentReducer from '../../pages/Home/reducer';

const appReducer = combineReducers({
  LoginReducer: LoginReducer,
  PaymentReducer: PaymentReducer
});

//export default appReducer;

export default (state, action) =>
  action.type === 'LOGOUT' || action.type === 'ENVIRONMENT_CHANGE'
    ? appReducer(
        {
          LoginReducer: {
            loading: false,
            details: {},
            userToken: '',
            errorLogin: '',
            message:'',
            logedInUserData: {},
            isLoggedIn: false,
          },
        },
        action,
      )
    : appReducer(state, action);
