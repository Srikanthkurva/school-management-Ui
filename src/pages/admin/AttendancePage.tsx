import { useState, useEffect } from 'react';
import { 
  ClipboardList, Users, GraduationCap, XCircle, Clock, Download
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import Card from '../../components/ui/Card';
import StatCard from '../../components/ui/StatCard';
import { adminService } from '../../services';
import type { Analytics } from '../../types';
import toast from 'react-hot-toast';

const AttendancePage = () => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await adminService.getAnalytics();
        setAnalytics(res.data.data);
      } catch (error) {
        toast.error('Failed to load global attendance data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchAttendance();
  }, []);

  if (isLoading || !analytics) {
    return (
      <div className="p-8 space-y-8 animate-pulse">
        <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded-2xl w-1/4"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => <div key={i} className="h-32 bg-slate-100 dark:bg-slate-800 rounded-3xl"></div>)}
        </div>
        <div className="h-[500px] bg-slate-100 dark:bg-slate-800 rounded-[2.5rem]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* HEADER */}
      <div className="bg-white dark:bg-slate-900 px-8 py-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-brand-crimson/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
               <div className="inline-flex items-center gap-2 bg-brand-crimson px-4 py-1.5 rounded-full shadow-lg shadow-brand-crimson/20">
                  <ClipboardList className="w-3.5 h-3.5 text-white" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest italic">Global Surveillance</span>
               </div>
               <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
                  Attendance <span className="text-brand-crimson">Intelligence</span>
               </h1>
               <p className="text-slate-500 text-sm font-medium">Monitoring ecosystem-wide presence patterns and participation metrics.</p>
            </div>
            
            <button className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-crimson transition-all shadow-xl shadow-slate-900/10">
               <Download className="w-4 h-4" /> Export Report
            </button>
         </div>
      </div>

      {/* CORE STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <StatCard
           title="Global Presence"
           value={`${analytics.attendanceRate}%`}
           icon={<Users className="w-5 h-5" />}
           change="+1.2%"
           changeType="up"
           gradient="bg-gradient-to-br from-indigo-600 to-indigo-800"
           iconBg="bg-white/10"
         />
         <StatCard
           title="Teacher Presence"
           value="96.8%"
           icon={<GraduationCap className="w-5 h-5" />}
           change="Stable"
           changeType="up"
           gradient="bg-gradient-to-br from-emerald-600 to-emerald-800"
           iconBg="bg-white/10"
         />
         <StatCard
           title="Daily Absentees"
           value="42"
           icon={<XCircle className="w-5 h-5" />}
           change="-12%"
           changeType="up"
           gradient="bg-gradient-to-br from-rose-600 to-rose-800"
           iconBg="bg-white/10"
         />
         <StatCard
           title="Late Arrivals"
           value="18"
           icon={<Clock className="w-5 h-5" />}
           change="+5%"
           changeType="down"
           gradient="bg-gradient-to-br from-amber-600 to-amber-800"
           iconBg="bg-white/10"
         />
      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         <Card title="Attendance Trends" subtitle="30-day ecosystem presence tracking" className="lg:col-span-2">
            <div className="h-[400px] w-full mt-8">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analytics.studentGrowth}>
                     <defs>
                        <linearGradient id="colorPresence" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#8B0000" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#8B0000" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 900 }} />
                     <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 900 }} />
                     <Tooltip contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', textTransform: 'uppercase', fontSize: '10px', fontWeight: 'bold' }} />
                     <Area type="monotone" dataKey="students" stroke="#8B0000" strokeWidth={4} fillOpacity={1} fill="url(#colorPresence)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </Card>

         <Card title="Class Distribution" subtitle="Daily presence breakdown per class">
            <div className="h-[400px] w-full mt-8">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analytics.attendanceByClass} layout="vertical">
                     <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                     <XAxis type="number" hide />
                     <YAxis dataKey="class" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#475569', fontWeight: 900 }} />
                     <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '15px' }} />
                     <Bar dataKey="attendance" fill="#1E293B" radius={[0, 10, 10, 0]} barSize={20} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </Card>

      </div>

      <Card title="Recent Anomalies" subtitle="Auto-detected attendance issues requiring attention">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {[
               { icon: <XCircle className="text-rose-500" />, label: 'Class 10C', detail: 'Attendance dropped below 60% today', severity: 'Critical' },
               { icon: <Clock className="text-amber-500" />, label: 'Primary Block', detail: 'High volume of late arrivals recorded', severity: 'Warning' },
               { icon: <Users className="text-indigo-500" />, label: 'Faculty', detail: '5 Teachers on unscheduled leave', severity: 'Review' }
            ].map((item, i) => (
               <div key={i} className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 flex items-start gap-4">
                  <div className="p-3 bg-white rounded-2xl shadow-sm italic">{item.icon}</div>
                  <div>
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.severity}</p>
                     <p className="text-sm font-black text-slate-900 uppercase italic tracking-tighter">{item.label}</p>
                     <p className="text-xs text-slate-500 font-medium mt-1">{item.detail}</p>
                  </div>
               </div>
            ))}
         </div>
      </Card>

    </div>
  );
};

export default AttendancePage;
