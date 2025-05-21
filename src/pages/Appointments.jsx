import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getAppointments, createAppointment } from '../services/appointmentService';
import { getAppointmentTypes } from '../services/appointmentTypeService';
import { getAppointmentStatuses } from '../services/appointmentStatusService';
import { getProviders } from '../services/providerService';
import CalendarView from '../components/appointments/CalendarView';
import ListView from '../components/appointments/ListView';
import MainFeature from '../components/MainFeature';
import { getIcon } from '../utils/iconUtils';

const Appointments = () => {
  const [activeView, setActiveView] = useState('calendar');
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showAppointmentDetails, setShowAppointmentDetails] = useState(false);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [appointmentTypes, setAppointmentTypes] = useState([]);
  const [appointmentStatuses, setAppointmentStatuses] = useState([]);
  const [providers, setProviders] = useState([]);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  
  // Get icons
  const CalendarIcon = getIcon('calendar');
  const ListIcon = getIcon('list');
  const PlusIcon = getIcon('plus');
  const XIcon = getIcon('x');
  const FileTextIcon = getIcon('file-text');
  
  // Load appointments and reference data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch appointments
        const appointmentsData = await getAppointments();
        setAppointments(appointmentsData);
        
        // Fetch reference data
        const [typesData, statusesData, providersData] = await Promise.all([
          getAppointmentTypes(),
          getAppointmentStatuses(),
          getProviders()
        ]);
        
        setAppointmentTypes(typesData);
        setAppointmentStatuses(statusesData);
        setProviders(providersData);
      } catch (error) {
        console.error("Failed to fetch appointments data:", error);
        toast.error("Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  // Handle appointment click
  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowAppointmentDetails(true);
  };
  
  // Handle close modal
  const handleCloseModal = () => {
    setShowAppointmentForm(false);
  };
  
  // Handle schedule success
  const handleScheduleSuccess = () => {
    toast.success("Appointment scheduled successfully!");
    setShowAppointmentForm(false);
    // Refresh appointments
    getAppointments().then(data => setAppointments(data));
  };
  
  const handleAddAppointment = () => {
    setShowAppointmentForm(true);
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-surface-800 dark:text-surface-100">
              Appointment Scheduling
            </h1>
            <p className="mt-1 text-surface-500 dark:text-surface-400">
              Manage patient appointments and schedule
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <button
              onClick={handleAddAppointment}
              className="btn btn-primary flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              New Appointment
            </button>
          </div>
        </div>
        
        {/* View tabs */}
        <div className="flex border-b border-surface-200 dark:border-surface-700 mb-6">
          <button
            className={`px-4 py-2 font-medium text-sm flex items-center ${
              activeView === 'calendar'
                ? 'text-primary dark:text-primary-light border-b-2 border-primary dark:border-primary-light'
                : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100'
            }`}
            onClick={() => setActiveView('calendar')}
          >
            <CalendarIcon className="h-4 w-4 mr-2" />
            Calendar View
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm flex items-center ${
              activeView === 'list'
                ? 'text-primary dark:text-primary-light border-b-2 border-primary dark:border-primary-light'
                : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100'
            }`}
            onClick={() => setActiveView('list')}
          >
            <ListIcon className="h-4 w-4 mr-2" />
            List View
          </button>
        </div>
        
        {/* View content */}
        <div className="bg-white dark:bg-surface-800 rounded-lg shadow-sm p-4 md:p-6 border border-surface-200 dark:border-surface-700">
          {loading ? (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-2 text-surface-600 dark:text-surface-400">Loading appointments...</span>
            </div>
          ) : (
            <>
              {activeView === 'calendar' ? (
                <CalendarView 
                  appointments={appointments} 
                  onAppointmentClick={handleAppointmentClick}
                />
              ) : (
                <ListView 
                  appointments={appointments} 
                  onAppointmentClick={handleAppointmentClick}
                />
              )}
            </>
          )}
        </div>
        
        {/* Appointment details modal */}
        {showAppointmentDetails && selectedAppointment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-surface-800 rounded-lg shadow-xl w-full max-w-lg p-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-medium">Appointment Details</h3>
                <button 
                  onClick={() => setShowAppointmentDetails(false)}
                  className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className={`px-2 py-1 rounded-md text-xs font-medium inline-block bg-${selectedAppointment.type.color}-100 dark:bg-${selectedAppointment.type.color}-900/20 text-${selectedAppointment.type.color}-600 dark:text-${selectedAppointment.type.color}-400`}>
                  {selectedAppointment.type.name}
                </div>
                
                <h4 className="text-lg font-medium">{selectedAppointment.patientName}</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-surface-500 dark:text-surface-400">Date & Time</div>
                    <div>{selectedAppointment.formattedDate} • {selectedAppointment.formattedTime} - {selectedAppointment.formattedEndTime}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-surface-500 dark:text-surface-400">Status</div>
                    <div className={`${selectedAppointment.statusColor} px-2 py-1 rounded-md text-xs inline-block`}>
                      {selectedAppointment.status}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-surface-500 dark:text-surface-400">Provider</div>
                    <div>{selectedAppointment.provider}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-surface-500 dark:text-surface-400">Duration</div>
                    <div>{selectedAppointment.duration} minutes</div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-surface-500 dark:text-surface-400">Reason for Visit</div>
                  <div className="bg-surface-50 dark:bg-surface-900 p-2 rounded-md mt-1">
                    {selectedAppointment.reason}
                  </div>
                </div>
                
                {selectedAppointment.notes && (
                  <div>
                    <div className="text-sm text-surface-500 dark:text-surface-400">Notes</div>
                    <div className="bg-surface-50 dark:bg-surface-900 p-2 rounded-md mt-1">
                      {selectedAppointment.notes}
                    </div>
                  </div>
                )}
                
                <div className="pt-4 flex justify-end space-x-2">
                  <button 
                    className="btn btn-outline"
                    onClick={() => setShowAppointmentDetails(false)}
                  >
                    Close
                  </button>
                  <button 
                    className="btn btn-primary"
                    onClick={() => {
                      toast.info("Edit functionality will be implemented soon!");
                    }}
                  >
                    Edit Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* New Appointment Modal */}
        {showAppointmentForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-surface-800 rounded-lg shadow-xl w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-medium">Schedule New Appointment</h3>
                <button 
                  onClick={handleCloseModal}
                  className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
              
              <MainFeature onScheduleSuccess={handleScheduleSuccess} />
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Appointments;