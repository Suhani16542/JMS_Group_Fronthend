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
          className="relative bg-[#9E3371] rounded-3xl p-8 sm:p-14 text-white shadow-2xl overflow-hidden border border-white"
        >
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Header */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#9E3371] text-xs font-bold uppercase tracking-wider mb-4 border border-white">
                <Mail className="w-3.5 h-3.5 text-[#9E3371]" />
                <span>NEWSLETTER SUBSCRIPTION</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
                Stay Updated With JMS Group
              </h2>
              <p className="text-sm sm:text-base text-white leading-relaxed">
                Get the latest jobs, career tips and HR insights delivered directly to your inbox.
              </p>
            </div>

            {/* Right Email Form */}
            <div className="lg:col-span-6">
              {subscribed ? (
                <div className="p-4 rounded-2xl bg-white text-[#9E3371] flex items-center gap-3 shadow-md border border-[#9E3371]">
                  <CheckCircle2 className="w-6 h-6 text-[#9E3371] flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm text-[#9E3371]">Subscription Successful!</h4>
                    <p className="text-xs text-[#9E3371]">Thank you for subscribing to JMS Group newsletter.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#9E3371]">
                      <Mail className="w-4 h-4 text-[#9E3371]" />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white text-[#9E3371] placeholder-[#9E3371]/60 text-sm focus:outline-none border border-white shadow-md"
                    />
                  </div>
                  <button
                    type="submit"
                    className="py-4 px-8 rounded-2xl bg-white text-[#9E3371] hover:bg-[#862B5F] hover:text-white font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 flex-shrink-0 cursor-pointer"
                  >
                    <span>Subscribe Now</span>
                    <Send className="w-4 h-4" />
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

