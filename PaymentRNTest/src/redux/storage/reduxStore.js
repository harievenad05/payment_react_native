import {store} from '../store/configureStore';

const getUserToken = () => store.getState().LoginReducer.userToken || '';

const getUserId = () => store.getState().LoginReducer.details.user_id || '';

export {
  getUserToken,
  getUserId
}