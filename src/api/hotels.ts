import api from './api';

export interface SearchHotelParams {
  limit?: number;
  offset?: number;
  title?: string;
}

export const HotelsApi = {
  search: async (params: SearchHotelParams) => {
    const response = await api.get('/admin/hotels', { params });
    return response.data;
  },
  hotel: async (id: string) => {
    console.log('id',id)
    const response = await api.get(`/admin/hotels/${id}`);
    return response.data;
  },
  create: async (data: { title: string; description: string }) => {
    const response = await api.post('/admin/hotels', data);
    return response.data;
  },
};
