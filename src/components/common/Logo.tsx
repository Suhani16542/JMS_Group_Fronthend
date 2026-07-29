import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  showServicesBanner?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <Link to="/" className={`inline-flex items-center group transition-opacity hover:opacity-95 flex-shrink-0 ${className}`}>
      <svg
        viewBox="0 0 460 210"
        className="h-10 sm:h-14 md:h-16 lg:h-[72px] w-auto object-contain max-w-[210px] sm:max-w-[280px] md:max-w-[340px] lg:max-w-[380px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="JMS Group - Growing Your Self"
      >
        {/* Top Text: JMS */}
        <text
          x="230"
          y="82"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="92"
          fontWeight="500"
          fill="#9E3371"
          textAnchor="middle"
          letterSpacing="18"
        >
          JMS
        </text>

        {/* Bottom Section */}
        {/* Large 'G' */}
        <text
          x="38"
          y="190"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="90"
          fontWeight="400"
          fill="#9E3371"
        >
          G
        </text>

        {/* 'ROUP' */}
        <text
          x="128"
          y="142"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="32"
          fontWeight="900"
          fill="#9E3371"
          letterSpacing="1"
        >
          ROUP
        </text>

        {/* Solid banner box */}
        <rect x="120" y="152" width="285" height="40" fill="#9E3371" />

        {/* White text inside banner box */}
        <text
          x="130"
          y="180"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="26"
          fontWeight="400"
          fill="#FFFFFF"
          letterSpacing="0.5"
        >
          rowing Your Self
        </text>
      </svg>
    </Link>
  );
};

export default Logo;

