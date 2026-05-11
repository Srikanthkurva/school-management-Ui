import { useState, useEffect } from 'react';
import { 
  Activity, Search, 
  Terminal, User, Globe, 
  Clock, RefreshCw, Download
} from 'lucide-react';
import Card from '../../components/ui/Card';
import { adminService } from '../../services';
import type { ActivityLog } from '../../types';
import toast from 'react-hot-toast';

const ActivityLogsPage = () => {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchLogs = async (showRefresh = false) => {
    if (showRefresh) setIsRefreshing(true);
    try {
      const res = await adminService.getActivityLogs(50);
      setLogs(res.data.data);
    } catch (error) {
      toast.error('Failed to stream live logs');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    // Real-time Simulation: Poll every 10 seconds
    const interval = setInterval(() => fetchLogs(), 10000);
    return () => clearInterval(interval);
  }, []);

  const filteredLogs = logs.filter(log => 
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* HEADER SECTION */}
      <div className="bg-white dark:bg-slate-900 px-8 py-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
               <div className="inline-flex items-center gap-2 bg-indigo-600 px-4 py-1.5 rounded-full shadow-lg shadow-indigo-600/20">
                  <Activity className="w-3.5 h-3.5 text-white animate-pulse" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest italic">Live Audit Stream</span>
               </div>
               <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
                  Ecosystem <span className="text-indigo-600">Audit Logs</span>
               </h1>
               <p className="text-slate-500 text-sm font-medium">Monitoring all operational vectors across the St. Martins Group of Schools platform in real-time.</p>
            </div>
            
            <div className="flex gap-3">
               <button 
                 onClick={() => fetchLogs(true)}
                 className={`p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 transition-all ${isRefreshing ? 'animate-spin' : 'hover:rotate-180'}`}
               >
                  <RefreshCw className="w-5 h-5 text-slate-600 dark:text-slate-400" />
               </button>
               <button className="flex items-center gap-3 px-6 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-900/10">
                  <Download className="w-4 h-4" /> Export Audit
               </button>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         
         {/* LEFT FILTERS */}
         <div className="lg:col-span-1 space-y-6">
            <Card title="Stream Filters" subtitle="Narrow down audit vectors">
               <div className="space-y-6 mt-6">
                  <div className="space-y-2">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Search</p>
                     <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                           type="text"
                           placeholder="Action or User..."
                           className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500"
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                        />
                     </div>
                  </div>
                  
                  <div className="space-y-3">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Log Severity</p>
                     {['All Vectors', 'Critical (4)', 'Updates (12)', 'Creation (8)'].map((cat, i) => (
                        <button key={i} className={`w-full flex justify-between items-center px-4 py-3 rounded-2xl text-xs font-bold transition-all ${i === 0 ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>
                           <span>{cat.split(' (')[0]}</span>
                           {cat.includes('(') && <span className="bg-black/20 px-2 py-0.5 rounded-lg text-[10px]">{cat.split('(')[1].replace(')', '')}</span>}
                        </button>
                     ))}
                  </div>
               </div>
            </Card>

            <Card title="System Health" subtitle="Real-time terminal status">
               <div className="bg-slate-900 p-6 rounded-[2rem] space-y-4 font-mono">
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                     <span className="text-[10px] text-emerald-500 font-bold uppercase">Socket Stable</span>
                  </div>
                  <div className="space-y-2">
                     <p className="text-[10px] text-slate-500 underline">LAST PAYLOAD</p>
                     <p className="text-[9px] text-indigo-400 break-all leading-relaxed">
                        0xCAFE: SYSLOG_P_OK_200
                        <br />
                        ACK: 2.3ms
                        <br />
                        NODES: Cluster-Alpha-Primary
                     </p>
                  </div>
               </div>
            </Card>
         </div>

         {/* LIVE LOGS FEED */}
         <div className="lg:col-span-3">
            <Card noPadding>
               <div className="overflow-hidden bg-white dark:bg-slate-900 rounded-[2.5rem]">
                  <div className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-slate-50/50">
                     <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-3">
                        <Terminal className="w-4 h-4 text-indigo-600" />
                        Audit Stream Feed
                     </h3>
                     <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase italic">Live Sync Active</span>
                  </div>
                  
                  <div className="divide-y divide-slate-50 dark:divide-slate-800">
                     {isLoading ? (
                        [...Array(6)].map((_, i) => (
                           <div key={i} className="px-8 py-8 animate-pulse flex items-center gap-6">
                              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl"></div>
                              <div className="space-y-2 flex-1">
                                 <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-lg w-1/3"></div>
                                 <div className="h-3 bg-slate-50 dark:bg-slate-900 rounded-lg w-1/4"></div>
                              </div>
                           </div>
                        ))
                     ) : filteredLogs.length > 0 ? (
                        filteredLogs.map((log) => (
                           <div key={log.id} className="group px-8 py-10 hover:bg-slate-50 transition-all relative overflow-hidden">
                              <div className="absolute left-0 top-0 w-1 h-full bg-indigo-600 scale-y-0 group-hover:scale-y-100 transition-transform duration-500"></div>
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                 <div className="flex items-start gap-6">
                                    <div className={`mt-1 w-14 h-14 rounded-[1.25rem] flex items-center justify-center shadow-sm 
                                       ${log.type === 'create' ? 'bg-emerald-100 text-emerald-600' : 
                                         log.type === 'update' ? 'bg-amber-100 text-amber-600' : 
                                         log.type === 'submit' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'}`}>
                                       {log.type === 'create' ? <RefreshCw className="w-6 h-6" /> : <Terminal className="w-6 h-6" />}
                                    </div>
                                    <div className="space-y-1.5">
                                       <div className="flex items-center gap-3">
                                          <h4 className="text-lg font-black text-slate-800 dark:text-white leading-none uppercase tracking-tighter italic">{log.action}</h4>
                                          <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${log.type === 'create' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                                             {log.type}
                                          </span>
                                       </div>
                                       <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                                          <div className="flex items-center gap-1.5 text-indigo-600">
                                             <User className="w-3.5 h-3.5" /> {log.userName}
                                          </div>
                                          <div className="flex items-center gap-1.5">
                                             <Globe className="w-3.5 h-3.5" /> Ecosystem-A
                                          </div>
                                          <div className="flex items-center gap-1.5 bg-slate-100 px-2 py-0.5 rounded-lg text-slate-500">
                                             <Clock className="w-3.5 h-3.5" /> {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="flex md:flex-col items-center md:items-end gap-4 md:gap-2">
                                    <p className="text-[10px] font-black text-slate-300 uppercase italic tracking-widest">{new Date(log.timestamp).toLocaleDateString()}</p>
                                    <button className="px-5 py-2.5 bg-white border border-slate-100 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-sm">Details</button>
                                 </div>
                              </div>
                           </div>
                        ))
                     ) : (
                        <div className="px-8 py-20 text-center">
                           <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                              <Activity className="w-10 h-10 text-slate-200" />
                           </div>
                           <h3 className="text-xl font-black text-slate-400 uppercase tracking-tighter italic">No logs detected in current time window</h3>
                        </div>
                     )}
                  </div>
                  
                  <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-50 dark:border-slate-800 text-center">
                     <button className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] hover:text-indigo-600 transition-all">Load historical archives</button>
                  </div>
               </div>
            </Card>
         </div>

      </div>

    </div>
  );
};

export default ActivityLogsPage;
