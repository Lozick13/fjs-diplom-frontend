import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Hotel {
  id: string;
  title: string;
  description: string;
}

interface HotelsState {
  hotels: Hotel[];
  hotel: Hotel | null;
  loading: boolean;
  error: string | null;
  adding: boolean;
  addError: string | null;
  hasMore: boolean;
  searchParams: {
    limit: number;
    offset: number;
    title: string;
  };
}

const initialState: HotelsState = {
  hotels: [],
  hotel: null,
  loading: false,
  error: null,
  adding: false,
  addError: null,
  hasMore: true,
  searchParams: {
    limit: 10,
    offset: 0,
    title: '',
  },
};

export const hotelSlice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {
    hotelsRequest: (
      state,
      action: PayloadAction<{ reset?: boolean; title?: string }>,
    ) => {
      state.loading = true;
      state.error = null;

      if (action.payload.reset) {
        state.hotels = [];
        state.searchParams.offset = 0;
        state.hasMore = true;
      }
    },
    hotelsSuccess: (state, action: PayloadAction<Hotel[]>) => {
      state.loading = false;
      state.hotels = [...state.hotels, ...action.payload];
      state.hasMore = action.payload.length === state.searchParams.limit;
      state.searchParams.offset = state.hotels.length;
    },
    hotelsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    hotelRequest: (state, _action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    hotelSuccess: (state, action: PayloadAction<Hotel>) => {
      state.loading = false;
      state.hotel = action.payload;
    },
    hotelFailure: (state, action: PayloadAction<string>) => {
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
  hotelRequest,
  hotelSuccess,
  hotelFailure,
  addHotelRequest,
  addHotelSuccess,
  addHotelFailure,
} = hotelSlice.actions;

const hotelReducer = hotelSlice.reducer;
export default hotelReducer;
