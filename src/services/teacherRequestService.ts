import api from './api';

export const teacherRequestService = {
  submit: (data: any) => api.post('/teacher-requests/submit', data),
  getAll: () => api.get('/teacher-requests/all'),
  approve: (id: string) => api.put(`/teacher-requests/approve/${id}`),
  reject: (id: string) => api.put(`/teacher-requests/reject/${id}`),
};
