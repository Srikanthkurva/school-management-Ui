import React, { useState } from 'react';
import PublicHeader from '../../components/layout/PublicHeader';
import PublicFooter from '../../components/layout/PublicFooter';
import { Microscope, Pencil, Library, Laptop, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FacilitiesPage = () => {
   const [activeFacility, setActiveFacility] = useState<null | number>(null);

   const facilities = [
      {
         icon: Microscope,
         title: 'Advanced Science Labs',
         desc: 'State-of-the-art laboratories for Physics, Chemistry, and Biology.',
         image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
         details: 'Our labs are equipped with international standard apparatus and safety systems. We follow a strict practical-first approach to scientific learning.',
         highlights: ['Micro-Biology Kits', 'Robotic Arms', 'Smart Safety Sensors', 'Advanced Optics Lab'],
         color: 'bg-blue-50',
         iconColor: 'text-blue-600'
      },
      {
         icon: Library,
         title: 'Digital Libraries',
         desc: 'Extensive collection of books, journals, and digital resources.',
         image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800',
         details: 'A quiet sanctuary with over 50,000 physical volumes and access to thousands of e-journals via our digital portal.',
         highlights: ['Kindle Corner', 'Research Cubicles', 'Audiobook Access', '24/7 Digital Portal'],
         color: 'bg-emerald-50',
         iconColor: 'text-emerald-600'
      },
      {
         icon: Laptop,
         title: 'Tech-Enabled Campus',
         desc: 'Smart classrooms with interactive panels and advanced computer labs.',
         image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=800',
         details: 'Every classroom is a smart-room. We integrate AR/VR technologies to make complex concepts visually engaging and easy to understand.',
         highlights: ['Fiber-Optic Wi-Fi', 'VR Learning Hub', '3D Printing Lab', 'Cyber-Security Suite'],
         color: 'bg-amber-50',
         iconColor: 'text-amber-600'
      },
      {
         icon: Pencil,
         title: 'Creative Studios',
         desc: 'Dedicated spaces for art, music, and performance.',
         image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800',
         details: 'From sound-proof music booths to high-ceiling art galleries, our studios are designed to let creativity flow without boundaries.',
         highlights: ['Music Mixing Desk', 'Sculpture Garden', 'Drama Rehearsal Hall', 'Visual Effects Suite'],
         color: 'bg-rose-50',
         iconColor: 'text-rose-600'
      }
   ];

   const handleClose = () => {
      setActiveFacility(null);
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
                  src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1920"
                  className="w-full h-full object-cover"
                  alt="Facilities"
               />
            </motion.div>
            <div className="absolute inset-0 bg-brand-navy/80 mix-blend-multiply" />
            <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full text-white">
               <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
               >
                  <h1 className="text-7xl font-black uppercase italic tracking-tighter leading-[0.9]">
                     World Class <br /><span className="text-brand-crimson drop-shadow-2xl">Infrastructure</span>
                  </h1>
                  <p className="text-xl text-white/70 max-w-2xl mt-6 font-medium uppercase tracking-[0.2em] italic">
                     Designing spaces that inspire learning
                  </p>
               </motion.div>
            </div>
         </section>

         <section className="py-12 px-6 max-w-[1400px] mx-auto text-brand-navy">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               {facilities.map((item, i) => (
                  <motion.div 
                     key={i}
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.1 }}
                     className="space-y-6 group cursor-pointer"
                     onClick={() => setActiveFacility(i)}
                  >
                     <div className="h-80 rounded-[3rem] overflow-hidden shadow-2xl relative">
                        <img 
                           src={item.image} 
                           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                           alt={item.title} 
                        />
                        <div className="absolute inset-0 bg-brand-navy/20 group-hover:bg-transparent transition-colors" />
                        <div className="absolute top-8 left-8 bg-brand-crimson p-4 rounded-2xl shadow-xl group-hover:rotate-12 transition-transform">
                           <item.icon className="text-white w-6 h-6" />
                        </div>
                     </div>
                     <h3 className="text-3xl font-black uppercase italic tracking-tight group-hover:text-brand-crimson transition-colors">{item.title}</h3>
                     <p className="text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                  </motion.div>
               ))}
            </div>
         </section>

         <AnimatePresence>
            {activeFacility !== null && (
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
                     className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden relative z-10 border border-white/20"
                  >
                     <div className={`${facilities[activeFacility].color} p-12 flex justify-center relative overflow-hidden`}>
                        <motion.div
                           initial={{ scale: 0, rotate: -45 }}
                           animate={{ scale: 1, rotate: 0 }}
                           transition={{ type: "spring", damping: 12, delay: 0.1 }}
                        >
                           <div className="bg-white p-6 rounded-3xl shadow-xl">
                              {React.createElement(facilities[activeFacility].icon, { 
                                 className: `w-14 h-14 ${facilities[activeFacility].iconColor}`
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
                     
                     <div className="p-12 space-y-8 text-center max-h-[60vh] overflow-y-auto scrollbar-hide">
                        <div className="space-y-2">
                           <h3 className="text-3xl font-black uppercase italic tracking-tighter">
                              {facilities[activeFacility].title}
                           </h3>
                           <div className="h-1 w-20 bg-brand-crimson mx-auto rounded-full" />
                        </div>
                        
                        <div className="space-y-6">
                           <p className="text-slate-600 font-medium leading-relaxed italic text-center">
                              "{facilities[activeFacility].details}"
                           </p>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-6 space-y-4 text-left">
                           {facilities[activeFacility].highlights.map((highlight, hIndex) => (
                              <div key={hIndex} className="flex items-center gap-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                 <Check className={`w-4 h-4 ${facilities[activeFacility].iconColor}`} />
                                 {highlight}
                              </div>
                           ))}
                        </div>

                        <button 
                           onClick={handleClose}
                           className="w-full bg-brand-navy text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-crimson transition-all shadow-xl"
                        >
                           Close Facility Info
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

export default FacilitiesPage;
