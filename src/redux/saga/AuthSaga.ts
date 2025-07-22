import type { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, fork, put, select, takeLatest } from 'redux-saga/effects';
import { DELAY } from '.';
import { AuthApi } from '../../api/auth';
import {
  checkSession,
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
    const response: {
      id: string;
      email: string;
      name: string;
      role: string;
      contactPhone?: string;
    } = yield call(AuthApi.login, {
      email,
      password,
    });

    yield put(loginSuccess(response));
  } catch (error: unknown) {
    yield put(loginFailure(ApiError(error, 'Ошибка авторизации')));
  }
}

function* logoutSaga() {
  try {
    yield call(AuthApi.logout);
  } finally {
    localStorage.removeItem('auth');
    document.cookie = 'connect.sid=;';
    yield put(logoutSuccess());
  }
}

function* checkSessionSaga() {
  try {
    const { user } = yield select(state => state.auth);
    if (!user) throw new Error();

    yield call(AuthApi.checkSession);
  } catch {
    yield put(logoutSuccess());
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
    const response: {
      data: {
        id: string;
        email: string;
        name: string;
        role: string;
        contactPhone?: string;
      };
    } = yield call(AuthApi.register, action.payload);
    yield put(
      registerSuccess({
        id: response.data.id,
        email: response.data.email,
        name: response.data.name,
        role: response.data.role,
        contactPhone: response.data.contactPhone,
      }),
    );
  } catch (error: unknown) {
    yield put(loginFailure(ApiError(error, 'Ошибка регистрации')));
  }
}

function* watchSession() {
  while (true) {
    yield call(checkSessionSaga);
    yield delay(5 * 60 * 1000);
  }
}

export function* authSaga() {
  yield takeLatest(loginRequest.type, loginSaga);
  yield takeLatest(logoutRequest.type, logoutSaga);
  yield takeLatest(checkSession.type, checkSessionSaga);
  yield takeLatest(registerRequest.type, registerSaga);
  yield fork(watchSession);
}
