import React, { useState } from 'react';
import { cn } from '../../utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, className, ...props }) => {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="relative pt-6">
      <input
        {...props}
        className={cn(
          "w-full bg-transparent border-b border-border py-2 text-white outline-none transition-colors focus:border-accent",
          className
        )}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          setHasValue(!!e.target.value);
          props.onBlur?.(e);
        }}
        onChange={(e) => {
          setHasValue(!!e.target.value);
          props.onChange?.(e);
        }}
      />
      <label
        className={cn(
          "absolute left-0 transition-all duration-300 pointer-events-none",
          focused || hasValue 
            ? "top-0 text-xs text-accent" 
            : "top-8 text-gray-500"
        )}
      >
        {label}
      </label>
    </div>
  );
};