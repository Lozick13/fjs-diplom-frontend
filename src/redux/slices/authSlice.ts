import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  contactPhone?: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const loadState = (): AuthState => {
  try {
    const serializedState = localStorage.getItem('auth');
    if (serializedState === null)
      return {
        user: null,
        loading: false,
        error: null,
      };

    return JSON.parse(serializedState);
  } catch {
    return { user: null, loading: false, error: null };
  }
};

const initialState: AuthState = loadState();

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _action: PayloadAction<{ email: string; password: string }>,
    ) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    logoutRequest: state => {
      state.loading = true;
    },
    logoutSuccess: state => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },

    checkSession: () => {},

    registerRequest: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _action: PayloadAction<{
        email: string;
        password: string;
        name: string;
        contactPhone?: string;
      }>,
    ) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  checkSession,
  registerRequest,
  registerSuccess,
  registerFailure,
} = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
