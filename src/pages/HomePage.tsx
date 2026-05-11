import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Trophy, ChevronLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import PublicHeader from '../components/layout/PublicHeader';
import PublicFooter from '../components/layout/PublicFooter';

const slides = [
   {
      image: '/hero_1.png',
      badge: 'ADMISSIONS OPEN 2026-2027',
      title: <>WORLD CLASS <br /><span className="text-white/40">SCHOOLING</span> <br /><span className="text-brand-crimson">EXPERIENCE</span></>,
      btnText: 'Register Now',
      color: 'from-brand-navy'
   },
   {
      image: '/hero_2.png',
      badge: 'EMPOWERING LEADERS',
      title: <>NURTURING <br /><span className="text-white/40">FUTURE</span> <br /><span className="text-yellow-400">VISIONARIES</span></>,
      btnText: 'Join Us',
      color: 'from-brand-navy'
   },
   {
      image: '/hero_3.png',
      badge: 'GLOBAL EXCELLENCE',
      title: <>INNOVATION <br /><span className="text-white/40">IN EVERY</span> <br /><span className="text-cyan-400">CLASSROOM</span></>,
      btnText: 'Visit Campus',
      color: 'from-brand-navy'
   }
];

const HomePage = () => {
   const [activeTab, setActiveTab] = useState('who');
   // Navigation state is now handled in PublicHeader
   const [currentSlide, setCurrentSlide] = useState(0);

   // Carousel Auto-play
   useEffect(() => {
      const timer = setInterval(() => {
         setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(timer);
   }, []);

   const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
   const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

   const tabContent = {
      who: "The world today is a global village and people are its citizens. As boundaries of location, people and time cease to exist, it is of utmost importance that we move with the times. At St. Martins Group of Schools, we have created a unique blend of world-class curricula, contemporary teaching methodologies, and equal focus on intellectual, physical and personality development, resulting future leaders who are ready to take on the world. Today, we stand as the force behind creating countless world-class doctors, engineers, IAS officers, chartered accountants, and so much more..",
      mission: "To provide quality education that is both globally relevant and deeply rooted in our values, ensuring that every student reaches their full potential through innovative teaching and holistic development.",
      management: "Our leadership is committed to academic excellence and nurturing the next generation of global citizens. With decades of experience, we provide a stable and visionary environment for growth."
   };

   return (
      <div className="min-h-screen bg-white font-sans selection:bg-brand-crimson/20 overflow-x-hidden">

         <PublicHeader />

         {/* 3. HERO CAROUSEL SECTION */}
         <section className="relative min-h-[400px] md:min-h-[450px] flex items-center overflow-hidden">
            {slides.map((slide, index) => (
               <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
               >
                  {/* Slide Image */}
                  <div className="absolute inset-0">
                     <img src={slide.image} alt="Hero" className="w-full h-full object-cover scale-105 animate-pulse-slow" />
                     <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} via-transparent to-transparent opacity-90`} />
                     <div className="absolute inset-0 bg-black/30" />
                  </div>

                  {/* Slide Content */}
                  <div className="max-w-[1400px] mx-auto px-6 w-full h-full flex items-center relative z-20 py-4 md:py-6">
                     <div className={`flex flex-col lg:flex-row items-center gap-6 w-full mt-2 md:mt-4 transition-all duration-1000 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="flex-1 space-y-4 md:space-y-6">
                           <div className="inline-flex bg-yellow-400 text-brand-navy px-8 md:px-12 py-3 md:py-4 rounded-none font-black text-xl md:text-3xl italic tracking-tighter skew-x-[-12deg] shadow-2xl">
                              {slide.badge}
                           </div>

                           <h2 className="text-5xl md:text-[6rem] font-black leading-[0.8] text-white tracking-tighter uppercase italic drop-shadow-2xl">
                              {slide.title}
                           </h2>

                           <div className="pt-2 md:pt-4 pb-2">
                              <Link to="/online-admission">
                                 <Button className="bg-[#4F46E5] hover:bg-white hover:text-brand-navy px-10 py-3 md:px-14 md:py-5 rounded-2xl font-black uppercase italic tracking-[0.2em] shadow-[0_20px_50px_rgba(79,70,229,0.3)] transition-all transform hover:-translate-y-1 active:scale-95 text-base">
                                    {slide.btnText}
                                 </Button>
                              </Link>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            ))}

            {/* Carousel Controls */}
            <div className="absolute inset-x-0 bottom-10 z-30 flex justify-center items-center gap-6">
               <button onClick={prevSlide} className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md border border-white/20">
                  <ChevronLeft className="w-6 h-6" />
               </button>

               <div className="flex gap-3">
                  {slides.map((_, i) => (
                     <button
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        className={`h-1.5 rounded-full transition-all duration-500 ${currentSlide === i ? 'w-10 bg-brand-crimson' : 'w-3 bg-white/40 hover:bg-white/60'}`}
                     />
                  ))}
               </div>

               <button onClick={nextSlide} className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md border border-white/20">
                  <ChevronRight className="w-6 h-6" />
               </button>
            </div>
         </section>

         {/* 4. WHO WE ARE SECTION */}
         <section className="py-12 px-6 max-w-[1400px] mx-auto relative bg-white">
            <div className="flex flex-col lg:flex-row gap-10">
               <div className="flex-1 space-y-12">
                  <div className="flex shadow-lg bg-white rounded-lg overflow-hidden border border-gray-100">
                     {[
                        { id: 'who', label: 'WHO WE ARE' },
                        { id: 'mission', label: 'MISSION' },
                        { id: 'management', label: 'MANAGEMENT' }
                     ].map(tab => (
                        <button
                           key={tab.id}
                           onClick={() => setActiveTab(tab.id)}
                           className={`flex-1 py-4 text-[12px] font-black tracking-[0.2em] transition-all ${activeTab === tab.id
                              ? 'bg-brand-navy text-white'
                              : 'bg-white text-brand-navy hover:text-brand-crimson'
                              }`}
                        >
                           {tab.label}
                        </button>
                     ))}
                  </div>

                  <div className="flex flex-col md:flex-row gap-10 items-start pt-4 animate-in fade-in duration-700">
                     <div className="relative shrink-0 group">
                        <div className="absolute -inset-4 border border-brand-navy/10 translate-x-2 translate-y-2 z-0 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
                        <div className="relative z-10 bg-white p-3 border border-gray-100 shadow-xl">
                           <img
                              src="/teacher.png"
                              alt="Who We Are"
                              className="w-[280px] h-[210px] object-cover filter saturate-110"
                           />
                        </div>
                     </div>
                     <div className="space-y-6">
                        <p className="text-[#555] text-lg leading-relaxed font-medium">
                           {tabContent[activeTab as keyof typeof tabContent]}
                        </p>
                     </div>
                  </div>
               </div>

               <div className="w-full lg:w-[320px] flex flex-col gap-4">
                  {[
                     { id: 'student', label: 'STUDENT LIFE', icon: '/student_life.png', color: 'bg-white shadow-xl border-l-4 border-[#3498db]' },
                     { id: 'admissions', label: 'ADMISSIONS', icon: '/admissions.png', color: 'bg-white shadow-xl border-l-4 border-[#1abc9c]' },
                     { id: 'careers', label: 'CAREERS', icon: '/careers.png', color: 'bg-white shadow-xl border-l-4 border-[#e67e22]' }
                  ].map(item => (
                     <a key={item.id} href="#" className={`${item.color} flex items-center px-6 py-6 hover:bg-slate-50 transition-all group relative rounded-r-xl overflow-hidden`}>
                        <div className="flex items-center gap-6 w-full relative z-10">
                           <div className="w-12 h-12 shrink-0 rounded-xl overflow-hidden shadow-lg group-hover:rotate-6 transition-transform">
                              <img src={item.icon} alt={item.label} className="w-full h-full object-cover" />
                           </div>
                           <span className="text-[13px] font-black tracking-[0.15em] text-navy-900 group-hover:text-brand-crimson transition-colors flex-1">
                              {item.label}
                           </span>
                           <ChevronRight className="w-5 h-5 opacity-20 group-hover:opacity-100 group-hover:translate-x-2 transition-all text-brand-crimson" />
                        </div>
                     </a>
                  ))}
               </div>
            </div>
         </section>

         {/* 5. ACHIEVEMENTS SECTION */}
         <section className="py-12 px-6 bg-gray-50 border-y border-gray-100">
            <div className="max-w-[1400px] mx-auto space-y-10 text-center">
               <h2 className="text-5xl font-black text-brand-navy uppercase italic tracking-tighter decoration-brand-crimson decoration-8 underline underline-offset-8">Our Achievements</h2>
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                     { title: 'JEE MAIN', rank: 'AIR 1', student: 'S. Venkat' },
                     { title: 'JEE ADVANCED', rank: 'AIR 1', student: 'V. Chidvilas' },
                     { title: 'NEET', rank: 'AIR 1', student: 'V. Chakravarthi' },
                     { title: 'OLYMPIAD', rank: 'GOLD', student: 'R. Sharma' }
                  ].map((item, i) => (
                     <div key={i} className="bg-white p-10 rounded-[2rem] text-center shadow-sm hover:shadow-2xl transition-all hover:-translate-y-2 group">
                        <Trophy className="w-10 h-10 mx-auto text-brand-navy mb-6 group-hover:text-brand-crimson transition-colors" />
                        <h4 className="text-[10px] uppercase font-black text-gray-400 mb-2">{item.title}</h4>
                        <p className="text-4xl font-black text-brand-navy mb-2 tracking-tighter">{item.rank}</p>
                        <p className="font-bold text-gray-600 text-sm">{item.student}</p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* 6. NEWS SECTION */}
         <section className="py-12 px-6 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-12">
               <h2 className="text-4xl font-black text-brand-navy uppercase italic tracking-tighter border-l-8 border-brand-crimson pl-6">News & Events</h2>
               <div className="space-y-6">
                  {[1, 2, 3].map(i => (
                     <div key={i} className="flex gap-8 group cursor-pointer border-b border-gray-100 pb-8">
                        <div className="bg-brand-navy text-white p-4 rounded-2xl min-w-[70px] text-center group-hover:bg-brand-crimson transition-colors">
                           <p className="text-2xl font-black">15</p>
                           <p className="text-[8px] font-bold uppercase">Apr</p>
                        </div>
                        <div>
                           <p className="font-black text-lg group-hover:text-brand-crimson uppercase">Admission Open 2026-27</p>
                           <p className="text-gray-500 text-sm mt-1">Enroll today for a transformative education experience.</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
            <div className="grid grid-cols-2 gap-6 h-80">
               <img src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800" className="rounded-3xl object-cover h-full w-full shadow-2xl border border-gray-100" />
               <img src="https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&q=80&w=800" className="rounded-3xl object-cover h-full w-full shadow-2xl border border-gray-100" />
            </div>
         </section>

         {/* 7. STATISTICS SECTION */}
         <section className="relative py-10 overflow-hidden">
            <div className="absolute inset-0 z-0">
               <img
                  src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1920"
                  className="w-full h-full object-cover"
                  alt="Campus Background"
               />
               <div className="absolute inset-0 bg-black/70" />
            </div>

            <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center">
               <h3 className="text-white text-sm font-bold uppercase tracking-[0.4em] mb-3 opacity-60 italic">St. Martins Group of Schools</h3>
               <div className="w-16 h-[1px] bg-white/20 mx-auto mb-10" />

               <div className="flex flex-wrap items-center justify-center gap-y-8">
                  {[
                     { label: 'STATES', value: '22' },
                     { label: 'CITIES', value: '248' },
                     { label: 'YEARS', value: '40' },
                     { label: 'SCHOOLS', value: '950' },
                     { label: 'STAFF', value: '55000' },
                     { label: 'STUDENTS', value: '950000' },
                     { label: 'PARENTS', value: '1361738' }
                  ].map((stat, i, arr) => (
                     <React.Fragment key={stat.label}>
                        <div className="px-5 text-center group">
                           <p className="text-3xl font-black text-white mb-1 tracking-tighter group-hover:scale-110 transition-transform duration-500">{stat.value}</p>
                           <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.15em]">{stat.label}</p>
                        </div>
                        {i < arr.length - 1 && (
                           <div className="hidden lg:block w-[1px] h-10 bg-white/10" />
                        )}
                     </React.Fragment>
                  ))}
               </div>
            </div>
         </section>

         {/* 8. ADMISSIONS OPEN SECTION */}
         <section className="bg-brand-navy py-10 text-center relative overflow-hidden mb-6">
            <div className="absolute inset-0 opacity-10">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
            </div>

            <div className="relative z-10 space-y-2">
               <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.5em] italic">St. Martins Group of Schools</p>
               <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none pt-2">Admissions Open</h2>
               <p className="text-2xl md:text-3xl font-black text-brand-crimson uppercase italic tracking-tighter pb-4">2026-2027</p>
               <div>
                  <Link to="/online-admission" className="inline-block bg-white text-brand-navy px-10 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:bg-brand-crimson hover:text-white transition-all shadow-xl">Apply Now</Link>
               </div>
            </div>
         </section>

         <PublicFooter />
      </div>
   );
};

export default HomePage;
