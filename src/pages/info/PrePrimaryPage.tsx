import React from 'react';
import PublicHeader from '../../components/layout/PublicHeader';
import PublicFooter from '../../components/layout/PublicFooter';
import { Baby, Sun, Flower2, Heart } from 'lucide-react';

const PrePrimaryPage = () => {
   return (
      <div className="min-h-screen bg-white font-sans">
         <PublicHeader />

         <section className="relative h-[400px] flex items-center overflow-hidden">
            <img
               src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1920"
               className="absolute inset-0 w-full h-full object-cover"
               alt="Pre-Primary"
            />
            <div className="absolute inset-0 bg-yellow-400 opacity-80 mix-blend-multiply" />
            <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full text-brand-navy">
               <h1 className="text-7xl font-black uppercase italic tracking-tighter">Pre-Primary <br /><span className="text-white drop-shadow-2xl">Discovery</span></h1>
               <p className="text-xl font-black uppercase tracking-[0.2em] mt-4 italic opacity-80">Where Curiously Meets Creativity</p>
            </div>
         </section>

         <section className="py-24 px-6 max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <div className="space-y-8">
                  <h2 className="text-5xl font-black text-brand-navy uppercase italic tracking-tighter leading-none">A Joyful Start to <br /><span className="text-brand-crimson">Learning</span></h2>
                  <p className="text-[#555] text-lg font-medium leading-relaxed">
                     Our Pre-Primary section is a magical world where young minds take their first steps into a life of learning. We follow a play-way methodology that emphasizes holistic development through sensory exploration and creative expression.
                  </p>
                  <div className="grid grid-cols-2 gap-6 pt-4">
                     {[
                        { icon: Baby, title: 'Safe Environment', desc: 'Secure & nurturing campus' },
                        { icon: Sun, title: 'Active Play', desc: 'Outdoor & indoor games' },
                        { icon: Flower2, title: 'Creativity', desc: 'Art & music sessions' },
                        { icon: Heart, title: 'Personal Care', desc: 'Dedicated child support' }
                     ].map((item, i) => (
                        <div key={i} className="flex gap-4 items-center">
                           <div className="bg-slate-50 p-2 rounded-xl">
                              <item.icon className="text-brand-crimson w-5 h-5" />
                           </div>
                           <p className="font-black text-[10px] uppercase tracking-widest text-brand-navy">{item.title}</p>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="relative">
                  <div className="absolute -inset-4 border-2 border-yellow-400 rounded-[4rem] rotate-3 z-0" />
                  <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b" className="relative z-10 w-full h-[500px] object-cover rounded-[4rem] shadow-2xl" alt="Toddlers" />
               </div>
            </div>
         </section>

         <PublicFooter />
      </div>
   );
};

export default PrePrimaryPage;
