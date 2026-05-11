import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { useAuthStore } from '../store/authStore';

// Pages
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/auth/LoginPage';
import AdmissionEnquiryPage from '../pages/AdmissionEnquiryPage';
import OnlineAdmissionPage from '../pages/OnlineAdmissionPage';

// Info Pages
import AboutUsPage from '../pages/info/AboutUsPage';
import PrePrimaryPage from '../pages/info/PrePrimaryPage';
import PrimaryPage from '../pages/info/PrimaryPage';
import HighSchoolPage from '../pages/info/HighSchoolPage';
import StudentLifePage from '../pages/info/StudentLifePage';
import FacilitiesPage from '../pages/info/FacilitiesPage';
import UniformsPage from '../pages/info/UniformsPage';
import GalleryPage from '../pages/info/GalleryPage';
import AchievementsPage from '../pages/info/AchievementsPage';
import CareersPage from '../pages/info/CareersPage';
import ContactPage from '../pages/info/ContactPage';
import TeacherRegistrationPage from '../pages/info/TeacherRegistrationPage';

// Layouts
import DashboardLayout from '../layouts/DashboardLayout';

// Admin Pages
import SuperAdminDashboard from '../pages/admin/SuperAdminDashboard';
import StudentsPage from '../pages/admin/StudentsPage';
import TeachersPage from '../pages/admin/TeachersPage';
import AttendancePage from '../pages/admin/AttendancePage';
import AssignmentsPage from '../pages/admin/AssignmentsPage';
import ResultsPage from '../pages/admin/ResultsPage';
import PermissionsPage from '../pages/admin/PermissionsPage';
import ActivityLogsPage from '../pages/admin/ActivityLogsPage';
import EnquiriesPage from '../pages/admin/EnquiriesPage';
import RequestAdmissionsPage from '../pages/admin/RequestAdmissionsPage';
import TeacherRequestPage from '../pages/admin/TeacherRequestPage';

// Teacher Pages
import TeacherDashboard from '../pages/teacher/TeacherDashboard';
import TeacherAttendancePage from '../pages/teacher/TeacherAttendancePage';
import TeacherAssignmentsPage from '../pages/teacher/TeacherAssignmentsPage';
import TeacherResultsPage from '../pages/teacher/TeacherResultsPage';
import TeacherStudentsPage from '../pages/teacher/TeacherStudentsPage';
import TeacherSchedulePage from '../pages/teacher/TeacherSchedulePage';
import TeacherNoticesPage from '../pages/teacher/TeacherNoticesPage';

// Student Pages
import StudentDashboard from '../pages/student/StudentDashboard';
import StudentAttendancePage from '../pages/student/StudentAttendancePage';
import StudentResultsPage from '../pages/student/StudentResultsPage';
import StudentAssignmentsPage from '../pages/student/StudentAssignmentsPage';
import StudentFeesPage from '../pages/student/StudentFeesPage';
import ProfilePage from '../pages/shared/ProfilePage';

const AppRoutes = () => {
  const { isAuthenticated, user, getMe } = useAuthStore();
  
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getMe();
    }
  }, [getMe]);

  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<HomePage />} />
      <Route path="/admission-enquiry" element={<AdmissionEnquiryPage />} />
      <Route path="/online-admission" element={<OnlineAdmissionPage />} />

      {/* Info Routes */}
      <Route path="/about-us" element={<AboutUsPage />} />
      <Route path="/pre-primary" element={<PrePrimaryPage />} />
      <Route path="/primary" element={<PrimaryPage />} />
      <Route path="/high-school" element={<HighSchoolPage />} />
      <Route path="/student-life" element={<StudentLifePage />} />
      <Route path="/facilities" element={<FacilitiesPage />} />
      <Route path="/uniforms" element={<UniformsPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/achievements" element={<AchievementsPage />} />
      <Route path="/careers" element={<CareersPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/teacher-registration" element={<TeacherRegistrationPage />} />
      <Route
        path="/login"
        element={
          isAuthenticated && user
            ? <Navigate to={`/${user.role}/dashboard`} replace />
            : <LoginPage />
        }
      />
      <Route
        path="/dashboard"
        element={
          isAuthenticated && user
            ? <Navigate to={`/${user.role}/dashboard`} replace />
            : <Navigate to="/login" replace />
        }
      />

      {/* Admin Routes */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/admin/dashboard" element={<SuperAdminDashboard />} />
          <Route path="/admin/students" element={<StudentsPage />} />
          <Route path="/admin/teachers" element={<TeachersPage />} />
          <Route path="/admin/attendance" element={<AttendancePage />} />
          <Route path="/admin/assignments" element={<AssignmentsPage />} />
          <Route path="/admin/results" element={<ResultsPage />} />
          <Route path="/admin/permissions" element={<PermissionsPage />} />
          <Route path="/admin/logs" element={<ActivityLogsPage />} />
          <Route path="/admin/enquiries" element={<EnquiriesPage />} />
          <Route path="/admin/admissions-requests" element={<RequestAdmissionsPage />} />
          <Route path="/admin/teacher-requests" element={<TeacherRequestPage />} />
          <Route path="/admin/profile" element={<ProfilePage />} />
        </Route>
      </Route>

      {/* Teacher Routes */}
      <Route element={<ProtectedRoute allowedRoles={['teacher']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/attendance" element={<TeacherAttendancePage />} />
          <Route path="/teacher/assignments" element={<TeacherAssignmentsPage />} />
          <Route path="/teacher/results" element={<TeacherResultsPage />} />
          <Route path="/teacher/students" element={<TeacherStudentsPage />} />
          <Route path="/teacher/schedule" element={<TeacherSchedulePage />} />
          <Route path="/teacher/notices" element={<TeacherNoticesPage />} />
          <Route path="/teacher/profile" element={<ProfilePage />} />
        </Route>
      </Route>

      {/* Student Routes */}
      <Route element={<ProtectedRoute allowedRoles={['student']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/attendance" element={<StudentAttendancePage />} />
          <Route path="/student/results" element={<StudentResultsPage />} />
          <Route path="/student/assignments" element={<StudentAssignmentsPage />} />
          <Route path="/student/fees" element={<StudentFeesPage />} />
          <Route path="/student/profile" element={<ProfilePage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
