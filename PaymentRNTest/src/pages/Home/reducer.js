import {PaymentAction} from './action_types';
//import {stat} from 'fs';

// Initial Statt
const initialState = {
  loading: false,
  details: {},
};

const PaymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case PaymentAction.PAYMENT:
      return {
        ...state,
        loading: false,
        details: action.payload.details,
      };
    case PaymentAction.PAYMENT_SUCCESS:
      return {
        // loading: false,
        ...state,
        details: action.payload.data,
      };
    case PaymentAction.PAYMENT_ERROR:
      return {
        ...state,
        loading: false,
        errorPayment: action.payload.data,
      };
    default: {
      return state;
    }
  }
};

// Exports
export default PaymentReducer;