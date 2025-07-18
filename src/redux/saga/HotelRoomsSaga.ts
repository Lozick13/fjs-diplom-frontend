import type { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, put, select, takeLatest } from 'redux-saga/effects';
import { DELAY } from '.';
import { HotelRoomsApi } from '../../api/hotel-rooms';
import {
  addHotelRoomFailure,
  addHotelRoomRequest,
  addHotelRoomSuccess,
  hotelRoomFailure,
  hotelRoomRequest,
  hotelRoomsFailure,
  hotelRoomsRequest,
  hotelRoomsSuccess,
  hotelRoomSuccess,
  updateHotelRoomFailure,
  updateHotelRoomRequest,
  updateHotelRoomSuccess,
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
    yield put(hotelRoomsFailure(ApiError(error, 'Ошибка загрузки комнаты')));
  }
}

function* hotelRoomDataSaga(action: PayloadAction<string>) {
  try {
    yield delay(DELAY);
    const id = action.payload;
    const response: HotelRoom = yield call(HotelRoomsApi.hotelRoom, id);
    yield put(hotelRoomSuccess(response));
  } catch (error: unknown) {
    yield put(hotelRoomFailure(ApiError(error, 'Ошибка загрузки комнаты')));
  }
}

function* addHotelRoomSaga(
  action: PayloadAction<{
    hotel: string;
    description: string;
    images: File[];
    isEnabled: boolean;
  }>,
) {
  try {
    yield delay(DELAY);
    yield call(HotelRoomsApi.create, action.payload);
    yield put(addHotelRoomSuccess());
  } catch (error: unknown) {
    yield put(addHotelRoomFailure(ApiError(error, 'Ошибка при добавлении комнаты')));
  }
}

function* updateRoomSaga(
  action: PayloadAction<{
    id: string;
    hotel: string;
    description: string;
    images: File[];
    isEnabled: boolean;
  }>,
) {
  try {
    yield call(HotelRoomsApi.update, action.payload);
    yield put(updateHotelRoomSuccess());
  } catch (error: unknown) {
    yield put(updateHotelRoomFailure(ApiError(error, 'Ошибка при обновлении комнаты')));
  }
}

export function* hotelRoomsSaga() {
  yield takeLatest(hotelRoomsRequest, hotelRoomsDataSaga);
  yield takeLatest(hotelRoomRequest, hotelRoomDataSaga);
  yield takeLatest(addHotelRoomRequest, addHotelRoomSaga);
  yield takeLatest(updateHotelRoomRequest, updateRoomSaga);
}
