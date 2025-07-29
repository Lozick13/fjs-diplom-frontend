import { spawn } from 'redux-saga/effects';
import { authSaga } from './AuthSaga';
import { hotelRoomsSaga } from './HotelRoomsSaga';
import { hotelsSaga } from './HotelsSaga';
import { reservationsSaga } from './ReservationsSaga';
import { usersSaga } from './UsersSaga';

export const DELAY = 1000;

export function* saga() {
  yield spawn(authSaga);
  yield spawn(hotelsSaga);
  yield spawn(hotelRoomsSaga);
  yield spawn(reservationsSaga);
  yield spawn(usersSaga);
}
