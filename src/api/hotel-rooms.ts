import api from './api';

export interface SearchHotelRoomParams {
  limit?: number;
  offset?: number;
  hotel?: string;
  isEnabled?: boolean;
}

export const HotelRoomsApi = {
  hotelRooms: async (params: SearchHotelRoomParams) => {
    const response = await api.get('/common/hotel-rooms', { params });
    return response.data;
  },
  hotelRoom: async (id: string) => {
    const response = await api.get(`/common/hotel-rooms/${id}`);
    return response.data;
  },
  create: async (data: {
    hotel: string;
    description: string;
    images: File[];
    isEnabled: boolean;
  }) => {
    const formData = new FormData();
    formData.append('hotel', data.hotel);
    formData.append('description', data.description);
    formData.append('isEnabled', String(data.isEnabled));
    data.images.forEach(file => {
      formData.append('images', file);
    });

    const response = await api.post('/admin/hotel-rooms', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },
};
