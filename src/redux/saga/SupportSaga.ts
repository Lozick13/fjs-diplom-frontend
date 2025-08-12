import type { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { DELAY } from '.';
import { SupportApi } from '../../api/support';
import {
  closeRequest,
  closeRequestSuccess,
  createSupportRequest,
  getMessages,
  getSupportRequestsList,
  sendMessage,
  setCurrentRequest,
  setMessages,
  setSupportRequestsList,
  supportError,
  type Message,
  type SupportRequest,
} from '../slices/supportSlice';
import type { RootState } from '../store';
import {
  closeRequestViaSocket,
  createRequestViaSocket,
  sendMessageViaSocket,
} from '../store/websocket';
import { ApiError } from './ApiError';

function* createSupportRequestSaga(action: PayloadAction<string>) {
  try {
    const { role } = yield select(state => state.auth.user);
    const response: SupportRequest = yield call(
      SupportApi.createSupportRequest,
      action.payload,
    );

    yield put(setCurrentRequest(response));
    yield put(getSupportRequestsList(role));
    createRequestViaSocket();
  } catch (error: unknown) {
    yield put(supportError(ApiError(error, 'Ошибка создания обращения')));
  }
}

function* setCurrentRequestSaga(action: PayloadAction<SupportRequest | null>) {
  try {
    if (action.payload) {
      yield put(getMessages());
    }
  } catch (error) {
    yield put(supportError(ApiError(error, 'Ошибка подписки на чат')));
  }
}

function* getSupportRequestsListSaga(action: PayloadAction<'client' | 'manager'>) {
  try {
    const response: SupportRequest[] = yield call(
      action.payload === 'client'
        ? SupportApi.getClientSupportRequestsList
        : action.payload === 'manager'
        ? SupportApi.getManagerSupportRequestsList
        : () => {
            throw new Error('Недостаточно прав');
          },
    );

    yield put(setSupportRequestsList(response));
  } catch (error: unknown) {
    yield put(supportError(ApiError(error, 'Ошибка получения обращений')));
  }
}

function* closeRequestSaga(action: PayloadAction<string>) {
  try {
    const requestId = action.payload;
    const { role } = yield select(state => state.auth.user);

    closeRequestViaSocket(requestId);
    yield put(closeRequestSuccess(requestId));

    if (role === 'manager') {
      yield put(getSupportRequestsList('manager'));
    }
  } catch (error: unknown) {
    yield put(supportError(ApiError(error, 'Ошибка закрытия обращения')));
  }
}

function* getMessagesSaga() {
  yield delay(DELAY);
  try {
    const { id } = yield select(state => state.support.currentRequest);

    const response: Message[] = yield call(SupportApi.getMessages, id);
    yield put(setMessages(response));
  } catch (error: unknown) {
    yield put(supportError(ApiError(error, 'Ошибка загрузки сообщений')));
  }
}

function* sendMessageSaga(action: PayloadAction<string>) {
  try {
    const { id } = yield select((state: RootState) => state.support.currentRequest);
    sendMessageViaSocket(id, action.payload);
  } catch (error: unknown) {
    yield put(supportError(ApiError(error, 'Ошибка отправки сообщения')));
  }
}

export function* supportSaga() {
  yield takeLatest(createSupportRequest.type, createSupportRequestSaga);
  yield takeEvery(setCurrentRequest.type, setCurrentRequestSaga);
  yield takeLatest(getSupportRequestsList.type, getSupportRequestsListSaga);
  yield takeEvery(closeRequest.type, closeRequestSaga);
  yield takeLatest(getMessages.type, getMessagesSaga);
  yield takeEvery(sendMessage.type, sendMessageSaga);
}
