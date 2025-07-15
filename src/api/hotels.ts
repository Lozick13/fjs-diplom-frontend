import api from './api';

export const HotelsApi = {
  hotels: async () => {
    const response = await api.get('/admin/hotels');
    return response.data;
  },
  create: async (data: { title: string; description: string }) => {
    const response = await api.post('/admin/hotels', data);
    return response.data;
  },
};
