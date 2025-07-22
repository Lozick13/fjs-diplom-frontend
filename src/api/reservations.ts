import api from './api';
export const ReservationsApi = {
  create: async (data: { hotelRoom: string; startDate: string; endDate: string }) => {
    const response = await api.post('/client/reservations', data);
    return response.data;
  },
  getClientReservations: async (userId: string) => {
    const response = await api.get(`/client/reservations?userId=${userId}`);
    return response.data;
  },
  deleteReservation: async (id: string) => {
    await api.delete(`/client/reservations/${id}`);
    return;
  },
};
