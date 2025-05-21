import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils.jsx';
import PatientForm from '../components/PatientForm';
import { patients, calculateAge } from '../data/mockData';

const Patients = () => {
  // Icons
  const SearchIcon = getIcon('search');
  const PlusIcon = getIcon('plus');
  const EditIcon = getIcon('edit');
  const TrashIcon = getIcon('trash');
  const FilterIcon = getIcon('filter');
  const EyeIcon = getIcon('eye');
  const UserPlusIcon = getIcon('user-plus');
  const XIcon = getIcon('x');

  // States
  const [patientList, setPatientList] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    gender: 'all'
  });

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);

  // Sort states
  const [sortField, setSortField] = useState('lastName');
  const [sortDirection, setSortDirection] = useState('asc');

  // Initialize patient data
  useEffect(() => {
    setPatientList(patients);
  }, []);

  // Filter and search patients
  useEffect(() => {
    let result = [...patientList];
    
    // Apply search
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(patient => 
        patient.firstName.toLowerCase().includes(lowerSearchTerm) ||
        patient.lastName.toLowerCase().includes(lowerSearchTerm) ||
        patient.email.toLowerCase().includes(lowerSearchTerm) ||
        patient.phone.includes(searchTerm)
      );
    }
    
    // Apply filters
    if (filters.status !== 'all') {
      result = result.filter(patient => patient.status === filters.status);
    }
    
    if (filters.gender !== 'all') {
      result = result.filter(patient => patient.gender === filters.gender);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      let fieldA = a[sortField];
      let fieldB = b[sortField];
      
      // Special case for name sorting
      if (sortField === 'name') {
        fieldA = `${a.lastName}, ${a.firstName}`;
        fieldB = `${b.lastName}, ${b.firstName}`;
      }
      
      if (fieldA < fieldB) return sortDirection === 'asc' ? -1 : 1;
      if (fieldA > fieldB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    
    setFilteredPatients(result);
  }, [patientList, searchTerm, filters, sortField, sortDirection]);

  // Handle sort toggle
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle add new patient
  const handleAddNewPatient = (patientData) => {
    // Add new patient to the list
    setPatientList(prevList => [patientData, ...prevList]);
    setIsAddModalOpen(false);
    toast.success(`Patient ${patientData.firstName} ${patientData.lastName} has been added!`);
  };

  // Handle edit patient
  const handleEditPatient = (patientData) => {
    // Update patient in the list
    setPatientList(prevList => 
      prevList.map(patient => 
        patient.id === patientData.id ? patientData : patient
      )
    );
    setIsEditModalOpen(false);
    toast.success(`Patient ${patientData.firstName} ${patientData.lastName} has been updated!`);
  };

  // Handle delete patient
  const handleDeletePatient = () => {
    if (currentPatient) {
      // Remove patient from the list
      setPatientList(prevList => 
        prevList.filter(patient => patient.id !== currentPatient.id)
      );
      setIsDeleteModalOpen(false);
      toast.success(`Patient ${currentPatient.firstName} ${currentPatient.lastName} has been deleted!`);
      setCurrentPatient(null);
    }
  };

  // Open view patient modal
  const openViewModal = (patient) => {
    setCurrentPatient(patient);
    setIsViewModalOpen(true);
  };

  // Open edit patient modal
  const openEditModal = (patient) => {
    setCurrentPatient(patient);
    setIsEditModalOpen(true);
  };

  // Open delete confirmation modal
  const openDeleteModal = (patient) => {
    setCurrentPatient(patient);
    setIsDeleteModalOpen(true);
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
          <h1 className="text-2xl md:text-3xl font-bold text-surface-800 dark:text-surface-100">Patients</h1>
          <p className="text-surface-600 dark:text-surface-400 mt-1">Manage your patient records</p>
        </div>
        
        <button 
          className="btn btn-primary flex items-center mt-4 md:mt-0"
          onClick={() => setIsAddModalOpen(true)}
        >
          <UserPlusIcon className="w-4 h-4 mr-2" />
          Add New Patient
        </button>
      </div>
      
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div className="relative w-full md:w-64 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search patients..."
              className="form-input pl-10"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400 w-4 h-4" />
          </div>
          
          <div className="flex items-center">
            <button
              className="btn btn-outline flex items-center"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FilterIcon className="w-4 h-4 mr-2" />
              Filters
            </button>
          </div>
        </div>
        
        {showFilters && (
          <div className="bg-surface-100 dark:bg-surface-800 p-4 rounded-lg mb-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="status" className="form-label">Status</label>
                <select
                  id="status"
                  name="status"
                  className="form-input"
                  value={filters.status}
                  onChange={handleFilterChange}
                >
                  <option value="all">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="gender" className="form-label">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  className="form-input"
                  value={filters.gender}
                  onChange={handleFilterChange}
                >
                  <option value="all">All Genders</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>
        )}
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-surface-100 dark:bg-surface-800">
              <tr>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-surface-600 dark:text-surface-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('lastName')}
                >
                  Name
                  {sortField === 'lastName' && (
                    <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-surface-600 dark:text-surface-400 uppercase tracking-wider">
                  Contact Info
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-surface-600 dark:text-surface-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('dob')}
                >
                  Age/Gender
                  {sortField === 'dob' && (
                    <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-surface-600 dark:text-surface-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('lastVisit')}
                >
                  Last Visit
                  {sortField === 'lastVisit' && (
                    <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-surface-600 dark:text-surface-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  Status
                  {sortField === 'status' && (
                    <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-surface-600 dark:text-surface-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-200 dark:divide-surface-700">
              {filteredPatients.length > 0 ? (
                filteredPatients.map(patient => (
                  <tr key={patient.id} className="hover:bg-surface-50 dark:hover:bg-surface-800">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="font-medium text-surface-900 dark:text-surface-100">{patient.lastName}, {patient.firstName}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-surface-600 dark:text-surface-400">{patient.phone}</div>
                      <div className="text-sm text-surface-500 dark:text-surface-500">{patient.email}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-surface-600 dark:text-surface-400">{calculateAge(patient.dob)} years</div>
                      <div className="text-sm text-surface-500 dark:text-surface-500">{patient.gender}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-surface-600 dark:text-surface-400">
                      {patient.lastVisit}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`badge ${patient.status === 'Active' ? 'badge-green' : 'badge-red'}`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm">
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => openViewModal(patient)}
                          className="p-1.5 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-600 dark:text-surface-400"
                          title="View patient details"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => openEditModal(patient)}
                          className="p-1.5 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-600 dark:text-surface-400"
                          title="Edit patient"
                        >
                          <EditIcon className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => openDeleteModal(patient)}
                          className="p-1.5 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 text-red-500"
                          title="Delete patient"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-4 py-6 text-center text-surface-600 dark:text-surface-400">
                    {searchTerm || (filters.status !== 'all' || filters.gender !== 'all') ? 
                      'No patients found with the current filters.' : 
                      'No patients available. Add your first patient!'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Add Patient Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-surface-800 rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Patient</h2>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
              >
                <XIcon className="w-5 h-5 text-surface-600 dark:text-surface-400" />
              </button>
            </div>
            <PatientForm 
              onSubmit={handleAddNewPatient}
              onCancel={() => setIsAddModalOpen(false)}
            />
          </div>
        </div>
      )}
      
      {/* View Patient Modal */}
      {isViewModalOpen && currentPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-surface-800 rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Patient Details</h2>
              <button 
                onClick={() => setIsViewModalOpen(false)}
                className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
              >
                <XIcon className="w-5 h-5 text-surface-600 dark:text-surface-400" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-surface-600 dark:text-surface-400">Personal Information</h3>
                <div className="mt-2 space-y-2">
                  <p><span className="font-medium">Name:</span> {currentPatient.firstName} {currentPatient.lastName}</p>
                  <p><span className="font-medium">Date of Birth:</span> {currentPatient.dob} ({calculateAge(currentPatient.dob)} years)</p>
                  <p><span className="font-medium">Gender:</span> {currentPatient.gender}</p>
                  <p><span className="font-medium">Status:</span> <span className={`badge ${currentPatient.status === 'Active' ? 'badge-green' : 'badge-red'}`}>{currentPatient.status}</span></p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-surface-600 dark:text-surface-400">Contact Information</h3>
                <div className="mt-2 space-y-2">
                  <p><span className="font-medium">Phone:</span> {currentPatient.phone}</p>
                  <p><span className="font-medium">Email:</span> {currentPatient.email}</p>
                  <p><span className="font-medium">Address:</span> {currentPatient.address}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-surface-600 dark:text-surface-400">Insurance Information</h3>
                <div className="mt-2 space-y-2">
                  <p><span className="font-medium">Provider:</span> {currentPatient.insuranceProvider}</p>
                  <p><span className="font-medium">Policy Number:</span> {currentPatient.insuranceNumber}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-surface-600 dark:text-surface-400">Medical Information</h3>
                <div className="mt-2 space-y-2">
                  <p><span className="font-medium">Medical Conditions:</span> {currentPatient.medicalConditions?.length ? currentPatient.medicalConditions.join(', ') : 'None'}</p>
                  <p><span className="font-medium">Allergies:</span> {currentPatient.allergies?.length ? currentPatient.allergies.join(', ') : 'None'}</p>
                  <p><span className="font-medium">Last Visit:</span> {currentPatient.lastVisit}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6 space-x-3">
              <button className="btn btn-outline" onClick={() => setIsViewModalOpen(false)}>Close</button>
              <button className="btn btn-primary" onClick={() => { setIsViewModalOpen(false); openEditModal(currentPatient); }}>Edit Patient</button>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit Patient Modal */}
      {isEditModalOpen && currentPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-surface-800 rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Patient</h2>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
              >
                <XIcon className="w-5 h-5 text-surface-600 dark:text-surface-400" />
              </button>
            </div>
            <PatientForm 
              patient={currentPatient}
              onSubmit={handleEditPatient}
              onCancel={() => setIsEditModalOpen(false)}
            />
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && currentPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-surface-800 rounded-xl p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="text-surface-600 dark:text-surface-400 mb-6">
              Are you sure you want to delete patient <span className="font-medium">{currentPatient.firstName} {currentPatient.lastName}</span>? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button className="btn btn-outline" onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
              <button className="btn bg-red-500 hover:bg-red-600 text-white" onClick={handleDeletePatient}>Delete Patient</button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Patients;