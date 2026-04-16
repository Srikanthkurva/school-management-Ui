import { useState, useEffect } from 'react';
import { 
  Book, Plus, FileText, Clock, GraduationCap, ArrowUpRight, Bookmark
} from 'lucide-react';
import { assignmentService } from '../../services';
import { useAuthStore } from '../../store/authStore';
import type { Assignment } from '../../types';
import toast from 'react-hot-toast';

const AssignmentsPage = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm] = useState('');

  const fetchAssignments = async () => {
    setIsLoading(true);
    try {
      const res = await assignmentService.getAll();
      setAssignments(res.data.data);
    } catch (error) {
      toast.error('Failed to stream assignment data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const filtered = assignments.filter(a => 
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.teacherName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* HEADER */}
      <div className="bg-slate-900 px-8 py-10 rounded-[3rem] shadow-2xl relative overflow-hidden group border border-white/5">
         <div className="absolute top-0 right-0 w-96 h-96 bg-brand-crimson/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
         <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="space-y-3">
               <div className="inline-flex items-center gap-2 bg-brand-crimson px-4 py-1.5 rounded-full shadow-lg shadow-brand-crimson/20">
                  <Bookmark className="w-3.5 h-3.5 text-white" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest italic">Educational Repository</span>
               </div>
               <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
                  Curriculum <span className="text-brand-crimson">Intelligence</span>
               </h1>
               <p className="text-slate-400 font-medium max-w-xl">
                  Central control of academic assignments, laboratory tasks, and research projects across all faculties.
               </p>
            </div>
            
                  {(() => {
                     const { user } = useAuthStore.getState();
                     const canManage = user?.permissions?.includes('manage_assignments');
                     return canManage ? (
                        <button className="flex items-center gap-4 px-10 py-5 bg-white text-slate-900 rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] hover:bg-brand-crimson hover:text-white transition-all shadow-2xl">
                           <Plus className="w-5 h-5" /> Deploy Unified Task
                        </button>
                     ) : null;
                  })()}
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {isLoading ? (
            [...Array(6)].map((_, i) => (
               <div key={i} className="h-64 bg-slate-100 dark:bg-slate-800 rounded-[2.5rem] animate-pulse"></div>
            ))
         ) : filtered.length > 0 ? (
            filtered.map((item) => (
               <div key={item.id} className="group bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:border-brand-crimson hover:shadow-2xl transition-all relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-brand-crimson opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="flex justify-between items-start mb-6">
                     <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                        <FileText className="w-6 h-6 text-brand-crimson" />
                     </div>
                     <div className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-500 italic">
                        {item.class}
                     </div>
                  </div>

                  <div className="space-y-2">
                     <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic leading-tight group-hover:text-brand-crimson transition-colors">
                        {item.title}
                     </h3>
                     <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{item.subject}</p>
                  </div>

                  <div className="mt-8 pt-8 border-t border-slate-50 dark:border-slate-800 flex flex-col gap-4">
                     <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                        <div className="flex items-center gap-2 text-slate-400">
                           <GraduationCap className="w-3.5 h-3.5" />
                           {item.teacherName}
                        </div>
                        <div className="flex items-center gap-2 text-brand-crimson italic">
                           <Clock className="w-3.5 h-3.5" />
                           {new Date(item.dueDate).toLocaleDateString()}
                        </div>
                     </div>
                     
                     <div className="space-y-2">
                        <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-slate-400">
                           <span>Submission Velocity</span>
                           <span>{Math.round((item.submissionCount / item.totalStudents) * 100)}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden">
                           <div 
                              className="h-full bg-indigo-600 rounded-full group-hover:bg-brand-crimson transition-all" 
                              style={{ width: `${(item.submissionCount / item.totalStudents) * 100}%` }}
                           ></div>
                        </div>
                     </div>
                  </div>
                  
                  <div className="mt-8 flex gap-2">
                     <button className="flex-1 py-3.5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">Audit Entries</button>
                     <button className="px-4 py-3.5 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-xl hover:text-brand-crimson transition-all"><ArrowUpRight className="w-4 h-4" /></button>
                  </div>
               </div>
            ))
         ) : (
            <div className="col-span-full py-20 text-center">
               <Book className="w-12 h-12 text-slate-200 mx-auto mb-4" />
               <p className="text-xl font-black text-slate-400 uppercase italic tracking-tighter">No intelligence projects found...</p>
            </div>
         )}
      </div>

    </div>
  );
};

export default AssignmentsPage;
