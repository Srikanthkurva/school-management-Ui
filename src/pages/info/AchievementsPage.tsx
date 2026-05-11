import React, { useState } from 'react';
import PublicHeader from '../../components/layout/PublicHeader';
import PublicFooter from '../../components/layout/PublicFooter';
import { Trophy, Star, Medal, Flag, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AchievementsPage = () => {
   const [activeAchievement, setActiveAchievement] = useState<null | number>(null);

   const achievements = [
      { 
         icon: Medal, 
         title: 'KVPY Scholars', 
         desc: 'Highest qualifiers in India',
         details: 'Year after year, St. Martins Group of Schools produces the highest number of KVPY scholars who go on to pursue careers in pure sciences at premier institutes.',
         highlights: ['150+ Qualifiers annually', 'Specialized Research Kits', 'Mock Interview Support', 'Scholarship Guidance'],
         color: 'bg-indigo-50',
         iconColor: 'text-indigo-600'
      },
      { 
         icon: Flag, 
         title: 'Olympiad Gold', 
         desc: 'Medals in Math & Science',
         details: 'Our students represent India at International Olympiads, winning gold and silver medals in Physics, Chemistry, and Mathematics.',
         highlights: ['International Gold Medals', 'National Camp Hosting', 'Olympiad Expert Faculty', 'Resource Libraries'],
         color: 'bg-amber-50',
         iconColor: 'text-amber-600'
      },
      { 
         icon: Star, 
         title: 'Board Excellence', 
         desc: '100% success rate monthly',
         details: 'Beyond competitive exams, we maintain a perfect record in State and CBSE boards, with thousands of students scoring above 95%.',
         highlights: ['Consecutive 100% Pass', 'District Top Ranks', 'Subject Perfectionists', 'Writing Workshops'],
         color: 'bg-emerald-50',
         iconColor: 'text-emerald-600'
      },
      { 
         icon: Trophy, 
         title: 'Sports Glory', 
         desc: 'National level champions',
         details: 'Our athletes dominate the field in Cricket, Swimming, and Athletics, bringing home trophies from national inter-school meets.',
         highlights: ['National Level Teams', 'Professional Coaches', 'Regional Trophy Winners', 'Sports Talent Hunt'],
         color: 'bg-rose-50',
         iconColor: 'text-rose-600'
      }
   ];

   const handleClose = () => {
      setActiveAchievement(null);
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
                  alt="Achievements"
               />
            </motion.div>
            <div className="absolute inset-0 bg-yellow-400 opacity-60 mix-blend-multiply" />
            <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full text-brand-navy">
               <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
               >
                  <h1 className="text-8xl font-black uppercase italic tracking-tighter leading-[0.8]">Our <br /><span className="text-white drop-shadow-2xl">Legacy</span></h1>
                  <p className="text-2xl font-black uppercase tracking-[0.2em] mt-6 italic">Dominating National Ranks for 38+ Years</p>
               </motion.div>
            </div>
         </section>

         <section className="py-12 px-6 max-w-[1400px] mx-auto text-brand-navy">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
               <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-brand-navy p-16 rounded-[4rem] text-white space-y-8 flex flex-col justify-center shadow-2xl relative overflow-hidden group"
               >
                  <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-700">
                     <Trophy className="w-64 h-64" />
                  </div>
                  <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-none relative z-10">Undisputed Leaders <br /><span className="text-brand-crimson">In JEE & NEET</span></h2>
                  <p className="text-white/60 text-lg relative z-10 font-medium italic">St. Martins Group of Schools students consistently secure the top ranks, setting new benchmarks every year.</p>
                  <div className="grid grid-cols-2 gap-8 relative z-10">
                     <div className="space-y-1">
                        <p className="text-5xl font-black text-brand-crimson italic tracking-tight">AIR 1</p>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">JEE ADVANCED 2023</p>
                     </div>
                     <div className="space-y-1">
                        <p className="text-5xl font-black text-brand-crimson italic tracking-tight">AIR 1</p>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">NEET UG 2023</p>
                     </div>
                  </div>
               </motion.div>

               <div className="grid grid-cols-2 gap-2 md:gap-8">
                  {achievements.map((item, i) => (
                     <motion.button 
                        key={i} 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveAchievement(i)}
                        className="bg-slate-50 p-10 rounded-[3rem] border border-gray-100 text-center space-y-4 group transition-all"
                     >
                        <item.icon className="text-brand-crimson w-12 h-12 mx-auto group-hover:scale-110 transition-transform" />
                        <h3 className="text-xl font-black uppercase italic tracking-tight text-brand-navy">{item.title}</h3>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.desc}</p>
                     </motion.button>
                  ))}
               </div>
            </div>

            <div className="space-y-8">
               <h2 className="text-4xl font-black uppercase italic tracking-tighter text-center">Wall of Honor</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[1, 2, 3].map(i => (
                     <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-2 rounded-[3.5rem] border border-gray-100 shadow-xl overflow-hidden group relative"
                     >
                        <div className="h-80 rounded-[3.2rem] overflow-hidden mb-6 relative">
                           <img src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Student" />
                           <div className="absolute inset-0 bg-gradient-to-t from-brand-navy opacity-60" />
                           <div className="absolute bottom-10 left-10 text-white">
                              <p className="text-2xl font-black italic tracking-tighter">SUCCESS STORY #{i}</p>
                              <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Batch of 2023</p>
                           </div>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         <AnimatePresence>
            {activeAchievement !== null && (
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
                     className="bg-white w-full max-w-lg rounded-[3.5rem] shadow-2xl overflow-hidden relative z-10 border border-white/20"
                  >
                     <div className={`${achievements[activeAchievement].color} p-12 flex justify-center relative overflow-hidden`}>
                        <motion.div
                           initial={{ scale: 0, rotate: -45 }}
                           animate={{ scale: 1, rotate: 0 }}
                           transition={{ type: "spring", damping: 12, delay: 0.1 }}
                        >
                           <div className="bg-white p-6 rounded-3xl shadow-xl">
                              {React.createElement(achievements[activeAchievement].icon, { 
                                 className: `w-14 h-14 ${achievements[activeAchievement].iconColor}`
                              })}
                           </div>
                        </motion.div>
                        <button 
                           onClick={handleClose}
                           className="absolute top-8 right-8 p-2 bg-white/50 hover:bg-white rounded-full transition-colors"
                        >
                           <X className="w-6 h-6" />
                        </button>
                     </div>
                     
                     <div className="p-12 space-y-8 text-center max-h-[65vh] overflow-y-auto scrollbar-hide">
                        <div className="space-y-2">
                           <h3 className="text-3xl font-black uppercase italic tracking-tighter">
                              {achievements[activeAchievement].title}
                           </h3>
                           <p className="text-xs font-black text-brand-crimson uppercase tracking-[0.2em]">
                              {achievements[activeAchievement].desc}
                           </p>
                        </div>
                        
                        <div className="space-y-6">
                           <p className="text-slate-600 font-medium leading-relaxed italic text-center">
                              "{achievements[activeAchievement].details}"
                           </p>
                        </div>

                        <div className="bg-slate-50 rounded-3xl p-8 space-y-4 text-left">
                           {achievements[activeAchievement].highlights.map((highlight, hIndex) => (
                              <div key={hIndex} className="flex items-center gap-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                 <Check className={`w-4 h-4 ${achievements[activeAchievement].iconColor}`} />
                                 {highlight}
                              </div>
                           ))}
                        </div>

                        <button 
                           onClick={handleClose}
                           className="w-full bg-brand-navy text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-crimson transition-all shadow-xl"
                        >
                           Close Legacy Details
                        </button>
                     </div>
                  </motion.div>
               </div>
            )}
         </AnimatePresence>

         <PublicFooter />
      </div>
   );
};

export default AchievementsPage;
