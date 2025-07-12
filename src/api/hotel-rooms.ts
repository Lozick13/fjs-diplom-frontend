import api from './api';

export const HotelRoomsApi = {
  hotelRooms: async () => {
    const response = await api.get('/common/hotel-rooms');
    return response.data;
  },
  hotelRoom: async (id: string) => {
    const response = await api.get(`/common/hotel-rooms/${id}`);
    return response.data;
  },
};
