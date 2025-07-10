import type { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { DELAY } from '.';
import { AuthApi } from '../../api/auth';
import {
  loginFailure,
  loginRequest,
  loginSuccess,
  logoutRequest,
  logoutSuccess,
  registerRequest,
  registerSuccess,
} from '../slices/authSlice';
import { ApiError } from './ApiError';

function* loginSaga(action: PayloadAction<{ email: string; password: string }>) {
  try {
    yield delay(DELAY);
    const { email, password } = action.payload;
    console.log(1);
    const response: { email: string; name: string; contactPhone?: string } = yield call(
      AuthApi.login,
      {
        email,
        password,
      },
    );
    yield put(loginSuccess(response));
  } catch (error: unknown) {
    yield put(loginFailure(ApiError(error, 'Ошибка авторизации')));
  }
}

function* logoutSaga() {
  try {
    yield delay(DELAY);
    yield call(AuthApi.logout);
    yield put(logoutSuccess());
  } catch (error: unknown) {
    yield put(loginFailure(ApiError(error, 'Ошибка выхода')));
  }
}

function* registerSaga(
  action: PayloadAction<{
    email: string;
    password: string;
    name: string;
    contactPhone?: string;
  }>,
) {
  try {
    yield delay(DELAY);
    const response: { data: { id: string; email: string; name: string } } = yield call(
      AuthApi.register,
      action.payload,
    );
    yield put(
      registerSuccess({
        email: response.data.email,
        name: response.data.name,
      }),
    );
  } catch (error: unknown) {
    yield put(loginFailure(ApiError(error, 'Ошибка регистрации')));
  }
}

export function* authSaga() {
  yield takeLatest(loginRequest.type, loginSaga);
  yield takeLatest(logoutRequest.type, logoutSaga);
  yield takeLatest(registerRequest.type, registerSaga);
}
