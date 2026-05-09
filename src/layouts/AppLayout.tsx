import React from 'react';
import { motion } from 'framer-motion';
import { BottomNav } from './BottomNav';
import { cn } from '@/utils/cn';

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export function AppLayout({ children, className, noPadding }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col">
      <motion.main
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.2 }}
        className={cn(
          'flex-1 max-w-lg mx-auto w-full',
          !noPadding && 'pb-28',
          className,
        )}
      >
        {children}
      </motion.main>
      <BottomNav />
    </div>
  );
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  back?: boolean;
  className?: string;
}

export function PageHeader({ title, subtitle, action, className }: PageHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between px-4 py-4 bg-white border-b border-gray-100 sticky top-0 z-30 safe-top', className)}>
      <div>
        <h1 className="text-lg font-bold text-gray-900 leading-tight">{title}</h1>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
      {action && <div className="flex items-center gap-2">{action}</div>}
    </div>
  );
}
