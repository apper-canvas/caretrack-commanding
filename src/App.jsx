import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { AnimatePresence } from 'framer-motion';

// Pages
// Pages
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';
import Help from './pages/Help';
import MedicalRecords from './pages/MedicalRecords';

// Components
import { getIcon } from './utils/iconUtils.js';
import PatientContextBanner from './components/PatientContextBanner';

// Navigation items configuration
const NavItems = [
  { 
    name: "Dashboard", 
    path: "/", 
    icon: "home",
    description: "Overview of patient statistics and activity" 
  },
  { 
    name: "Patients", 
    path: "/patients", 
    icon: "users",
    description: "Manage patient records and information" 
  },
  { 
    name: "Appointments", 
    path: "/appointments", 
    icon: "calendar",
    description: "Schedule and manage appointments" 
  },
  { 
    name: "Medical Records", 
    path: "/records", 
    icon: "file-text",
    description: "Access and update patient medical records" 
  },
  { 
    name: "Help", 
    path: "/help", 
    icon: "help-circle",
    description: "User guides, FAQs and troubleshooting" 
  },
  { 
    name: "Settings", 
    path: "/settings", 
    icon: "settings",
    description: "Configure application preferences" 
  }
];

const SidePanel = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Icons
  const ChevronLeftIcon = getIcon('chevron-left');
  const ChevronRightIcon = getIcon('chevron-right');
  const MenuIcon = getIcon('menu');
  
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Auto-collapse on mobile
      if (mobile && isOpen) setIsOpen(false);
      // Auto-expand on desktop
      if (!mobile && !isOpen) setIsOpen(true);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);
  
  return (
    <div className={`side-panel bg-white dark:bg-surface-800 border-r border-surface-200 dark:border-surface-700 h-screen ${isOpen ? 'w-64' : 'w-16'} ${isMobile ? (isOpen ? 'side-panel-open' : 'side-panel-closed') : ''}`}>
      <div className="p-4 flex items-center justify-between border-b border-surface-200 dark:border-surface-700">
        {isOpen && <h2 className="text-lg font-semibold text-primary dark:text-primary-light truncate">Navigation</h2>}
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors flex-shrink-0">
          {isOpen ? 
            <ChevronLeftIcon className="h-5 w-5 text-surface-600 dark:text-surface-300" /> : 
            <ChevronRightIcon className="h-5 w-5 text-surface-600 dark:text-surface-300" />
          }
        </button>
      </div>
      
      <nav className="p-4" aria-label="Main navigation">
        <ul className="space-y-2">
          {NavItems.map((item) => {
            const IconComponent = getIcon(item.icon);
            const isActive = location.pathname === item.path || 
                            (item.path !== '/' && location.pathname.startsWith(item.path));
            
            return (
              <li key={item.path}>
                <Link to={item.path} className={`side-nav-link ${isActive ? 'active' : ''}`} aria-current={isActive ? 'page' : undefined} title={!isOpen ? item.name : undefined}>
                  <IconComponent className="h-5 w-5" aria-hidden="true" />
                  {isOpen && <span>{item.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const MoonIcon = getIcon('moon');
  const SunIcon = getIcon('sun');
  const SearchIcon = getIcon('search');
  const MenuIcon = getIcon('menu');
  const UserIcon = getIcon('user');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    // Check for user preference
    const isDark = localStorage.getItem('darkMode') === 'true' || 
                  window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', (!darkMode).toString());
  };

  return (
    <header className="bg-white dark:bg-surface-800 shadow-sm py-4 sticky top-0 z-40">
      <div className="container mx-auto flex justify-between items-center">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`md:hidden p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 mr-2 ${isMobileMenuOpen ? 'bg-surface-100 dark:bg-surface-700' : ''}`} aria-label="Toggle mobile navigation">
          <MenuIcon className="h-6 w-6 text-surface-600 dark:text-surface-300" />
        </button>
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-lg">C</span>
          </div> 
          <h1 className="text-xl font-bold text-primary dark:text-primary-light">CareTrack</h1>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex items-center">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SearchIcon className="h-4 w-4 text-surface-500 dark:text-surface-400" />
              </div>
              <input type="search" className="pl-10 pr-4 py-2 w-full md:w-64 rounded-lg border border-surface-300 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 text-surface-700 dark:text-surface-300 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Search..." aria-label="Search" />
            </div>
         </nav>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <SunIcon className="h-5 w-5 text-yellow-400" /> : <MoonIcon className="h-5 w-5 text-surface-600" />}
            </button>
            
            <div className="h-8 w-8 bg-surface-200 dark:bg-surface-700 rounded-full flex items-center justify-center">
              <UserIcon className="h-5 w-5 text-surface-600 dark:text-surface-300" />
            </div>
          </div>
        </div>
        
        <button 
          className="md:hidden p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 ml-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle user menu"
        >
          <UserIcon className="h-6 w-6 text-surface-600 dark:text-surface-300" />
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-3 px-4 py-3 bg-white dark:bg-surface-800 border-t dark:border-surface-700 absolute right-0 left-0 shadow-md z-50">
          <nav className="flex flex-col space-y-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SearchIcon className="h-4 w-4 text-surface-500 dark:text-surface-400" />
              </div>
              <input type="search" className="w-full pl-10 pr-4 py-2 rounded-lg border border-surface-300 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 text-surface-700 dark:text-surface-300 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Search across all modules..." aria-label="Search" />
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-surface-200 dark:bg-surface-700 rounded-full flex items-center justify-center">
                <UserIcon className="h-5 w-5 text-surface-600 dark:text-surface-300" />
              </div>
              <span className="text-surface-600 dark:text-surface-300">User</span>
            </div>
            
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <SunIcon className="h-5 w-5 text-yellow-400" /> : <MoonIcon className="h-5 w-5 text-surface-600" />}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

const Footer = () => {
  const HeartIcon = getIcon('heart');
  return (
    <footer className="py-4 md:py-6 bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-center md:text-left text-surface-600 dark:text-surface-400 text-sm">
              © {new Date().getFullYear()} CareTrack Healthcare Solutions
            </p>
          </div>
          
          <div className="flex items-center text-surface-500 dark:text-surface-400 text-sm">
            <span>Made with</span>
            <HeartIcon className="h-4 w-4 mx-1 text-red-500" />
            <span>for healthcare professionals</span> 
          </div>
        </div>
      </div>
    </footer>
  );
};

function App() {
  const activePatient = useSelector(state => state.patient.activePatient);
  
  return (
    <div className="min-h-screen flex flex-col bg-surface-50 dark:bg-surface-900 relative">
      <Header />
      <main className="flex-grow flex flex-col md:flex-row relative">
        <SidePanel />
        <div className="flex-1 overflow-auto p-4 md:p-6">
          {activePatient && <PatientContextBanner />}
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/patients/*" element={<Patients />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/records" element={<MedicalRecords />} />
              <Route path="/help/*" element={<Help />} />
              <Route path="/settings" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </div>
      </main>
      
      <Footer />
      
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" // or "dark" based on system preference
        toastClassName="rounded-lg shadow-lg"
      />
    </div>
  );
}

export default App;