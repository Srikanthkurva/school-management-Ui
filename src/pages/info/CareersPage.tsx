import React from 'react';
import PublicHeader from '../../components/layout/PublicHeader';
import PublicFooter from '../../components/layout/PublicFooter';
import { Briefcase, UserPlus, Heart, Sparkles } from 'lucide-react';

const CareersPage = () => {
   return (
      <div className="min-h-screen bg-white font-sans">
         <PublicHeader />
         
         <section className="relative h-[400px] flex items-center overflow-hidden">
            <img 
               src="https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&q=80&w=1920" 
               className="absolute inset-0 w-full h-full object-cover" 
               alt="Careers"
            />
            <div className="absolute inset-0 bg-brand-navy/90 mix-blend-multiply" />
            <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full text-white">
               <span className="bg-brand-crimson px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6 inline-block">Hiring for 2026-27</span>
               <h1 className="text-7xl font-black uppercase italic tracking-tighter">Shape the <br /><span className="text-brand-crimson">Future</span></h1>
               <p className="text-xl text-white/60 max-w-xl mt-6 font-medium tracking-wide">Join Asia's largest and fastest-growing educational network. Empower the next generation of leaders.</p>
            </div>
         </section>

         <section className="py-24 px-6 max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
               <div className="space-y-12">
                  <div className="space-y-6">
                     <h2 className="text-4xl font-black text-brand-navy uppercase italic tracking-tighter">Why Sri Chaitanya?</h2>
                     <p className="text-gray-600 text-lg leading-relaxed">
                        We don't just offer jobs; we build careers. As a member of the Sri Chaitanya family, you'll be part of a revolutionary educational movement that impacts millions of lives.
                     </p>
                  </div>

                  <div className="space-y-8">
                     {[
                        { icon: Briefcase, title: 'Professional Growth', desc: 'Continuous training and development programs for all staff.' },
                        { icon: Heart, title: 'Inclusive Culture', desc: 'A supportive environment that values diversity and teamwork.' },
                        { icon: Sparkles, title: 'Innovation', desc: 'Work with the latest educational technologies and methodologies.' }
                     ].map((item, i) => (
                        <div key={i} className="flex gap-6 items-start">
                           <div className="bg-slate-50 p-4 rounded-2xl shadow-sm">
                              <item.icon className="text-brand-crimson w-6 h-6" />
                           </div>
                           <div>
                              <h3 className="text-lg font-black text-brand-navy uppercase italic mb-1">{item.title}</h3>
                              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="bg-slate-50 p-12 rounded-[3rem] border border-gray-100 shadow-2xl space-y-8">
                  <div className="text-center space-y-2">
                     <UserPlus className="w-12 h-12 text-brand-navy mx-auto mb-4" />
                     <h3 className="text-3xl font-black text-brand-navy uppercase italic">Apply Now</h3>
                     <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Submit your details for future openings</p>
                  </div>
                  
                  <form className="space-y-4">
                     <input type="text" placeholder="FULL NAME" className="w-full px-6 py-4 rounded-xl border-0 bg-white shadow-sm focus:ring-2 focus:ring-brand-crimson outline-none font-bold uppercase text-xs" />
                     <input type="email" placeholder="EMAIL ADDRESS" className="w-full px-6 py-4 rounded-xl border-0 bg-white shadow-sm focus:ring-2 focus:ring-brand-crimson outline-none font-bold uppercase text-xs" />
                     <select className="w-full px-6 py-4 rounded-xl border-0 bg-white shadow-sm focus:ring-2 focus:ring-brand-crimson outline-none font-bold uppercase text-xs">
                        <option>SELECT DEPARTMENT</option>
                        <option>ACADEMIC / TEACHING</option>
                        <option>ADMINISTRATION</option>
                        <option>SPORTS & WELLNESS</option>
                        <option>OPERATIONS</option>
                     </select>
                     <textarea placeholder="TELL US ABOUT YOUR EXPERIENCE" rows={4} className="w-full px-6 py-4 rounded-xl border-0 bg-white shadow-sm focus:ring-2 focus:ring-brand-crimson outline-none font-bold uppercase text-xs"></textarea>
                     <button className="w-full bg-brand-navy text-white py-5 rounded-xl font-black uppercase tracking-[0.2em] shadow-xl hover:bg-brand-crimson transition-all active:scale-95">Send Application</button>
                  </form>
               </div>
            </div>
         </section>

         <PublicFooter />
      </div>
   );
};

export default CareersPage;
