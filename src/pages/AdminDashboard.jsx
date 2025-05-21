import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getIcon } from '../utils/iconUtils.js';
import AdminPanel from '../components/admin/AdminPanel.jsx';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  
  // Icons
  const UsersIcon = getIcon('users');
  const UserPlusIcon = getIcon('user-plus');
  const TagIcon = getIcon('tag');
  const CheckCircleIcon = getIcon('check-circle');
  
  // Admin cards data
  const adminCards = [
    { 
      title: "Manage Patients", 
      description: "Add, edit or remove patient records", 
      icon: UsersIcon, 
      color: "primary",
      path: "/admin/patients"
    },
    { 
      title: "Manage Providers", 
      description: "Manage healthcare providers and staff", 
      icon: UserPlusIcon, 
      color: "secondary",
      path: "/admin/providers"
    },
    { 
      title: "Appointment Types", 
      description: "Configure appointment types and options", 
      icon: TagIcon, 
      color: "blue",
      path: "/admin/appointment-types"
    },
    { 
      title: "Appointment Statuses", 
      description: "Manage appointment status options", 
      icon: CheckCircleIcon, 
      color: "green",
      path: "/admin/appointment-statuses"
    }
  ];

  // Card component for admin features
  const AdminCard = ({ title, description, icon: Icon, color, path }) => {
    const colorClass = color === "primary" 
      ? "border-primary/20 hover:border-primary dark:border-primary/20 dark:hover:border-primary" 
      : color === "secondary"
      ? "border-secondary/20 hover:border-secondary dark:border-secondary/20 dark:hover:border-secondary"
      : color === "blue"
      ? "border-blue-500/20 hover:border-blue-500 dark:border-blue-500/20 dark:hover:border-blue-500"
      : "border-green-500/20 hover:border-green-500 dark:border-green-500/20 dark:hover:border-green-500";
    
    const iconColorClass = color === "primary" 
      ? "text-primary" 
      : color === "secondary"
      ? "text-secondary"
      : color === "blue"
      ? "text-blue-500"
      : "text-green-500";
    
    return (
      <motion.div 
        className={`card p-6 border-2 ${colorClass} cursor-pointer transition-all duration-300`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.02 }}
        onClick={() => navigate(path)}
      >
        <div className="flex items-center">
          <div className={`p-4 rounded-lg bg-surface-100 dark:bg-surface-700 ${iconColorClass}`}>
            <Icon className="h-8 w-8" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-surface-500 dark:text-surface-400 text-sm mt-1">{description}</p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-surface-800 dark:text-surface-100">Administration</h1>
            <p className="mt-1 text-surface-500 dark:text-surface-400">Manage your healthcare system data and configuration</p>
          </div>
        </div>
        
        <AdminPanel />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {adminCards.map((card, index) => (
            <AdminCard key={index} {...card} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;