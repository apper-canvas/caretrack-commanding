import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

// Mock data for patient dashboard
const patientStats = [
  { title: "Total Patients", value: 346, icon: "users", color: "blue", change: "+12%" },
  { title: "Appointments Today", value: 42, icon: "calendar", color: "green", change: "+5%" },
  { title: "Pending Records", value: 18, icon: "clipboard-list", color: "amber", change: "-3%" },
  { title: "Recent Admissions", value: 8, icon: "bed", color: "rose", change: "+2%" }
];

// Mock data for recent patients
const recentPatients = [
  { id: 1, name: "Emma Thompson", age: 42, status: "Scheduled", date: "Today, 9:30 AM", reason: "Annual Checkup", doctor: "Dr. Richards" },
  { id: 2, name: "Michael Chen", age: 35, status: "Completed", date: "Yesterday, 2:15 PM", reason: "Follow-up", doctor: "Dr. Johnson" },
  { id: 3, name: "Sophia Martinez", age: 28, status: "Waiting", date: "Today, 10:45 AM", reason: "Consultation", doctor: "Dr. Williams" },
  { id: 4, name: "James Wilson", age: 56, status: "No-show", date: "Yesterday, 4:00 PM", reason: "Blood Work", doctor: "Dr. Garcia" },
];

const statusColors = {
  "Scheduled": "badge-blue",
  "Completed": "badge-green",
  "Waiting": "badge-yellow",
  "No-show": "badge-red",
  "Cancelled": "badge-purple"
};

// Animated card component
const StatCard = ({ title, value, icon, color, change }) => {
  const IconComponent = getIcon(icon);
  const bgClass = `bg-${color}-100 dark:bg-${color}-900/20`;
  const textClass = `text-${color}-600 dark:text-${color}-400`;
  const isPositive = change.startsWith('+');

  const TrendIcon = getIcon(isPositive ? 'trending-up' : 'trending-down');
  
  return (
    <motion.div 
      className="card hover:shadow-lg transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-surface-500 dark:text-surface-400 text-sm font-medium">{title}</p>
          <h3 className="mt-1 text-2xl font-semibold">{value}</h3>
          <div className={`mt-1 flex items-center ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            <TrendIcon className="h-4 w-4 mr-1" />
            <span className="text-xs font-medium">{change} from last month</span>
          </div>
        </div>
        <div className={`p-3 rounded-lg ${bgClass}`}>
          <IconComponent className={`h-6 w-6 ${textClass}`} />
        </div>
      </div>
    </motion.div>
  );
};

// Main Home component
const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedPatients, setDisplayedPatients] = useState(recentPatients);
  const SearchIcon = getIcon('search');
  const UserPlusIcon = getIcon('user-plus');
  const FileTextIcon = getIcon('file-text');
  
  // Handle search
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setDisplayedPatients(recentPatients);
    } else {
      const filtered = recentPatients.filter(patient => 
        patient.name.toLowerCase().includes(query) || 
        patient.reason.toLowerCase().includes(query) ||
        patient.doctor.toLowerCase().includes(query)
      );
      setDisplayedPatients(filtered);
    }
  };

  const handleQuickAdd = () => {
    toast.success("Quick add feature triggered! Patient form would appear here.");
  };

  const handleExport = () => {
    toast.info("Preparing patient data export...");
    setTimeout(() => {
      toast.success("Patient data exported successfully!");
    }, 1500);
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
            <h1 className="text-2xl md:text-3xl font-bold text-surface-800 dark:text-surface-100">Healthcare Dashboard</h1>
            <p className="mt-1 text-surface-500 dark:text-surface-400">Welcome back, view your patient overview</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
            <button 
              onClick={handleQuickAdd}
              className="btn bg-primary hover:bg-primary-dark text-white flex items-center justify-center"
            >
              <UserPlusIcon className="h-5 w-5 mr-2" />
              <span>Quick Add Patient</span>
            </button>
            
            <button 
              onClick={handleExport}
              className="btn btn-outline flex items-center justify-center"
            >
              <FileTextIcon className="h-5 w-5 mr-2" />
              <span>Export Records</span>
            </button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {patientStats.map((stat, index) => (
            <StatCard 
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
              change={stat.change}
            />
          ))}
        </div>
        
        {/* Main Feature Component */}
        <div className="mb-8">
          <MainFeature />
        </div>
        
        {/* Recent Patients */}
        <div className="card overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Recent Patients</h2>
            
            <div className="mt-3 sm:mt-0 relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SearchIcon className="h-5 w-5 text-surface-400" />
              </div>
              <input
                type="text"
                placeholder="Search patients..."
                value={searchQuery}
                onChange={handleSearch}
                className="form-input pl-10"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto -mx-4 sm:-mx-6">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-surface-200 dark:divide-surface-700">
                <thead className="bg-surface-50 dark:bg-surface-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                      Patient
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                      Appointment
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                      Doctor
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-surface-800 divide-y divide-surface-200 dark:divide-surface-700">
                  {displayedPatients.length > 0 ? (
                    displayedPatients.map((patient) => (
                      <tr key={patient.id} className="hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-light/20 flex items-center justify-center">
                              <span className="text-primary font-medium">{patient.name.charAt(0)}</span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium">{patient.name}</div>
                              <div className="text-sm text-surface-500 dark:text-surface-400">Age: {patient.age}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm">{patient.date}</div>
                          <div className="text-sm text-surface-500 dark:text-surface-400">{patient.reason}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {patient.doctor}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`${statusColors[patient.status]} px-2 py-1 rounded-full text-xs`}>
                            {patient.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center text-sm text-surface-500 dark:text-surface-400">
                        No patients found matching "{searchQuery}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;