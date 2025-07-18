import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware, { type Middleware } from 'redux-saga';
import { saga } from '../saga';
import authReducer, { type AuthState } from '../slices/authSlice';
import type { HotelRoomState } from '../slices/hotelRoomsSlice';
import hotelRoomsReducer from '../slices/hotelRoomsSlice';
import hotelReducer, { type HotelsState } from '../slices/hotelsSlice';

type AppState = {
  auth: AuthState;
  hotels: HotelsState;
  hotelRooms: HotelRoomState;
};

export const saveAuthState: Middleware<object, AppState> =
  api => next => (action: unknown) => {
    if (
      typeof action === 'object' &&
      action !== null &&
      'type' in action &&
      typeof action.type === 'string'
    ) {
      const result = next(action as never);
      if (action.type.startsWith('auth/')) {
        const authState = api.getState().auth;
        localStorage.setItem(
          'authState',
          JSON.stringify({
            user: authState.user,
            error: null,
            loading: false,
          }),
        );
      }
      return result;
    } else {
      return next(action as never);
    }
  };

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  devTools: true,
  reducer: { auth: authReducer, hotels: hotelReducer, hotelRooms: hotelRoomsReducer },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware, saveAuthState),
});

sagaMiddleware.run(saga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
