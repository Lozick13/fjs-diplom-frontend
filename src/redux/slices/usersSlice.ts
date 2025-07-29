import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
  contactPhone?: string;
}

interface SearchParams {
  limit: number;
  offset: number;
}

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;

  adding: boolean;
  addError: string | null;

  hasMore: boolean;
  searchParams: SearchParams;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,

  adding: false,
  addError: null,

  hasMore: true,
  searchParams: {
    limit: 2,
    offset: 0,
  },
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersRequest: (
      state,
      action: PayloadAction<{
        reset?: string;
        name?: string;
        email?: string;
        contactPhone?: string;
      }>,
    ) => {
      state.loading = true;
      state.error = null;

      if (action.payload.reset) {
        state.users = [];
        state.searchParams.offset = 0;
        state.hasMore = true;
      }
    },
    usersSuccess: (state, action: PayloadAction<User[]>) => {
      state.loading = false;
      state.users = [...state.users, ...action.payload];
      state.hasMore = action.payload.length === state.searchParams.limit;
      state.searchParams.offset = state.users.length;
    },
    usersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    addUserRequest: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _action: PayloadAction<{
        email: string;
        password: string;
        name: string;
        role: string;
        contactPhone?: string;
      }>,
    ) => {
      state.adding = true;
      state.addError = null;
    },
    addUserSuccess: state => {
      state.adding = false;
    },
    addUserFailure: (state, action: PayloadAction<string>) => {
      state.adding = false;
      state.addError = action.payload;
    },
  },
});

export const { usersRequest, usersSuccess, usersFailure,addUserRequest,addUserSuccess,addUserFailure } = usersSlice.actions;

const usersReducer = usersSlice.reducer;
export default usersReducer;
