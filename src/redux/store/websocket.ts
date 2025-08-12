import { io, Socket } from 'socket.io-client';
import store from '.';
import {
  addMessage,
  getSupportRequestsList,
  setCurrentRequest,
  setSupportRequestsList,
  type SupportRequest,
} from '../slices/supportSlice';

const URL = import.meta.env.VITE_URL;
let socket: Socket | null = null;

export const connectWebSocket = (
  userId: string,
  userName: string,
  userRole: string,
): Socket => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }

  socket = io(URL, {
    path: '/socket.io',
    transports: ['websocket'],
    withCredentials: true,
    auth: {
      userId: userId,
      userName: userName,
      userRole: userRole,
    },
    reconnectionAttempts: 3,
    reconnectionDelay: 1000,
  });

  socket.on('connect', () => {
    if (userRole === 'manager') subscribeToNewRequests();
  });

  socket.on('disconnect', reason => {
    if (reason === 'io server disconnect') socket?.connect();
  });

  socket.on('connect_error', err => {
    console.error('[WebSocket] Ошибка соединения:', err.message);
  });

  socket.on('chatMessage', message => {
    store.dispatch(addMessage(message));
  });

  socket.on('requestUpdated', (updatedRequest: SupportRequest) => {
    const { requests, currentRequest } = store.getState().support;
    const updatedRequests = requests.map(request =>
      request.id === updatedRequest.id ? updatedRequest : request,
    );

    store.dispatch(setSupportRequestsList(updatedRequests));

    if (currentRequest?.id === updatedRequest.id)
      store.dispatch(setCurrentRequest(updatedRequest));
  });

  socket.on('requestsUpdated', () => {
    const { user } = store.getState().auth;

    if (user?.role === 'manager') store.dispatch(getSupportRequestsList('manager'));
  });

  return socket;
};

export const subscribeToNewRequests = (): void => {
  if (socket?.connected) socket.emit('subscribeToNewRequests');
};

export const subscribeToRequest = (requestId: string): void => {
  if (socket?.connected) socket.emit('subscribeToRequest', { requestId });
};

export const unsubscribeFromRequest = (requestId: string): void => {
  if (socket?.connected) socket.emit('unsubscribeFromRequest', { requestId });
};

export const subscribeToChat = (chatId: string): void => {
  if (socket?.connected) socket.emit('subscribeToChat', { chatId });
};

export const sendMessageViaSocket = (chatId: string, text: string): void => {
  if (socket?.connected) socket.emit('sendMessage', { chatId, text });
};

export const createRequestViaSocket = () => {
  if (socket?.connected) socket.emit('newRequestCreated');
};

export const closeRequestViaSocket = (chatId: string): void => {
  if (socket?.connected) socket.emit('closeRequest', { chatId });
};

export const disconnectWebSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
