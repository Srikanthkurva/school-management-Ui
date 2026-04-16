import { useState } from 'react';
import PublicHeader from '../../components/layout/PublicHeader';
import PublicFooter from '../../components/layout/PublicFooter';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
import axios from 'axios';

const ContactPage = () => {
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
   });
   const [status, setStatus] = useState({
      loading: false,
      success: false,
      error: ''
   });

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value
      });
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus({ loading: true, success: false, error: '' });

      try {
         const response = await axios.post('/api/contact/submit', formData);
         if (response.data.success) {
            setStatus({ loading: false, success: true, error: '' });
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
         }
      } catch (err: any) {
         setStatus({
            loading: false,
            success: false,
            error: err.response?.data?.message || 'Something went wrong. Please try again later.'
         });
      }
   };

   return (
      <div className="min-h-screen bg-white font-sans">
         <PublicHeader />
         
         {/* Hero Section */}
         <section className="relative h-[400px] flex items-center overflow-hidden">
            <img 
               src="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80&w=1920" 
               className="absolute inset-0 w-full h-full object-cover" 
               alt="Contact Us"
            />
            <div className="absolute inset-0 bg-brand-navy/80 mix-blend-multiply" />
            <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full text-white text-center">
               <h1 className="text-7xl font-black uppercase italic tracking-tighter drop-shadow-2xl">Connect With <br /><span className="text-brand-crimson">Us</span></h1>
               <p className="text-xl text-white/70 max-w-2xl mt-4 font-black uppercase tracking-[0.3em] mx-auto italic">We are here to help you</p>
            </div>
         </section>

         {/* Main Content */}
         <section className="py-24 px-6 max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
               
               {/* Contact Information */}
               <div className="space-y-12">
                  <div className="space-y-6">
                     <h2 className="text-4xl font-black text-brand-navy uppercase italic tracking-tighter">Get in <span className="text-brand-crimson">Touch</span></h2>
                     <p className="text-[#555] text-lg font-medium leading-relaxed">
                        Have questions about admissions, academics, or campus life? Our dedicated team is ready to assist you. Reach out through any of our channels or fill out the form.
                     </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {[
                        { icon: Phone, title: 'Call Us', info: '040-44600600', sub: 'Mon-Sat, 8am - 6pm' },
                        { icon: Mail, title: 'Email Us', info: 'info@srichaitanya.net', sub: '24/7 Support' },
                        { icon: MapPin, title: 'Main Office', info: 'Madhapur, Hyderabad', sub: 'Visit us anytime' },
                        { icon: Clock, title: 'Office Hours', info: '8:00 AM - 6:00 PM', sub: 'Standard working hours' }
                     ].map((item, i) => (
                        <div key={i} className="bg-slate-50 p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                           <div className="bg-brand-navy w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-brand-crimson transition-colors">
                              <item.icon className="text-white w-6 h-6" />
                           </div>
                           <h3 className="text-lg font-black text-brand-navy uppercase italic mb-1">{item.title}</h3>
                           <p className="text-brand-crimson font-black text-sm">{item.info}</p>
                           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">{item.sub}</p>
                        </div>
                     ))}
                  </div>

                  <div className="bg-brand-navy p-10 rounded-[3rem] text-white flex items-center gap-8 shadow-2xl relative overflow-hidden group">
                     <div className="absolute right-0 bottom-0 opacity-5 transform group-hover:scale-110 transition-transform">
                        <MessageSquare className="w-64 h-64" />
                     </div>
                     <div className="relative z-10 w-full">
                        <h3 className="text-2xl font-black uppercase italic tracking-tight mb-4">Quick Admissions <br /><span className="text-brand-crimson">Helpline</span></h3>
                        <div className="flex flex-wrap gap-4">
                           <a href="tel:1800000000" className="bg-white/10 hover:bg-brand-crimson px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all">Toll Free: 1800-XXX-XXXX</a>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Contact Form */}
               <div className="bg-white p-12 rounded-[4rem] shadow-[0_50px_100px_rgba(0,0,0,0.1)] border border-gray-100 relative">
                  <div className="absolute -top-10 -right-10 bg-brand-crimson p-8 rounded-[2.5rem] shadow-2xl hidden lg:block rotate-12 group hover:rotate-0 transition-transform cursor-pointer">
                     <Send className="text-white w-8 h-8" />
                  </div>
                  
                  <h3 className="text-3xl font-black text-brand-navy uppercase italic mb-8">Send a <span className="text-brand-crimson">Message</span></h3>

                  {status.success ? (
                     <div className="bg-green-50 border border-green-200 p-8 rounded-3xl text-center space-y-4">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                           <Send className="text-white w-8 h-8" />
                        </div>
                        <h4 className="text-xl font-black text-green-800 uppercase italic">Message Sent!</h4>
                        <p className="text-green-600 font-bold text-sm tracking-wide">Thank you for reaching out. Our team will contact you shortly.</p>
                        <button 
                           onClick={() => setStatus({ ...status, success: false })}
                           className="text-green-800 font-black text-[10px] uppercase tracking-widest border-b-2 border-green-800"
                        >Send Another Message</button>
                     </div>
                  ) : (
                     <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-brand-navy uppercase tracking-widest ml-4">Full Name</label>
                              <input 
                                 type="text" 
                                 name="name"
                                 required
                                 value={formData.name}
                                 onChange={handleChange}
                                 className="w-full bg-slate-50 border-0 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-brand-crimson outline-none font-bold text-xs uppercase" 
                                 placeholder="Srikanth Reddy" 
                              />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-brand-navy uppercase tracking-widest ml-4">Email Address</label>
                              <input 
                                 type="email" 
                                 name="email"
                                 required
                                 value={formData.email}
                                 onChange={handleChange}
                                 className="w-full bg-slate-50 border-0 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-brand-crimson outline-none font-bold text-xs uppercase" 
                                 placeholder="example@mail.com" 
                              />
                           </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-brand-navy uppercase tracking-widest ml-4">Phone Number</label>
                              <input 
                                 type="tel" 
                                 name="phone"
                                 value={formData.phone}
                                 onChange={handleChange}
                                 className="w-full bg-slate-50 border-0 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-brand-crimson outline-none font-bold text-xs uppercase" 
                                 placeholder="+91 XXXXX XXXXX" 
                              />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-brand-navy uppercase tracking-widest ml-4">Subject</label>
                              <select 
                                 name="subject"
                                 value={formData.subject}
                                 onChange={handleChange}
                                 className="w-full bg-slate-50 border-0 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-brand-crimson outline-none font-bold text-xs uppercase"
                              >
                                 <option value="">Select Subject</option>
                                 <option value="Admissions">Admissions</option>
                                 <option value="Academics">Academics</option>
                                 <option value="Fee Payment">Fee Payment</option>
                                 <option value="Other">Other</option>
                              </select>
                           </div>
                        </div>

                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-brand-navy uppercase tracking-widest ml-4">Your Message</label>
                           <textarea 
                              name="message"
                              required
                              value={formData.message}
                              onChange={handleChange}
                              rows={5} 
                              className="w-full bg-slate-50 border-0 rounded-3xl px-6 py-4 focus:ring-2 focus:ring-brand-crimson outline-none font-bold text-xs uppercase resize-none" 
                              placeholder="Write your message here..."
                           />
                        </div>

                        {status.error && (
                           <p className="text-brand-crimson text-[10px] font-black uppercase text-center">{status.error}</p>
                        )}

                        <button 
                           type="submit"
                           disabled={status.loading}
                           className="w-full bg-brand-navy text-white text-[12px] font-black uppercase tracking-[0.3em] py-5 rounded-2xl shadow-xl hover:bg-brand-crimson transition-all active:scale-95 disabled:opacity-50"
                        >
                           {status.loading ? 'Sending...' : 'Send Message Now'}
                        </button>
                     </form>
                  )}
               </div>

            </div>
         </section>

         <PublicFooter />
      </div>
   );
};

export default ContactPage;
