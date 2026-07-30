import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle2 } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative bg-gradient-to-r from-[#8B1E5C] via-[#7A1F4D] to-[#5A183F] rounded-[18px] p-8 sm:p-14 text-white shadow-xl overflow-hidden border border-white/20"
        >
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Header */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 text-white text-xs font-bold uppercase tracking-wider mb-4 border border-white/20 backdrop-blur-md">
                <Mail className="w-3.5 h-3.5 text-white" />
                <span>NEWSLETTER SUBSCRIPTION</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
                Stay Updated With JMS Group
              </h2>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                Get the latest jobs, career tips and HR insights delivered directly to your inbox.
              </p>
            </div>

            {/* Right Email Form */}
            <div className="lg:col-span-6">
              {subscribed ? (
                <div className="p-4 rounded-[18px] bg-white text-[#8B1E5C] flex items-center gap-3 shadow-md border border-white">
                  <CheckCircle2 className="w-6 h-6 text-[#8B1E5C] flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm text-[#8B1E5C]">Subscription Successful!</h4>
                    <p className="text-xs text-[#555555]">Thank you for subscribing to JMS Group newsletter.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#8B1E5C]">
                      <Mail className="w-4 h-4 text-[#8B1E5C]" />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-4 rounded-full bg-white text-[#222222] placeholder-[#777777] text-sm focus:outline-none border border-white shadow-md"
                    />
                  </div>
                  <button
                    type="submit"
                    className="py-4 px-8 rounded-full bg-white text-[#8B1E5C] hover:bg-[#FAF8FB] font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 flex-shrink-0 cursor-pointer hover:scale-[1.03]"
                  >
                    <span>Subscribe Now</span>
                    <Send className="w-4 h-4 text-[#8B1E5C]" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default NewsletterSection;

