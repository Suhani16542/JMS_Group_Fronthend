import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface GroupedTextHoverProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  highlightGradient?: boolean;
}

export const GroupedTextHover: React.FC<GroupedTextHoverProps> = ({
  lines,
  className = '',
  lineClassName = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`cursor-pointer inline-flex flex-col select-none ${className}`}
    >
      {lines.map((line, index) => (
        <motion.span
          key={index}
          animate={{
            y: isHovered ? -3 : 0,
            color: '#9E3371',
          }}
          transition={{
            duration: 0.35,
            delay: isHovered ? index * 0.08 : (lines.length - 1 - index) * 0.05,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className={`${lineClassName} transition-colors duration-300`}
        >
          {line}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default GroupedTextHover;

