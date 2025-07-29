import type { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, put, select, takeLatest } from 'redux-saga/effects';
import { DELAY } from '.';
import { UsersApi } from '../../api/users';
import {
  addUserFailure,
  addUserRequest,
  addUserSuccess,
  usersFailure,
  usersRequest,
  usersSuccess,
  type User,
} from '../slices/usersSlice';
import { ApiError } from './ApiError';

function* usersDataSaga(
  action: PayloadAction<{
    reset?: boolean;
    name?: string;
    email?: string;
    contactPhone?: string;
  }>,
) {
  try {
    yield delay(DELAY);
    const { reset, name, email, contactPhone } = action.payload;
    const { limit, offset } = yield select(state => state.users.searchParams);

    const params = {
      limit,
      offset: reset ? 0 : offset,
      name: name,
      email: email,
      contactPhone: contactPhone,
    };

    const { role } = yield select(state => state.auth.user);

    const response: User[] =
      role === 'admin'
        ? yield call(UsersApi.adminSearch, params)
        : role === 'manager'
        ? yield call(UsersApi.managerSearch, params)
        : [];

    yield put(usersSuccess(response));
  } catch (error: unknown) {
    yield put(usersFailure(ApiError(error, 'Ошибка загрузки пользователей.')));
  }
}

function* addUserSaga(
  action: PayloadAction<{
    email: string;
    password: string;
    name: string;
    role: string;
    contactPhone?: string;
  }>,
) {
  try {
    yield delay(DELAY);
    yield call(UsersApi.create, {
      email: action.payload.email,
      password: action.payload.password,
      name: action.payload.name,
      role: action.payload.role,
      contactPhone: action.payload.contactPhone ? action.payload.contactPhone : undefined,
    });
    yield put(addUserSuccess());
  } catch (error: unknown) {
    yield put(addUserFailure(ApiError(error, 'Ошибка при добавлении гостиницы')));
  }
}

export function* usersSaga() {
  yield takeLatest(usersRequest.type, usersDataSaga);
  yield takeLatest(addUserRequest.type, addUserSaga);
}
