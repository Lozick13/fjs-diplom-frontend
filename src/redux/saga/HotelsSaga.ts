import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { DELAY } from '.';
import { HotelsApi } from '../../api/hotels';
import {
  hotelsFailure,
  hotelsRequest,
  hotelsSuccess,
  type Hotel,
} from '../slices/hotelsSlice';
import { ApiError } from './ApiError';

function* hotelsDataSaga() {
  try {
    yield delay(DELAY);
    const response: Hotel[] = yield call(HotelsApi.hotels);
    yield put(hotelsSuccess(response));
  } catch (error: unknown) {
    yield put(hotelsFailure(ApiError(error, 'Ошибка авторизации')));
  }
}

export function* hotelsSaga() {
  yield takeLatest(hotelsRequest.type, hotelsDataSaga);
}
