import type { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, put, select, takeLatest } from 'redux-saga/effects';
import { DELAY } from '.';
import { HotelsApi } from '../../api/hotels';
import {
  addHotelFailure,
  addHotelRequest,
  addHotelSuccess,
  hotelFailure,
  hotelRequest,
  hotelsFailure,
  hotelsRequest,
  hotelsSuccess,
  hotelSuccess,
  updateHotelFailure,
  updateHotelRequest,
  updateHotelSuccess,
  type Hotel,
} from '../slices/hotelsSlice';
import { ApiError } from './ApiError';

function* hotelsDataSaga(action: PayloadAction<{ reset?: boolean; title?: string }>) {
  try {
    yield delay(DELAY);
    const { reset, title } = action.payload;
    const { limit, offset } = yield select(state => state.hotels.searchParams);

    const params = {
      limit,
      offset: reset ? 0 : offset,
      title: title,
    };

    const response: Hotel[] = yield call(HotelsApi.search, params);
    yield put(hotelsSuccess(response));
  } catch (error: unknown) {
    yield put(hotelsFailure(ApiError(error, 'Ошибка загрузки гостиниц')));
  }
}

function* hotelDataSaga(action: PayloadAction<string>) {
  try {
    yield delay(DELAY);
    const id = action.payload;
    const response: Hotel = yield call(HotelsApi.hotel, id);
    yield put(hotelSuccess(response));
  } catch (error: unknown) {
    yield put(hotelFailure(ApiError(error, 'Ошибка загрузки гостиницы')));
  }
}

function* addHotelSaga(action: PayloadAction<{ title: string; description: string }>) {
  try {
    yield delay(DELAY);
    yield call(HotelsApi.create, action.payload);
    yield put(hotelsRequest({ reset: true }));
    yield put(addHotelSuccess());
  } catch (error: unknown) {
    yield put(addHotelFailure(ApiError(error, 'Ошибка при добавлении гостиницы')));
  }
}

function* updateHotelSaga(
  action: PayloadAction<{ id: string; title: string; description: string }>,
) {
  try {
    yield delay(DELAY);
    yield call(HotelsApi.update, action.payload);
    yield put(hotelRequest(action.payload.id));
    yield put(updateHotelSuccess());
  } catch (error: unknown) {
    yield put(updateHotelFailure(ApiError(error, 'Ошибка при обновлении гостиницы')));
  }
}

export function* hotelsSaga() {
  yield takeLatest(hotelsRequest.type, hotelsDataSaga);
  yield takeLatest(hotelRequest.type, hotelDataSaga);
  yield takeLatest(addHotelRequest.type, addHotelSaga);
  yield takeLatest(updateHotelRequest.type, updateHotelSaga);
}
