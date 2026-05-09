import React from 'react';
import { cn } from '@/utils/cn';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline' | 'warning';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
}

const variants = {
  primary: 'gradient-primary text-white shadow-lg shadow-green-200 hover:shadow-green-300 active:scale-[0.97]',
  secondary: 'bg-white text-green-700 border border-green-200 hover:bg-green-50 active:scale-[0.97]',
  danger: 'bg-red-600 text-white shadow-lg shadow-red-200 hover:bg-red-700 active:scale-[0.97]',
  ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 active:scale-[0.97]',
  outline: 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 active:scale-[0.97]',
  warning: 'bg-amber-500 text-white shadow-lg shadow-amber-200 hover:bg-amber-600 active:scale-[0.97]',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm rounded-xl gap-1.5',
  md: 'px-4 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-6 py-3.5 text-base rounded-2xl gap-2',
  xl: 'px-8 py-4 text-lg rounded-2xl gap-3',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconRight,
  fullWidth = false,
  children,
  className,
  disabled,
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed select-none',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : icon}
      {children}
      {!loading && iconRight}
    </button>
  );
});

Button.displayName = 'Button';
