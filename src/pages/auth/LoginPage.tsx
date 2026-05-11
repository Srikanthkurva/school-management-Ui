import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Lock, Eye, EyeOff, Calendar, 
  ShieldCheck, GraduationCap, CheckCircle2, AlertCircle
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

const LoginPage = () => {
   const navigate = useNavigate();
   const login = useAuthStore((state) => state.login);
   const error = useAuthStore((state) => state.error);
   const clearError = useAuthStore((state) => state.clearError);
   
   const [userType, setUserType] = useState<'admin' | 'parent' | 'teacher'>('admin');
   const [isFirstTime, setIsFirstTime] = useState(false);
   const [showPassword, setShowPassword] = useState(false);
   const [loading, setLoading] = useState(false);
   const [localError, setLocalError] = useState<string | null>(null);
   
   const [formData, setFormData] = useState({
      id: '',
      password: '',
      dob: '',
      newPassword: '',
      confirmPassword: '',
      rememberMe: false
   });

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;
      setFormData(prev => ({ 
         ...prev, 
         [name]: type === 'checkbox' ? checked : value 
      }));
      // Clear error when user starts typing
      if (localError || error) {
         setLocalError(null);
         clearError();
      }
   };

   const isParentLogin = userType === 'parent';
   const identifierLabel = userType === 'admin'
      ? 'Admin Email'
      : isParentLogin
        ? 'Email or Admission Number'
        : 'Email or Employee ID';
   const identifierPlaceholder = userType === 'admin'
      ? 'superadmin@gmail.com'
      : isParentLogin
        ? 'parent@email.com or STM-2026-12345'
        : 'teacher@email.com or EMP-1234';

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      // Validation
      if (isFirstTime) {
         if (!formData.id || !formData.dob || !formData.newPassword || !formData.confirmPassword) {
            setLocalError('Please enter all required fields: email/ID, DOB, new password, and confirm password');
            return;
         }
         if (formData.newPassword !== formData.confirmPassword) {
            setLocalError('Passwords do not match');
            return;
         }
      } else {
         if (!formData.id || !formData.password) {
            setLocalError('Please enter both email/ID and password');
            return;
         }
      }

      setLocalError(null);
      clearError();
      setLoading(true);
      
      try {
         let success = false;
         if (isFirstTime) {
            success = await useAuthStore.getState().setupFirstTime({
               userType,
               identifier: formData.id,
               dob: formData.dob,
               newPassword: formData.newPassword
            });
            if (success) {
               toast.success('Account setup successful! You can now login.');
               setIsFirstTime(false);
               setFormData(prev => ({ ...prev, newPassword: '', confirmPassword: '', password: '' }));
            } else {
               const errorMsg = useAuthStore.getState().error || 'Account setup failed. Please check your details.';
               setLocalError(errorMsg);
               toast.error(errorMsg);
            }
         } else {
            success = await login(formData.id, formData.password, userType);
            if (success) {
               toast.success('Login successful! Redirecting...');
               const loggedInUser = useAuthStore.getState().user;
               setTimeout(() => {
                  navigate(loggedInUser ? `/${loggedInUser.role}/dashboard` : '/login', { replace: true });
               }, 500);
            } else {
               const errorMsg = useAuthStore.getState().error || 'Login failed. Please check your credentials.';
               setLocalError(errorMsg);
               toast.error(errorMsg);
            }
         }
      } catch (error) {
         console.error('Login error:', error);
         const errorMsg = error instanceof Error ? error.message : 'An unexpected error occurred';
         setLocalError(errorMsg);
         toast.error(errorMsg);
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="h-screen flex bg-white font-sans selection:bg-brand-crimson/20 overflow-hidden">
         
         {/* LEFT PANEL: Brand & Visuals */}
         <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-brand-navy shrink-0">
            <div className="absolute inset-0">
               <img 
                  src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1920" 
                  className="w-full h-full object-cover scale-105 opacity-40 mix-blend-luminosity" 
                  alt="Education"
               />
               <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy/90 to-brand-crimson/30" />
            </div>

            <div className="relative z-10 w-full p-12 flex flex-col justify-between">
               <div 
                  onClick={() => navigate('/')}
                  className="flex items-center gap-3 cursor-pointer group w-fit"
               >
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-xl rotate-3 group-hover:rotate-0 transition-transform">
                     <GraduationCap className="text-brand-navy w-6 h-6" />
                  </div>
                  <h1 className="text-xl font-black text-white tracking-tighter italic uppercase group-hover:text-brand-crimson transition-colors">St. Martins Group of Schools</h1>
               </div>

               <div className="space-y-4 max-w-md">
                  <h2 className="text-5xl font-black text-white tracking-tighter leading-none italic uppercase">
                     Empowering <span className="text-brand-crimson">Future</span> Leaders
                  </h2>
                  <p className="text-sm text-slate-300 font-medium leading-relaxed opacity-80">
                     Access your academic personalized dashboard, track progress, and stay connected with the excellence portal.
                  </p>
                  
                  <div className="flex gap-8 pt-4">
                     <div className="space-y-0.5">
                        <p className="text-2xl font-black text-white italic">25k+</p>
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Students</p>
                     </div>
                     <div className="space-y-0.5">
                        <p className="text-2xl font-black text-white italic">500+</p>
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Educators</p>
                     </div>
                  </div>
               </div>

               <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em]">Official Portal v4.0.1</p>
            </div>
         </div>

         {/* RIGHT PANEL: Login Form */}
         <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8 noise-bg relative h-full">
            
            <div className="w-full max-w-[380px] space-y-5">
               
               {/* Mobile Header */}
               <div 
                  onClick={() => navigate('/')}
                  className="lg:hidden text-center space-y-1 mb-4 cursor-pointer"
               >
                  <h1 className="text-3xl font-black text-brand-navy tracking-tighter italic uppercase underline decoration-brand-crimson">St. Martins Group of Schools</h1>
               </div>

               {/* Mode Switcher Overlay */}
               <div className="bg-slate-50 p-1 rounded-xl flex border border-slate-100 mb-4">
                  <button 
                     type="button"
                     onClick={() => { setUserType('admin'); setIsFirstTime(false); }}
                     className={`flex-1 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${userType === 'admin' ? 'bg-white shadow-md text-brand-navy' : 'text-slate-400 hover:text-brand-navy'}`}
                  >
                     <ShieldCheck className="w-3.5 h-3.5" /> Admin
                  </button>
                  <button 
                     type="button"
                     onClick={() => setUserType('parent')}
                     className={`flex-1 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${userType === 'parent' ? 'bg-white shadow-md text-brand-navy' : 'text-slate-400 hover:text-brand-navy'}`}
                  >
                     <User className="w-3.5 h-3.5" /> Parent
                  </button>
                  <button 
                     type="button"
                     onClick={() => { setUserType('teacher'); setIsFirstTime(false); }}
                     className={`flex-1 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${userType === 'teacher' ? 'bg-white shadow-md text-brand-navy' : 'text-slate-400 hover:text-brand-navy'}`}
                  >
                     <GraduationCap className="w-3.5 h-3.5" /> Teacher
                  </button>
               </div>

               <div className="space-y-1 text-center lg:text-left">
                  <h3 className="text-2xl font-black text-brand-navy tracking-tighter uppercase italic leading-none">
                     {isFirstTime ? 'Set Your Password' : 'Welcome Back'}
                  </h3>
                  <p className="text-xs font-bold text-slate-400 tracking-wide">
                     Sign in to continue to portal.
                  </p>
               </div>

               {/* Error Message Display */}
               {(localError || error) && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex gap-3 items-start animate-in slide-in-from-top duration-200">
                     <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                     <div className="flex-1">
                        <p className="text-sm font-bold text-red-800">{localError || error}</p>
                        <p className="text-xs text-red-700 mt-1">
                           {userType === 'admin' && 'Try: superadmin@gmail.com / password123'}
                           {userType === 'teacher' && 'Use the email or employee ID shared during approval'}
                           {userType === 'parent' && 'Use the email or admission number shared during approval'}
                        </p>
                     </div>
                  </div>
               )}



               <form onSubmit={handleSubmit} className="space-y-3.5">
                  {/* First Time Checkbox - ONLY for Parents */}
                  {isParentLogin && (
                     <div className="py-0.5 animate-in fade-in duration-300">
                        <label className="flex items-center gap-2.5 cursor-pointer group bg-brand-crimson/5 p-3 rounded-xl border border-brand-crimson/10 transition-all hover:bg-brand-crimson/10">
                           <input 
                              type="checkbox" 
                              className="w-4 h-4 accent-brand-crimson rounded cursor-pointer"
                              checked={isFirstTime}
                              onChange={(e) => setIsFirstTime(e.target.checked)}
                           />
                           <span className="text-[10px] font-black text-brand-navy uppercase tracking-widest">
                              First Time User? <span className="text-brand-crimson underline decoration-brand-crimson/30 underline-offset-4">Register</span>
                           </span>
                        </label>
                     </div>
                  )}

                  {/* ID Field */}
                  <div className="space-y-1.5 group">
                     <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">
                        {identifierLabel}
                     </label>
                     <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                           <User className="w-4 h-4 text-slate-300 group-focus-within:text-brand-crimson transition-colors" />
                        </div>
                        <input 
                           type="text" required name="id" value={formData.id} onChange={handleChange}
                           placeholder={identifierPlaceholder}
                           className="w-full bg-slate-50/50 border border-slate-200 focus:border-brand-navy/60 focus:bg-white pl-11 pr-5 py-3 rounded-xl text-sm font-bold text-slate-700 outline-none transition-all"
                        />
                     </div>
                  </div>

                  {isFirstTime && (
                     <div className="space-y-1.5 group animate-in slide-in-from-top duration-200">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Student DOB</label>
                        <div className="relative">
                           <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <Calendar className="w-4 h-4 text-slate-300 group-focus-within:text-brand-crimson transition-colors" />
                           </div>
                           <input 
                              type="date" required name="dob" value={formData.dob} onChange={handleChange}
                              className="w-full bg-slate-50/50 border border-slate-200 focus:border-brand-navy/60 focus:bg-white pl-11 pr-5 py-3 rounded-xl text-sm font-bold text-slate-700 outline-none transition-all"
                           />
                        </div>
                     </div>
                  )}

                  {!isFirstTime ? (
                     <div className="space-y-1.5 group">
                        <div className="flex justify-between items-center px-1">
                           <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                           <span className="text-[9px] font-black text-brand-crimson uppercase tracking-widest cursor-pointer hover:underline">Forgot?</span>
                        </div>
                        <div className="relative">
                           <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <Lock className="w-4 h-4 text-slate-300 group-focus-within:text-brand-crimson transition-colors" />
                           </div>
                           <input 
                              type={showPassword ? 'text' : 'password'} required name="password" value={formData.password} onChange={handleChange}
                              placeholder="••••••••"
                              className="w-full bg-slate-50/50 border border-slate-200 focus:border-brand-navy/60 focus:bg-white pl-11 pr-11 py-3 rounded-xl text-sm font-bold text-slate-700 outline-none transition-all"
                           />
                           <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-300 hover:text-brand-navy">
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                           </button>
                        </div>
                     </div>
                  ) : (
                     <div className="grid grid-cols-2 gap-3 animate-in slide-in-from-top duration-200">
                        <div className="space-y-1.5">
                           <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">New Pass</label>
                           <input 
                              type="password" required name="newPassword" value={formData.newPassword} onChange={handleChange}
                              className="w-full bg-slate-50/50 border border-slate-200 focus:border-brand-navy/60 focus:bg-white px-4 py-3 rounded-xl text-sm font-bold text-slate-700 outline-none transition-all"
                           />
                        </div>
                        <div className="space-y-1.5">
                           <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirm</label>
                           <input 
                              type="password" required name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                              className="w-full bg-slate-50/50 border border-slate-200 focus:border-brand-navy/60 focus:bg-white px-4 py-3 rounded-xl text-sm font-bold text-slate-700 outline-none transition-all"
                           />
                        </div>
                     </div>
                  )}

                  <div className="flex items-center gap-2 px-1 pt-1">
                     <input type="checkbox" className="w-3.5 h-3.5 accent-brand-navy rounded" checked={formData.rememberMe} onChange={(e) => setFormData(p => ({...p, rememberMe: e.target.checked}))} />
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Remember device</span>
                  </div>
                  <div className="pt-2">
                     <Button 
                        type="submit" disabled={loading}
                        className="w-full bg-brand-navy hover:bg-brand-crimson py-3.5 rounded-xl text-[11px] font-black uppercase italic tracking-[0.2em] shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-95 group"
                     >
                        <span className="flex items-center justify-center gap-2">
                           {loading ? 'Authenticating...' : (isFirstTime ? 'Complete Account' : 'Sign in')}
                           {!loading && <CheckCircle2 className="w-4 h-4 group-hover:scale-110 transition-all" />}
                        </span>
                     </Button>
                  </div>
               </form>

               <div className="text-center pt-2">
                  <p className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.3em]">
                     &copy; 2026 St. Martins Group of Schools Portal
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default LoginPage;
