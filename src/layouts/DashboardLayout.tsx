import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import { useUIStore } from '../store/uiStore';

const DashboardLayout = () => {
  const { sidebarOpen } = useUIStore();

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 font-sans overflow-hidden">
      <Sidebar />
      <div
        className="flex flex-col flex-1 overflow-hidden transition-all duration-300"
        style={{ marginLeft: sidebarOpen ? '260px' : '72px' }}
      >
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
