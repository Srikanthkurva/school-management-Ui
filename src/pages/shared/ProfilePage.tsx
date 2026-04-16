import { useAuthStore } from '../../store/authStore';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Mail, Phone, Shield } from 'lucide-react';

const ProfilePage = () => {
  const { user } = useAuthStore();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-3xl bg-primary-600 flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-xl dark:border-gray-900">
          {user?.name?.charAt(0)}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user?.name}</h1>
          <p className="text-gray-500 dark:text-gray-400 capitalize">{user?.role} Account • SchoolSaaS Portal</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Card title="Personal Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-xs text-gray-400 font-medium flex items-center gap-1.5"><Mail className="w-3 h-3" /> Email</p>
                <p className="text-sm font-semibold dark:text-white">{user?.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-400 font-medium flex items-center gap-1.5"><Phone className="w-3 h-3" /> Phone</p>
                <p className="text-sm font-semibold dark:text-white">{user?.phone || '+91 9876543210'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-400 font-medium flex items-center gap-1.5"><Shield className="w-3 h-3" /> Role</p>
                <p className="text-sm font-semibold dark:text-white capitalize">{user?.role}</p>
              </div>
            </div>
            <Button className="mt-8" variant="outline">Edit Profile</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
