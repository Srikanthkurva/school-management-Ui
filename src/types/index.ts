export type Role = 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string | null;
  phone?: string;
  isActive: boolean;
  createdAt: string;
  permissions: string[];
}

export interface Teacher {
  id: string;
  userId?: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  qualification: string;
  experience: string;
  classes: string[];
  joinDate: string;
  salary: number;
  isActive: boolean;
  avatar: string | null;
}

export interface Student {
  id: string;
  userId?: string;
  name: string;
  email: string;
  phone: string;
  rollNo: string;
  class: string;
  section: string;
  parentName: string;
  parentPhone: string;
  dob: string;
  gender: string;
  address: string;
  admissionDate: string;
  isActive: boolean;
  avatar: string | null;
  fees: { total: number; paid: number; due: number };
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  class: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  subject: string;
  teacherId: string;
}

export interface AttendanceSummary {
  total: number;
  present: number;
  absent: number;
  late: number;
  percentage: number;
  records: AttendanceRecord[];
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  class: string;
  teacherId: string;
  teacherName: string;
  dueDate: string;
  createdAt: string;
  maxMarks: number;
  submissionCount: number;
  totalStudents: number;
  status: 'active' | 'closed' | 'draft';
  attachments: string[];
}

export interface SubjectResult {
  subject: string;
  maxMarks: number;
  marksObtained: number;
  grade: string;
}

export interface Result {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  exam: string;
  examDate: string;
  subjects: SubjectResult[];
  totalMarks: number;
  marksObtained: number;
  percentage: number;
  rank: number;
  grade: string;
  result: 'Pass' | 'Fail';
}

export interface Analytics {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  monthlyRevenue: number;
  attendanceRate: number;
  passRate: number;
  studentGrowth: { month: string; students: number; teachers: number }[];
  attendanceByClass: { class: string; attendance: number }[];
  revenueByMonth: { month: string; revenue: number }[];
  gradeDistribution: { grade: string; count: number; percentage: number }[];
}

export interface Permission {
  admin: string[];
  teacher: string[];
  student: string[];
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  timestamp: string;
  type: 'create' | 'update' | 'delete' | 'submit' | 'login' | 'system';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  targetRole: string;
  createdAt: string;
  isRead: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface LoginCredentials {
  identifier: string;
  password: string;
  userType?: string;
}

export interface FirstTimeSetupData {
  userType: string;
  identifier: string;
  dob: string;
  newPassword: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
