import api from './api';
import type { LoginCredentials, FirstTimeSetupData, ApiResponse, User, Analytics, Permission, ActivityLog, Notification } from '../types';

export const authService = {
  login: (credentials: LoginCredentials) =>
    api.post<ApiResponse<{ user: User; token: string }>>('/auth/login', credentials),
  setupFirstTime: (data: FirstTimeSetupData) =>
    api.post<ApiResponse<any>>('/auth/setup-password', data),
  getMe: () => api.get<ApiResponse<{ user: User }>>('/auth/me'),
  logout: () => api.post('/auth/logout'),
};

export const studentService = {
  getAll: (params?: Record<string, string | number>) => api.get('/students', { params }),
  getById: (id: string) => api.get(`/students/${id}`),
  create: (data: Partial<any>) => api.post('/students', data),
  update: (id: string, data: Partial<any>) => api.put(`/students/${id}`, data),
  delete: (id: string) => api.delete(`/students/${id}`),
};

export const teacherService = {
  getAll: (params?: Record<string, string | number>) => api.get('/teachers', { params }),
  getById: (id: string) => api.get(`/teachers/${id}`),
  create: (data: Partial<any>) => api.post('/teachers', data),
  update: (id: string, data: Partial<any>) => api.put(`/teachers/${id}`, data),
  delete: (id: string) => api.delete(`/teachers/${id}`),
};

export const attendanceService = {
  getAll: (params?: Record<string, string>) => api.get('/attendance', { params }),
  getSummary: (studentId: string) => api.get(`/attendance/summary/${studentId}`),
  mark: (records: any[]) => api.post('/attendance', { records }),
};

export const assignmentService = {
  getAll: (params?: Record<string, string>) => api.get('/assignments', { params }),
  getById: (id: string) => api.get(`/assignments/${id}`),
  create: (data: Partial<any>) => api.post('/assignments', data),
  update: (id: string, data: Partial<any>) => api.put(`/assignments/${id}`, data),
  delete: (id: string) => api.delete(`/assignments/${id}`),
};

export const resultService = {
  getAll: (params?: Record<string, string>) => api.get('/results', { params }),
  getById: (id: string) => api.get(`/results/${id}`),
  create: (data: Partial<any>) => api.post('/results', data),
};

export const adminService = {
  getAnalytics: () => api.get<ApiResponse<Analytics>>('/admin/analytics'),
  getPermissions: () => api.get<ApiResponse<Permission>>('/admin/permissions'),
  updatePermissions: (role: string, perms: string[]) => api.put('/admin/permissions', { role, perms }),
  getActivityLogs: (limit?: number) => api.get<ApiResponse<ActivityLog[]>>('/admin/logs', { params: { limit } }),
  getNotifications: () => api.get<ApiResponse<Notification[]>>('/admin/notifications'),
};

export const classesService = {
  getAll: () => api.get('/classes'),
};

export const enquiryService = {
  submit: (data: Record<string, any>) => api.post('/enquiry', data),
  getAll: () => api.get('/enquiry'),
};

export const admissionService = {
  submit: (data: Record<string, any>) => api.post('/admission', data),
  getPending: () => api.get('/admission/pending'),
  approve: (id: string) => api.post(`/admission/${id}/approve`),
  reject: (id: string, body?: { reason?: string }) => api.post(`/admission/${id}/reject`, body || {}),
  addStudentDirect: (data: Record<string, any>) => api.post('/admission/add-student', data),
};

export const contactService = {
  submit: (data: Record<string, any>) => api.post('/contact/submit', data),
};

export const teacherRequestService = {
  submit: (data: any) => api.post('/teacher-requests/submit', data),
  getAll: () => api.get('/teacher-requests/all'),
  approve: (id: string) => api.put(`/teacher-requests/approve/${id}`),
  reject: (id: string) => api.put(`/teacher-requests/reject/${id}`),
};
