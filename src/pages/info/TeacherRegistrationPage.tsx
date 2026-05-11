import { useState } from 'react';
import PublicHeader from '../../components/layout/PublicHeader';
import PublicFooter from '../../components/layout/PublicFooter';
import { Send, Briefcase, User } from 'lucide-react';
import { teacherRequestService } from '../../services';
import toast from 'react-hot-toast';

const TeacherRegistrationPage = () => {
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      subject: '',
      qualification: '',
      experience: '',
      message: ''
   });
   const [status, setStatus] = useState({ loading: false, success: false, error: '' });

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const quickOptions = {
      qualifications: ['B.Ed', 'M.Ed', 'M.Sc', 'M.A.', 'Ph.D', 'B.Tech'],
      subjects: ['Mathematics', 'Science', 'English', 'Computer Science', 'Social Studies', 'Physical Education'],
      experience: ['0-2 Years', '3-5 Years', '5-10 Years', '10+ Years'],
      messages: [
         'I am highly passionate about teaching and eager to contribute to the academic excellence at St. Martins Group of Schools.',
         'With years of dedicated teaching experience, I aim to foster a collaborative and engaging learning environment.',
         'I specialize in innovative teaching methodologies and strongly believe in St. Martins vision for student development.'
      ]
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus({ loading: true, success: false, error: '' });

      try {
         const response = await teacherRequestService.submit(formData);
         if (response.data.success) {
            setStatus({ loading: false, success: true, error: '' });
            toast.success('Application submitted successfully! You will receive a confirmation email shortly.', {
               style: { borderRadius: '20px', background: '#1a237e', color: '#fff', fontWeight: 'bold' }
            });
            setFormData({ name: '', email: '', phone: '', subject: '', qualification: '', experience: '', message: '' });
         }
      } catch (err: any) {
         setStatus({ loading: false, success: false, error: err.response?.data?.message || 'Submission failed. Please try again later.' });
         toast.error(err.response?.data?.message || 'Application submission failed.');
      }
   };

   return (
      <div className="min-h-screen bg-white font-sans">
         <PublicHeader />
         
         {/* Hero Section */}
         <section className="relative h-[300px] flex items-center overflow-hidden">
            <img 
               src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1920" 
               className="absolute inset-0 w-full h-full object-cover" 
               alt="Teacher Registration"
            />
            <div className="absolute inset-0 bg-brand-navy/90 mix-blend-multiply" />
            <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full text-center text-white">
               <p className="text-sm font-black uppercase tracking-[0.3em] text-brand-crimson mb-2">Join Our Faculty</p>
               <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter drop-shadow-2xl">Teacher <span className="text-brand-crimson">Registration</span></h1>
            </div>
         </section>

         {/* Main Content */}
         <section className="py-16 px-6 max-w-[1000px] mx-auto">
            
            <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.08)] border border-gray-100">
               <div className="mb-10 text-center">
                  <h2 className="text-3xl font-black text-brand-navy uppercase italic">Apply <span className="text-brand-crimson">Now</span></h2>
                  <p className="text-gray-500 font-medium mt-2">Fill in your details below to become a part of the St. Martins Group of Schools faculty.</p>
               </div>

               {status.success ? (
                  <div className="bg-green-50 border border-green-200 p-10 rounded-3xl text-center space-y-4">
                     <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                        <Send className="text-white w-10 h-10" />
                     </div>
                     <h4 className="text-2xl font-black text-green-800 uppercase italic">Application Submitted!</h4>
                     <p className="text-green-600 font-bold text-sm tracking-wide">Thank you for your interest. We have sent a confirmation email to your provided address. Our recruitment team will review your application and contact you soon.</p>
                     <button 
                        onClick={() => setStatus({ ...status, success: false })}
                        className="text-green-800 font-black text-[11px] uppercase tracking-widest border-b-2 border-green-800 mt-4 inline-block"
                     >Submit Another Application</button>
                  </div>
               ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                     
                     {/* Personal Info */}
                     <div className="space-y-6">
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-2 flex items-center gap-2">
                           <User className="w-4 h-4" /> Personal Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-brand-navy uppercase tracking-widest ml-4">Full Name</label>
                              <input 
                                 type="text" name="name" required value={formData.name} onChange={handleChange}
                                 className="w-full bg-slate-50 border-0 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-brand-crimson outline-none font-bold text-sm text-slate-800" 
                                 placeholder="e.g. John Doe" 
                              />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-brand-navy uppercase tracking-widest ml-4">Email Address</label>
                              <input 
                                 type="email" name="email" required value={formData.email} onChange={handleChange}
                                 className="w-full bg-slate-50 border-0 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-brand-crimson outline-none font-bold text-sm text-slate-800" 
                                 placeholder="e.g. john@example.com" 
                              />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-brand-navy uppercase tracking-widest ml-4">Phone Number</label>
                              <input 
                                 type="tel" name="phone" required value={formData.phone} onChange={handleChange}
                                 className="w-full bg-slate-50 border-0 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-brand-crimson outline-none font-bold text-sm text-slate-800" 
                                 placeholder="e.g. +91 9876543210" 
                              />
                           </div>
                        </div>
                     </div>

                     {/* Professional Info */}
                     <div className="space-y-6 pt-4">
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-2 flex items-center gap-2">
                           <Briefcase className="w-4 h-4" /> Professional Background
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="space-y-2">
                              <div className="flex justify-between items-center px-4">
                                 <label className="text-[10px] font-black text-brand-navy uppercase tracking-widest">Highest Qualification</label>
                                 <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight italic hidden md:block">Presets</span>
                              </div>
                              <input 
                                 type="text" name="qualification" required value={formData.qualification} onChange={handleChange}
                                 className="w-full bg-slate-50 border-0 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-brand-crimson outline-none font-bold text-sm text-slate-800" 
                                 placeholder="e.g. M.Sc, B.Ed" 
                              />
                              <div className="flex flex-wrap gap-1.5 px-2 mt-2">
                                 {quickOptions.qualifications.map(q => (
                                    <button key={q} type="button" onClick={() => setFormData({...formData, qualification: q})} className="px-3 py-1 bg-slate-100 hover:bg-brand-navy hover:text-white rounded-full text-[9px] font-black uppercase tracking-widest text-slate-500 transition-colors">
                                       {q}
                                    </button>
                                 ))}
                              </div>
                           </div>
                           <div className="space-y-2">
                              <div className="flex justify-between items-center px-4">
                                 <label className="text-[10px] font-black text-brand-navy uppercase tracking-widest">Specializing Subject</label>
                              </div>
                              <select 
                                 name="subject" required value={formData.subject} onChange={handleChange}
                                 className="w-full bg-slate-50 border-0 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-brand-crimson outline-none font-bold text-sm text-slate-800"
                              >
                                 <option value="">Select Subject</option>
                                 {quickOptions.subjects.map(s => <option key={s} value={s}>{s}</option>)}
                                 <option value="Arts & Crafts">Arts & Crafts</option>
                                 <option value="Other">Other</option>
                              </select>
                           </div>
                           <div className="space-y-2">
                              <div className="flex justify-between items-center px-4">
                                 <label className="text-[10px] font-black text-brand-navy uppercase tracking-widest">Years of Experience</label>
                                 <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight italic hidden md:block">Presets</span>
                              </div>
                              <input 
                                 type="text" name="experience" required value={formData.experience} onChange={handleChange}
                                 className="w-full bg-slate-50 border-0 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-brand-crimson outline-none font-bold text-sm text-slate-800" 
                                 placeholder="e.g. 5 Years" 
                              />
                              <div className="flex flex-wrap gap-1.5 px-2 mt-2">
                                 {quickOptions.experience.map(e => (
                                    <button key={e} type="button" onClick={() => setFormData({...formData, experience: e})} className="px-3 py-1 bg-slate-100 hover:bg-brand-crimson hover:text-white rounded-full text-[9px] font-black uppercase tracking-widest text-slate-500 transition-colors">
                                       {e}
                                    </button>
                                 ))}
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Cover Letter */}
                     <div className="space-y-6 pt-4">
                        <div className="space-y-3">
                           <div className="flex justify-between items-center px-4">
                              <label className="text-[10px] font-black text-brand-navy uppercase tracking-widest">Cover Letter / Message (Optional)</label>
                              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight italic hidden md:block">Quick Templates</span>
                           </div>
                           
                           <div className="flex flex-col gap-2 px-2">
                              {quickOptions.messages.map((m, i) => (
                                 <button key={i} type="button" onClick={() => setFormData({...formData, message: m})} className="text-left px-4 py-2 bg-slate-50 hover:bg-brand-navy hover:text-white rounded-xl text-[11px] font-medium text-slate-600 transition-colors border border-slate-100">
                                    "{m}"
                                 </button>
                              ))}
                           </div>

                           <textarea 
                              name="message" value={formData.message} onChange={handleChange} rows={4}
                              className="w-full bg-slate-50 border-0 rounded-3xl px-6 py-4 focus:ring-2 focus:ring-brand-crimson outline-none font-bold text-sm text-slate-800 resize-none mt-2" 
                              placeholder="Or write your own personalized cover letter here..."
                           />
                        </div>
                     </div>

                     {status.error && (
                        <p className="text-brand-crimson text-xs font-black uppercase text-center mt-2">{status.error}</p>
                     )}

                     <button 
                        type="submit" disabled={status.loading}
                        className="w-full bg-brand-navy text-white text-sm font-black uppercase tracking-[0.2em] py-5 rounded-2xl shadow-xl hover:bg-brand-crimson transition-all active:scale-95 disabled:opacity-50 mt-6"
                     >
                        {status.loading ? 'Submitting Application...' : 'Submit Teacher Application'}
                     </button>
                  </form>
               )}
            </div>
         </section>

         <PublicFooter />
      </div>
   );
};

export default TeacherRegistrationPage;
