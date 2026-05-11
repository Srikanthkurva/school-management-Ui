import React, { useState } from 'react';
import PublicHeader from '../../components/layout/PublicHeader';
import PublicFooter from '../../components/layout/PublicFooter';
import { Target, Lightbulb, GraduationCap, Award, X, ChevronRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HighSchoolPage = () => {
   const [activeService, setActiveService] = useState<null | number>(null);

   const services = [
      { 
         icon: Target, 
         title: 'Integrated Prep', 
         desc: 'JEE/NEET focused coaching',
         details: 'Our curriculum is designed to seamlessly integrate board syllabus with competitive exam preparation. We use synchronized micro-schedules to ensure students excel in both arenas.',
         highlights: ['JEE/NEET Integrated', 'Micro-Schedule Based', 'Concept Power Sessions', 'Doubt Clearing Desk'],
         color: 'bg-blue-50',
         iconColor: 'text-blue-600'
      },
      { 
         icon: Lightbulb, 
         title: 'Expert Faculty', 
         desc: 'National-level educators',
         details: 'Our teachers are Subject Matter Experts with years of experience in producing national top ranks. They guide students through complex concepts using innovative techniques.',
         highlights: ['IIT/NIT Alumni Staff', 'Personal Mentorship', 'Shortcut Technique Tips', 'Subject Specialization'],
         color: 'bg-amber-50',
         iconColor: 'text-amber-600'
      },
      { 
         icon: Award, 
         title: 'Regular Tests', 
         desc: 'Weekly ranking assessments',
         details: 'We conduct error-analysis based testing every week using OMR and online platforms. Our national-level ranking system helps students understand their standing.',
         highlights: ['Weekly OMR Exams', 'National Benchmarking', 'Error Analysis Reports', 'Cumulative Assessments'],
         color: 'bg-emerald-50',
         iconColor: 'text-emerald-600'
      },
      { 
         icon: GraduationCap, 
         title: 'Counseling', 
         desc: 'Career guidance sessions',
         details: 'Beyond Academics, we provide professional counseling to help students manage exam stress and choose the right career path.',
         highlights: ['Stress Management', 'University Planning', 'Aptitude Testing', 'Alumni Guest Talks'],
         color: 'bg-purple-50',
         iconColor: 'text-purple-600'
      }
   ];

   const handleClose = () => {
      setActiveService(null);
   };

   return (
      <div className="min-h-screen bg-white font-sans overflow-x-hidden">
         <PublicHeader />
         
         <section className="relative h-[450px] flex items-center overflow-hidden">
            <motion.div 
               initial={{ scale: 1.1 }}
               animate={{ scale: 1 }}
               transition={{ duration: 1.5 }}
               className="absolute inset-0"
            >
               <img 
                  src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1920" 
                  className="w-full h-full object-cover" 
                  alt="High School"
               />
            </motion.div>
            <div className="absolute inset-0 bg-brand-navy/80 mix-blend-multiply" />
            <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full text-white">
               <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
               >
                  <span className="bg-brand-crimson px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6 inline-block shadow-lg">Grade 8 to 12</span>
                  <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.9]">
                     The Academy of <br /><span className="text-brand-crimson text-5xl md:text-7xl">Champions</span>
                  </h1>
                  <p className="text-lg md:text-xl text-white/60 max-w-xl mt-6 font-medium italic">
                     Preparing students for the world's most competitive arenas.
                  </p>
               </motion.div>
            </div>
         </section>

         <section className="py-12 px-6 max-w-[1400px] mx-auto text-brand-navy">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
               <div className="space-y-12">
                  <motion.div 
                     initial={{ opacity: 0, x: -30 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     className="space-y-6"
                  >
                     <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-[0.9]">
                        Strategic <br /><span className="text-brand-crimson">Preparation</span>
                     </h2>
                     <p className="text-slate-600 text-lg font-medium leading-relaxed max-w-2xl">
                        At St. Martins Group of Schools, we go beyond standard board curricula. Our integrated coaching programs prepare students for JEE and NEET while ensuring academic excellence.
                     </p>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {services.map((item, i) => (
                        <motion.button 
                           key={i} 
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: i * 0.1 }}
                           whileHover={{ y: -8, backgroundColor: "#0f172a" }}
                           onClick={() => setActiveService(i)}
                           className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 flex flex-col items-start text-left transition-all duration-300 group relative overflow-hidden"
                        >
                           <div className="absolute top-4 right-4 text-brand-crimson group-hover:text-white transition-colors opacity-20 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 group-hover:scale-125 transition-all">
                              <ChevronRight className="w-6 h-6" />
                           </div>
                           <item.icon className="text-brand-crimson w-10 h-10 mb-6 group-hover:text-white transition-colors group-hover:scale-110 transition-transform" />
                           <h4 className="font-black uppercase italic tracking-tight text-brand-navy group-hover:text-white mb-2 transition-colors">{item.title}</h4>
                           <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-white/60 transition-colors">{item.desc}</p>
                        </motion.button>
                     ))}
                  </div>
               </div>

               <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative rounded-[4rem] overflow-hidden group shadow-2xl border-8 border-slate-50"
               >
                  <img 
                     src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=1000" 
                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 min-h-[500px]" 
                     alt="High School Life" 
                  />
                  <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-transparent">
                     <p className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">
                        Record Breaking Results <br />
                        <span className="text-brand-crimson">Every Single Year</span>
                     </p>
                  </div>
               </motion.div>
            </div>
         </section>

         <AnimatePresence>
            {activeService !== null && (
               <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 text-brand-navy">
                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     onClick={handleClose}
                     className="absolute inset-0 bg-brand-navy/70 backdrop-blur-md"
                  />
                  <motion.div
                     initial={{ opacity: 0, scale: 0.9, y: 40 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.9, y: 40 }}
                     className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden relative z-10"
                  >
                     <div className={`${services[activeService].color} p-12 flex justify-center relative overflow-hidden`}>
                        <motion.div
                           initial={{ scale: 0 }}
                           animate={{ scale: 1 }}
                           transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        >
                           <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl">
                              {React.createElement(services[activeService].icon, { 
                                 className: `w-14 h-14 ${services[activeService].iconColor}`
                              })}
                           </div>
                        </motion.div>
                        <button 
                           onClick={handleClose}
                           className="absolute top-8 right-8 p-3 bg-white/40 hover:bg-white rounded-full transition-all"
                        >
                           <X className="w-6 h-6" />
                        </button>
                     </div>
                     
                     <div className="p-12 space-y-8 max-h-[60vh] overflow-y-auto scrollbar-hide">
                        <div className="space-y-3 text-center border-b border-slate-100 pb-8">
                           <h3 className="text-3xl font-black uppercase italic tracking-tighter">
                              {services[activeService].title}
                           </h3>
                           <p className="text-xs font-black text-brand-crimson uppercase tracking-[0.3em]">
                              {services[activeService].desc}
                           </p>
                        </div>
                        
                        <div className="space-y-6">
                           <p className="text-slate-600 text-lg font-medium leading-relaxed text-center italic">
                              "{services[activeService].details}"
                           </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           {services[activeService].highlights.map((highlight, hIndex) => (
                              <div key={hIndex} className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                 <Check className={`w-5 h-5 ${services[activeService].iconColor} shrink-0`} />
                                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{highlight}</span>
                              </div>
                           ))}
                        </div>


                     </div>
                  </motion.div>
               </div>
            )}
         </AnimatePresence>

         <PublicFooter />
      </div>
   );
};

export default HighSchoolPage;
