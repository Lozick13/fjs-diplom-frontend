import api from './api';

export interface SearchUsersParams {
  limit?: number;
  offset?: number;
  name?: string;
  email?: string;
  contactPhone?: string;
}

export const UsersApi = {
  adminSearch: async (params: SearchUsersParams) => {
    const response = await api.get('/admin/users', { params });
    return response.data;
  },
  managerSearch: async (params: SearchUsersParams) => {
    const response = await api.get('/manager/users', { params });
    return response.data;
  },
  create: async (data: {
    email: string;
    password: string;
    name: string;
    role: string;
    contactPhone?: string;
  }) => {
    const response = await api.post('/admin/users', data);
    return response.data;
  },
};
