import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, ChevronDown } from 'lucide-react';
import Button from '../components/ui/Button';
import { enquiryService } from '../services';

const AdmissionEnquiryPage = () => {
   const navigate = useNavigate();
   const [submitted, setSubmitted] = useState(false);
   const [loading, setLoading] = useState(false);
   const [formData, setFormData] = useState({
      academicYear: '2026-2027',
      board: '',
      state: '',
      city: '',
      school: '',
      grade: '',
      childName: '',
      gender: '',
      parentName: '',
      mobile: '',
      email: ''
   });

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      try {
         const res = await enquiryService.submit(formData as any);
         if (res.data?.success) setSubmitted(true);
         else alert(res.data?.message || 'Something went wrong.');
      } catch (error) {
         console.error('Submission error:', error);
         alert('Failed to submit enquiry. Check your connection.');
      } finally {
         setLoading(false);
      }
   };

   if (submitted) {
      return (
         <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 noise-bg">
            <div className="bg-white p-10 md:p-14 rounded-[2rem] shadow-[0_40px_100px_rgba(0,0,0,0.1)] max-w-md w-full text-center space-y-8 animate-in zoom-in duration-500 border border-gray-100">
               <div className="flex justify-center">
                  <div className="bg-brand-crimson/5 p-6 rounded-full border border-brand-crimson/10">
                     <CheckCircle className="w-16 h-16 text-brand-crimson" />
                  </div>
               </div>
               <div className="space-y-3">
                  <h2 className="text-3xl font-black text-brand-navy uppercase tracking-tighter italic">Enquiry Sent</h2>
                  <p className="text-gray-500 font-medium text-sm leading-relaxed">Thank you for your interest. Our admissions counselor will connect with you via your registered mobile number shortly.</p>
               </div>
               <Button onClick={() => navigate('/')} className="w-full bg-brand-navy hover:bg-brand-crimson py-4 text-xs font-black uppercase tracking-[0.3em] shadow-xl">
                  Return to Home
               </Button>
            </div>
         </div>
      );
   }

   const inputClasses = "w-full bg-slate-50 border-b-2 border-slate-100 px-5 py-3.5 text-sm font-bold text-slate-700 outline-none focus:border-brand-crimson focus:bg-white transition-all duration-300 placeholder:text-slate-300 rounded-t-lg";
   const labelClasses = "block text-[10px] font-black text-brand-navy/40 uppercase tracking-[0.2em] mb-1 px-1";

   return (
      <div className="min-h-screen bg-[#FDFDFD] selection:bg-brand-crimson/20 noise-bg font-sans">
         {/* Minimal Navigation */}
         <nav className="fixed top-0 inset-x-0 z-[60] py-6 px-10 flex justify-between items-center pointer-events-none">
            <button 
               onClick={() => navigate('/')} 
               className="p-3 bg-white shadow-xl rounded-full text-brand-navy hover:text-brand-crimson transition-all pointer-events-auto border border-gray-100 group"
            >
               <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
         </nav>

         {/* Hero Header */}
         <div className="relative h-[250px] md:h-[350px] overflow-hidden flex items-center justify-center bg-brand-navy">
            <div className="absolute inset-0">
               <img 
                  src="https://images.unsplash.com/photo-1454165833767-027ffeb96c3a?auto=format&fit=crop&q=80&w=1920" 
                  className="w-full h-full object-cover opacity-30 mix-blend-overlay scale-110" 
                  alt="Admissions"
               />
               <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/0 to-brand-navy/60" />
            </div>
            <div className="relative z-10 text-center space-y-4 px-6">
               <div className="inline-block py-1.5 px-6 rounded-full border border-white/20 text-white/60 text-[10px] font-black uppercase tracking-[0.4em] backdrop-blur-sm">
                  Path to Excellence
               </div>
               <h1 className="text-5xl md:text-[5.5rem] font-black text-white tracking-tighter uppercase italic leading-none drop-shadow-2xl">
                  ADMISSIONS
               </h1>
            </div>
         </div>

         {/* Form Section */}
         <div className="max-w-6xl mx-auto px-6 -mt-20 relative z-10 pb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
               {/* Info Panel */}
               <aside className="hidden lg:block p-8 rounded-2xl bg-gradient-to-b from-white to-indigo-50 border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-black text-brand-navy uppercase tracking-tight mb-3">Why choose our school?</h3>
                  <p className="text-sm text-slate-600 mb-6">Modern curriculum, experienced faculty and a nurturing environment for your child's growth.</p>
                  <ul className="space-y-4 text-sm">
                     <li className="flex items-start gap-3">
                        <span className="inline-block w-3 h-3 rounded-full bg-brand-crimson mt-2" />
                        <div>
                           <p className="font-semibold text-slate-800">Holistic Education</p>
                           <p className="text-xs text-slate-500">Balance academics with life skills and sports.</p>
                        </div>
                     </li>
                     <li className="flex items-start gap-3">
                        <span className="inline-block w-3 h-3 rounded-full bg-brand-crimson mt-2" />
                        <div>
                           <p className="font-semibold text-slate-800">Safe Campus</p>
                           <p className="text-xs text-slate-500">Controlled access and child-friendly facilities.</p>
                        </div>
                     </li>
                     <li className="flex items-start gap-3">
                        <span className="inline-block w-3 h-3 rounded-full bg-brand-crimson mt-2" />
                        <div>
                           <p className="font-semibold text-slate-800">Caring Staff</p>
                           <p className="text-xs text-slate-500">Dedicated teachers who mentor every student.</p>
                        </div>
                     </li>
                  </ul>
                  <div className="mt-6 text-sm text-slate-500">Academic Session 2026-2027</div>
               </aside>

               {/* Form Card */}
               <div className="bg-white rounded-[1.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.06)] overflow-hidden border border-gray-100 p-6 md:p-10">
                  <div className="text-center space-y-2 mb-8">
                     <h2 className="text-2xl font-black text-brand-navy tracking-tight uppercase italic">Admission Enquiry</h2>
                     <p className="text-slate-400 text-sm">Fill in basic details and our admissions counselor will reach out.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Board Selection */}
                        <div className="space-y-1">
                           <label className={labelClasses}>Curriculum Board*</label>
                           <div className="relative">
                              <select required name="board" value={formData.board} onChange={handleChange} className={inputClasses}>
                                 <option value="">Select Board</option>
                                 <option value="CBSE">CBSE (Central Board)</option>
                                 <option value="ICSE">ICSE (International)</option>
                                 <option value="State Board">State Board</option>
                              </select>
                              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
                           </div>
                        </div>

                        {/* Grade Selection */}
                        <div className="space-y-1">
                           <label className={labelClasses}>Applying for Grade*</label>
                           <div className="relative">
                              <select required name="grade" value={formData.grade} onChange={handleChange} className={inputClasses}>
                                 <option value="">Select Grade</option>
                                 <optgroup label="Pre-Primary">
                                    <option value="Nursery">NURSERY</option>
                                    <option value="UKG">UKG</option>
                                    <option value="LKG">LKG</option>
                                 </optgroup>
                                 <optgroup label="Primary">
                                    <option value="1">1st Class</option>
                                    <option value="2">2nd Class</option>
                                    <option value="3">3rd Class</option>
                                    <option value="4">4th Class</option>
                                    <option value="5">5th Class</option>
                                 </optgroup>
                                 <optgroup label="Secondary">
                                    <option value="6">6th Class</option>
                                    <option value="7">7th Class</option>
                                    <option value="8">8th Class</option>
                                    <option value="9">9th Class</option>
                                 </optgroup>
                              </select>
                              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
                           </div>
                        </div>

                        {/* Child Name */}
                        <div className="space-y-1">
                           <label className={labelClasses}>Child's Full Name*</label>
                           <input type="text" required name="childName" value={formData.childName} onChange={handleChange} placeholder="Enter child's name" className={inputClasses} />
                        </div>

                        {/* Gender Choice */}
                        <div className="space-y-1">
                           <label className={labelClasses}>Gender*</label>
                           <div className="flex items-center gap-6 h-[48px] px-2">
                              <label className="flex items-center gap-3 cursor-pointer">
                                 <input type="radio" name="gender" value="Female" className="w-4 h-4 accent-brand-crimson" checked={formData.gender === 'Female'} onChange={handleChange} />
                                 <span className="text-sm font-bold text-slate-600">Female</span>
                              </label>
                              <label className="flex items-center gap-3 cursor-pointer">
                                 <input type="radio" name="gender" value="Male" className="w-4 h-4 accent-brand-crimson" checked={formData.gender === 'Male'} onChange={handleChange} />
                                 <span className="text-sm font-bold text-slate-600">Male</span>
                              </label>
                           </div>
                        </div>

                        {/* Parent Name */}
                        <div className="space-y-1">
                           <label className={labelClasses}>Parent / Guardian Name*</label>
                           <input type="text" required name="parentName" value={formData.parentName} onChange={handleChange} placeholder="Father or Mother name" className={inputClasses} />
                        </div>

                        {/* Mobile Number */}
                        <div className="space-y-1">
                           <label className={labelClasses}>Contact Number*</label>
                           <div className="relative">
                              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-sm font-black text-slate-300">+91</span>
                              <input type="tel" required name="mobile" value={formData.mobile} onChange={handleChange} placeholder="10-digit mobile number" className={`${inputClasses} pl-14`} />
                           </div>
                        </div>

                        {/* Campus Selection */}
                        <div className="space-y-1">
                           <label className={labelClasses}>Preferred Campus*</label>
                           <div className="relative">
                              <select required name="school" value={formData.school} onChange={handleChange} className={inputClasses}>
                                 <option value="">Select Campus</option>
                                 <option value="Madhapur">Madhapur Campus</option>
                                 <option value="Kukatpally">Kukatpally Campus</option>
                                 <option value="Gachibowli">Gachibowli Campus</option>
                              </select>
                              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
                           </div>
                        </div>

                        {/* Email ID */}
                        <div className="space-y-1">
                           <label className={labelClasses}>Email Address*</label>
                           <input type="email" required name="email" value={formData.email} onChange={handleChange} placeholder="your-email@example.com" className={inputClasses} />
                        </div>
                     </div>

                     <div className="pt-4">
                        <p className="text-[11px] text-slate-400 font-medium mb-6">By submitting this form, you agree to our <span className="text-brand-navy font-bold">Privacy Policy</span> and consent to receive communication regarding admissions.</p>
                        <div className="flex justify-center">
                           <Button type="submit" disabled={loading} className="bg-brand-navy hover:bg-brand-crimson px-12 py-4 rounded-2xl font-black uppercase tracking-[0.3em] shadow-xl">
                              {loading ? 'Processing...' : 'Request Info'}
                           </Button>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AdmissionEnquiryPage;
