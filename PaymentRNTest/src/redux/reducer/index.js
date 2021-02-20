import {combineReducers} from 'redux';
import LoginReducer from '../../pages/Login/reducer';

const appReducer = combineReducers({
  LoginReducer: LoginReducer,
});

//export default appReducer;

export default (state, action) =>
  action.type === 'LOGOUT' || action.type === 'ENVIRONMENT_CHANGE'
    ? appReducer(
        {
          LoginReducer: {
            loading: false,
            logedInUserData: {}
          },
        },
        action,
      )
    : appReducer(state, action);
