import { spawn } from 'redux-saga/effects';
import { authSaga } from './AuthSaga';
import { hotelsSaga } from './HotelsSaga';

export const DELAY = 1000

export function* saga() {
  yield spawn(authSaga);
  yield spawn(hotelsSaga)
}
