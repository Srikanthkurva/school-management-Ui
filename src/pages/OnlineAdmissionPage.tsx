import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, ChevronDown, User, BookOpen } from 'lucide-react';
import Button from '../components/ui/Button';
import { admissionService } from '../services';

const OnlineAdmissionPage = () => {
   const navigate = useNavigate();
   const [submitted, setSubmitted] = useState(false);
   const [loading, setLoading] = useState(false);
   const [applicationId, setApplicationId] = useState('');
   
   const [formData, setFormData] = useState({
      academicYear: '2026-2027',
      board: '',
      state: '',
      city: '',
      school: '',
      className: '',
      orientation: '',
      // section removed
      studentType: '',
      firstName: '',
      lastName: '',
      dob: '',
      gender: '',
      fatherName: '',
      motherName: '',
      parentMobile: '',
      parentEmail: '',
      aadhaarNo: '',
      address: '',
      quota: '',
      admissionType: '',
      fatherOccupation: ''
   });

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      try {
         const res = await admissionService.submit(formData as any);
         const data = res.data;
         if (data?.success) {
            setApplicationId(data.id || '');
            setSubmitted(true);
         } else {
            alert(data?.message || 'Something went wrong.');
         }
      } catch (error) {
         console.error('Admission error:', error);
         alert('Failed to submit admission. Check your connection.');
      } finally {
         setLoading(false);
      }
   };

   if (submitted) {
      return (
         <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 noise-bg">
            <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.1)] max-w-xl w-full text-center space-y-8 animate-in zoom-in duration-500 border border-gray-100">
               <div className="flex justify-center">
                  <div className="bg-green-50 p-6 rounded-full border border-green-100">
                     <CheckCircle className="w-16 h-16 text-green-600" />
                  </div>
               </div>
               <div className="space-y-4">
                  <h2 className="text-3xl font-black text-brand-navy uppercase tracking-tighter italic">Admission Confirmed!</h2>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed">
                     Congratulations! Your online admission has been successfully processed. 
                     Please note your Admission Number for future reference:
                  </p>
                  <div className="bg-brand-navy/5 border-2 border-dashed border-brand-navy/20 p-6 rounded-2xl">
                     <span className="text-lg font-bold text-brand-navy">Verification in progress</span>
                     {applicationId && <div className="mt-2 text-sm text-slate-600">Application ID: <strong>{applicationId}</strong></div>}
                  </div>
                  <p className="text-brand-crimson font-bold text-xs uppercase tracking-widest">A verification email has been sent to {formData.parentEmail}</p>
               </div>
               <Button onClick={() => navigate('/')} className="w-full bg-brand-navy hover:bg-brand-crimson py-4 text-xs font-black uppercase tracking-[0.3em] shadow-xl">
                  Back to Portal
               </Button>
            </div>
         </div>
      );
   }

   const inputClasses = "w-full bg-slate-50 border-b-2 border-slate-100 px-5 py-3.5 text-sm font-bold text-slate-700 outline-none focus:border-brand-crimson focus:bg-white transition-all duration-300 placeholder:text-slate-300 rounded-t-lg";
   const labelClasses = "block text-[10px] font-black text-brand-navy/40 uppercase tracking-[0.2em] mb-1 px-1";
   const sectionTitleClasses = "text-xl font-black text-brand-navy tracking-tight uppercase italic flex items-center gap-3";

   return (
      <div className="min-h-screen bg-[#FDFDFD] noise-bg font-sans pb-32">
         {/* Navigation */}
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
                  src="https://images.unsplash.com/photo-1523050335392-93851179ae2c?auto=format&fit=crop&q=80&w=1920" 
                  className="w-full h-full object-cover opacity-30 mix-blend-overlay scale-110" 
                  alt="Online Admission"
               />
               <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/0 to-brand-navy/60" />
            </div>
            <div className="relative z-10 text-center space-y-4 px-6">
               <div className="inline-block py-1.5 px-6 rounded-full border border-white/20 text-white/60 text-[10px] font-black uppercase tracking-[0.4em] backdrop-blur-sm">
                  Official Registration Portal
               </div>
               <h1 className="text-5xl md:text-[5.5rem] font-black text-white tracking-tighter uppercase italic leading-none drop-shadow-2xl">
                  ONLINE ADMISSION
               </h1>
            </div>
         </div>

         {/* Form Body */}
         <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-10 pb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
               {/* Left Info / Steps */}
               <aside className="p-8 rounded-2xl bg-gradient-to-b from-white to-indigo-50 border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-black text-brand-navy uppercase tracking-tight mb-3">Online Admission</h3>
                  <p className="text-sm text-slate-600 mb-6">Complete the form to start the admission process. Keep documents ready.</p>
                  <div className="space-y-4">
                     <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-full bg-brand-navy text-white flex items-center justify-center font-black">1</div>
                        <div>
                           <p className="font-semibold">Fill Application</p>
                           <p className="text-xs text-slate-500">Provide student and parent details.</p>
                        </div>
                     </div>
                     <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-full bg-brand-navy text-white flex items-center justify-center font-black">2</div>
                        <div>
                           <p className="font-semibold">Verification</p>
                           <p className="text-xs text-slate-500">Our team reviews and contacts you.</p>
                        </div>
                     </div>
                     <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-full bg-brand-navy text-white flex items-center justify-center font-black">3</div>
                        <div>
                           <p className="font-semibold">Confirm Admission</p>
                           <p className="text-xs text-slate-500">Receive admission number and next steps.</p>
                        </div>
                     </div>
                  </div>
               </aside>

               {/* Right: Form Card */}
               <div className="bg-white rounded-[1.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.06)] overflow-hidden border border-gray-100 p-6 md:p-10">
                  <div className="text-center space-y-2 mb-6">
                     <h2 className="text-2xl font-black text-brand-navy tracking-tight uppercase italic">ONLINE ADMISSION</h2>
                     <p className="text-slate-400 text-sm">Step 01/02 — Academic Preferences</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="space-y-1">
                           <label className={labelClasses}>Academic Year</label>
                           <input type="text" value="2026-2027" readOnly className={inputClasses} />
                        </div>

                        {(() => {
                           const fields = ['board', 'state', 'city', 'school', 'className', 'orientation', 'studentType'];
                           const optionsMap: Record<string, any> = {
                              board: [
                                 { value: 'CBSE', label: 'CBSE (Central Board)' },
                                 { value: 'ICSE', label: 'ICSE (Council)' },
                                 { value: 'State', label: 'State Board' },
                              ],
                              state: [
                                 { value: 'Telangana', label: 'Telangana' },
                                 { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
                                 { value: 'Karnataka', label: 'Karnataka' },
                              ],
                              city: [
                                 { value: 'Hyderabad', label: 'Hyderabad' },
                                 { value: 'Warangal', label: 'Warangal' },
                                 { value: 'Vijayawada', label: 'Vijayawada' },
                              ],
                              school: [
                                 { value: 'Madhapur', label: 'Madhapur Campus' },
                                 { value: 'Kukatpally', label: 'Kukatpally Campus' },
                                 { value: 'Gachibowli', label: 'Gachibowli Campus' },
                              ],
                              className: [
                                 { group: 'Pre-Primary', options: [
                                    { value: 'Nursery', label: 'NURSERY' },
                                    { value: 'UKG', label: 'UKG' },
                                    { value: 'LKG', label: 'LKG' },
                                 ]},
                                 { group: 'Primary', options: [
                                    { value: '1', label: '1st Class' },
                                    { value: '2', label: '2nd Class' },
                                    { value: '3', label: '3rd Class' },
                                    { value: '4', label: '4th Class' },
                                    { value: '5', label: '5th Class' },
                                 ]},
                                 { group: 'Secondary', options: [
                                    { value: '6', label: '6th Class' },
                                    { value: '7', label: '7th Class' },
                                    { value: '8', label: '8th Class' },
                                    { value: '9', label: '9th Class' },
                                 ]},
                              ],
                              orientation: [
                                 { value: 'Morning', label: 'Morning' },
                                 { value: 'Afternoon', label: 'Afternoon' },
                              ],
                              // section removed
                              studentType: [
                                 { value: 'Day', label: 'Day Scholar' },
                                 { value: 'Residential', label: 'Residential' },
                              ],
                           };

                           return fields.map((field) => (
                              <div key={field} className="space-y-1">
                                 <label className={labelClasses}>{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}*</label>
                                 <div className="relative">
                                    <select required name={field} value={(formData as any)[field]} onChange={handleChange} className={inputClasses + ' appearance-none'}>
                                       <option value="">Select {field.replace(/([A-Z])/g, ' $1')}</option>
                                       {field === 'className' ? (
                                          (optionsMap as any)[field].map((grp: any) => (
                                             <optgroup key={grp.group} label={grp.group}>
                                                {grp.options.map((opt: any) => (
                                                   <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                ))}
                                             </optgroup>
                                          ))
                                       ) : (
                                          (optionsMap as any)[field].map((opt: any) => (
                                             <option key={opt.value} value={opt.value}>{opt.label}</option>
                                          ))
                                       )}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
                                 </div>
                              </div>
                           ));
                        })()}
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="space-y-1">
                           <label className={labelClasses}>First Name*</label>
                           <input type="text" required name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First name" className={inputClasses} />
                        </div>
                        <div className="space-y-1">
                           <label className={labelClasses}>Last Name</label>
                           <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last name" className={inputClasses} />
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="space-y-1">
                           <label className={labelClasses}>Date Of Birth*</label>
                           <input type="date" required name="dob" value={formData.dob} onChange={handleChange} className={inputClasses} />
                        </div>
                        <div className="space-y-1">
                           <label className={labelClasses}>Gender*</label>
                           <div className="flex gap-6 items-center h-full px-5 py-3.5 mt-1 border-b-2 border-slate-100 bg-slate-50 rounded-t-lg">
                               <label className="flex items-center gap-2 text-sm font-bold text-slate-700 cursor-pointer">
                                  <input type="radio" name="gender" value="Female" onChange={handleChange} checked={formData.gender === 'Female'} className="accent-brand-crimson w-4 h-4 cursor-pointer" /> Female
                               </label>
                               <label className="flex items-center gap-2 text-sm font-bold text-slate-700 cursor-pointer">
                                  <input type="radio" name="gender" value="Male" onChange={handleChange} checked={formData.gender === 'Male'} className="accent-brand-crimson w-4 h-4 cursor-pointer" /> Male
                               </label>
                           </div>
                        </div>
                     </div>

                     <div className="mt-12 pt-8 border-t border-gray-100">
                        <h3 className="text-xl font-medium text-[#2A5E82] text-center mb-8 tracking-wide">PERSONAL DETAILS</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="space-y-1">
                              <input type="text" required name="fatherName" value={formData.fatherName} onChange={handleChange} placeholder="Father Name*" className="w-full bg-white border border-gray-200 px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-brand-navy transition-colors placeholder:text-slate-400 placeholder:font-normal" />
                           </div>
                           <div className="space-y-1">
                              <input type="text" required name="motherName" value={formData.motherName} onChange={handleChange} placeholder="Mother Name*" className="w-full bg-white border border-gray-200 px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-brand-navy transition-colors placeholder:text-slate-400 placeholder:font-normal" />
                           </div>
                           <div className="space-y-1">
                              <input type="text" required name="parentMobile" value={formData.parentMobile} onChange={handleChange} placeholder="Parent Mobile No.*" className="w-full bg-white border border-gray-200 px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-brand-navy transition-colors placeholder:text-slate-400 placeholder:font-normal" />
                           </div>
                           <div className="space-y-1">
                              <input type="email" required name="parentEmail" value={formData.parentEmail} onChange={handleChange} placeholder="Parent Email*" className="w-full bg-white border border-gray-200 px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-brand-navy transition-colors placeholder:text-slate-400 placeholder:font-normal" />
                           </div>
                           <div className="space-y-1">
                              <input type="text" required name="aadhaarNo" value={formData.aadhaarNo} onChange={handleChange} placeholder="Aadhaar No*" className="w-full bg-white border border-gray-200 px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-brand-navy transition-colors placeholder:text-slate-400 placeholder:font-normal" />
                           </div>
                           <div className="space-y-1">
                              <input type="text" required name="address" value={formData.address} onChange={handleChange} placeholder="Address*" className="w-full bg-white border border-gray-200 px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-brand-navy transition-colors placeholder:text-slate-400 placeholder:font-normal" />
                           </div>

                           <div className="space-y-1 relative">
                              <select required name="quota" value={formData.quota} onChange={handleChange} className={"w-full bg-white border border-gray-200 px-4 py-3 text-sm font-medium outline-none focus:border-brand-navy transition-colors appearance-none cursor-pointer" + (formData.quota === "" ? " text-slate-400 font-normal" : " text-slate-700")}>
                                 <option value="" disabled hidden>Select Quota*</option>
                                 <option value="General">General</option>
                                 <option value="Management">Management</option>
                                 <option value="Staff">Staff</option>
                                 <option value="OBC">OBC</option>
                                 <option value="SC/ST">SC/ST</option>
                              </select>
                              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                           </div>

                           <div className="space-y-1 relative">
                              <select required name="admissionType" value={formData.admissionType} onChange={handleChange} className={"w-full bg-white border border-gray-200 px-4 py-3 text-sm font-medium outline-none focus:border-brand-navy transition-colors appearance-none cursor-pointer" + (formData.admissionType === "" ? " text-slate-400 font-normal" : " text-slate-700")}>
                                 <option value="" disabled hidden>Select Admission Type*</option>
                                 <option value="Regular">Regular</option>
                                 <option value="Transfer">Transfer</option>
                                 <option value="RTE">RTE</option>
                              </select>
                              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                           </div>

                           <div className="space-y-1 relative">
                              <select required name="fatherOccupation" value={formData.fatherOccupation} onChange={handleChange} className={"w-full bg-white border border-gray-200 px-4 py-3 text-sm font-medium outline-none focus:border-brand-navy transition-colors appearance-none cursor-pointer" + (formData.fatherOccupation === "" ? " text-slate-400 font-normal" : " text-slate-700")}>
                                 <option value="" disabled hidden>Select Father/Guardian Occupation*</option>
                                 <option value="Business">Business</option>
                                 <option value="Govt Employee">Govt Employee</option>
                                 <option value="Private Sector">Private Sector</option>
                                 <option value="Self Employed">Self Employed</option>
                                 <option value="Farmer">Farmer</option>
                                 <option value="Other">Other</option>
                              </select>
                              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                           </div>

                        </div>
                     </div>

                     <div className="mt-6 pt-4 border-t border-gray-50 text-center">
                        <p className="text-[11px] text-slate-400 font-medium mb-4">I hereby declare that the information provided is true to the best of my knowledge.</p>
                        <Button type="submit" disabled={loading} className="bg-brand-navy hover:bg-brand-crimson px-12 py-4 rounded-2xl font-black uppercase tracking-[0.3em] shadow-xl">
                           {loading ? 'Confirming Admission...' : 'Confirm Admission'}
                        </Button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
};

export default OnlineAdmissionPage;
