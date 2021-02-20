import {all} from 'redux-saga/effects';
import { CustomerLoginWatcher } from '../../pages/Login/saga';


// Redux Saga: Root Saga
export function* rootSaga() {
  yield all([
    CustomerLoginWatcher(),
  ]);
}