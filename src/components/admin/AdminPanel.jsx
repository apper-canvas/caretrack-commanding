import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getIcon } from '../../utils/iconUtils.js';

const AdminPanel = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Admin navigation items
  const adminNavItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/admin', icon: 'grid' },
    { id: 'patients', label: 'Patients', path: '/admin/patients', icon: 'users' },
    { id: 'providers', label: 'Providers', path: '/admin/providers', icon: 'user-plus' },
    { id: 'appointment-types', label: 'Appointment Types', path: '/admin/appointment-types', icon: 'tag' },
    { id: 'appointment-statuses', label: 'Appointment Statuses', path: '/admin/appointment-statuses', icon: 'check-circle' },
  ];

  // Check which tab is active based on current path
  const currentPath = location.pathname;
  
  return (
    <motion.div 
      className="w-full bg-white dark:bg-surface-800 rounded-xl shadow-card mb-8 overflow-hidden"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="overflow-x-auto">
        <nav className="flex p-2">
          {adminNavItems.map((item) => {
            const isActive = 
              (item.path === '/admin' && currentPath === '/admin') || 
              (item.path !== '/admin' && currentPath.includes(item.path));
            
            const IconComponent = getIcon(item.icon);
            
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`
                  flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors
                  ${isActive 
                    ? 'bg-primary text-white' 
                    : 'text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'}
                `}
              >
                <IconComponent 
                  className={`h-5 w-5 ${isActive ? 'text-white' : 'text-surface-500 dark:text-surface-400'} mr-2`} 
                  aria-hidden="true" 
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </motion.div>
  );
};

export default AdminPanel;