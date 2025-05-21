import { useState } from 'react';
import { Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getIcon } from '../../utils/iconUtils';
import { helpData } from '../../data/mockHelpData';

const UserGuides = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine which guide is active
  const currentPath = location.pathname;
  const activeGuide = helpData.userGuides.find(
    guide => currentPath.includes(`/guides/${guide.id}`)
  ) || helpData.userGuides[0];

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar for guide navigation */}
      <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-surface-200 dark:border-surface-700">
        <div className="p-4 border-b border-surface-200 dark:border-surface-700">
          <h2 className="font-semibold text-lg">User Guides</h2>
        </div>
        <nav className="p-2">
          <ul className="space-y-1">
            {helpData.userGuides.map(guide => {
              const IconComponent = getIcon(guide.icon);
              const isActive = currentPath.includes(`/guides/${guide.id}`);
              
              return (
                <li key={guide.id}>
                  <NavLink
                    to={`/help/guides/${guide.id}`}
                    className={({ isActive }) => 
                      `flex items-center p-2 rounded-lg ${
                        isActive
                          ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light'
                          : 'hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-700 dark:text-surface-300'
                      }`
                    }
                  >
                    <IconComponent className="h-5 w-5 mr-2" />
                    <span>{guide.title}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      
      {/* Main content area */}
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<GuidesList navigate={navigate} />} />
          <Route path="/:guideId" element={<GuideContent />} />
        </Routes>
      </div>
    </div>
  );
};

// Component that displays a list of all guides when no specific guide is selected
const GuidesList = ({ navigate }) => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">CareTrack User Guides</h2>
      <p className="text-surface-600 dark:text-surface-400 mb-6">
        Select a guide from the menu or browse all guides below.
      </p>
      
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        {helpData.userGuides.map(guide => {
          const IconComponent = getIcon(guide.icon);
          
          return (
            <div 
              key={guide.id}
              className="p-4 border border-surface-200 dark:border-surface-700 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-800 cursor-pointer transition-colors"
              onClick={() => navigate(`/help/guides/${guide.id}`)}
            >
              <div className="flex items-center mb-2">
                <IconComponent className="h-5 w-5 mr-2 text-primary dark:text-primary-light" />
                <h3 className="font-medium">{guide.title}</h3>
              </div>
              <p className="text-sm text-surface-600 dark:text-surface-400">
                {guide.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Component that displays the content of a specific guide
const GuideContent = () => {
  const location = useLocation();
  const guideId = location.pathname.split('/').pop();
  const guide = helpData.userGuides.find(g => g.id === guideId) || helpData.userGuides[0];
  
  const IconComponent = getIcon(guide.icon);

  return (
    <motion.div 
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex items-center mb-4">
        <IconComponent className="h-6 w-6 mr-2 text-primary dark:text-primary-light" />
        <h2 className="text-xl font-semibold">{guide.title}</h2>
      </div>
      
      <p className="text-surface-600 dark:text-surface-400 mb-6">
        {guide.description}
      </p>
      
      <div className="prose dark:prose-invert max-w-none">
        {guide.content.map((section, idx) => (
          <div key={idx} className="mb-6">
            <h3 className="text-lg font-medium mb-2">{section.title}</h3>
            <p className="mb-4">{section.text}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default UserGuides;