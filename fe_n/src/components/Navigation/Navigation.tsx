import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  TrendingUp, 
  Brain, 
  User,
  Home,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navigation: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/indicators', icon: BarChart3, label: 'Indicators' },
    { path: '/trading', icon: TrendingUp, label: 'Trading' },
    { path: '/strategies', icon: Brain, label: 'Strategies' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 z-50 md:relative md:border-t-0 md:border-r md:w-64 md:h-screen">
      <div className="flex md:flex-col">
        {/* Desktop Header */}
        <div className="hidden md:block p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-primary-600">TradeViz</h1>
          {user && (
            <p className="text-sm text-gray-600 mt-2">Welcome, {user.first_name}</p>
          )}
        </div>

        {/* Navigation Items */}
        <div className="flex md:flex-col flex-1 md:p-4">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`
                flex flex-col md:flex-row items-center justify-center md:justify-start
                p-3 md:p-3 md:rounded-lg transition-colors flex-1 md:flex-none
                ${isActive(path)
                  ? 'text-primary-600 bg-primary-50 md:bg-primary-100'
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                }
              `}
            >
              <Icon size={24} className="md:mr-3" />
              <span className="text-xs md:text-sm mt-1 md:mt-0">{label}</span>
            </Link>
          ))}
        </div>

        {/* User Menu - Desktop */}
        <div className="hidden md:block p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <User size={20} className="text-gray-600 mr-2" />
              <span className="text-sm text-gray-600">{user?.username}</span>
            </div>
            <button
              onClick={logout}
              className="p-1 text-gray-600 hover:text-red-600 transition-colors"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
