import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { DELAY } from '.';
import { HotelRoomsApi } from '../../api/hotel-rooms';
import {
  hotelRoomsFailure,
  hotelRoomsRequest,
  hotelRoomsSuccess,
  type HotelRoom,
} from '../slices/hotelRoomsSlice';
import { ApiError } from './ApiError';

function* hotelRoomsDataSaga() {
  try {
    yield delay(DELAY);
    const response: HotelRoom[] = yield call(HotelRoomsApi.hotelRooms);
    yield put(hotelRoomsSuccess(response));
  } catch (error: unknown) {
    yield put(hotelRoomsFailure(ApiError(error, 'Ошибка авторизации')));
  }
}

export function* hotelRoomsSaga() {
  yield takeLatest(hotelRoomsRequest, hotelRoomsDataSaga);
}
