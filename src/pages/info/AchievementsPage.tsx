import React from 'react';
import PublicHeader from '../../components/layout/PublicHeader';
import PublicFooter from '../../components/layout/PublicFooter';
import { Trophy, Star, Medal, Flag } from 'lucide-react';

const AchievementsPage = () => {
   return (
      <div className="min-h-screen bg-white font-sans">
         <PublicHeader />
         
         <section className="relative h-[400px] flex items-center overflow-hidden">
            <img 
               src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1920" 
               className="absolute inset-0 w-full h-full object-cover" 
               alt="Achievements"
            />
            <div className="absolute inset-0 bg-yellow-400 opacity-60 mix-blend-multiply" />
            <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full text-brand-navy">
               <h1 className="text-8xl font-black uppercase italic tracking-tighter leading-[0.8]">Our <br /><span className="text-white drop-shadow-2xl">Legacy</span></h1>
               <p className="text-2xl font-black uppercase tracking-[0.2em] mt-4 italic">Dominating National Ranks for 38+ Years</p>
            </div>
         </section>

         <section className="py-24 px-6 max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
               <div className="bg-brand-navy p-16 rounded-[4rem] text-white space-y-8 flex flex-col justify-center shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-12 opacity-10">
                     <Trophy className="w-64 h-64" />
                  </div>
                  <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-none relative z-10">Undisputed Leaders <br /><span className="text-brand-crimson">In JEE & NEET</span></h2>
                  <p className="text-white/60 text-lg relative z-10 font-medium">Sri Chaitanya students consistently secure the top ranks in national-level competitive examinations, setting new benchmarks every year.</p>
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
               </div>

               <div className="grid grid-cols-2 gap-8">
                  {[
                     { icon: Medal, title: 'KVPY', desc: 'Highest qualifiers in India' },
                     { icon: Flag, title: 'Olympiads', desc: 'Gold medals in Math & Science' },
                     { icon: Star, title: 'Board Exams', desc: '100% success rate every year' },
                     { icon: Trophy, title: 'Sports', desc: 'National level champions' }
                  ].map((item, i) => (
                     <div key={i} className="bg-slate-50 p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all hover:-translate-y-1 group text-center space-y-4">
                        <item.icon className="text-brand-crimson w-12 h-12 mx-auto group-hover:scale-110 transition-transform" />
                        <h3 className="text-xl font-black text-brand-navy uppercase italic">{item.title}</h3>
                        <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">{item.desc}</p>
                     </div>
                  ))}
               </div>
            </div>

            <div className="space-y-12">
               <h2 className="text-4xl font-black text-brand-navy uppercase italic tracking-tighter text-center">Wall of Honor</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[1, 2, 3].map(i => (
                     <div key={i} className="bg-white p-2 rounded-[3rem] border border-gray-100 shadow-xl overflow-hidden group">
                        <div className="h-80 rounded-[2.8rem] overflow-hidden mb-6 relative">
                           <img src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Student" />
                           <div className="absolute inset-0 bg-gradient-to-t from-brand-navy opacity-60" />
                           <div className="absolute bottom-6 left-6 text-white">
                              <p className="text-2xl font-black italic tracking-tighter">SUCCESS STORY #{i}</p>
                              <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Batch of 2023</p>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         <PublicFooter />
      </div>
   );
};

export default AchievementsPage;
