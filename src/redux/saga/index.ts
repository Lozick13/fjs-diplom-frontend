import { spawn } from 'redux-saga/effects';
import { authSaga } from './AuthSaga';

export function* saga() {
  yield spawn(authSaga);
}
