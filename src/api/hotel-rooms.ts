import api from './api';

export const HotelRoomsApi = {
  hotelRooms: async () => {
    const response = await api.get('/common/hotel-rooms');
    console.log('response', response);
    return response.data;
  },
};
