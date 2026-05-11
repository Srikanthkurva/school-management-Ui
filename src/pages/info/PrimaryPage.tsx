import React, { useState } from 'react';
import PublicHeader from '../../components/layout/PublicHeader';
import PublicFooter from '../../components/layout/PublicFooter';
import { Pencil, Calculator, Globe, BookOpen, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PrimaryPage = () => {
   const [activeSubject, setActiveSubject] = useState<null | number>(null);

   const subjects = [
      { 
         icon: BookOpen, 
         title: 'English & Languages', 
         desc: 'Developing strong communication and literacy skills.',
         details: 'Our language program focuses on the four pillars of communication: Reading, Writing, Speaking, and Listening. We use phonetic-based learning in early years and transition to creative literature analysis.',
         highlights: ['Phonetics Mastery', 'Public Speaking Clubs', 'Creative Writing', 'Digital Literacy'],
         color: 'bg-indigo-50',
         iconColor: 'text-indigo-600'
      },
      { 
         icon: Calculator, 
         title: 'Mathematics', 
         desc: 'Logical reasoning through activity-based learning.',
         details: 'We make math fun through hands-on activities, mental math challenges, and real-world application. Students learn to think logically and solve complex problems with confidence.',
         highlights: ['Mental Math Labs', 'Vedic Math Intro', 'Robotics Integration', 'Logical Reasoning Kits'],
         color: 'bg-emerald-50',
         iconColor: 'text-emerald-600'
      },
      { 
         icon: Globe, 
         title: 'Social Studies', 
         desc: 'Understanding the world and our heritage.',
         details: 'Students explore history, geography, and civics through immersive projects. We aim to create global citizens who respect cultural diversity.',
         highlights: ['Virtual Field Trips', 'Model United Nations', 'Eco-Awareness Projects', 'Cultural Exchange'],
         color: 'bg-amber-50',
         iconColor: 'text-amber-600'
      },
      { 
         icon: Pencil, 
         title: 'Science', 
         desc: 'Encouraging curiosity and scientific investigation.',
         details: 'Our science curriculum is built around inquiry and experimentation. With modern labs and interactive demonstrations, we nurture natural curiosity.',
         highlights: ['Junior Science Lab', 'DIY Space Projects', 'Nature Observation', 'Science Fair Prep'],
         color: 'bg-rose-50',
         iconColor: 'text-rose-600'
      }
   ];

   const handleClose = () => {
      setActiveSubject(null);
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
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1920"
                  className="w-full h-full object-cover"
                  alt="Primary School"
               />
            </motion.div>
            <div className="absolute inset-0 bg-brand-navy/60 mix-blend-multiply" />
            <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full text-white">
               <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
               >
                  <h1 className="text-7xl font-black uppercase italic tracking-tighter leading-[0.9]">
                     Primary <br /><span className="text-brand-crimson drop-shadow-2xl">Excellence</span>
                  </h1>
                  <p className="text-xl font-black uppercase tracking-[0.2em] mt-6 italic text-white/70">
                     Building Foundations for Future Success
                  </p>
               </motion.div>
            </div>
         </section>

         <section className="py-12 px-6 max-w-[1400px] mx-auto text-brand-navy">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
               <div className="flex-1 space-y-12">
                  <motion.div 
                     initial={{ opacity: 0, x: -30 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     className="space-y-6"
                  >
                     <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-[0.9]">
                        Academic <br /><span className="text-brand-crimson">Rigor</span>
                     </h2>
                     <p className="text-slate-600 text-lg font-medium leading-relaxed max-w-2xl">
                        The Primary Wing at St. Martins Group of Schools is dedicated to providing a comprehensive curriculum that balances core academics with creative pursuits. Our focus is on developing critical thinking and linguistic proficiency.
                     </p>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {subjects.map((item, i) => (
                        <motion.button 
                           key={i}
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: i * 0.1 }}
                           whileHover={{ scale: 1.03, y: -5 }}
                           whileTap={{ scale: 0.97 }}
                           onClick={() => setActiveSubject(i)}
                           className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-brand-crimson/20 hover:shadow-xl transition-all group text-left relative overflow-hidden"
                        >
                           <div className="absolute top-0 right-0 w-24 h-24 bg-brand-crimson/5 rounded-bl-full translate-x-8 -translate-y-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500" />
                           <item.icon className="text-brand-crimson w-8 h-8 mb-4 group-hover:scale-110 transition-transform relative z-10" />
                           <h3 className="text-xl font-black uppercase italic mb-2 relative z-10">{item.title}</h3>
                           <p className="text-sm text-slate-500 font-bold uppercase tracking-tight relative z-10">{item.desc}</p>
                        </motion.button>
                     ))}
                  </div>
               </div>

               <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="w-full lg:w-[450px]"
               >
                  <div className="bg-brand-navy p-10 md:p-12 rounded-[3.5rem] text-white space-y-8 sticky top-32 shadow-2xl relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-x-12 -translate-y-12 blur-3xl pointer-events-none" />
                     <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-crimson/10 rounded-full translate-x-12 translate-y-12 blur-3xl pointer-events-none" />
                     
                     <h3 className="text-3xl font-black uppercase italic tracking-tighter relative z-10">Key <span className="text-brand-crimson">Highlights</span></h3>
                     <ul className="space-y-6 relative z-10">
                        {[
                           'Activity-based learning methodology',
                           'Smart classrooms for visualization',
                           'Focus on values and life skills',
                           'Regular Parent-Teacher Interaction'
                        ].map((text, i) => (
                           <motion.li 
                              key={i}
                              whileHover={{ x: 10 }}
                              className="flex gap-4 items-center group/item"
                           >
                              <div className="w-1.5 h-1.5 rounded-full bg-brand-crimson group-hover/item:scale-150 transition-transform shrink-0" />
                              <p className="text-xs font-black uppercase tracking-[0.2em] opacity-80 leading-relaxed group-hover/item:opacity-100 transition-opacity">{text}</p>
                           </motion.li>
                        ))}
                     </ul>

                     <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-white text-brand-navy py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl active:shadow-inner"
                     >
                        Download Curriculum Guide
                     </motion.button>
                  </div>
               </motion.div>
            </div>
         </section>

         <AnimatePresence>
            {activeSubject !== null && (
               <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 text-brand-navy">
                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     onClick={handleClose}
                     className="absolute inset-0 bg-brand-navy/60 backdrop-blur-md"
                  />
                  <motion.div
                     initial={{ opacity: 0, scale: 0.9, y: 40 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.9, y: 40 }}
                     className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden relative z-10 border border-white/20"
                  >
                     <div className={`${subjects[activeSubject].color} p-10 flex justify-center relative overflow-hidden`}>
                        <motion.div
                           initial={{ scale: 0, rotate: -45 }}
                           animate={{ scale: 1, rotate: 0 }}
                           transition={{ type: "spring", damping: 12, delay: 0.1 }}
                        >
                           <div className="bg-white p-6 rounded-3xl shadow-xl">
                              {React.createElement(subjects[activeSubject].icon, { 
                                 className: `w-12 h-12 ${subjects[activeSubject].iconColor}`
                              })}
                           </div>
                        </motion.div>
                        <button 
                           onClick={handleClose}
                           className="absolute top-6 right-6 p-2 bg-white/50 hover:bg-white rounded-full transition-colors"
                        >
                           <X className="w-5 h-5" />
                        </button>
                     </div>
                     
                     <div className="p-10 space-y-6 text-center max-h-[60vh] overflow-y-auto scrollbar-hide">
                        <div className="space-y-2 text-center">
                           <h3 className="text-2xl font-black uppercase italic tracking-tight">
                              {subjects[activeSubject].title}
                           </h3>
                           <div className="h-1 w-20 bg-brand-crimson mx-auto rounded-full" />
                        </div>
                        
                        <div className="space-y-6">
                           <p className="text-slate-600 font-medium leading-relaxed italic text-center">
                              "{subjects[activeSubject].details}"
                           </p>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-6 space-y-3 text-left">
                           {subjects[activeSubject].highlights.map((highlight, hIndex) => (
                              <div key={hIndex} className="flex items-center gap-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                 <Check className={`w-4 h-4 ${subjects[activeSubject].iconColor}`} />
                                 {highlight}
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

export default PrimaryPage;
