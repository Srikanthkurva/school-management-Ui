import React from 'react';
import PublicHeader from '../../components/layout/PublicHeader';
import PublicFooter from '../../components/layout/PublicFooter';
import { Camera, Music, Palette, Trophy } from 'lucide-react';

const StudentLifePage = () => {
   return (
      <div className="min-h-screen bg-white font-sans">
         <PublicHeader />
         
         <section className="relative h-[400px] flex items-center overflow-hidden">
            <img 
               src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=1920" 
               className="absolute inset-0 w-full h-full object-cover" 
               alt="Student Life"
            />
            <div className="absolute inset-0 bg-brand-crimson/80 mix-blend-multiply" />
            <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full text-white text-center">
               <h1 className="text-7xl font-black uppercase italic tracking-tighter drop-shadow-2xl">Student Life</h1>
               <p className="text-xl text-white/90 max-w-2xl mt-4 font-black uppercase tracking-[0.3em] mx-auto">Beyond the Classroom</p>
            </div>
         </section>

         <section className="py-24 px-6 max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {[
                  { icon: Trophy, title: 'Sports & Athletics', desc: 'World-class training centers for cricket, basketball, and more.' },
                  { icon: Music, title: 'Performing Arts', desc: 'Cultivating talent in music, dance, and theater.' },
                  { icon: Palette, title: 'Arts & Crafts', desc: 'Nurturing creativity through various artistic mediums.' },
                  { icon: Camera, title: 'Clubs & Societies', desc: 'Photography, coding, and environmental leadership clubs.' }
               ].map((item, i) => (
                  <div key={i} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 group">
                     <div className="bg-brand-crimson/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-crimson transition-colors">
                        <item.icon className="text-brand-crimson group-hover:text-white transition-colors w-8 h-8" />
                     </div>
                     <h3 className="text-xl font-black text-brand-navy uppercase italic tracking-tight mb-3">{item.title}</h3>
                     <p className="text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                  </div>
               ))}
            </div>

            <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12">
               <div className="rounded-[4rem] overflow-hidden shadow-2xl h-[500px]">
                  <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Student Activity" />
               </div>
               <div className="flex flex-col justify-center space-y-8 px-6">
                  <h2 className="text-5xl font-black text-brand-navy uppercase italic tracking-tighter leading-none">A Vibrant Campus <br /><span className="text-brand-crimson">Community</span></h2>
                  <p className="text-[#555] text-lg font-medium leading-relaxed">
                     At Sri Chaitanya, we believe that education extends far beyond textbooks. Our campus life is designed to foster leadership, teamwork, and individual passion. Every day is an opportunity for students to discover new interests and build lifelong friendships.
                  </p>
                  <div className="flex gap-4">
                     <button className="bg-brand-navy text-white px-10 py-4 rounded-full font-black uppercase tracking-widest hover:bg-brand-crimson transition-all">Explore Clubs</button>
                  </div>
               </div>
            </div>
         </section>

         <PublicFooter />
      </div>
   );
};

export default StudentLifePage;
