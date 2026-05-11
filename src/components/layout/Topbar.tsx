import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Search, Sun, Moon, Menu } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useUIStore } from '../../store/uiStore';

const Topbar = () => {
  const { user } = useAuthStore();
  const { darkMode, toggleDarkMode, toggleSidebar } = useUIStore();
  const [searchQuery, setSearchQuery] = useState('');

  const role = user?.role ?? 'student';
  const roleGradients: Record<string, string> = {
    admin: 'from-purple-600 to-indigo-600',
    teacher: 'from-blue-600 to-cyan-600',
    student: 'from-emerald-600 to-teal-600',
  };

  return (
    <header className="h-12 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 sticky top-0 z-40 shadow-sm">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors md:hidden"
        >
          <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
        {/* Search */}
        <div className="relative hidden sm:flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search students, teachers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm border-0 outline-none focus:ring-2 focus:ring-indigo-500 w-72 transition-all"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          {darkMode ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-gray-600" />}
        </button>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          <Bell className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User avatar */}
        <Link
          to={`/${role}/profile`}
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
        >
          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${roleGradients[role]} flex items-center justify-center text-white text-sm font-bold shadow-md`}>
            {user?.name.charAt(0).toUpperCase()}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-gray-800 dark:text-white leading-tight">{user?.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role}</p>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Topbar;
