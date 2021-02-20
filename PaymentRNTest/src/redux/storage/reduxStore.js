import {store} from '../store/configureStore';

const getUserToken = () => store.getState().LoginReducer.userToken || '';

export {
  getUserToken
}