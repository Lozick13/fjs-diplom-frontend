import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface SupportRequest {
  id: string;
  createdAt: string;
  isActive: boolean;
  hasNewMessages: boolean;
  client?: {
    id: string;
    name: string;
    email: string;
    contactPhone: string;
  };
}

export interface Message {
  id: string;
  createdAt: string;
  text: string;
  readAt: string | null;
  author: {
    id: string;
    name: string;
  };
}

export interface SupportState {
  requests: SupportRequest[];
  messages: Message[];

  currentRequest: SupportRequest | null;

  loading: boolean;
  error: string | null;

  sendMessageLoading: boolean;
  sendMessageError: string | null;
}

const initialState: SupportState = {
  requests: [],
  messages: [],

  currentRequest: null,

  loading: false,
  error: null,

  sendMessageLoading: false,
  sendMessageError: null,
};

const supportSlice = createSlice({
  name: 'support',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createSupportRequest(state, _action: PayloadAction<string>) {
      state.error = null;
      state.loading = true;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getSupportRequestsList: (state, _action: PayloadAction<'client' | 'manager'>) => {
      state.error = null;
      state.loading = true;
    },

    setCurrentRequest(state, action: PayloadAction<SupportRequest | null>) {
      state.loading = true;
      state.messages = [];
      state.currentRequest = action.payload;
    },
    setSupportRequestsList(state, action: PayloadAction<SupportRequest[]>) {
      state.loading = false;
      state.requests = action.payload;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    closeRequest(state, _action: PayloadAction<string>) {
      state.error = null;
      state.loading = true;
    },
    closeRequestSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.requests = state.requests.map(request =>
        request.id === action.payload ? { ...request, isActive: false } : request,
      );
      if (state.currentRequest?.id === action.payload) {
        state.currentRequest.isActive = false;
      }
    },

    getMessages(state) {
      state.loading = true;
      state.messages = [];
    },
    setMessages(state, action: PayloadAction<Message[]>) {
      state.loading = false;
      state.messages = action.payload;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sendMessage(state, _action: PayloadAction<string>) {
      state.sendMessageLoading = true;
    },
    addMessage(state, action: PayloadAction<Message>) {
      state.sendMessageLoading = false;
      state.messages.push(action.payload);
    },

    supportError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    sendMessageError(state, action: PayloadAction<string>) {
      state.sendMessageLoading = false;
      state.sendMessageError = action.payload;
    },
  },
});

export const {
  createSupportRequest,
  getSupportRequestsList,
  setCurrentRequest,
  setSupportRequestsList,
  closeRequest,
  closeRequestSuccess,
  getMessages,
  setMessages,
  sendMessage,
  addMessage,
  supportError,
  sendMessageError,
} = supportSlice.actions;

const supportReducer = supportSlice.reducer;
export default supportReducer;
