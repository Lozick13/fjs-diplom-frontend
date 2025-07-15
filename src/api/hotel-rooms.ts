import api from './api';


export interface SearchHotelRoomParams {
  limit?: number;
  offset?: number;
  hotel?: string;
  isEnabled?:boolean;
}

export const HotelRoomsApi = {
  hotelRooms: async (params: SearchHotelRoomParams) => {
    const response = await api.get('/common/hotel-rooms', {params});
    return response.data;
  },
  hotelRoom: async (id: string) => {
    const response = await api.get(`/common/hotel-rooms/${id}`);
    return response.data;
  },
};
