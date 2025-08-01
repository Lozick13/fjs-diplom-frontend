import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware, { type Middleware } from 'redux-saga';
import { saga } from '../saga';
import authReducer, { type AuthState } from '../slices/authSlice';
import type { HotelRoomState } from '../slices/hotelRoomsSlice';
import hotelRoomsReducer from '../slices/hotelRoomsSlice';
import hotelReducer, { type HotelsState } from '../slices/hotelsSlice';
import reservationsReducer, { type ReservationsState } from '../slices/reservationsSlice';
import usersReducer, { type UsersState } from '../slices/usersSlice';

type AppState = {
  auth: AuthState;
  hotels: HotelsState;
  hotelRooms: HotelRoomState;
  reservations: ReservationsState;
  users: UsersState;
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
          'auth',
          JSON.stringify({
            user: authState.user,
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
  reducer: {
    auth: authReducer,
    hotels: hotelReducer,
    hotelRooms: hotelRoomsReducer,
    reservations: reservationsReducer,
    users: usersReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: [
          'hotelRooms/updateHotelRoomRequest',
          'hotelRooms/addHotelRoomRequest',
        ],
        ignoredPaths: ['payload.images'],
      },
    }).concat(sagaMiddleware, saveAuthState),
});

sagaMiddleware.run(saga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
