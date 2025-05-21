import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AnimatePresence } from 'framer-motion';

// Pages
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Patients from './pages/Patients';

// Components
import { getIcon } from './utils/iconUtils.js';

const SidePanel = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  
  // Icons
  const HomeIcon = getIcon('home');
  const UsersIcon = getIcon('users');
  const CalendarIcon = getIcon('calendar');
  const FileTextIcon = getIcon('file-text');
  const SettingsIcon = getIcon('settings');
  const ChevronLeftIcon = getIcon('chevron-left');
  const ChevronRightIcon = getIcon('chevron-right');
  
  return (
    <div className={`side-panel bg-white dark:bg-surface-800 border-r border-surface-200 dark:border-surface-700 h-screen ${isOpen ? 'w-64' : 'w-16'} transition-all duration-300 sticky top-0`}>
      <div className="p-4 flex items-center justify-between border-b border-surface-200 dark:border-surface-700">
        {isOpen && <h2 className="text-lg font-semibold text-primary dark:text-primary-light">Navigation</h2>}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
        >
          {isOpen ? 
            <ChevronLeftIcon className="h-5 w-5 text-surface-600 dark:text-surface-300" /> : 
            <ChevronRightIcon className="h-5 w-5 text-surface-600 dark:text-surface-300" />
          }
        </button>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link to="/" className={`side-nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              <HomeIcon className="h-5 w-5" />
              {isOpen && <span>Dashboard</span>}
            </Link>
          </li>
          <li>
            <Link to="/patients" className={`side-nav-link ${location.pathname === '/patients' ? 'active' : ''}`}>
              <UsersIcon className="h-5 w-5" />
              {isOpen && <span>Patients</span>}
            </Link>
          </li>
          <li>
            <Link to="/appointments" className={`side-nav-link ${location.pathname === '/appointments' ? 'active' : ''}`}>
              <CalendarIcon className="h-5 w-5" />
              {isOpen && <span>Appointments</span>}
            </Link>
          </li>
         
        </ul>
      </nav>
    </div>
  );
};

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const MoonIcon = getIcon('moon');
  const SunIcon = getIcon('sun');
  const MenuIcon = getIcon('menu');
  const UserIcon = getIcon('user');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Check for user preference
    const isDark = localStorage.getItem('darkMode') === 'true' || 
                  window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', !darkMode);
  };

  return (
    <header className="bg-white dark:bg-surface-800 shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <h1 className="text-xl font-bold text-primary dark:text-primary-light">CareTrack</h1>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex space-x-4">
            <a href="/" className="text-surface-600 hover:text-primary dark:text-surface-300 dark:hover:text-primary-light">Dashboard</a>
            <a href="/patients" className="text-surface-600 hover:text-primary dark:text-surface-300 dark:hover:text-primary-light">Patients</a>
            <a href="/records" className="text-surface-600 hover:text-primary dark:text-surface-300 dark:hover:text-primary-light">Records</a>
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
          className="md:hidden p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <MenuIcon className="h-6 w-6 text-surface-600 dark:text-surface-300" />
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-3 px-4 py-3 bg-white dark:bg-surface-800 border-t dark:border-surface-700">
          <nav className="flex flex-col space-y-3">
            <a href="/" className="text-surface-600 hover:text-primary dark:text-surface-300 dark:hover:text-primary-light py-2">Dashboard</a>
            <a href="/patients" className="text-surface-600 hover:text-primary dark:text-surface-300 dark:hover:text-primary-light py-2">Patients</a>
            <a href="/records" className="text-surface-600 hover:text-primary dark:text-surface-300 dark:hover:text-primary-light py-2">Records</a>
            
            <div className="flex items-center justify-between pt-2 border-t dark:border-surface-700">
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
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

const Footer = () => {
  const HeartIcon = getIcon('heart');
  return (
    <footer className="mt-auto py-6 bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-surface-600 dark:text-surface-400 text-sm">
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
  return (
    <div className="min-h-screen flex flex-col bg-surface-50 dark:bg-surface-900">
      <Header />
      
      <main className="flex-grow flex">
        <SidePanel />
        
        <div className="flex-1 overflow-auto">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/patients" element={<Patients />} />
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