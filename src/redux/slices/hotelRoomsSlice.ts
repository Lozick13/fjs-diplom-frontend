import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface HotelRoom {
  id: string;
  description: string;
  images: [string];
  hotel: {
    id: string;
    title: string;
  };
}

export interface HotelRoomState {
  hotelRooms: HotelRoom[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: HotelRoomState = {
  hotelRooms: null,
  loading: false,
  error: null,
};

export const hotelRoomsSlice = createSlice({
  name: 'hotelRooms',
  initialState,
  reducers: {
    hotelRoomsRequest: state => {
      state.loading = true;
      state.error = null;
    },
    hotelRoomsSuccess: (state, action: PayloadAction<HotelRoom[]>) => {
      state.loading = false;
      state.hotelRooms = action.payload;
    },
    hotelRoomsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { hotelRoomsRequest, hotelRoomsSuccess, hotelRoomsFailure } =
  hotelRoomsSlice.actions;

const hotelRoomsReducer = hotelRoomsSlice.reducer;
export default hotelRoomsReducer;
