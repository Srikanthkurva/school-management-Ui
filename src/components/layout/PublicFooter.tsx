import { Phone, Landmark } from 'lucide-react';

const PublicFooter = () => {
   return (
      <footer className="relative w-full">
         <div className="w-full h-[450px] relative">
            <iframe
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2863618174542!2d78.3847844!3d17.4459639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9158f201b205%3A0x11be77adcc1db9aa!2sSri%20Chaitanya%20School!5e0!3m2!1sen!2sin!4v1713175000000!5m2!1sen!2sin"
               className="w-full h-full border-0 absolute inset-0"
               allowFullScreen
               loading="lazy"
               title="St. Martins Group of Schools Location"
            />
            {/* Responsive Floating Card */}
            <div className="absolute left-1/2 lg:left-auto lg:right-12 top-1/2 -translate-x-1/2 lg:translate-x-0 -translate-y-1/2 bg-white px-5 md:px-8 py-4 md:py-6 shadow-[0_30px_100px_rgba(0,0,0,0.3)] w-[85%] md:w-auto md:max-w-sm text-center rounded-sm z-20 border border-gray-100 transition-all duration-300">
               <div className="flex justify-center mb-4 md:mb-6">
                  <div className="p-3 md:p-4 bg-slate-50 rounded-full border border-gray-100 shadow-inner">
                     <Landmark className="w-8 h-8 md:w-10 md:h-10 text-[#2C3E50]" strokeWidth={1.5} />
                  </div>
               </div>
               <h3 className="text-lg md:text-xl font-black text-[#2C3E50] mb-3 md:mb-4 uppercase tracking-tight italic">St. Martins Group of Schools</h3>
               <p className="text-gray-400 font-bold leading-relaxed uppercase tracking-[0.1em] text-[10px] md:text-[12px] mb-6 md:mb-8">
                  Plot No: 80, Sri Sai Plaza, <br className="hidden md:block" />
                  Ayyappa Society Main Road, Ayyappa Society, <br className="hidden md:block" />
                  Madhapur, Hyderabad, <br className="hidden md:block" />
                  Telangana - 500081
               </p>
               <div className="flex items-center justify-center gap-3 md:gap-4 text-[#2C3E50] font-black text-[12px] md:text-[14px] pt-6 md:pt-8 border-t border-gray-100">
                  <Phone className="w-4 h-4 md:w-5 md:h-5 text-brand-crimson" />
                  <span className="whitespace-nowrap">040-44600600 / 69106666</span>
               </div>
            </div>
         </div>

         <div className="bg-[#1B2631] py-6 px-12 flex flex-col md:flex-row justify-between items-center text-white text-[14px] font-black">
            <div className="flex gap-10 items-center">
               <a href="#" className="hover:text-brand-crimson transition-all uppercase tracking-widest border-b-2 border-transparent hover:border-brand-crimson pb-1">Terms & Conditions</a>
               <span className="opacity-20 hidden md:block w-px h-6 bg-white" />
               <a href="#" className="hover:text-brand-crimson transition-all uppercase tracking-widest border-b-2 border-transparent hover:border-brand-crimson pb-1">Privacy Policy</a>
            </div>
            <div className="mt-8 md:mt-0 opacity-50 uppercase tracking-[0.3em] text-[12px]">
               © Copyright St. Martins Group of Schools - 2026
            </div>
         </div>
      </footer>
   );
};

export default PublicFooter;
