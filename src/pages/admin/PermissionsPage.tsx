import { useState, useEffect } from 'react';
import { 
  Shield, ShieldCheck, Lock, Unlock, 
  Users, GraduationCap, Save,
  AlertTriangle, Search,
  Zap, RefreshCw
} from 'lucide-react';
import Card from '../../components/ui/Card';
import { adminService } from '../../services';
import type { Permission } from '../../types';
import toast from 'react-hot-toast';

const PermissionsPage = () => {
  const [permissions, setPermissions] = useState<Permission | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>('admin');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [searchPerm, setSearchPerm] = useState('');

  // Define potential permissions for the school ecosystem
  const ALL_POSSIBLE_PERMS = [
    'view_analytics', 'manage_schools', 'manage_branches', 'manage_settings',
    'view_teachers', 'create_teacher', 'edit_teacher', 'delete_teacher',
    'view_students', 'create_student', 'edit_student', 'delete_student',
    'view_attendance', 'manage_attendance', 'mark_attendance',
    'view_assignments', 'manage_assignments', 'submit_assignments',
    'view_results', 'manage_results', 'publish_results',
    'manage_fees', 'view_fees', 'process_payments',
    'view_activity_logs', 'manage_permissions', 'send_notifications'
  ];

  useEffect(() => {
    const fetchPerms = async () => {
      try {
        const res = await adminService.getPermissions();
        setPermissions(res.data.data);
      } catch (error) {
        toast.error('Failed to load RBAC protocol');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPerms();
  }, []);

  const togglePermission = (perm: string) => {
    if (!permissions) return;
    const currentRolePerms = [...permissions[selectedRole]];
    if (currentRolePerms.includes(perm)) {
      setPermissions({
        ...permissions,
        [selectedRole]: currentRolePerms.filter(p => p !== perm)
      });
    } else {
      setPermissions({
        ...permissions,
        [selectedRole]: [...currentRolePerms, perm]
      });
    }
  };

  const handleSave = async () => {
    if (!permissions) return;
    setIsSaving(true);
    try {
      await adminService.updatePermissions(selectedRole, permissions[selectedRole]);
      toast.success(`Access matrix updated for ${selectedRole.toUpperCase()}`);
    } catch (error) {
      toast.error('Critical protocol update failure');
    } finally {
      setIsSaving(false);
    }
  };

  const filteredPerms = ALL_POSSIBLE_PERMS.filter(p => 
    p.toLowerCase().includes(searchPerm.toLowerCase())
  );

  if (isLoading || !permissions) {
    return (
      <div className="p-8 space-y-8 animate-pulse">
        <div className="h-20 bg-slate-100 rounded-[2rem] w-full"></div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           <div className="h-[500px] bg-slate-100 rounded-[2rem]"></div>
           <div className="lg:col-span-3 h-[500px] bg-slate-100 rounded-[2rem]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* SECURITY HEADER */}
      <div className="bg-[#1E293B] px-8 py-10 rounded-[3rem] shadow-2xl relative overflow-hidden group border border-white/5">
         <div className="absolute top-0 right-0 w-96 h-96 bg-brand-crimson/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-3">
               <div className="inline-flex items-center gap-2 bg-brand-crimson px-4 py-1.5 rounded-full shadow-lg shadow-brand-crimson/20">
                  <ShieldCheck className="w-3.5 h-3.5 text-white animate-bounce" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest italic">RBAC Protocol Engine</span>
               </div>
               <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none">
                  Core <span className="text-brand-crimson">Governance</span> Security
               </h1>
               <p className="text-slate-400 text-sm font-medium">Manage cross-role authorization matrices and operational access vectors.</p>
            </div>
            
            <div className="flex gap-4">
               <div className="bg-slate-800/50 p-4 rounded-3xl border border-white/5 flex items-center gap-4">
                  <RefreshCw className="w-5 h-5 text-indigo-400" />
                  <div>
                     <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">Status</p>
                     <p className="text-xs font-black text-white italic tracking-tighter mt-1">S3-ENCRYPTED</p>
                  </div>
               </div>
               <button 
                 onClick={handleSave}
                 disabled={isSaving}
                 className="flex items-center gap-3 px-10 py-5 bg-brand-crimson text-white rounded-[2rem] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-brand-crimson hover:shadow-2xl transition-all shadow-xl shadow-brand-crimson/20 italic"
               >
                  {isSaving ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  Deploy Policy
               </button>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         
         {/* ROLE SELECTOR */}
         <div className="lg:col-span-1 space-y-6">
            <Card title="Operational Roles" subtitle="Select role to modify access">
               <div className="space-y-3 mt-6">
                  {[
                     { id: 'admin', label: 'Super Admin', icon: <Shield className="w-4 h-4" /> },
                     { id: 'teacher', label: 'Faculty Block', icon: <GraduationCap className="w-4 h-4" /> },
                     { id: 'student', label: 'Student Union', icon: <Users className="w-4 h-4" /> }
                  ].map((role) => (
                     <button
                        key={role.id}
                        onClick={() => setSelectedRole(role.id)}
                        className={`w-full flex items-center gap-4 px-6 py-5 rounded-[2rem] transition-all duration-500 group relative overflow-hidden ${
                           selectedRole === role.id 
                           ? 'bg-[#1E293B] text-white shadow-2xl' 
                           : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                        }`}
                     >
                        <div className={`p-3 rounded-2xl ${selectedRole === role.id ? 'bg-brand-crimson' : 'bg-white shadow-sm'}`}>
                           {role.icon}
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest italic">{role.label}</span>
                        {selectedRole === role.id && <Zap className="absolute right-6 w-3 h-3 text-brand-crimson animate-pulse" />}
                     </button>
                  ))}
               </div>
            </Card>

            <div className="bg-amber-50 border border-amber-100 p-8 rounded-[2.5rem] space-y-4">
               <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <p className="text-[10px] font-black text-amber-700 uppercase tracking-widest">Protocol Warning</p>
               </div>
               <p className="text-[11px] font-medium text-amber-600 leading-relaxed italic">
                  Updating RBAC policies will immediately affect all active sessions for the <span className="font-black uppercase">{selectedRole}</span> ecosystem.
               </p>
            </div>
         </div>

         {/* PERMISSION GRID */}
         <div className="lg:col-span-3">
            <Card title="Access Vector Matrix" subtitle={`Configuring protocols for GLOBAL_${selectedRole.toUpperCase()}`}>
               <div className="mt-8 space-y-8">
                  <div className="relative">
                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                     <input 
                        type="text"
                        placeholder="Filter access vectors..."
                        className="w-full pl-12 pr-6 py-5 bg-slate-50 border-none rounded-[2rem] text-sm font-medium focus:ring-4 focus:ring-indigo-500/10 placeholder:text-slate-300 italic"
                        value={searchPerm}
                        onChange={(e) => setSearchPerm(e.target.value)}
                     />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {filteredPerms.map((perm) => {
                        const isGranted = permissions[selectedRole].includes(perm);
                        return (
                           <div 
                              key={perm}
                              onClick={() => togglePermission(perm)}
                              className={`group cursor-pointer p-6 rounded-[2rem] border transition-all duration-300 flex items-center justify-between ${
                                 isGranted 
                                 ? 'bg-white border-brand-crimson shadow-xl shadow-brand-crimson/5' 
                                 : 'bg-slate-50/50 border-slate-100 opacity-60 hover:opacity-100 grayscale hover:grayscale-0'
                              }`}
                           >
                              <div className="flex items-center gap-4">
                                 <div className={`w-10 h-10 rounded-[1.25rem] flex items-center justify-center transition-all ${isGranted ? 'bg-brand-crimson text-white rotate-12' : 'bg-slate-200 text-slate-400 group-hover:rotate-12'}`}>
                                    {isGranted ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                                 </div>
                                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-800">
                                    {perm.replace(/_/g, ' ')}
                                 </span>
                              </div>
                              <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${isGranted ? 'bg-brand-crimson' : 'bg-slate-100 border border-slate-200'}`}>
                                 {isGranted && <ShieldCheck className="w-3.5 h-3.5 text-white" />}
                              </div>
                           </div>
                        );
                     })}
                  </div>
               </div>
            </Card>
         </div>

      </div>

    </div>
  );
};

export default PermissionsPage;
