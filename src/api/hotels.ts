import api from './api';

export const HotelsApi = {
  hotels: async () => {
    const response = await api.get('/admin/hotels');
    return response.data;
  },
};
