import React from 'react';
import PublicHeader from '../../components/layout/PublicHeader';
import PublicFooter from '../../components/layout/PublicFooter';
import { Shield, Check } from 'lucide-react';

const UniformsPage = () => {
   return (
      <div className="min-h-screen bg-white font-sans">
         <PublicHeader />
         
         <section className="relative h-[400px] flex items-center overflow-hidden">
            <img 
               src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1920" 
               className="absolute inset-0 w-full h-full object-cover opacity-50" 
               alt="Uniforms"
            />
            <div className="absolute inset-0 bg-brand-navy mix-blend-multiply" />
            <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full text-white text-center">
               <h1 className="text-8xl font-black uppercase italic tracking-tighter">Identity & <br /><span className="text-brand-crimson">Pride</span></h1>
               <p className="text-xl font-black uppercase tracking-[0.3em] mt-4 italic opacity-70">The Sri Chaitanya Uniform Guidelines</p>
            </div>
         </section>

         <section className="py-24 px-6 max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
               <div className="space-y-12 flex flex-col justify-center">
                  <div className="space-y-6">
                     <h2 className="text-5xl font-black text-brand-navy uppercase italic tracking-tighter">Wearing Our <br /><span className="text-brand-crimson text-4xl">Values</span></h2>
                     <p className="text-[#555] text-lg font-medium leading-relaxed">
                        Our uniform is a symbol of unity, discipline, and the pursuit of excellence. It brings students together as one family and represents the rich legacy of our institution.
                     </p>
                  </div>

                  <div className="space-y-6">
                     {[
                        'Proper fit and clean appearance are mandatory.',
                        'Navy blue blazers are required for formal ceremonies.',
                        'Specific PE uniforms for sports and activity days.',
                        'School IDs must be worn at all times.'
                     ].map((text, i) => (
                        <div key={i} className="flex gap-4 items-center">
                           <div className="w-6 h-6 rounded-full bg-brand-crimson/10 flex items-center justify-center shrink-0">
                              <Check className="text-brand-crimson w-3 h-3" strokeWidth={4} />
                           </div>
                           <p className="font-black text-[10px] uppercase tracking-widest text-[#222]">{text}</p>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="bg-slate-50 p-16 rounded-[4rem] border border-gray-100 flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                     <img src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Fabric" />
                  </div>
                  <div className="relative z-10 text-center space-y-8">
                     <Shield className="w-32 h-32 text-brand-navy mx-auto drop-shadow-2xl" strokeWidth={1} />
                     <p className="text-brand-navy font-black text-2xl uppercase italic tracking-tighter max-w-xs mx-auto">Quality material designed for comfort and durability.</p>
                  </div>
               </div>
            </div>
         </section>

         <PublicFooter />
      </div>
   );
};

export default UniformsPage;
