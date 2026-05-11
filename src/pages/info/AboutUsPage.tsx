import React, { useState } from 'react';
import PublicHeader from '../../components/layout/PublicHeader';
import PublicFooter from '../../components/layout/PublicFooter';
import { Target, Users, Award, ShieldCheck, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AboutUsPage = () => {
   const [activeItem, setActiveItem] = useState<null | number>(null);

   const aboutItems = [
      {
         icon: Target,
         title: 'Our Vision',
         desc: 'Pioneering global education standards',
         details: 'To empower students by providing world-class education that fosters critical thinking and global competitiveness. We aim to bridge the gap between traditional learning and modern innovative requirements.',
         highlights: ['Integrated Curriculum', 'Future-Ready Skills', 'Global Benchmarking', 'Ethical Leadership'],
         color: 'bg-red-50',
         iconColor: 'text-brand-crimson'
      },
      {
         icon: Users,
         title: 'Community',
         desc: 'Over 1 Million successful alumni',
         details: 'Our alumni network spans across the globe, with leaders in medicine, technology, and governance. We believe in lifelong learning and peer support through a vast professional network.',
         highlights: ['1M+ Alumni Network', 'Global Connections', 'Mentorship Programs', 'Alumni Events'],
         color: 'bg-blue-50',
         iconColor: 'text-blue-600'
      },
      {
         icon: Award,
         title: 'Excellence',
         desc: 'Asia\'s Most Trusted Brand',
         details: 'Consistently producing top ranks in JEE, NEET, and board exams. Our record reflects our deep commitment to superior teaching methodologies and comprehensive student monitoring.',
         highlights: ['Record Top Ranks', 'Award-Winning Faculty', 'Superior Pedagogy', 'National Recognition'],
         color: 'bg-amber-50',
         iconColor: 'text-amber-600'
      },
      {
         icon: ShieldCheck,
         title: 'Quality',
         desc: 'Unmatched academic results',
         details: 'Maintaining the highest standards in faculty selection, curriculum design, and support services. We prioritize individualized learning paths and rigorous quality control in every department.',
         highlights: ['ISO Certified Standards', 'Expert Subject Faculty', 'High-Tech Labs', 'Continuous Assessment'],
         color: 'bg-emerald-50',
         iconColor: 'text-emerald-600'
      }
   ];

   const handleClose = () => {
      setActiveItem(null);
   };

   return (
      <div className="min-h-screen bg-white font-sans overflow-x-hidden">
         <PublicHeader />
         
         <section className="relative h-[400px] flex items-center overflow-hidden">
            <motion.div 
               initial={{ scale: 1.1 }}
               animate={{ scale: 1 }}
               transition={{ duration: 1.5 }}
               className="absolute inset-0"
            >
               <img 
                  src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1920" 
                  className="w-full h-full object-cover" 
                  alt="About St. Martins Group of Schools"
               />
            </motion.div>
            <div className="absolute inset-0 bg-brand-navy/80 mix-blend-multiply" />
            <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full text-white">
               <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
               >
                  <h1 className="text-6xl md:text-7xl font-black uppercase italic tracking-tighter">About Us</h1>
                  <p className="text-xl text-white/70 max-w-2xl mt-4 font-black uppercase tracking-[0.2em]">Legacy of Excellence</p>
               </motion.div>
            </div>
         </section>

         <section className="py-12 px-6 max-w-[1400px] mx-auto text-brand-navy">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
               <div className="space-y-8">
                  <motion.div
                     initial={{ opacity: 0, x: -30 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                   >
                     <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter border-l-8 border-brand-crimson pl-6">The St. Martins Story</h2>
                  </motion.div>
                  <p className="text-slate-600 text-lg leading-relaxed font-medium">
                     St. Martins Group of Schools first surfaced on the academic horizon in 1986 and within a span of 38 years, it has become one of the largest educational institutions. The journey began with a vision to provide a new dimension to education.
                  </p>
                  <p className="text-slate-600 text-lg leading-relaxed font-medium">
                     Today, we stand as a beacon of academic excellence, nurturing millions of students and helping them achieve their dreams of becoming world-class doctors, engineers, and leaders.
                  </p>
               </div>
               <div className="grid grid-cols-2 gap-6">
                  {aboutItems.map((item, i) => (
                     <motion.button 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -10 }}
                        onClick={() => setActiveItem(i)}
                        className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 flex flex-col items-center text-center space-y-4 hover:bg-white transition-all group shadow-sm hover:shadow-xl"
                     >
                        <item.icon className={`w-12 h-12 ${item.iconColor} group-hover:scale-110 transition-transform`} />
                        <h3 className="font-black text-brand-navy uppercase tracking-widest text-xs">{item.title}</h3>
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-wider opacity-60 leading-tight">{item.desc}</p>
                     </motion.button>
                  ))}
               </div>
            </div>
         </section>

         <AnimatePresence>
            {activeItem !== null && (
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
                     <div className={`${aboutItems[activeItem].color} p-12 flex justify-center relative overflow-hidden`}>
                        <motion.div
                           initial={{ scale: 0, rotate: -45 }}
                           animate={{ scale: 1, rotate: 0 }}
                           transition={{ type: "spring", damping: 12, delay: 0.1 }}
                        >
                           <div className="bg-white p-6 rounded-3xl shadow-xl">
                              {React.createElement(aboutItems[activeItem].icon, { 
                                 className: `w-14 h-14 ${aboutItems[activeItem].iconColor}`
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
                     
                     <div className="p-12 space-y-8 text-center scrollbar-hide max-h-[60vh] overflow-y-auto">
                        <div className="space-y-2">
                           <h3 className="text-3xl font-black uppercase italic tracking-tighter">
                              {aboutItems[activeItem].title}
                           </h3>
                           <p className="text-xs font-black text-brand-crimson uppercase tracking-[0.2em]">
                              {aboutItems[activeItem].desc}
                           </p>
                        </div>
                        
                        <div className="space-y-6">
                           <p className="text-slate-600 font-medium leading-relaxed italic">
                              "{aboutItems[activeItem].details}"
                           </p>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-6 space-y-3 text-left">
                           {aboutItems[activeItem].highlights.map((highlight, hIndex) => (
                              <div key={hIndex} className="flex items-center gap-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                 <Check className={`w-4 h-4 ${aboutItems[activeItem].iconColor}`} />
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

export default AboutUsPage;
