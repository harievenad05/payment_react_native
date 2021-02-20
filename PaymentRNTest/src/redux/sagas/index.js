import {all} from 'redux-saga/effects';
import { CustomerLoginWatcher, CustomerRegisterWatcher } from '../../pages/Login/saga';


// Redux Saga: Root Saga
export function* rootSaga() {
  yield all([
    CustomerLoginWatcher(),
    CustomerRegisterWatcher()
  ]);
}