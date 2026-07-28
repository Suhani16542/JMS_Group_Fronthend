import React from 'react';
import HeroSection from '@/components/hero/HeroSection';
import ServicesSection from '@/components/services/ServicesSection';
import AboutSection from '@/components/about/AboutSection';
import WhyChooseUsSection from '@/components/whyChooseUs/WhyChooseUsSection';
import JobSearchSection from '@/components/jobSearch/JobSearchSection';
import EmployerCtaSection from '@/components/employerCta/EmployerCtaSection';
import CaseStudiesSection from '@/components/caseStudies/CaseStudiesSection';
import TestimonialsSection from '@/components/testimonials/TestimonialsSection';
import CountersSection from '@/components/counters/CountersSection';
import BlogSection from '@/components/blog/BlogSection';
import NewsletterSection from '@/components/newsletter/NewsletterSection';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Professional Services */}
      <ServicesSection />

      {/* 3. About JMS Group */}
      <AboutSection />

      {/* 4. Why Choose Us */}
      <WhyChooseUsSection />

      {/* 5. Job Search Filter CTA */}
      <JobSearchSection />

      {/* 6. Employer Requirement CTA */}
      <EmployerCtaSection />

      {/* 7. Business Cases / Success Stories */}
      <CaseStudiesSection />

      {/* 8. Client & Candidate Testimonials */}
      <TestimonialsSection />

      {/* 9. Animated Statistics Counters */}
      <CountersSection />

      {/* 10. Latest Insights & Blog */}
      <BlogSection />

      {/* 11. Newsletter Subscription */}
      <NewsletterSection />
    </div>
  );
};

export default HomePage;
