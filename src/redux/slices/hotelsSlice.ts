import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Hotel {
  id: string;
  title: string;
  description: string;
}

export interface HotelsState {
  hotels: Hotel[] | null;
  loading: boolean;
  error: string | null;
  adding: boolean;
  addError: string | null;
}

const initialState: HotelsState = {
  hotels: [],
  loading: false,
  error: null,
  adding: false,
  addError: null,
};

export const hotelSlice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {
    hotelsRequest: state => {
      state.loading = true;
      state.error = null;
    },
    hotelsSuccess: (state, action: PayloadAction<Hotel[]>) => {
      state.loading = false;
      state.hotels = action.payload;
    },
    hotelsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    addHotelRequest: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _action: PayloadAction<{ title: string; description: string }>,
    ) => {
      state.adding = true;
      state.addError = null;
    },
    addHotelSuccess: (state, action: PayloadAction<Hotel>) => {
      state.adding = false;
      if (state.hotels) state.hotels.unshift(action.payload);
    },
    addHotelFailure: (state, action: PayloadAction<string>) => {
      state.adding = false;
      state.addError = action.payload;
    },
  },
});

export const {
  hotelsRequest,
  hotelsSuccess,
  hotelsFailure,
  addHotelRequest,
  addHotelSuccess,
  addHotelFailure,
} = hotelSlice.actions;

const hotelReducer = hotelSlice.reducer;
export default hotelReducer;
