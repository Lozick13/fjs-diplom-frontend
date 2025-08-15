import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface HotelRoom {
  id: string;
  description: string;
  images: string[];
  isEnabled: boolean;
  hotel: {
    id: string;
    title: string;
    description?: string;
  };
}

interface SearchParams {
  limit: number;
  offset: number;
  hotel: string;
  isEnabled: boolean;
}

export interface HotelRoomState {
  hotelRooms: HotelRoom[];
  hotelRoom: HotelRoom | null;
  loading: boolean;
  error: string | null;

  adding: boolean;
  addError: string | null;

  updating: boolean;
  updatingError: string | null;

  hasMore: boolean;
  searchParams: SearchParams;
}

const initialState: HotelRoomState = {
  hotelRooms: [],
  hotelRoom: null,
  loading: false,
  error: null,

  adding: false,
  addError: null,

  updating: false,
  updatingError: null,

  hasMore: true,
  searchParams: {
    limit: 10,
    offset: 0,
    hotel: '',
    isEnabled: true,
  },
};

export const hotelRoomsSlice = createSlice({
  name: 'hotelRooms',
  initialState,
  reducers: {
    hotelRoomsRequest: (
      state,
      action: PayloadAction<{ reset?: boolean; hotel?: string; isEnabled?: boolean }>,
    ) => {
      state.loading = true;
      state.error = null;

      if (action.payload.reset) {
        state.hotelRooms = [];
        state.searchParams.offset = 0;
        state.hasMore = true;
      }
    },
    hotelRoomsSuccess: (state, action: PayloadAction<HotelRoom[]>) => {
      state.loading = false;
      state.hotelRooms = [...state.hotelRooms, ...action.payload];
      state.hasMore = action.payload.length === state.searchParams.limit;
      state.searchParams.offset = state.hotelRooms.length;
    },
    hotelRoomsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    hotelRoomRequest: (state, _action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;

      state.hotelRoom = null;
    },
    hotelRoomSuccess: (state, action: PayloadAction<HotelRoom>) => {
      state.loading = false;
      state.hotelRoom = action.payload;
    },
    hotelRoomFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    addHotelRoomRequest: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _action: PayloadAction<{
        hotel: string;
        description: string;
        images: Array<string | File>;
        isEnabled: boolean;
      }>,
    ) => {
      state.adding = true;
      state.addError = null;
    },
    addHotelRoomSuccess: state => {
      state.adding = false;
    },
    addHotelRoomFailure: (state, action: PayloadAction<string>) => {
      state.adding = false;
      state.addError = action.payload;
    },

    updateHotelRoomRequest: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _action: PayloadAction<{
        id: string;
        hotel: string;
        description: string;
        images: Array<string | File>;
        isEnabled: boolean;
      }>,
    ) => {
      state.adding = true;
      state.addError = null;
    },
    updateHotelRoomSuccess: state => {
      state.adding = false;
    },
    updateHotelRoomFailure: (state, action: PayloadAction<string>) => {
      state.adding = false;
      state.addError = action.payload;
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
  addHotelRoomSuccess,
  addHotelRoomRequest,
  addHotelRoomFailure,
  updateHotelRoomSuccess,
  updateHotelRoomRequest,
  updateHotelRoomFailure,
} = hotelRoomsSlice.actions;

const hotelRoomsReducer = hotelRoomsSlice.reducer;
export default hotelRoomsReducer;
