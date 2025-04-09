
import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

const Container: React.FC<ContainerProps> = ({ 
  children, 
  className,
  maxWidth = 'xl',
  ...props 
}) => {
  const maxWidthClass = {
    'xs': 'max-w-xs',
    'sm': 'max-w-sm',
    'md': 'max-w-md',
    'lg': 'max-w-lg',
    'xl': 'max-w-5xl',
    '2xl': 'max-w-7xl',
    'full': 'max-w-full',
  }[maxWidth];

  return (
    <div
      className={cn('w-full mx-auto px-4 sm:px-6 md:px-8', maxWidthClass, className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
