import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '@/assets/images/jms-logo-transparent.png';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  showServicesBanner?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <Link to="/" className={`inline-flex items-center group transition-opacity hover:opacity-95 flex-shrink-0 ${className}`}>
      <img
        src={logoImg}
        alt="JMS Group - Growing Your Self"
        className="h-10 sm:h-14 md:h-16 lg:h-[72px] w-auto object-contain max-w-[210px] sm:max-w-[280px] md:max-w-[340px] lg:max-w-[380px]"
      />
    </Link>
  );
};

export default Logo;
