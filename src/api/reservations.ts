import api from './api';
export const ReservationsApi = {
  create: async (data: { hotelRoom: string; startDate: string; endDate: string }) => {
    const response = await api.post('/client/reservations', data);
    return response.data;
  },
  getClientReservations: async (data: { dateStart?: string; dateEnd?: string }) => {
    const params = new URLSearchParams();

    if (data.dateStart) params.append('dateStart', data.dateStart);
    if (data.dateEnd) params.append('dateEnd', data.dateEnd);

    const response = await api.get(`/client/reservations?${params.toString()}`);
    return response.data;
  },
  getManagerReservations: async (data: {
    userId: string;
    dateStart?: string;
    dateEnd?: string;
  }) => {
    const params = new URLSearchParams();

    if (data.dateStart) params.append('dateStart', data.dateStart);
    if (data.dateEnd) params.append('dateEnd', data.dateEnd);

    const response = await api.get(
      `/manager/reservations/${data.userId}?${params.toString()}`,
    );
    return response.data;
  },
  deleteClientReservation: async (id: string) => {
    await api.delete(`/client/reservations/${id}`);
    return;
  },
  deleteManagerReservation: async (id: string) => {
    await api.delete(`/manager/reservations/${id}`);
    return;
  },
};
