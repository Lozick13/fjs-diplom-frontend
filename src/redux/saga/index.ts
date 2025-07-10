import { spawn } from 'redux-saga/effects';
import { authSaga } from './AuthSaga';

export const DELAY = 1000

export function* saga() {
  yield spawn(authSaga);
}
