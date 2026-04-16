import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutGrid, Users, GraduationCap, Book, ClipboardList,
  BarChart2, Settings, Activity, LogOut, ChevronLeft, ChevronRight,
  School, FileText, CreditCard, UserCircle2, CalendarDays, Bell
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useUIStore } from '../../store/uiStore';
import type { Role } from '../../types';

const navItems: Record<Role, { label: string; icon: any; path: string; permission?: string }[]> = {
  admin: [
    { label: 'Dashboard', icon: LayoutGrid, path: '/admin/dashboard' },
    { label: 'Students', icon: GraduationCap, path: '/admin/students', permission: 'view_students' },
    { label: 'Teachers', icon: Users, path: '/admin/teachers', permission: 'view_teachers' },
    { label: 'Attendance', icon: ClipboardList, path: '/admin/attendance', permission: 'view_attendance' },
    { label: 'Assignments', icon: Book, path: '/admin/assignments', permission: 'view_assignments' },
    { label: 'Results', icon: BarChart2, path: '/admin/results', permission: 'view_results' },
    { label: 'Enquiries', icon: FileText, path: '/admin/enquiries' },
      { label: 'Admissions Requests', icon: FileText, path: '/admin/admissions-requests' },
    { label: 'Permissions', icon: Settings, path: '/admin/permissions', permission: 'manage_permissions' },
    { label: 'Activity Logs', icon: Activity, path: '/admin/logs', permission: 'view_activity_logs' },
  ],
  teacher: [
    { label: 'Overview', icon: LayoutGrid, path: '/teacher/dashboard' },
    { label: 'Attendance', icon: ClipboardList, path: '/teacher/attendance', permission: 'view_attendance' },
    { label: 'Assignments', icon: Book, path: '/teacher/assignments', permission: 'view_assignments' },
    { label: 'Results', icon: BarChart2, path: '/teacher/results', permission: 'view_results' },
    { label: 'Students', icon: GraduationCap, path: '/teacher/students', permission: 'view_students' },
    { label: 'Schedule', icon: CalendarDays, path: '/teacher/schedule' },
    { label: 'Notices', icon: Bell, path: '/teacher/notices' },
    { label: 'Profile', icon: UserCircle2, path: '/teacher/profile' },
  ],
  student: [
    { label: 'Overview', icon: LayoutGrid, path: '/student/dashboard' },
    { label: 'Attendance', icon: ClipboardList, path: '/student/attendance', permission: 'view_attendance' },
    { label: 'Assignments', icon: FileText, path: '/student/assignments', permission: 'view_assignments' },
    { label: 'Results', icon: BarChart2, path: '/student/results', permission: 'view_results' },
    { label: 'Fees', icon: CreditCard, path: '/student/fees' },
    { label: 'Profile', icon: UserCircle2, path: '/student/profile' },
  ],
};

const Sidebar = () => {
  const { user, logout } = useAuthStore();
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const location = useLocation();
  const navigate = useNavigate();

  const role = user?.role ?? 'student';
  const userPermissions = user?.permissions || [];
  
  const items = navItems[role].filter(item => {
    if (!item.permission) return true;
    return userPermissions.includes(item.permission);
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };


  const roleLabels: Record<Role, string> = {
    admin: 'Super Admin',
    teacher: 'Teacher',
    student: 'Student / Parent',
  };

  return (
    <aside
      className="fixed left-0 top-0 h-screen bg-gray-900 text-white z-50 flex flex-col transition-all duration-300 shadow-2xl"
      style={{ width: sidebarOpen ? '260px' : '72px' }}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-gray-800">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0">
            <School className="w-5 h-5 text-white" />
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white leading-tight truncate">SchoolSaaS</p>
              <p className="text-xs text-gray-400 leading-tight">Platform</p>
            </div>
          )}
        </div>
        <button
          onClick={toggleSidebar}
          className="w-7 h-7 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors flex-shrink-0"
        >
          {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>

      {/* Role Badge */}
      {sidebarOpen && (
        <div className="px-4 py-6">
          <div className="bg-[#8B5CF6] px-5 py-2 rounded-full inline-flex items-center justify-center shadow-[0_4px_12px_rgba(139,92,246,0.3)] border border-white/10">
             <span className="text-xs font-black text-white uppercase tracking-tighter">
                {roleLabels[role]}
             </span>
          </div>
        </div>
      )}

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-2 overflow-y-auto">
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all duration-200 group relative ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
              title={!sidebarOpen ? item.label : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="text-sm font-medium truncate">{item.label}</span>}
              {!sidebarOpen && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>


      {/* User */}
      <div className="border-t border-gray-800 p-3 pt-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-gray-400 hover:bg-red-900/10 hover:text-red-400 transition-all group"
          title={!sidebarOpen ? 'Logout' : undefined}
        >
          <LogOut className="w-4 h-4 flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
          {sidebarOpen && <span className="text-xs font-black uppercase tracking-widest italic">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
