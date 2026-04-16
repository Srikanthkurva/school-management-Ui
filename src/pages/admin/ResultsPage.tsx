import { useState, useEffect } from 'react';
import { 
  BarChart2, Search, TrendingUp, 
  Award, Target, GraduationCap,
  Download, ArrowUpRight
} from 'lucide-react';
import { 
  PieChart, Pie, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ResponsiveContainer, Tooltip
} from 'recharts';
import Card from '../../components/ui/Card';
import StatCard from '../../components/ui/StatCard';
import { adminService } from '../../services';
import type { Analytics } from '../../types';
import toast from 'react-hot-toast';

const COLORS = ['#8B0000', '#1E293B', '#4F46E5', '#10B981', '#F59E0B'];

const ResultsPage = () => {
  const [data, setData] = useState<Analytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await adminService.getAnalytics();
        setData(res.data.data);
      } catch (error) {
        toast.error('Failed to analyze ecosystem results');
      } finally {
        setIsLoading(false);
      }
    };
    fetchResults();
  }, []);

  if (isLoading || !data) {
    return (
      <div className="p-8 space-y-8 animate-pulse">
        <div className="h-10 bg-slate-100 rounded-2xl w-1/3"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[1,2,3].map(i => <div key={i} className="h-48 bg-slate-100 rounded-[2.5rem]"></div>)}
        </div>
        <div className="h-[600px] bg-slate-100 rounded-[3rem]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* HEADER */}
      <div className="bg-white dark:bg-slate-900 px-8 py-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-80 h-80 bg-brand-crimson/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
               <div className="inline-flex items-center gap-2 bg-brand-crimson px-4 py-1.5 rounded-full shadow-lg shadow-brand-crimson/20">
                  <Award className="w-3.5 h-3.5 text-white" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest italic">Academic Performance Metrics</span>
               </div>
               <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
                  Ecosystem <span className="text-brand-crimson">Performance Index</span>
               </h1>
               <p className="text-slate-500 text-sm font-medium">Aggregated examination intelligence and student achievement tracking.</p>
            </div>
            
            <button className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-crimson transition-all shadow-xl shadow-slate-900/10">
               <Download className="w-4 h-4" /> Export Analytics
            </button>
         </div>
      </div>

      {/* TARGET METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <StatCard
           title="Elite Pass Rate"
           value={`${data.passRate}%`}
           icon={<Target className="w-5 h-5 text-white" />}
           change="Above Average"
           changeType="up"
           gradient="bg-[#0F172A]"
           iconBg="bg-white/10"
         />
         <StatCard
           title="Distinction Holders"
           value="142"
           icon={<Award className="w-5 h-5 text-white" />}
           change="+24% vs LY"
           changeType="up"
           gradient="bg-brand-crimson"
           iconBg="bg-white/10"
         />
         <StatCard
           title="Avg. Performance"
           value="A-"
           icon={<TrendingUp className="w-5 h-5 text-white" />}
           change="Exceptional"
           changeType="up"
           gradient="bg-[#065F46]"
           iconBg="bg-white/10"
         />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* GRADE DISTRIBUTION */}
         <Card title="Grade Distribution" subtitle="System-wide student performance spread" className="lg:col-span-1">
            <div className="h-[400px] w-full mt-4">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie
                        data={data.gradeDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="count"
                        nameKey="grade"
                        stroke="none"
                     >
                        {data.gradeDistribution.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                     </Pie>
                     <Tooltip />
                  </PieChart>
               </ResponsiveContainer>
            </div>
            <div className="space-y-4 mt-4">
               {data.gradeDistribution.map((grade, i) => (
                  <div key={i} className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                     <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                        <span className="text-slate-900">{grade.grade} Division</span>
                     </div>
                     <span className="text-slate-500 italic">{grade.percentage}%</span>
                  </div>
               ))}
            </div>
         </Card>

         {/* SUBJECT PROFICIENCY */}
         <Card title="Subject Proficiency Matrix" subtitle="Competency tracking across major departments" className="lg:col-span-2">
            <div className="h-[500px] w-full mt-4">
               <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                     { subject: 'Mathematics', score: 92, fullMark: 100 },
                     { subject: 'Physics', score: 85, fullMark: 100 },
                     { subject: 'Chemistry', score: 88, fullMark: 100 },
                     { subject: 'Biology', score: 78, fullMark: 100 },
                     { subject: 'English', score: 95, fullMark: 100 },
                     { subject: 'Social', score: 82, fullMark: 100 }
                  ]}>
                     <PolarGrid stroke="#e2e8f0" />
                     <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fontStyle: 'italic', fontWeight: 900, fill: '#64748b' }} />
                     <PolarRadiusAxis angle={30} domain={[0, 100]} />
                     <Radar
                        name="Avg Performance"
                        dataKey="score"
                        stroke="#8B0000"
                        fill="#8B0000"
                        fillOpacity={0.1}
                     />
                  </RadarChart>
               </ResponsiveContainer>
            </div>
         </Card>
      </div>

      {/* TOP ACHIEVERS FEED */}
      <Card title="Achievers Audit" subtitle="Real-time monitoring of students exceeding 95th percentile">
         <div className="space-y-4 mt-6">
            {[
               { name: 'Ananya Singh', class: '10A', percentage: 98.2, subject: 'Science Cluster', award: 'Scholar Batch' },
               { name: 'Rahul Verma', class: '12B', percentage: 97.4, subject: 'Math Cluster', award: 'Dean List' },
               { name: 'Priya Iyer', class: '11A', percentage: 96.8, subject: 'English Cluster', award: 'Top Merit' }
            ].map((achiever, i) => (
               <div key={i} className="group p-6 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-indigo-600 transition-all flex items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                     <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-indigo-600 font-black italic border border-slate-50">
                        {achiever.percentage}%
                     </div>
                     <div>
                        <p className="text-sm font-black text-slate-900 uppercase tracking-tighter italic">{achiever.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{achiever.class} • {achiever.subject}</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                      <div className="px-5 py-2 bg-indigo-50 rounded-xl text-[9px] font-black text-indigo-600 uppercase tracking-widest italic">{achiever.award}</div>
                      <button className="p-3 bg-white rounded-xl shadow-sm text-slate-300 hover:text-indigo-600 group-hover:rotate-45 transition-all"><ArrowUpRight className="w-4 h-4" /></button>
                  </div>
               </div>
            ))}
         </div>
      </Card>

    </div>
  );
};

export default ResultsPage;
