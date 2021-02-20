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
          userToken: res.tokens.access.token,
          userId: res.user.id,
          details: {
            email: res.user.email,
            token_expires: res.tokens.access.expires,
            refresh_token: res.tokens.refresh.token,
            refresh_token_expires: res.tokens.refresh.expires,
            user_id: res.user.id,
            user_name: res.user.name,
            phone_no: res.user.phoneno,
            dob: res.user.dob
          },
          logedInUserData: res,
          isLoggedIn: res.tokens.access.token ? true : false
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
    // yield action.payload.onError(error.response);
  }
}
