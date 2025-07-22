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
  login: async (data: LoginData) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },
  logout: () => api.post('/auth/logout'),
  checkSession: () => api.get('/auth/check-session'),
  register: (data: RegisterData) => api.post('/client/register', data),
};
