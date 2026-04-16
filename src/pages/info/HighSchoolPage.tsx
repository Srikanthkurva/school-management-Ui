import React from 'react';
import PublicHeader from '../../components/layout/PublicHeader';
import PublicFooter from '../../components/layout/PublicFooter';
import { Target, Lightbulb, GraduationCap, Award } from 'lucide-react';

const HighSchoolPage = () => {
   return (
      <div className="min-h-screen bg-white font-sans">
         <PublicHeader />
         
         <section className="relative h-[400px] flex items-center overflow-hidden">
            <img 
               src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1920" 
               className="absolute inset-0 w-full h-full object-cover" 
               alt="High School"
            />
            <div className="absolute inset-0 bg-brand-navy/80 mix-blend-multiply" />
            <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full text-white">
               <span className="bg-brand-crimson px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6 inline-block">Grade 8 to 12</span>
               <h1 className="text-8xl font-black uppercase italic tracking-tighter leading-none">The Academy of <br /><span className="text-brand-crimson text-7xl">Champions</span></h1>
               <p className="text-xl text-white/50 max-w-xl mt-6 font-medium italic">Preparing students for the world's most competitive arenas.</p>
            </div>
         </section>

         <section className="py-24 px-6 max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
               <div className="space-y-12">
                  <div className="space-y-6">
                     <h2 className="text-5xl font-black text-brand-navy uppercase italic tracking-tighter">Strategic <br /><span className="text-brand-crimson">Preparation</span></h2>
                     <p className="text-[#555] text-lg font-medium leading-relaxed">
                        At Sri Chaitanya High School, we go beyond standard board curricula. Our integrated coaching programs prepare students for JEE, NEET, and other national competitive exams while ensuring academic excellence in school boards.
                     </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                     {[
                        { icon: Target, title: 'Integrated Prep', desc: 'JEE/NEET focused coaching' },
                        { icon: Lightbulb, title: 'Expert Faculty', desc: 'National-level educators' },
                        { icon: Award, title: 'Regular Tests', desc: 'Weekly ranking assessments' },
                        { icon: GraduationCap, title: 'Counseling', desc: 'Career guidance sessions' }
                     ].map((item, i) => (
                        <div key={i} className="bg-slate-50 p-8 rounded-3xl border border-gray-100 space-y-3 hover:bg-brand-navy hover:text-white transition-all group">
                           <item.icon className="text-brand-crimson w-10 h-10 group-hover:text-white transition-colors" />
                           <h4 className="font-black uppercase italic tracking-tight">{item.title}</h4>
                           <p className="text-xs opacity-60 font-medium leading-relaxed">{item.desc}</p>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="relative rounded-[4rem] overflow-hidden group shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="High School Life" />
                  <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-transparent">
                     <p className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">Record Breaking Results <br /><span className="text-brand-crimson">Every Single Year</span></p>
                  </div>
               </div>
            </div>
         </section>

         <PublicFooter />
      </div>
   );
};

export default HighSchoolPage;
