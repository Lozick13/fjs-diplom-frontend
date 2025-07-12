import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Hotel {
  id: string;
  title: string;
  description: string;
}

export interface HotelsState {
  hotels: Hotel[] | null;
  hotel: Hotel | null;
  loading: boolean;
  error: string | null;
}

const initialState: HotelsState = {
  hotels: [],
  hotel: null,
  loading: false,
  error: null,
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
  },
});

export const { hotelsRequest, hotelsSuccess, hotelsFailure } = hotelSlice.actions;

const hotelReducer = hotelSlice.reducer;
export default hotelReducer;
