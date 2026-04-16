import React from 'react';
import PublicHeader from '../../components/layout/PublicHeader';
import PublicFooter from '../../components/layout/PublicFooter';
import { Camera } from 'lucide-react';

const GalleryPage = () => {
   const images = [
      'https://images.unsplash.com/photo-1523580494863-6f3031224c94',
      'https://images.unsplash.com/photo-1562774053-701939374585',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      'https://images.unsplash.com/photo-1521587760476-6c12a4b040da',
      'https://images.unsplash.com/photo-1547082299-de196ea013d6',
      'https://images.unsplash.com/photo-1460518451285-cd7ba747452d',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b'
   ];

   return (
      <div className="min-h-screen bg-white font-sans">
         <PublicHeader />

         <section className="bg-brand-navy py-20 px-6 text-center">
            <div className="max-w-[1400px] mx-auto space-y-4">
               <Camera className="w-12 h-12 text-brand-crimson mx-auto mb-6" />
               <h1 className="text-7xl font-black text-white uppercase italic tracking-tighter">Campus <span className="text-brand-crimson">Moments</span></h1>
               <p className="text-white/40 font-bold uppercase tracking-[0.4em] text-sm">A glimpse into life at Sri Chaitanya</p>
            </div>
         </section>

         <section className="py-24 px-6 max-w-[1400px] mx-auto">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
               {images.map((img, i) => (
                  <div key={i} className="break-inside-avoid relative group rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-zoom-in">
                     <img
                        src={`${img}?auto=format&fit=crop&q=80&w=800`}
                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                        alt="Campus"
                     />
                     <div className="absolute inset-0 bg-brand-navy/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Camera className="text-white w-10 h-10 transform translate-y-4 group-hover:translate-y-0 transition-transform" />
                     </div>
                  </div>
               ))}
            </div>
         </section>

         <PublicFooter />
      </div>
   );
};

export default GalleryPage;
