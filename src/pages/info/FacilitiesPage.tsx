import PublicHeader from '../../components/layout/PublicHeader';
import PublicFooter from '../../components/layout/PublicFooter';
import { Microscope, Pencil, Library, Laptop } from 'lucide-react';

const FacilitiesPage = () => {
   return (
      <div className="min-h-screen bg-white font-sans">
         <PublicHeader />

         <section className="relative h-[400px] flex items-center overflow-hidden">
            <img
               src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1920"
               className="absolute inset-0 w-full h-full object-cover"
               alt="Facilities"
            />
            <div className="absolute inset-0 bg-brand-navy/80 mix-blend-multiply" />
            <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full text-white">
               <h1 className="text-7xl font-black uppercase italic tracking-tighter">World Class <br /><span className="text-brand-crimson">Infrastructure</span></h1>
               <p className="text-xl text-white/70 max-w-2xl mt-4 font-medium uppercase tracking-[0.2em]">Designing spaces that inspire learning</p>
            </div>
         </section>

         <section className="py-24 px-6 max-w-[1400px] mx-auto space-y-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div className="space-y-6 group">
                  <div className="h-80 rounded-[3rem] overflow-hidden shadow-2xl relative">
                     <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Labs" />
                     <div className="absolute top-8 left-8 bg-brand-crimson p-4 rounded-2xl shadow-xl">
                        <Microscope className="text-white w-6 h-6" />
                     </div>
                  </div>
                  <h3 className="text-3xl font-black text-brand-navy uppercase italic tracking-tight">Advanced Science Labs</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">State-of-the-art laboratories for Physics, Chemistry, and Biology, equipped with the latest instruments to facilitate hands-on learning and research.</p>
               </div>

               <div className="space-y-6 group">
                  <div className="h-80 rounded-[3rem] overflow-hidden shadow-2xl relative">
                     <img src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Library" />
                     <div className="absolute top-8 left-8 bg-brand-crimson p-4 rounded-2xl shadow-xl">
                        <Library className="text-white w-6 h-6" />
                     </div>
                  </div>
                  <h3 className="text-3xl font-black text-brand-navy uppercase italic tracking-tight">Digital Libraries</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">Extensive collection of books, journals, and digital resources, providing a serene environment for students to expand their knowledge horizons.</p>
               </div>

               <div className="space-y-6 group">
                  <div className="h-80 rounded-[3rem] overflow-hidden shadow-2xl relative">
                     <img src="https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Tech" />
                     <div className="absolute top-8 left-8 bg-brand-crimson p-4 rounded-2xl shadow-xl">
                        <Laptop className="text-white w-6 h-6" />
                     </div>
                  </div>
                  <h3 className="text-3xl font-black text-brand-navy uppercase italic tracking-tight">Tech-Enabled Campus</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">Smart classrooms with interactive panels, high-speed Wi-Fi, and advanced computer labs to prepare students for a digital-first future.</p>
               </div>

               <div className="space-y-6 group">
                  <div className="h-80 rounded-[3rem] overflow-hidden shadow-2xl relative">
                     <img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Creative Arts Studio" />
                     <div className="absolute top-8 left-8 bg-brand-crimson p-4 rounded-2xl shadow-xl">
                        <Pencil className="text-white w-6 h-6" />
                     </div>
                  </div>
                  <h3 className="text-3xl font-black text-brand-navy uppercase italic tracking-tight">Creative Studios</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">Dedicated spaces for art, music, and performance, designed to nurture the creative talents and hobbies of our students.</p>
               </div>
            </div>
         </section>

         <PublicFooter />
      </div>
   );
};

export default FacilitiesPage;
