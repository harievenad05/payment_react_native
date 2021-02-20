import {put, call, takeLatest} from 'redux-saga/effects';
import {
  getLoginEndpoint,
} from '../../common/utils/api-end-points';
import {request} from '../../common/utils/services';
import * as Reducer from './action';
import * as Action from './action_types';
import {HTTP_METHODS} from '../../common/utils/api-constants';

export function* CustomerLoginWatcher() {
  yield takeLatest(Action.LoginAction.LOGIN, loginRequest);
}

export function* loginRequest(action) {
  try {
    let requestData = action.payload.details;
    // debugger;
    const result = yield call(() =>
      request(getLoginEndpoint(), HTTP_METHODS.POST, requestData),
    );
    console.log('debug >>>>>> Responsssseeeeee', result);
    if (result.response.status == 200) {
      const res = result.response.data;

      console.log('ssasasasaagfsdasgasassasa', res);
      yield put(
        Reducer.loginSuccess({
          message: '',
          userToken: res.access_token,
          userId: res.UserID,
          details: {
            email: res.UserName,
            token_created: res['.issued'],
            token_expires: res['.expires'],
            token_expires_in: res.expires_in,
            user_id: res.UserID,
            user_name: res.UserName,
            userDateFormat: res.UserDateFormat,
            userDateTimeFormat: res.UserDateTimeFormat
          },
          logedInUserData: res,
          isLoggedIn: res.IsUserAlreadyLogedIn
        }),
      );

      yield action.payload.onSuccess(result.response);
    } else {
      yield put(Reducer.loginError({message: result.response.error}));
      yield action.payload.onError(result.response);
    }
  } catch (error) {
    const message = error;
    console.log('debug >>>>>> Errrrrrrr', message);
    yield put(Reducer.loginError({message: message}));
    yield action.payload.onError(error.response);
  }
}
