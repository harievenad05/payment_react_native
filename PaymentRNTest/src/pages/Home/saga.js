import {put, call, takeLatest} from 'redux-saga/effects';
import {
  getPaymentEndpoint,
  getPaymentSuccessEndpoint,
  getTransactionDoneEndpoint
} from '../../common/utils/api-end-points';
import {request} from '../../common/utils/services';
import * as Reducer from './action';
import * as Action from './action_types';
import {HTTP_METHODS} from '../../common/utils/api-constants';
import { getUserToken, getUserId } from '../../redux/storage/reduxStore';

export function* paymentWatcher() {
  yield takeLatest(Action.PaymentAction.PAYMENT, initiatepaymentRequest);
}

export function* initiatepaymentRequest(action) {
  try {
    let requestData = action.payload.details;
    // debugger;
    const result = yield call(() =>
      request(getPaymentEndpoint(), HTTP_METHODS.POST, requestData, false, {}, true, getUserToken()),
    );
    console.log('debug >>>>>> PaymentResponsssseeeeee', result);
    if (result.response.status == 200) {
      const res = result.response.data;
      console.log('ssasasasaagfsdasgasassasa', res);
      yield put(Reducer.paymentSuccess(result.response));
      yield action.payload.onSuccess(result.response);
    } else {
      yield put(Reducer.paymentError({data: result.response.error}));
      yield action.payload.onError(result.response);
    }
  } catch (error) {
    const message = error;
    console.log('debug >>>>>> Errrrrrrr', message);
    yield put(Reducer.paymentError({data: message}));
    // yield action.payload.onError(error.response);
  }
}

export function* paymentSuccessWatcher() {
  yield takeLatest(Action.PaymentAction.PAYMENT_VERIFY, initiatepaymentVerifyRequest);
}

export function* initiatepaymentVerifyRequest(action) {
  try {
    let requestData = action.payload.details;
    // debugger;
    const result = yield call(() =>
      request(getPaymentSuccessEndpoint(), HTTP_METHODS.POST, requestData, false, {}, true, getUserToken()),
    );
    console.log('debug >>>>>> PaymentResponsssseeeeee', result);
    if (result.response.status == 200) {
      const res = result.response.data;
      console.log('ssasasasaagfsdasgasassasa', res);
      yield put(Reducer.paymentResponseSuccess(result.response));
      yield action.payload.onSuccess(result.response);
    } else {
      yield put(Reducer.paymentResponseError({data: result.response.error}));
      yield action.payload.onError(result.response);
    }
  } catch (error) {
    const message = error;
    console.log('debug >>>>>> Errrrrrrr', message);
    yield put(Reducer.paymentResponseError({data: message}));
    // yield action.payload.onError(error.response);
  }
}

export function* transactionWatcher() {
  yield takeLatest(Action.PaymentAction.TRANSACTION, getTransactions);
}

export function* getTransactions(action) {
  try {
    let userId = getUserId();
    // debugger;
    const result = yield call(() =>
      request(getTransactionDoneEndpoint(userId), HTTP_METHODS.GET, {}, false, {}, true, getUserToken()),
    );
    console.log('debug >>>>>> TransactionResponsssseeeeee', result);
    if (result.response.status == 200) {
      const res = result.response.data;
      console.log('ssasasasaagfsdasgasassasa', res);
      yield put(Reducer.trasactionSuccess(result.response));
      yield action.payload.onSuccess(result.response);
    } else {
      yield put(Reducer.transactionError({data: result.response.error}));
      yield action.payload.onError(result.response);
    }
  } catch (error) {
    const message = error;
    console.log('debug >>>>>> Errrrrrrr', message);
    yield put(Reducer.transactionError({data: message}));
    // yield action.payload.onError(error.response);
  }
}

