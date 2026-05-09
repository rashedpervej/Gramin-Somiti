import React from 'react';
import { cn } from '@/utils/cn';

type BadgeVariant = 'green' | 'red' | 'yellow' | 'blue' | 'gray' | 'purple' | 'orange';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  className?: string;
  dot?: boolean;
}

const variants: Record<BadgeVariant, string> = {
  green: 'bg-green-100 text-green-700 border border-green-200',
  red: 'bg-red-100 text-red-700 border border-red-200',
  yellow: 'bg-amber-100 text-amber-700 border border-amber-200',
  blue: 'bg-blue-100 text-blue-700 border border-blue-200',
  gray: 'bg-gray-100 text-gray-600 border border-gray-200',
  purple: 'bg-purple-100 text-purple-700 border border-purple-200',
  orange: 'bg-orange-100 text-orange-700 border border-orange-200',
};

const dotColors: Record<BadgeVariant, string> = {
  green: 'bg-green-500',
  red: 'bg-red-500',
  yellow: 'bg-amber-500',
  blue: 'bg-blue-500',
  gray: 'bg-gray-400',
  purple: 'bg-purple-500',
  orange: 'bg-orange-500',
};

export function Badge({ children, variant = 'gray', size = 'md', className, dot }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium rounded-full',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs',
        variants[variant],
        className,
      )}
    >
      {dot && (
        <span className={cn('h-1.5 w-1.5 rounded-full', dotColors[variant])} />
      )}
      {children}
    </span>
  );
}

export function getRoleBadgeVariant(role: string): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    USER: 'gray',
    MEMBER: 'blue',
    COLLECTOR: 'orange',
    MANAGER: 'purple',
    ADMIN: 'green',
    SUPER_ADMIN: 'red',
  };
  return map[role] || 'gray';
}

export function getStatusBadgeVariant(status: string): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    pending: 'yellow',
    approved: 'green',
    rejected: 'red',
    active: 'green',
    inactive: 'gray',
    suspended: 'orange',
    open: 'blue',
    in_progress: 'orange',
    resolved: 'green',
    closed: 'gray',
  };
  return map[status] || 'gray';
}
