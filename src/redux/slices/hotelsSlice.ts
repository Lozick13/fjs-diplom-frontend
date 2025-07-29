import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Hotel {
  id: string;
  title: string;
  description: string;
}

interface SearchParams {
  limit: number;
  offset: number;
}

export interface HotelsState {
  hotels: Hotel[];
  hotel: Hotel | null;
  loading: boolean;
  error: string | null;

  adding: boolean;
  addError: string | null;

  updating: boolean;
  updatingError: string | null;

  hasMore: boolean;
  searchParams: SearchParams;
}

const initialState: HotelsState = {
  hotels: [],
  hotel: null,
  loading: false,
  error: null,

  adding: false,
  addError: null,

  updating: false,
  updatingError: null,

  hasMore: true,
  searchParams: {
    limit: 2,
    offset: 0,
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
      state.hotel = null;
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
    addHotelSuccess: state => {
      state.adding = false;
    },
    addHotelFailure: (state, action: PayloadAction<string>) => {
      state.adding = false;
      state.addError = action.payload;
    },

    updateHotelRequest: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _action: PayloadAction<{
        id: string;
        title: string;
        description: string;
      }>,
    ) => {
      state.updating = true;
      state.updatingError = null;
    },
    updateHotelSuccess: state => {
      state.updating = false;
    },
    updateHotelFailure: (state, action: PayloadAction<string>) => {
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
  updateHotelRequest,
  updateHotelSuccess,
  updateHotelFailure,
} = hotelSlice.actions;

const hotelReducer = hotelSlice.reducer;
export default hotelReducer;
