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
        className="h-10 sm:h-12 md:h-14 lg:h-16 xl:h-[72px] w-auto max-w-[170px] xs:max-w-[210px] sm:max-w-[300px] md:max-w-[360px] lg:max-w-[420px] object-contain flex-shrink-0"
      />
    </Link>
  );
};

export default Logo;

