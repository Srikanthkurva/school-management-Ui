import React, { useState } from 'react';
import PublicHeader from '../../components/layout/PublicHeader';
import PublicFooter from '../../components/layout/PublicFooter';
import { Camera, Music, Palette, Trophy, X, Check, Send, User, BookOpen, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const StudentLifePage = () => {
   const [activeFeature, setActiveFeature] = useState<null | number>(null);
   const [showClubsExplorer, setShowClubsExplorer] = useState(false);
   const [showStartClubForm, setShowStartClubForm] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);

   const [formData, setFormData] = useState({
      studentName: '',
      grade: '',
      clubName: '',
      clubVision: ''
   });

   const features = [
      { 
         icon: Trophy, 
         title: 'Sports & Athletics', 
         desc: 'World-class training centers for cricket, basketball, and more.',
         details: 'Our sports program is led by professional coaches focusing on physical endurance, strategy, and teamwork. We provide Olympic-standard equipment and participate in national-level championships.',
         highlights: ['Cricket Academy', 'Indoor Sports Complex', 'Olympic Size Pool', 'Track & Field Training'],
         color: 'bg-orange-50',
         iconColor: 'text-orange-600'
      },
      { 
         icon: Music, 
         title: 'Performing Arts', 
         desc: 'Cultivating talent in music, dance, and theater.',
         details: 'Unleash your creativity with our professional performing arts curriculum. From classical music to modern drama, we provide the platform for students to express themselves.',
         highlights: ['Music Production Lab', 'Dance Studios', 'Theatrical Stages', 'Annual Cultural Fest'],
         color: 'bg-pink-50',
         iconColor: 'text-pink-600'
      },
      { 
         icon: Palette, 
         title: 'Arts & Crafts', 
         desc: 'Nurturing creativity through various artistic mediums.',
         details: 'Our visual arts department encourages students to experiment with sculpture, oil painting, pottery, and digital design. We focus on developing a unique artistic voice.',
         highlights: ['Pottery & Clay Studio', 'Digital Art Suite', 'Exhibition Gallery', 'Textile Design Lab'],
         color: 'bg-indigo-50',
         iconColor: 'text-indigo-600'
      },
      { 
         icon: Camera, 
         title: 'Clubs & Societies', 
         desc: 'Photography, coding, and environmental leadership clubs.',
         details: 'With over 20+ student-led clubs, there is something for everyone. Our societies help students develop leadership, organizational skills, and deep expertise.',
         highlights: ['Robotics & AI Club', 'Photography Society', 'Debating Union', 'Eco-Leadership Squad'],
         color: 'bg-emerald-50',
         iconColor: 'text-emerald-600'
      }
   ];

   const clubs = [
      { name: 'Robotics & AI', members: '45+', icon: Trophy, desc: 'Building next-gen bots and learning machine learning basics.' },
      { name: 'Photography & Film', members: '60+', icon: Camera, desc: 'Documenting campus life through the lens of creativity.' },
      { name: 'Debating & Elocution', members: '30+', icon: Music, desc: 'Mastering the art of persuasion and public speaking.' },
      { name: 'Environmental Squad', members: '80+', icon: Palette, desc: 'Leading sustainability and green initiatives on campus.' },
      { name: 'Coding & Tech', members: '100+', icon: Trophy, desc: 'Solving real-world problems with code and logic.' },
      { name: 'Cultural Troupe', members: '120+', icon: Music, desc: 'The heartbeat of our school festivals and performances.' }
   ];

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
         const response = await axios.post('http://localhost:5000/api/clubs', formData);
         if (response.data.success) {
            toast.success('Club request submitted! Our team will review your vision.', {
               style: { borderRadius: '20px', background: '#1a237e', color: '#fff', fontWeight: 'bold' }
            });
            setShowStartClubForm(false);
            setFormData({ studentName: '', grade: '', clubName: '', clubVision: '' });
         }
      } catch (error) {
         toast.error('Failed to submit request. Please try again.');
      } finally {
         setIsSubmitting(false);
      }
   };

   const handleClose = () => {
      setActiveFeature(null);
   };

   return (
      <div className="min-h-screen bg-white font-sans overflow-x-hidden">
         <Toaster position="top-center" />
         <PublicHeader />
         
         <section className="relative h-[450px] flex items-center overflow-hidden">
            <motion.div 
               initial={{ scale: 1.1 }}
               animate={{ scale: 1 }}
               transition={{ duration: 1.5 }}
               className="absolute inset-0"
            >
               <img 
                  src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=1920" 
                  className="w-full h-full object-cover" 
                  alt="Student Life"
               />
            </motion.div>
            <div className="absolute inset-0 bg-brand-crimson/80 mix-blend-multiply" />
            <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full text-white text-center">
               <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
               >
                  <h1 className="text-7xl md:text-8xl font-black uppercase italic tracking-tighter drop-shadow-2xl">Student Life</h1>
                  <p className="text-lg md:text-xl text-white/90 max-w-2xl mt-4 font-black uppercase tracking-[0.3em] mx-auto">Beyond the Classroom</p>
               </motion.div>
            </div>
         </section>

         <section className="py-12 px-6 max-w-[1400px] mx-auto text-brand-navy">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {features.map((item, i) => (
                  <motion.button 
                     key={i}
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.1 }}
                     whileHover={{ y: -10 }}
                     onClick={() => setActiveFeature(i)}
                     className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all group text-left flex flex-col h-full"
                  >
                     <div className="bg-brand-crimson/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-crimson transition-all group-hover:rotate-6 shadow-inner">
                        <item.icon className="text-brand-crimson group-hover:text-white transition-colors w-8 h-8" />
                     </div>
                     <h3 className="text-xl font-black uppercase italic tracking-tight mb-3 transition-colors group-hover:text-brand-crimson">{item.title}</h3>
                     <p className="text-gray-500 font-medium leading-relaxed text-sm">{item.desc}</p>
                  </motion.button>
               ))}
            </div>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
               <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="rounded-[4rem] overflow-hidden shadow-2xl h-[550px] relative group"
               >
                  <div className="absolute inset-0 bg-brand-navy/20 group-hover:bg-transparent transition-colors z-10" />
                  <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Student Activity" />
               </motion.div>
               <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col justify-center space-y-8 px-6"
               >
                  <h2 className="text-5xl md:text-6xl font-black text-brand-navy uppercase italic tracking-tighter leading-[0.9]">A Vibrant Campus <br /><span className="text-brand-crimson">Community</span></h2>
                  <p className="text-slate-600 text-lg font-medium leading-relaxed">
                     At St. Martins Group of Schools, we believe that education extends far beyond textbooks. Our campus life is designed to foster leadership, teamwork, and individual passion. Every day is an opportunity for students to discover new interests and build lifelong friendships in a professional environment.
                  </p>
                  <div className="flex gap-4">
                     <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowClubsExplorer(true)}
                        className="bg-brand-navy text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-crimson transition-all shadow-xl shadow-brand-navy/10"
                     >
                        Join Clubs
                     </motion.button>
                  </div>
               </motion.div>
            </div>
         </section>

         {/* Clubs Explorer Modal */}
         <AnimatePresence>
            {showClubsExplorer && (
               <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 text-brand-navy">
                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     onClick={() => setShowClubsExplorer(false)}
                     className="absolute inset-0 bg-brand-navy/70 backdrop-blur-md"
                  />
                  <motion.div
                     initial={{ opacity: 0, scale: 0.9, y: 40 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.9, y: 40 }}
                     className="bg-white w-full max-w-4xl max-h-[85vh] rounded-[3rem] shadow-2xl overflow-hidden relative z-10 flex flex-col"
                  >
                     <div className="p-10 border-b border-slate-100 flex justify-between items-center shrink-0">
                        <div>
                           <h3 className="text-3xl font-black text-brand-navy uppercase italic tracking-tighter">Campus Clubs <span className="text-brand-crimson">& Societies</span></h3>
                           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Discover your passion beyond the curriculum</p>
                        </div>
                        <button 
                           onClick={() => setShowClubsExplorer(false)}
                           className="p-3 bg-slate-100 hover:bg-brand-crimson hover:text-white rounded-full transition-all"
                        >
                           <X className="w-6 h-6" />
                        </button>
                     </div>
                     
                     <div className="p-10 overflow-y-auto custom-scrollbar bg-slate-50/50">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                           {clubs.map((club, index) => (
                              <motion.div
                                 key={index}
                                 initial={{ opacity: 0, y: 20 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 transition={{ delay: index * 0.05 }}
                                 className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                              >
                                 <div className="flex justify-between items-start mb-6">
                                    <div className="bg-brand-crimson/5 p-3 rounded-xl group-hover:bg-brand-crimson group-hover:text-white transition-all">
                                       <club.icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-[10px] font-black text-brand-crimson bg-brand-crimson/10 px-3 py-1 rounded-full uppercase tracking-tighter">{club.members} Members</span>
                                 </div>
                                 <h4 className="text-lg font-black text-brand-navy uppercase italic tracking-tight mb-2">{club.name}</h4>
                                 <p className="text-slate-500 text-sm font-medium leading-relaxed">{club.desc}</p>
                              </motion.div>
                           ))}
                        </div>

                        <div className="mt-12 bg-brand-navy p-10 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-8">
                           <div className="space-y-2 text-center md:text-left">
                              <h4 className="text-2xl font-black italic tracking-tighter uppercase leading-none">Can't find your <span className="text-brand-crimson">niche?</span></h4>
                              <p className="text-white/60 text-sm font-medium">Start your own society with a faculty mentor and 10 members.</p>
                           </div>
                           <button 
                              onClick={() => {
                                 setShowClubsExplorer(false);
                                 setShowStartClubForm(true);
                              }}
                              className="bg-brand-crimson text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white hover:text-brand-navy transition-all shadow-xl"
                           >
                               Start a Club
                           </button>
                        </div>
                     </div>
                  </motion.div>
               </div>
            )}
         </AnimatePresence>

         {/* Start a Club Form Modal */}
         <AnimatePresence>
            {showStartClubForm && (
               <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 text-brand-navy">
                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     onClick={() => setShowStartClubForm(false)}
                     className="absolute inset-0 bg-brand-navy/80 backdrop-blur-xl"
                  />
                  <motion.div
                     initial={{ opacity: 0, scale: 0.95, y: 20 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.95, y: 20 }}
                     className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden relative z-10"
                  >
                     <div className="bg-brand-navy p-10 text-white relative">
                        <h3 className="text-3xl font-black uppercase italic tracking-tighter">Start Your <span className="text-brand-crimson">Legacy</span></h3>
                        <p className="text-white/60 text-xs font-bold uppercase tracking-widest mt-2 px-1">Propose a new student organization</p>
                        <button 
                           onClick={() => setShowStartClubForm(false)}
                           className="absolute top-8 right-8 p-2 hover:bg-white/10 rounded-full transition-all"
                        >
                           <X className="w-6 h-6" />
                        </button>
                     </div>

                     <form onSubmit={handleSubmit} className="p-10 space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Founder name</label>
                              <div className="relative">
                                 <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-crimson" />
                                 <input 
                                    required
                                    type="text" 
                                    placeholder="Enter your name"
                                    className="w-full bg-slate-50 border-none rounded-2xl px-12 py-4 text-sm font-bold focus:ring-2 ring-brand-crimson transition-all"
                                    value={formData.studentName}
                                    onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                                 />
                              </div>
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Current Grade</label>
                              <div className="relative">
                                 <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-crimson" />
                                 <input 
                                    required
                                    type="text" 
                                    placeholder="e.g. Grade 10"
                                    className="w-full bg-slate-50 border-none rounded-2xl px-12 py-4 text-sm font-bold focus:ring-2 ring-brand-crimson transition-all"
                                    value={formData.grade}
                                    onChange={(e) => setFormData({...formData, grade: e.target.value})}
                                 />
                              </div>
                           </div>
                        </div>

                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Proposed Club Name</label>
                           <div className="relative">
                              <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-crimson" />
                              <input 
                                 required
                                 type="text" 
                                 placeholder="Bring your idea to life"
                                 className="w-full bg-slate-50 border-none rounded-2xl px-12 py-4 text-sm font-bold focus:ring-2 ring-brand-crimson transition-all"
                                 value={formData.clubName}
                                 onChange={(e) => setFormData({...formData, clubName: e.target.value})}
                              />
                           </div>
                        </div>

                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">What is your vision?</label>
                           <textarea 
                              required
                              rows={4}
                              placeholder="Describe the club's purpose and activities..."
                              className="w-full bg-slate-50 border-none rounded-[2rem] px-6 py-5 text-sm font-bold focus:ring-2 ring-brand-crimson transition-all custom-scrollbar"
                              value={formData.clubVision}
                              onChange={(e) => setFormData({...formData, clubVision: e.target.value})}
                           />
                        </div>

                        <button 
                           disabled={isSubmitting}
                           className="w-full bg-brand-navy text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-crimson transition-all shadow-xl shadow-brand-navy/10 flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                           {isSubmitting ? (
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                           ) : (
                              <>
                                 <Send className="w-4 h-4" />
                                 Submit Proposal
                              </>
                           )}
                        </button>
                     </form>
                  </motion.div>
               </div>
            )}
         </AnimatePresence>

         {/* Info Modal */}
         <AnimatePresence>
            {activeFeature !== null && (
               <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 text-brand-navy">
                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     onClick={handleClose}
                     className="absolute inset-0 bg-brand-navy/60 backdrop-blur-md"
                  />
                  <motion.div
                     initial={{ opacity: 0, scale: 0.9, y: 40 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.9, y: 40 }}
                     className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden relative z-10 border border-white/20"
                  >
                     <div className={`${features[activeFeature].color} p-12 flex justify-center relative overflow-hidden text-brand-navy`}>
                        <motion.div
                           initial={{ scale: 0, rotate: -45 }}
                           animate={{ scale: 1, rotate: 0 }}
                           transition={{ type: "spring", damping: 12, delay: 0.1 }}
                        >
                           <div className="bg-white p-6 rounded-3xl shadow-xl">
                              {React.createElement(features[activeFeature].icon, { 
                                 className: `w-14 h-14 ${features[activeFeature].iconColor}`
                              })}
                           </div>
                        </motion.div>
                        <button 
                           onClick={handleClose}
                           className="absolute top-8 right-8 p-2 bg-white/50 hover:bg-white rounded-full text-brand-navy transition-colors"
                        >
                           <X className="w-6 h-6" />
                        </button>
                     </div>
                     
                     <div className="p-12 space-y-8 text-center max-h-[60vh] overflow-y-auto scrollbar-hide">
                        <div className="space-y-2">
                           <h3 className="text-3xl font-black text-brand-navy uppercase italic tracking-tighter">
                              {features[activeFeature].title}
                           </h3>
                           <p className="text-xs font-black text-brand-crimson uppercase tracking-[0.2em]">
                              {features[activeFeature].desc}
                           </p>
                        </div>
                        
                        <div className="space-y-6">
                           <p className="text-slate-600 font-medium leading-relaxed italic text-center">
                              "{features[activeFeature].details}"
                           </p>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-6 space-y-4 text-left">
                           {features[activeFeature].highlights.map((highlight, hIndex) => (
                              <div key={hIndex} className="flex items-center gap-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                 <Check className={`w-4 h-4 ${features[activeFeature].iconColor}`} />
                                 {highlight}
                              </div>
                           ))}
                        </div>


                     </div>
                  </motion.div>
               </div>
            )}
         </AnimatePresence>

         <PublicFooter />
      </div>
   );
};

export default StudentLifePage;
