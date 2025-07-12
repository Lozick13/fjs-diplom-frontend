import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { DELAY } from '.';
import { HotelRoomsApi } from '../../api/hotel-rooms';
import {
  hotelRoomFailure,
  hotelRoomRequest,
  hotelRoomsFailure,
  hotelRoomsRequest,
  hotelRoomsSuccess,
  hotelRoomSuccess,
  type HotelRoom,
} from '../slices/hotelRoomsSlice';
import { ApiError } from './ApiError';
import type { PayloadAction } from '@reduxjs/toolkit';

function* hotelRoomsDataSaga() {
  try {
    yield delay(DELAY);
    const response: HotelRoom[] = yield call(HotelRoomsApi.hotelRooms);
    yield put(hotelRoomsSuccess(response));
  } catch (error: unknown) {
    yield put(hotelRoomsFailure(ApiError(error, 'Ошибка авторизации')));
  }
}

function* hotelRoomDataSaga(action: PayloadAction<string>) {
  try {
    const { payload: id } = action;
    yield delay(DELAY);
    const response: HotelRoom = yield call(HotelRoomsApi.hotelRoom, id);
    yield put(hotelRoomSuccess(response));
  } catch (error: unknown) {
    yield put(hotelRoomFailure(ApiError(error, 'Ошибка авторизации')));
  }
}

export function* hotelRoomsSaga() {
  yield takeLatest(hotelRoomsRequest, hotelRoomsDataSaga);
  yield takeLatest(hotelRoomRequest, hotelRoomDataSaga);
}
