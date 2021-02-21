import {PaymentAction} from './action_types';

export const initPaymentAction = ({details, onSuccess, onError}) => ({
  type: PaymentAction.PAYMENT,
  payload: {
    details,
    onSuccess,
    onError
  },
});

export const paymentSuccess = (data) => ({
  type: PaymentAction.PAYMENT_SUCCESS,
  payload: data,
});

export const paymentError = ({data, onError}) => ({
  type: PaymentAction.PAYMENT_ERROR,
  payload: {data, onError},
});

export const initPaymentSuccessAction = ({details, onSuccess, onError}) => ({
  type: PaymentAction.PAYMENT_VERIFY,
  payload: {
    details,
    onSuccess,
    onError
  },
});

export const paymentResponseSuccess = (data) => ({
  type: PaymentAction.PAYMENT_VERIFY_SUCCESS,
  payload: {data},
});

export const paymentResponseError = ({data, onError}) => ({
  type: PaymentAction.PAYMENT_VERIFY_ERROR,
  payload: {data, onError},
});

export const initTransactionAction = ({details, onSuccess, onError}) => ({
  type: PaymentAction.TRANSACTION,
  payload: {
    details,
    onSuccess,
    onError
  },
});

export const trasactionSuccess = (data) => ({
  type: PaymentAction.TRANSACTION_SUCCESS,
  payload: {data},
});

export const transactionError = ({data, onError}) => ({
  type: PaymentAction.TRANSACTION_ERROR,
  payload: {data, onError},
});
