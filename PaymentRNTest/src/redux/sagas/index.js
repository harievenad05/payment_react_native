import {all} from 'redux-saga/effects';
import { paymentSuccessWatcher, paymentWatcher, transactionWatcher } from '../../pages/Home/saga';
import { CustomerLoginWatcher, CustomerRegisterWatcher } from '../../pages/Login/saga';


// Redux Saga: Root Saga
export function* rootSaga() {
  yield all([
    CustomerLoginWatcher(),
    CustomerRegisterWatcher(),
    paymentWatcher(),
    paymentSuccessWatcher(),
    transactionWatcher()
  ]);
}