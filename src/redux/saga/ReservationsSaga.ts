import type { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { DELAY } from '.';
import { ReservationsApi } from '../../api/reservations';
import {
  addReservationsFailure,
  addReservationsRequest,
  addReservationsSuccess,
  deleteReservationFailure,
  deleteReservationRequest,
  deleteReservationSuccess,
  reservationsFailure,
  reservationsRequest,
  reservationsSuccess,
  type Reservation,
} from '../slices/reservationsSlice';
import { ApiError } from './ApiError';

function* reservationsDataSaga(
  action: PayloadAction<{
    id: string;
  }>,
) {
  try {
    yield delay(DELAY);

    const response: Reservation[] = yield call(
      ReservationsApi.getClientReservations,
      action.payload.id,
    );
    yield put(reservationsSuccess(response));
  } catch (error: unknown) {
    yield put(reservationsFailure(ApiError(error, 'Ошибка загрузки гостиниц')));
  }
}

function* addReservationsSaga(
  action: PayloadAction<{
    hotelRoom: string;
    startDate: string;
    endDate: string;
  }>,
) {
  try {
    yield delay(DELAY);
    yield call(ReservationsApi.create, action.payload);
    yield put(addReservationsSuccess());
  } catch (error: unknown) {
    yield put(addReservationsFailure(ApiError(error, 'Ошибка при добавлении гостиницы')));
  }
}

function* deleteReservationSaga(
  action: PayloadAction<{
    id: string;
  }>,
) {
  try {
    yield delay(DELAY);
    yield call(ReservationsApi.deleteReservation, action.payload.id);
    yield put(deleteReservationSuccess());
  } catch (error: unknown) {
    yield put(
      deleteReservationFailure(ApiError(error, 'Ошибка при добавлении гостиницы')),
    );
  }
}

export function* reservationsSaga() {
  yield takeLatest(addReservationsRequest.type, addReservationsSaga);
  yield takeLatest(reservationsRequest.type, reservationsDataSaga);
  yield takeLatest(deleteReservationRequest.type, deleteReservationSaga);
}
