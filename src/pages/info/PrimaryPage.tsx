import React from 'react';
import PublicHeader from '../../components/layout/PublicHeader';
import PublicFooter from '../../components/layout/PublicFooter';
import { Pencil, Calculator, Globe, BookOpen } from 'lucide-react';

const PrimaryPage = () => {
   return (
      <div className="min-h-screen bg-white font-sans">
         <PublicHeader />

         <section className="relative h-[400px] flex items-center overflow-hidden">
            <img
               src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1920"
               className="absolute inset-0 w-full h-full object-cover"
               alt="Primary School"
            />
            <div className="absolute inset-0 bg-brand-navy/60 mix-blend-multiply" />
            <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full text-white">
               <h1 className="text-7xl font-black uppercase italic tracking-tighter">Primary <br /><span className="text-brand-crimson">Excellence</span></h1>
               <p className="text-xl font-black uppercase tracking-[0.2em] mt-4 italic text-white/70">Building Strong Foundations for Future Success</p>
            </div>
         </section>

         <section className="py-24 px-6 max-w-[1400px] mx-auto">
            <div className="flex flex-col lg:flex-row gap-20">
               <div className="flex-1 space-y-12">
                  <div className="space-y-6">
                     <h2 className="text-5xl font-black text-brand-navy uppercase italic tracking-tighter">Academic <br /><span className="text-brand-crimson">Rigor</span></h2>
                     <p className="text-[#555] text-lg font-medium leading-relaxed">
                        The Primary Wing at Sri Chaitanya is dedicated to providing a comprehensive curriculum that balances core academics with creative pursuits. Our focus is on developing critical thinking, linguistic proficiency, and mathematical reasoning in a supportive and engaging environment.
                     </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {[
                        { icon: BookOpen, title: 'English & Languages', desc: 'Developing strong communication and literacy skills.' },
                        { icon: Calculator, title: 'Mathematics', desc: 'Logical reasoning and problem-solving through activity-based learning.' },
                        { icon: Globe, title: 'Social Studies', desc: 'Understanding the world and our heritage.' },
                        { icon: Pencil, title: 'Science', desc: 'Encouraging curiosity and scientific investigation.' }
                     ].map((item, i) => (
                        <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-gray-100 hover:shadow-xl transition-all group">
                           <item.icon className="text-brand-crimson w-8 h-8 mb-4 group-hover:scale-110 transition-transform" />
                           <h3 className="text-xl font-black text-brand-navy uppercase italic mb-2">{item.title}</h3>
                           <p className="text-sm text-gray-500 font-medium">{item.desc}</p>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="w-full lg:w-[450px]">
                  <div className="bg-brand-navy p-12 rounded-[4rem] text-white space-y-8 sticky top-32 shadow-2xl">
                     <h3 className="text-3xl font-black uppercase italic tracking-tighter">Key Highlights</h3>
                     <ul className="space-y-6">
                        <li className="flex gap-4 items-start">
                           <div className="w-2 h-2 rounded-full bg-brand-crimson mt-2 shrink-0" />
                           <p className="text-sm font-bold uppercase tracking-widest opacity-80 leading-relaxed">Activity-based learning methodology</p>
                        </li>
                        <li className="flex gap-4 items-start">
                           <div className="w-2 h-2 rounded-full bg-brand-crimson mt-2 shrink-0" />
                           <p className="text-sm font-bold uppercase tracking-widest opacity-80 leading-relaxed">Smart classrooms for visualization</p>
                        </li>
                        <li className="flex gap-4 items-start">
                           <div className="w-2 h-2 rounded-full bg-brand-crimson mt-2 shrink-0" />
                           <p className="text-sm font-bold uppercase tracking-widest opacity-80 leading-relaxed">Focus on values and life skills</p>
                        </li>
                        <li className="flex gap-4 items-start">
                           <div className="w-2 h-2 rounded-full bg-brand-crimson mt-2 shrink-0" />
                           <p className="text-sm font-bold uppercase tracking-widest opacity-80 leading-relaxed">Regular Parent-Teacher Interaction</p>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         </section>

         <PublicFooter />
      </div>
   );
};

export default PrimaryPage;
