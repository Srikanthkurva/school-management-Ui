import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
   GraduationCap, Menu, X
} from 'lucide-react';

const PublicHeader = () => {
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
   const navigate = useNavigate();

   const navItems = [
      { label: 'About Us', path: '/about-us' },
      { label: 'Pre-Primary', path: '/pre-primary' },
      { label: 'Primary', path: '/primary' },
      { label: 'High School', path: '/high-school' },
      { label: 'Student Life', path: '/student-life' },
      { label: 'Facilities', path: '/facilities' },
      { label: 'Uniforms', path: '/uniforms' },
      { label: 'Gallery', path: '/gallery' },
      { label: 'Achievements', path: '/achievements' },
      { label: 'Careers', path: '/careers' }
   ];

   return (
      <>
         {/* 1. COMPACT NAVY HEADER */}
         <header className="bg-brand-navy py-4 px-6 sticky top-0 z-[60] shadow-2xl">
            <div className="max-w-[1400px] mx-auto flex justify-between items-center">
               <div 
                  onClick={() => navigate('/')}
                  className="flex items-center gap-4 group cursor-pointer"
               >
                  <div className="bg-white p-2 rounded-full transform group-hover:rotate-12 transition-transform shadow-lg">
                     <GraduationCap className="w-8 h-8 text-brand-navy" strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col">
                     <h1 className="text-white text-2xl md:text-3xl font-black tracking-tighter leading-none uppercase">SRI CHAITANYA</h1>
                     <span className="text-white text-[10px] tracking-[.4em] font-bold opacity-70 uppercase">SCHOOLS</span>
                  </div>
               </div>

               <div className="hidden lg:flex items-center gap-3">
                  <Link to="/admission-enquiry" className="text-white border border-white/40 px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-wider hover:bg-white hover:text-brand-navy transition-all text-center">
                     Admission Enquiry Form
                  </Link>
                  <Link to="/online-admission" className="text-white border border-white/40 px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-wider hover:bg-white hover:text-brand-navy transition-all text-center">
                     Online Admissions
                  </Link>
                  <Link to="/contact" className="text-white text-[11px] font-black uppercase tracking-widest px-4 hover:text-brand-crimson transition-colors">
                     Contact
                  </Link>
                  <Link to="/login" className="bg-white text-brand-navy px-8 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-brand-crimson hover:text-white transition-all shadow-xl">
                     Login
                  </Link>
               </div>

               <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                  {mobileMenuOpen ? <X /> : <Menu />}
               </button>
            </div>

            {/* Mobile Navigation Panel */}
            {mobileMenuOpen && (
               <div className="lg:hidden absolute top-full left-0 w-full bg-brand-navy border-t border-white/10 p-6 space-y-4 animate-in slide-in-from-top duration-300 z-[70]">
                  {navItems.map((item) => (
                     <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-white text-sm font-black uppercase tracking-widest hover:text-brand-crimson"
                     >
                        {item.label}
                     </Link>
                  ))}
                  <div className="pt-4 space-y-3">
                     <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block bg-brand-crimson text-white text-center py-3 rounded-lg font-black uppercase tracking-widest">Login</Link>
                  </div>
               </div>
            )}
         </header>

         {/* 2. CRIMSON NAVIGATION BAR */}
         <nav className="bg-brand-crimson sticky top-[80px] z-50 hidden lg:block shadow-lg">
            <div className="max-w-[1400px] mx-auto px-6">
               <div className="flex items-center justify-between">
                  <div className="flex w-full justify-between items-center">
                     {navItems.map(item => (
                        <Link 
                           key={item.path} 
                           to={item.path} 
                           className="text-white px-2 xl:px-4 py-4 text-[10px] xl:text-[11px] font-black uppercase tracking-widest hover:bg-black/10 transition-all border-b-2 border-transparent hover:border-white whitespace-nowrap opacity-90 hover:opacity-100 italic"
                        >
                           {item.label}
                        </Link>
                     ))}
                  </div>
               </div>
            </div>
         </nav>
      </>
   );
};

export default PublicHeader;
