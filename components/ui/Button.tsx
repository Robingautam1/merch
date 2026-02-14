import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  className, 
  variant = 'primary', 
  children, 
  ...props 
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  
  const baseStyles = "relative px-8 py-4 rounded-full font-medium text-sm tracking-wide transition-all duration-300 flex items-center justify-center overflow-hidden group";
  
  const variants = {
    primary: "bg-white text-black hover:bg-accent hover:text-black",
    secondary: "bg-surface text-white border border-border hover:border-white",
    ghost: "bg-transparent text-white hover:text-accent",
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};