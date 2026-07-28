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
          className="relative bg-purple-gradient rounded-3xl p-8 sm:p-14 text-white shadow-2xl overflow-hidden"
        >
          {/* Subtle Decorative Circles */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-black/10 rounded-full blur-2xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Header */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-purple-100 text-xs font-bold uppercase tracking-wider mb-4">
                <Mail className="w-3.5 h-3.5" />
                NEWSLETTER SUBSCRIPTION
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
                Stay Updated With JMS Group
              </h2>
              <p className="text-sm sm:text-base text-purple-100/90 leading-relaxed">
                Get the latest jobs, career tips and HR insights delivered directly to your inbox.
              </p>
            </div>

            {/* Right Email Form */}
            <div className="lg:col-span-6">
              {subscribed ? (
                <div className="p-4 rounded-2xl bg-white/15 backdrop-blur-md flex items-center gap-3 text-white border border-white/20">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm">Subscription Successful!</h4>
                    <p className="text-xs text-purple-100">Thank you for subscribing to JMS Group newsletter.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                      <Mail className="w-4 h-4 text-[#6D3DF5]" />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white text-[#17152B] placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-md"
                    />
                  </div>
                  <button
                    type="submit"
                    className="py-4 px-8 rounded-2xl bg-[#161131] hover:bg-[#2A1768] text-white font-bold text-sm shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 flex-shrink-0"
                  >
                    <span>Subscribe Now</span>
                    <Send className="w-4 h-4 text-[#8B5CF6]" />
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
