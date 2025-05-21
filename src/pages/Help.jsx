import { useState } from 'react';
import { motion } from 'framer-motion';
import { Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { getIcon } from '../utils/iconUtils';

// Help Components
import UserGuides from '../components/help/UserGuides';
import FAQ from '../components/help/FAQ';
import Troubleshooting from '../components/help/Troubleshooting';

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

function Help() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  // Icons
  const SearchIcon = getIcon('search');
  const BookOpenIcon = getIcon('book-open');
  const HelpCircleIcon = getIcon('help-circle');
  const AlertTriangleIcon = getIcon('alert-triangle');

  // Help sections
  const helpSections = [
    { 
      name: "User Guides", 
      path: "/help/guides", 
      icon: BookOpenIcon,
      description: "Step-by-step guides for using CareTrack"
    },
    { 
      name: "FAQs", 
      path: "/help/faqs", 
      icon: HelpCircleIcon,
      description: "Frequently asked questions"
    },
    { 
      name: "Troubleshooting", 
      path: "/help/troubleshooting", 
      icon: AlertTriangleIcon,
      description: "Solutions for common issues"
    }
  ];

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/help/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <motion.div 
      className="w-full max-w-7xl mx-auto"
      {...pageTransition}
    >
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-surface-800 dark:text-surface-100 mb-2">
          Help & Documentation
        </h1>
        <p className="text-surface-600 dark:text-surface-400">
          Find guides, answers to common questions, and troubleshooting help for CareTrack
        </p>
      </div>

      {/* Search bar */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon className="h-5 w-5 text-surface-500 dark:text-surface-400" />
            </div>
            <input 
              type="search" 
              className="pl-10 pr-4 py-3 w-full rounded-lg border border-surface-300 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 text-surface-700 dark:text-surface-300 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Search for help topics..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search for help topics"
            />
          </div>
          <button 
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 btn btn-primary py-1.5 px-4"
          >
            Search
          </button>
        </form>
      </div>

      {/* Help Section Navigation */}
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 mb-8">
        {helpSections.map((section) => {
          const isActive = location.pathname === section.path || 
                          (section.path !== '/help' && location.pathname.startsWith(section.path));
          
          return (
            <NavLink
              key={section.path}
              to={section.path}
              className={({ isActive }) => 
                `flex flex-col items-center justify-center p-4 rounded-xl border ${
                  isActive
                    ? 'bg-primary/10 border-primary/30 text-primary dark:bg-primary/20 dark:border-primary/40 dark:text-primary-light'
                    : 'border-surface-200 dark:border-surface-700 hover:bg-surface-100 dark:hover:bg-surface-800'
                } transition-colors flex-1 text-center`
              }
            >
              <section.icon className="h-6 w-6 mb-2" />
              <h3 className="font-medium">{section.name}</h3>
              <p className="text-sm text-surface-600 dark:text-surface-400 mt-1">
                {section.description}
              </p>
            </NavLink>
          );
        })}
      </div>

      <div className="card">
        <Routes>
          <Route path="/" element={<DefaultHelp navigate={navigate} />} />
          <Route path="/guides/*" element={<UserGuides />} />
          <Route path="/faqs/*" element={<FAQ />} />
          <Route path="/troubleshooting/*" element={<Troubleshooting />} />
          <Route path="*" element={<DefaultHelp navigate={navigate} />} />
        </Routes>
      </div>
    </motion.div>
  );
}

// Default help component shown when no specific section is selected
function DefaultHelp({ navigate }) {
  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">Welcome to CareTrack Help</h2>
      <p className="text-surface-600 dark:text-surface-400 mb-6">
        Select a help section above or use the search to find answers to your questions.
      </p>
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <button onClick={() => navigate('/help/guides')} className="btn btn-outline py-3">User Guides</button>
        <button onClick={() => navigate('/help/faqs')} className="btn btn-outline py-3">Frequently Asked Questions</button>
        <button onClick={() => navigate('/help/troubleshooting')} className="btn btn-outline py-3">Troubleshooting</button>
      </div>
    </div>
  );
}

export default Help;