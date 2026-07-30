import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  showServicesBanner?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <Link to="/" className={`inline-flex items-center group transition-transform hover:scale-[1.02] flex-shrink-0 ${className}`}>
      <img
        src="/logo/logo.png"
        alt="JMS GROUP - Growing Your Self"
        className="h-12 sm:h-14 md:h-16 lg:h-[72px] w-auto object-contain max-w-[240px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px]"
      />
    </Link>
  );
};

export default Logo;

