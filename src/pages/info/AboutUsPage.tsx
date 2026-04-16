import PublicHeader from '../../components/layout/PublicHeader';
import PublicFooter from '../../components/layout/PublicFooter';
import { Target, Users, Award, ShieldCheck } from 'lucide-react';

const AboutUsPage = () => {
   return (
      <div className="min-h-screen bg-white font-sans">
         <PublicHeader />
         
         {/* Hero Section */}
         <section className="relative h-[400px] flex items-center overflow-hidden">
            <img 
               src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1920" 
               className="absolute inset-0 w-full h-full object-cover" 
               alt="About Sri Chaitanya"
            />
            <div className="absolute inset-0 bg-brand-navy/80 mix-blend-multiply" />
            <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full text-white">
               <h1 className="text-6xl font-black uppercase italic tracking-tighter">About Us</h1>
               <p className="text-xl text-white/70 max-w-2xl mt-4 font-medium uppercase tracking-[0.2em]">Legacy of Excellence in Global Education</p>
            </div>
         </section>

         {/* Content Section */}
         <section className="py-24 px-6 max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <div className="space-y-8">
                  <h2 className="text-4xl font-black text-brand-navy uppercase italic tracking-tighter border-l-8 border-brand-crimson pl-6">The Sri Chaitanya Story</h2>
                  <p className="text-gray-600 text-lg leading-relaxed font-medium">
                     Sri Chaitanya first surfaced on the academic horizon in 1986 and within a span of 38 years, it has become the largest educational institutions in Asia. The journey began with a Girls Junior College in Vijayawada. Since then, there has been no looking back. The inception of Sri Chaitanya was a result of a vision to provide a new dimension to education, especially for students in the Telugu states of Andhra Pradesh and Telangana.
                  </p>
                  <p className="text-gray-600 text-lg leading-relaxed font-medium">
                     Today, we stand as a beacon of academic excellence, nurturing millions of students and helping them achieve their dreams of becoming world-class doctors, engineers, and leaders.
                  </p>
               </div>
               <div className="grid grid-cols-2 gap-6">
                  <div className="bg-slate-50 p-8 rounded-3xl border border-gray-100 flex flex-col items-center text-center space-y-4 hover:shadow-xl transition-all hover:-translate-y-1">
                     <Target className="w-12 h-12 text-brand-crimson" />
                     <h3 className="font-black text-brand-navy uppercase tracking-widest text-sm">Our Vision</h3>
                     <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Pioneering global education standards</p>
                  </div>
                  <div className="bg-slate-50 p-8 rounded-3xl border border-gray-100 flex flex-col items-center text-center space-y-4 hover:shadow-xl transition-all hover:-translate-y-1">
                     <Users className="w-12 h-12 text-brand-crimson" />
                     <h3 className="font-black text-brand-navy uppercase tracking-widest text-sm">Community</h3>
                     <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Over 1 Million successful alumni</p>
                  </div>
                  <div className="bg-slate-50 p-8 rounded-3xl border border-gray-100 flex flex-col items-center text-center space-y-4 hover:shadow-xl transition-all hover:-translate-y-1">
                     <Award className="w-12 h-12 text-brand-crimson" />
                     <h3 className="font-black text-brand-navy uppercase tracking-widest text-sm">Excellence</h3>
                     <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Asia's Most Trusted Brand</p>
                  </div>
                  <div className="bg-slate-50 p-8 rounded-3xl border border-gray-100 flex flex-col items-center text-center space-y-4 hover:shadow-xl transition-all hover:-translate-y-1">
                     <ShieldCheck className="w-12 h-12 text-brand-crimson" />
                     <h3 className="font-black text-brand-navy uppercase tracking-widest text-sm">Quality</h3>
                     <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Unmatched academic results</p>
                  </div>
               </div>
            </div>
         </section>

         <PublicFooter />
      </div>
   );
};

export default AboutUsPage;
