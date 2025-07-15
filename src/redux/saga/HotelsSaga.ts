import type { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { DELAY } from '.';
import { HotelsApi, type SearchHotelParams } from '../../api/hotels';
import {
  addHotelFailure,
  addHotelRequest,
  addHotelSuccess,
  hotelsFailure,
  hotelsRequest,
  hotelsSuccess,
  type Hotel,
} from '../slices/hotelsSlice';
import { ApiError } from './ApiError';

function* hotelsDataSaga(action: PayloadAction<Partial<SearchHotelParams>>) {
  try {
    yield delay(DELAY);
    const response: Hotel[] = yield call(HotelsApi.search, action.payload);
    yield put(hotelsSuccess(response));
  } catch (error: unknown) {
    yield put(hotelsFailure(ApiError(error, 'Ошибка загрузки отелей')));
  }
}

function* addHotelSaga(action: PayloadAction<{ title: string; description: string }>) {
  try {
    const { title, description } = action.payload;
    const response: Hotel = yield call(HotelsApi.create, { title, description });
    yield put(addHotelSuccess(response));
  } catch (error: unknown) {
    yield put(addHotelFailure(ApiError(error, 'Ошибка при добавлении отеля')));
  }
}

export function* hotelsSaga() {
  yield takeLatest(hotelsRequest.type, hotelsDataSaga);
  yield takeLatest(addHotelRequest.type, addHotelSaga);
}
