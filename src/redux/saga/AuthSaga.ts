import type { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { AuthApi } from '../../api/auth';
import {
  loginFailure,
  loginRequest,
  loginSuccess,
  logoutFailure,
  logoutRequest,
  logoutSuccess,
  registerFailure,
  registerRequest,
  registerSuccess,
} from '../slices/authSlice';

function* loginSaga(action: PayloadAction<{ email: string; password: string }>) {
  try {
    const { email, password } = action.payload;
    const response: { email: string; name: string } = yield call(AuthApi.login, {
      email,
      password,
    });
    yield put(loginSuccess(response));
  } catch (error: unknown) {
    if (error instanceof Error) yield put(loginFailure(error.message));
    else yield put(loginFailure('Неизвестная ошибка'));
  }
}

function* logoutSaga() {
  try {
    yield call(AuthApi.logout);
    yield put(logoutSuccess());
  } catch (error: unknown) {
    if (error instanceof Error) yield put(logoutFailure(error.message));
    else yield put(logoutFailure('Неизвестная ошибка'));
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
    if (error instanceof Error) yield put(registerFailure(error.message));
    else yield put(registerFailure('Неизвестная ошибка'));
  }
}

export function* authSaga() {
  yield takeLatest(loginRequest.type, loginSaga);
  yield takeLatest(logoutRequest.type, logoutSaga);
  yield takeLatest(registerRequest.type, registerSaga);
}
