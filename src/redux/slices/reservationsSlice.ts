import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Reservation {
  id: string;
  startDate: string;
  endDate: string;
  hotelRoom: {
    description: string;
    images: string[];
  };
  hotel: {
    title: string;
    description: string;
  };
}

interface ReservationsState {
  reservations: Reservation[];
  loading: boolean;
  error: string | null;

  success: boolean;

  deleteLoading: boolean;
  deleteError: string | null;
}

const initialState: ReservationsState = {
  reservations: [],
  loading: false,
  error: null,

  success: false,

  deleteLoading: false,
  deleteError: null,
};

export const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    reservationsRequest: (state, _action: PayloadAction<{ id: string }>) => {
      console.log('1',1)
      state.loading = true;
      state.error = null;
      state.reservations = [];
    },
    reservationsSuccess: (state, action: PayloadAction<Reservation[]>) => {
      state.loading = false;
      state.reservations = action.payload;
    },
    reservationsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    addReservationsRequest: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _action: PayloadAction<{
        hotelRoom: string;
        startDate: string;
        endDate: string;
      }>,
    ) => {
      state.loading = true;
      state.error = null;
      state.success = false;
      state.deleteLoading = true;
      state.deleteError = null;
    },
    addReservationsSuccess: state => {
      state.loading = false;
      state.success = true;
    },
    addReservationsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteReservationRequest: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _action: PayloadAction<{
        id: string;
      }>,
    ) => {
      state.deleteLoading = true;
      state.deleteError = null;
    },
    deleteReservationSuccess: state => {
      state.deleteLoading = false;
    },
    deleteReservationFailure: (state, action: PayloadAction<string>) => {
      state.deleteLoading = false;
      state.deleteError = action.payload;
    },
  },
});

export const {
  reservationsRequest,
  reservationsSuccess,
  reservationsFailure,
  addReservationsRequest,
  addReservationsSuccess,
  addReservationsFailure,
  deleteReservationRequest,
  deleteReservationSuccess,
  deleteReservationFailure,
} = reservationsSlice.actions;

const reservationsReducer = reservationsSlice.reducer;
export default reservationsReducer;
