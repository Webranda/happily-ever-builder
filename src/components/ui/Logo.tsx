
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  to?: string;
}

const Logo: React.FC<LogoProps> = ({ className, size = 'md', to = '/' }) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  }[size];

  const content = (
    <span className={cn('font-serif font-light tracking-wider', sizeClasses, className)}>
      <span className="font-medium">Ever</span>After
    </span>
  );

  if (to) {
    return (
      <Link to={to} className="inline-flex items-center no-underline">
        {content}
      </Link>
    );
  }
  
  return content;
};

export default Logo;
