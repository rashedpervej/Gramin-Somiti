import { NavLink, useLocation } from 'react-router-dom';
import { Home, PiggyBank, Bell, User, BarChart3, Users, Settings, ClipboardList } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/utils/cn';
import type { UserRole } from '@/types';

interface NavItem {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  { to: '/dashboard', icon: Home, label: 'হোম', roles: ['MEMBER', 'COLLECTOR', 'MANAGER', 'ADMIN', 'SUPER_ADMIN'] },
  { to: '/savings', icon: PiggyBank, label: 'সঞ্চয়', roles: ['MEMBER', 'MANAGER', 'ADMIN', 'SUPER_ADMIN'] },
  { to: '/collections', icon: ClipboardList, label: 'কালেকশন', roles: ['COLLECTOR', 'MANAGER', 'ADMIN', 'SUPER_ADMIN'] },
  { to: '/reports', icon: BarChart3, label: 'রিপোর্ট', roles: ['MANAGER', 'ADMIN', 'SUPER_ADMIN'] },
  { to: '/admin', icon: Settings, label: 'অ্যাডমিন', roles: ['ADMIN', 'SUPER_ADMIN'] },
  { to: '/users', icon: Users, label: 'সদস্য', roles: ['MANAGER', 'ADMIN', 'SUPER_ADMIN'] },
  { to: '/notifications', icon: Bell, label: 'বিজ্ঞপ্তি', roles: ['MEMBER', 'COLLECTOR', 'MANAGER', 'ADMIN', 'SUPER_ADMIN'] },
  { to: '/profile', icon: User, label: 'প্রোফাইল', roles: ['MEMBER', 'COLLECTOR', 'MANAGER', 'ADMIN', 'SUPER_ADMIN'] },
];

export function BottomNav() {
  const { role } = useAuth();
  const location = useLocation();

  if (!role) return null;

  const visibleItems = navItems.filter(item => item.roles.includes(role));
  const displayItems = visibleItems.slice(0, 5);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 safe-bottom">
      <div className="bg-white border-t border-gray-100 px-2 pt-2 pb-3 shadow-lg">
        <div className="flex items-center justify-around max-w-lg mx-auto">
          {displayItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to || location.pathname.startsWith(item.to + '/');

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={cn(
                  'flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[56px]',
                  isActive
                    ? 'text-green-600'
                    : 'text-gray-400 hover:text-gray-600',
                )}
              >
                <div className={cn(
                  'h-8 w-8 rounded-xl flex items-center justify-center transition-all duration-200',
                  isActive ? 'bg-green-100' : 'bg-transparent',
                )}>
                  <Icon className={cn('h-5 w-5 transition-all duration-200', isActive && 'scale-110')} />
                </div>
                <span className="text-[10px] font-medium leading-none">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
