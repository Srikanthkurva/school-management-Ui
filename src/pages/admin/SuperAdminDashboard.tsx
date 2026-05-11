import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, GraduationCap, TrendingUp, 
  Shield, Activity, Database, Server, Settings, Globe
} from 'lucide-react';
import { 
  CartesianGrid, XAxis, YAxis, 
  Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import StatCard from '../../components/ui/StatCard';
import Card from '../../components/ui/Card';
import { adminService } from '../../services';
import type { Analytics, ActivityLog } from '../../types';
import toast from 'react-hot-toast';

import { useAuthStore } from '../../store/authStore';

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [data, setData] = useState<Analytics | null>(null);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [analyticsRes, logsRes] = await Promise.all([
          adminService.getAnalytics(),
          adminService.getActivityLogs(10)
        ]);
        console.log('SuperAdmin Dashboard Analytics:', analyticsRes.data);
        if (analyticsRes.data.success) {
          setData(analyticsRes.data.data);
          setLogs(logsRes.data.data);
        }
      } catch (error: any) {
        console.error('SuperAdmin Dashboard Error:', error.response?.data || error.message);
        toast.error('Failed to load SuperAdmin Board');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading || !data) {
    return (
      <div className="p-8 space-y-8 animate-pulse">
        <div className="h-20 bg-slate-100 dark:bg-slate-800 rounded-3xl w-1/3"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => <div key={i} className="h-32 bg-slate-100 dark:bg-slate-800 rounded-3xl"></div>)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 h-[500px] bg-slate-100 dark:bg-slate-800 rounded-[2.5rem]"></div>
           <div className="h-[500px] bg-slate-100 dark:bg-slate-800 rounded-[2.5rem]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6 bg-[#F8FAFC] dark:bg-slate-950 min-h-screen animate-in fade-in duration-700">
      
      {/* SUPER HEADER */}
      <div className="bg-white dark:bg-slate-900 px-8 py-6 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-crimson/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-navy/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div className="space-y-3">
             <div className="inline-flex items-center gap-2 bg-brand-crimson px-4 py-1.5 rounded-full shadow-lg shadow-brand-crimson/20">
                <Shield className="w-3.5 h-3.5 text-white" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest italic">SuperAdmin Access Granted</span>
             </div>
             <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic leading-none">
                Governance <span className="text-brand-crimson">Control Center</span>
             </h1>
             <p className="text-slate-500 font-medium max-w-xl">
                Comprehensive monitoring and management of St. Martins Group of Schools Educational Ecosystem. Centralized tracking for teachers, students, and operational metrics.
             </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
             <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-3xl border border-slate-100 dark:border-slate-700 flex items-center gap-4">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-sm">
                   <Server className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">System Status</p>
                   <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tighter">Operational 100%</p>
                </div>
             </div>
             <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-3xl border border-slate-100 dark:border-slate-700 flex items-center gap-4">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-sm">
                   <Activity className="w-5 h-5 text-brand-crimson" />
                </div>
                <div>
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Global Load</p>
                   <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tighter">2.4k RPS</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* CORE STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Campus Population"
          value={data.totalStudents.toLocaleString()}
          icon={<Users className="w-5 h-5" />}
          change="+12.4%"
          changeType="up"
          gradient="bg-gradient-to-br from-[#1E293B] to-[#0F172A]"
          iconBg="bg-white/10"
        />
        <StatCard
          title="Staff Intelligence"
          value={data.totalTeachers}
          icon={<GraduationCap className="w-5 h-5" />}
          change="Optimum"
          changeType="up"
          gradient="bg-gradient-to-br from-brand-crimson to-[#991b1b]"
          iconBg="bg-white/10"
        />
        <StatCard
          title="Ecosystem Revenue"
          value={`$${(data.monthlyRevenue / 1000).toFixed(1)}k`}
          icon={<TrendingUp className="w-5 h-5" />}
          change="+8.2%"
          changeType="up"
          gradient="bg-gradient-to-br from-[#065f46] to-[#064e3b]"
          iconBg="bg-white/10"
        />
        <StatCard
          title="Engagement Rate"
          value={`${data.attendanceRate}%`}
          icon={<Activity className="w-5 h-5" />}
          change="-0.4%"
          changeType="down"
          gradient="bg-gradient-to-br from-[#3730a3] to-[#312e81]"
          iconBg="bg-white/10"
        />
      </div>

      {/* MAIN INTELLIGENCE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* GROWTH & ANALYTICS */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="System-wide Growth Insights" subtitle="Predictive enrollment and staff scaling metrics">
             <div className="h-[400px] w-full mt-8">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.studentGrowth}>
                    <defs>
                      <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B0000" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#8B0000" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 900 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 900 }} />
                    <Tooltip contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', textTransform: 'uppercase', fontSize: '10px', fontWeight: 'bold' }} />
                    <Area type="monotone" dataKey="students" stroke="#8B0000" strokeWidth={4} fillOpacity={1} fill="url(#colorStudents)" />
                    <Area type="monotone" dataKey="teachers" stroke="#1E293B" strokeWidth={4} fillOpacity={0} />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
             
             <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-50">
                <div className="text-center">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Annual Retention</p>
                   <p className="text-xl font-black text-slate-900 italic">98.2%</p>
                </div>
                <div className="text-center border-x border-slate-50 px-4">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Growth Factor</p>
                   <p className="text-xl font-black text-brand-crimson italic">x1.4</p>
                </div>
                <div className="text-center">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Efficiency</p>
                   <p className="text-xl font-black text-slate-900 italic">92/100</p>
                </div>
             </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <Card title="Quick Management" subtitle="System-wide administration">
                <div className="grid grid-cols-2 gap-4 mt-4">
                   {[
                      { icon: <Users />, label: 'Students', color: 'bg-indigo-50 text-indigo-600', path: '/admin/students', permission: 'view_students' },
                      { icon: <GraduationCap />, label: 'Teachers', color: 'bg-rose-50 text-rose-600', path: '/admin/teachers', permission: 'view_teachers' },
                      { icon: <Database />, label: 'Backups', color: 'bg-emerald-50 text-emerald-600', path: '/admin/logs', permission: 'view_activity_logs' },
                      { icon: <Settings />, label: 'Global', color: 'bg-slate-50 text-slate-600', path: '/admin/permissions', permission: 'manage_permissions' }
                   ].filter(item => !item.permission || (user?.permissions || []).includes(item.permission))
                    .map((item, i) => (
                      <button 
                        key={i} 
                        onClick={() => navigate(item.path)}
                        className="group p-6 rounded-[2rem] bg-white border border-slate-100 hover:border-brand-crimson hover:shadow-2xl transition-all text-center space-y-3"
                      >
                         <div className={`w-12 h-12 ${item.color} rounded-2xl mx-auto flex items-center justify-center transition-transform group-hover:scale-110`}>
                            {item.icon}
                         </div>
                         <p className="text-[10px] font-black uppercase tracking-widest text-slate-700">{item.label}</p>
                      </button>
                   ))}
                </div>
             </Card>
             <Card title="Database Health" subtitle="Live server cluster monitoring">
                <div className="space-y-6 mt-6">
                   {[
                      { node: 'Cluster-Alpha (Main)', load: 45, status: 'Healthy' },
                      { node: 'Cluster-Beta (Reporting)', load: 78, status: 'Scaling' },
                      { node: 'Storage-Node-01', load: 12, status: 'Idle' }
                   ].map((node, i) => (
                      <div key={i} className="space-y-2">
                         <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
                            <span className="text-slate-900">{node.node}</span>
                            <span className={node.status === 'Healthy' ? 'text-emerald-500' : 'text-amber-500'}>{node.status}</span>
                         </div>
                         <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-slate-900 rounded-full" style={{ width: `${node.load}%` }}></div>
                         </div>
                      </div>
                   ))}
                </div>
             </Card>
          </div>
        </div>

        {/* ECOSYSTEM LOGS & LIVE FEED */}
        <div className="space-y-6">
          <Card title="Real-time Activity" subtitle="Global system interaction feed">
             <div className="space-y-6 mt-6">
                {logs.map((log, i) => (
                   <div key={i} className="relative pl-6 pb-6 last:pb-0 group">
                      <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-brand-crimson ring-4 ring-brand-crimson/10 z-10 group-last:ring-0"></div>
                      <div className="absolute left-[3px] top-4 bottom-0 w-[2px] bg-slate-50 group-last:hidden"></div>
                      
                      <div className="p-4 rounded-2xl bg-white border border-slate-50 hover:border-slate-200 hover:shadow-md transition-all">
                         <div className="flex justify-between items-start gap-2">
                            <p className="text-[11px] font-black text-slate-800 uppercase italic tracking-tighter leading-tight">
                               {log.action}
                            </p>
                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                               {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                         </div>
                         <div className="flex items-center gap-2 mt-2">
                            <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center">
                               <Users className="w-2.5 h-2.5 text-slate-400" />
                            </div>
                            <span className="text-[9px] font-black text-brand-crimson uppercase tracking-widest">{log.userName}</span>
                         </div>
                      </div>
                   </div>
                ))}
             </div>
             <button 
                onClick={() => navigate('/admin/logs')}
                className="w-full mt-6 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-brand-crimson transition-all shadow-xl shadow-slate-900/10"
             >
                Access Audit Logs
             </button>
          </Card>

          <Card title="Security Protocols" subtitle="System protection status">
             <div className="p-6 rounded-[2.5rem] bg-emerald-500/5 border border-emerald-500/10 space-y-4">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                      <Shield className="w-6 h-6 text-emerald-500" />
                   </div>
                   <div>
                      <p className="text-xs font-black text-slate-900 uppercase tracking-tighter">Active Firewall</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">All protocols active</p>
                   </div>
                </div>
                <div className="flex items-center gap-2 px-2">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                   <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest italic">Live Threat Monitoring...</span>
                </div>
             </div>
          </Card>
        </div>

      </div>

      {/* FOOTER INFO */}
      <div className="flex justify-between items-center px-4 pt-4 border-t border-slate-100">
         <div className="flex items-center gap-4">
            <Globe className="w-4 h-4 text-slate-400" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">St. Martins Group of Schools Global Network Hub</p>
         </div>
         <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.5em]">Central Command v5.0.01-ALPHA</p>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
