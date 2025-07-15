import type { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, put, select, takeLatest } from 'redux-saga/effects';
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

function* hotelRoomsDataSaga(
  action: PayloadAction<{ reset?: boolean; hotel?: string; isEnabled?: boolean }>,
) {
  try {
    yield delay(DELAY);
    const { reset, hotel, isEnabled } = action.payload;
    const { limit, offset } = yield select(state => state.hotelRooms.searchParams);

    const params = {
      limit,
      offset: reset ? 0 : offset,
      hotel,
      isEnabled,
    };

    const response: HotelRoom[] = yield call(HotelRoomsApi.hotelRooms, params);
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
