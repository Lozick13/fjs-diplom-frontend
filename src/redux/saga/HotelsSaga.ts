import type { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, put, select, takeLatest } from 'redux-saga/effects';
import { HotelsApi } from '../../api/hotels';
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
import { DELAY } from '.';

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
