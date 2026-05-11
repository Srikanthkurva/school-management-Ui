import { useEffect, useState } from 'react';
import { 
  Users, GraduationCap, TrendingUp, 
  Calendar, CheckCircle2, AlertCircle 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import StatCard from '../../components/ui/StatCard';
import Card from '../../components/ui/Card';
import { adminService } from '../../services';
import type { Analytics, ActivityLog } from '../../types';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [data, setData] = useState<Analytics | null>(null);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [analyticsRes, logsRes] = await Promise.all([
          adminService.getAnalytics(),
          adminService.getActivityLogs(5)
        ]);
        setData(analyticsRes.data.data);
        setLogs(logsRes.data.data);
      } catch (error) {
        toast.error('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading || !data) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
          <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Overview</h1>
        <p className="text-gray-500 dark:text-gray-400">Welcome back! Here's what's happening in your school today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={data.totalStudents.toLocaleString()}
          icon={<GraduationCap className="w-5 h-5" />}
          change="+12.5% vs last month"
          changeType="up"
          gradient="bg-gradient-to-br from-primary-600 to-indigo-700"
          iconBg="bg-white/20"
        />
        <StatCard
          title="Total Teachers"
          value={data.totalTeachers}
          icon={<Users className="w-5 h-5" />}
          change="+3 new this week"
          changeType="up"
          gradient="bg-gradient-to-br from-emerald-600 to-teal-700"
          iconBg="bg-white/20"
        />
        <StatCard
          title="Monthly Revenue"
          value={`₹${(data.monthlyRevenue / 100000).toFixed(1)}L`}
          icon={<TrendingUp className="w-5 h-5" />}
          change="+8.2% internal growth"
          changeType="up"
          gradient="bg-gradient-to-br from-amber-500 to-orange-600"
          iconBg="bg-white/20"
        />
        <StatCard
          title="Avg. Attendance"
          value={`${data.attendanceRate}%`}
          icon={<Calendar className="w-5 h-5" />}
          change="-2.1% seasonality"
          changeType="down"
          gradient="bg-gradient-to-br from-purple-600 to-fuchsia-700"
          iconBg="bg-white/20"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Growth Chart */}
        <Card 
          title="Student Growth" 
          subtitle="Monthly enrollment trends"
          className="lg:col-span-2"
        >
          <div className="h-80 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.studentGrowth}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="students" 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorStudents)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card title="Activity Logs" subtitle="Latest system updates">
          <div className="space-y-6 mt-4">
            {logs.map((log) => (
              <div key={log.id} className="flex gap-4">
                <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center 
                  ${log.type === 'create' ? 'bg-emerald-100 text-emerald-600' : 
                    log.type === 'submit' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                  {log.type === 'create' ? <CheckCircle2 className="w-4 h-4" /> : 
                   log.type === 'submit' ? <Calendar className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{log.action}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {log.userName} • {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
            View All Logs
          </button>
        </Card>
      </div>

      {/* Attendance by Class */}
      <Card title="Class-wise Attendance" subtitle="Daily attendance breakdown per class">
        <div className="h-64 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.attendanceByClass}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="class" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
              <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px' }} />
              <Bar dataKey="attendance" fill="#818cf8" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;
