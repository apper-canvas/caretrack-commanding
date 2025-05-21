import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { getIcon } from '../utils/iconUtils.js';
import TimelineView from '../components/medicalRecords/TimelineView';
import RecordDetail from '../components/medicalRecords/RecordDetail';
import { getMedicalRecordsByPatientId } from '../data/mockMedicalRecordsData';

const MedicalRecords = () => {
  // Icons
  const SearchIcon = getIcon('search');
  const CalendarIcon = getIcon('calendar');
  const ListIcon = getIcon('list');
  const FilterIcon = getIcon('filter');
  const AlertIcon = getIcon('alert-circle');
  const UserIcon = getIcon('user');

  // State
  const [activeView, setActiveView] = useState('timeline');
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    startDate: '',
    endDate: ''
  });

  // Get active patient from Redux store
  const activePatient = useSelector(state => state.patient.activePatient);

  // Load medical records when active patient changes
  useEffect(() => {
    const fetchMedicalRecords = async () => {
      setLoading(true);
      try {
        if (activePatient) {
          // Simulate API call with setTimeout
          setTimeout(() => {
            const records = getMedicalRecordsByPatientId(activePatient.id);
            setMedicalRecords(records);
            setFilteredRecords(records);
            setLoading(false);
          }, 500);
        } else {
          setMedicalRecords([]);
          setFilteredRecords([]);
          setLoading(false);
        }
      } catch (error) {
        toast.error('Failed to load medical records');
        setLoading(false);
      }
    };

    fetchMedicalRecords();
  }, [activePatient]);

  // Filter medical records based on search and filters
  useEffect(() => {
    if (!medicalRecords.length) return;

    let results = [...medicalRecords];

    // Apply search
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      results = results.filter(record =>
        record.title.toLowerCase().includes(lowerSearchTerm) ||
        record.description.toLowerCase().includes(lowerSearchTerm) ||
        record.provider.toLowerCase().includes(lowerSearchTerm)
      );
    }

    // Apply type filter
    if (filters.type !== 'all') {
      results = results.filter(record => record.type === filters.type);
    }

    // Apply date range filter
    if (filters.startDate) {
      const startDate = new Date(filters.startDate);
      results = results.filter(record => new Date(record.date) >= startDate);
    }

    if (filters.endDate) {
      const endDate = new Date(filters.endDate);
      endDate.setHours(23, 59, 59); // End of day
      results = results.filter(record => new Date(record.date) <= endDate);
    }

    // Sort by date (newest first)
    results.sort((a, b) => new Date(b.date) - new Date(a.date));

    setFilteredRecords(results);
  }, [medicalRecords, searchTerm, filters]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // View a record detail
  const handleViewRecord = (record) => {
    setSelectedRecord(record);
    setIsDetailOpen(true);
  };

  // Page transition animation
  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-surface-800 dark:text-surface-100">Medical Records</h1>
          <p className="text-surface-600 dark:text-surface-400 mt-1">View and manage patient medical history</p>
        </div>
      </div>

      {!activePatient ? (
        <div className="card flex flex-col items-center justify-center py-10">
          <UserIcon className="w-12 h-12 text-surface-400 mb-4" />
          <h2 className="text-xl font-semibold text-surface-700 dark:text-surface-300 mb-2">No Patient Selected</h2>
          <p className="text-surface-600 dark:text-surface-400 text-center max-w-md">
            Please select a patient from the Patients page to view their medical records.
          </p>
        </div>
      ) : (
        <div className="card mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div className="relative w-full md:w-64 mb-4 md:mb-0">
              <input
                type="text"
                placeholder="Search records..."
                className="form-input pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400 w-4 h-4" />
            </div>

            <div className="flex items-center space-x-3">
              <button
                className="btn btn-outline flex items-center"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FilterIcon className="w-4 h-4 mr-2" />
                Filters
              </button>
            </div>
          </div>

          <TimelineView records={filteredRecords} onViewRecord={handleViewRecord} loading={loading} />
          {isDetailOpen && <RecordDetail record={selectedRecord} onClose={() => setIsDetailOpen(false)} />}
        </div>
      )}
    </motion.div>
  );
};

export default MedicalRecords;