import api from './api';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  contactPhone?: string;
}

export const AuthApi = {
  login: (data: LoginData) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  register: (data: RegisterData) => api.post('/client/register', data),
};
