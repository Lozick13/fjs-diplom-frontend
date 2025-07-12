import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface HotelRoom {
  id: string;
  description: string;
  images: [string];
  hotel: {
    id: string;
    title: string;
    description?: string;
  };
}

export interface HotelRoomState {
  hotelRooms: HotelRoom[] | null;
  hotelRoom: HotelRoom | null;
  loading: boolean;
  error: string | null;
}

const initialState: HotelRoomState = {
  hotelRooms: null,
  hotelRoom: null,
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    hotelRoomRequest: (state, _action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    hotelRoomSuccess: (state, action: PayloadAction<HotelRoom>) => {
      state.loading = false;
      state.hotelRoom = action.payload;
    },
    hotelRoomFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  hotelRoomsRequest,
  hotelRoomsSuccess,
  hotelRoomsFailure,
  hotelRoomRequest,
  hotelRoomSuccess,
  hotelRoomFailure,
} = hotelRoomsSlice.actions;

const hotelRoomsReducer = hotelRoomsSlice.reducer;
export default hotelRoomsReducer;
