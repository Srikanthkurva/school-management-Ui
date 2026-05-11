import React, { useState } from 'react';
import PublicHeader from '../../components/layout/PublicHeader';
import PublicFooter from '../../components/layout/PublicFooter';
import { Baby, Sun, Flower2, Heart, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PrePrimaryPage = () => {
   const [activeFeature, setActiveFeature] = useState<null | number>(null);

   const features = [
      { 
         icon: Baby, 
         title: 'Safe Environment', 
         desc: 'Secure & nurturing campus',
         details: 'We provide a home-away-from-home experience where safety is integrated into every corner. Our facility features child-proofed corners, anti-skid flooring, and a dedicated infirmary.',
         highlights: ['24/7 CCTV Monitoring', 'RFID Enabled Entry', 'Live Class Feed', 'Fire Safety Certified'],
         color: 'bg-blue-50',
         iconColor: 'text-blue-600'
      },
      { 
         icon: Sun, 
         title: 'Active Play', 
         desc: 'Outdoor & indoor games',
         details: 'Our play-based learning approach uses movement to stimulate brain development. Children enjoy supervised sessions in our Splash Pool, Sand Pit, and multi-level Play Station.',
         highlights: ['Splash Pool Sessions', 'Organic Sand Pit', 'Tricycle Track', 'Soft-play Indoor Zone'],
         color: 'bg-orange-50',
         iconColor: 'text-orange-600'
      },
      { 
         icon: Flower2, 
         title: 'Creativity', 
         desc: 'Art & music sessions',
         details: 'We believe every child is born an artist. Our Little Creators studio offers clay modeling, finger painting, and music-and-movement classes.',
         highlights: ['Pottery & Clay Studio', 'Rhythmic Music Classes', 'Dramatic Play Area', 'Annual Art Showcase'],
         color: 'bg-pink-50',
         iconColor: 'text-pink-600'
      },
      { 
         icon: Heart, 
         title: 'Personal Care', 
         desc: 'Dedicated child support',
         details: 'Emotional intelligence is as important as IQ. Our nurturing caregivers follow a 1:12 teacher-student ratio, ensuring each child’s unique needs are met.',
         highlights: ['1:12 Teacher Ratio', 'Dietitian Approved Meals', 'Nap Room Facilities', 'EQ Development'],
         color: 'bg-red-50',
         iconColor: 'text-red-600'
      }
   ];

   const handleClose = () => {
      setActiveFeature(null);
   };

   return (
      <div className="min-h-screen bg-white font-sans overflow-x-hidden">
         <PublicHeader />

         <section className="relative h-[450px] flex items-center overflow-hidden text-brand-navy">
            <motion.div 
               initial={{ scale: 1.1 }}
               animate={{ scale: 1 }}
               transition={{ duration: 1.5 }}
               className="absolute inset-0"
            >
               <img
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1920"
                  className="w-full h-full object-cover"
                  alt="Pre-Primary"
               />
            </motion.div>
            <div className="absolute inset-0 bg-yellow-400 opacity-80 mix-blend-multiply" />
            <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full ">
               <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
               >
                  <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.9]">
                     Pre-Primary <br /><span className="text-white drop-shadow-2xl">Discovery</span>
                  </h1>
                  <p className="text-lg md:text-xl font-black uppercase tracking-[0.2em] mt-6 italic opacity-90 flex items-center gap-3">
                     <span className="w-12 h-1 bg-brand-navy hidden md:block"></span>
                     Where Curiosity Meets Creativity
                  </p>
               </motion.div>
            </div>
         </section>

         <section className="py-12 px-6 max-w-[1400px] mx-auto text-brand-navy">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
               <div className="space-y-10">
                  <motion.div
                     initial={{ opacity: 0, x: -30 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     className="space-y-6"
                  >
                     <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-[0.9]">
                        A Joyful Start to <br /><span className="text-brand-crimson">Learning</span>
                     </h2>
                     <p className="text-slate-600 text-lg font-medium leading-relaxed max-w-xl">
                        Our Pre-Primary section is a magical world where young minds take their first steps into a life of learning. We follow a play-way methodology that emphasizes holistic development.
                     </p>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                     {features.map((item, i) => (
                        <motion.button
                           key={i}
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: i * 0.1 }}
                           whileHover={{ scale: 1.02, translateY: -5 }}
                           whileTap={{ scale: 0.98 }}
                           onClick={() => setActiveFeature(i)}
                           className="flex gap-5 items-center p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all text-left"
                        >
                           <div className={`${item.color} p-4 rounded-xl shrink-0 shadow-inner`}>
                              <item.icon className={`${item.iconColor} w-6 h-6`} />
                           </div>
                           <div>
                              <p className="font-black text-[10px] uppercase tracking-widest text-brand-navy mb-1">{item.title}</p>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{item.desc}</p>
                           </div>
                        </motion.button>
                     ))}
                  </div>
               </div>

               <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative group"
               >
                  <div className="absolute -inset-6 border-2 border-yellow-400 rounded-[4rem] rotate-3 group-hover:rotate-6 transition-transform duration-700 z-0 opacity-40" />
                  <div className="absolute inset-0 bg-brand-crimson/10 rounded-[4rem] -translate-x-3 -translate-y-3 z-0" />
                  <img 
                     src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b" 
                     className="relative z-10 w-full h-[550px] object-cover rounded-[4rem] shadow-2xl " 
                     alt="Toddlers" 
                  />
               </motion.div>
            </div>
         </section>

         <AnimatePresence>
            {activeFeature !== null && (
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
                     <div className={`${features[activeFeature].color} p-10 flex justify-center relative overflow-hidden`}>
                        <motion.div
                           initial={{ scale: 0, rotate: -45 }}
                           animate={{ scale: 1, rotate: 0 }}
                           transition={{ type: "spring", damping: 12, delay: 0.1 }}
                        >
                           <div className="bg-white p-6 rounded-3xl shadow-xl">
                              {React.createElement(features[activeFeature].icon, { 
                                 className: `w-12 h-12 ${features[activeFeature].iconColor}`
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
                     
                     <div className="p-10 space-y-6 max-h-[60vh] overflow-y-auto scrollbar-hide">
                        <div className="text-center space-y-2">
                           <h3 className="text-2xl font-black uppercase italic tracking-tight">
                              {features[activeFeature].title}
                           </h3>
                           <p className="text-xs font-black text-brand-crimson uppercase tracking-[0.2em]">
                              {features[activeFeature].desc}
                           </p>
                        </div>
                        
                        <div className="space-y-6">
                           <p className="text-slate-600 font-medium leading-relaxed text-center italic">
                              "{features[activeFeature].details}"
                           </p>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-6 space-y-3">
                           {features[activeFeature].highlights.map((highlight, hIndex) => (
                              <div key={hIndex} className="flex items-center gap-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                 <Check className={`w-4 h-4 ${features[activeFeature].iconColor}`} />
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

export default PrePrimaryPage;
