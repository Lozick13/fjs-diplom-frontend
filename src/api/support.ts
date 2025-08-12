import api from './api';

export const SupportApi = {
  createSupportRequest: async (text: string) => {
    const response = await api.post('/client/support-requests/', { text });
    return response.data;
  },

  getClientSupportRequestsList: async (params?: {
    limit?: number;
    offset?: number;
    isActive?: boolean;
  }) => {
    const response = await api.get('/client/support-requests/', { params });
    return response.data;
  },
  getManagerSupportRequestsList: async (params?: {
    limit?: number;
    offset?: number;
    isActive?: boolean;
  }) => {
    const response = await api.get('/manager/support-requests/', { params });
    return response.data;
  },

  getMessages: async (supportRequestId: string) => {
    const response = await api.get(
      `/common/support-requests/${supportRequestId}/messages`,
    );
    return response.data;
  },
};
