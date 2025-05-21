import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearActivePatient } from '../store/patientSlice';
import { getIcon } from '../utils/iconUtils';

// Patient context banner that shows active patient information
const PatientContextBanner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activePatient = useSelector(state => state.patient.activePatient);
  
  // Icons
  const XIcon = getIcon('x');
  const UserIcon = getIcon('user');
  const FileTextIcon = getIcon('file-text');
  const CalendarIcon = getIcon('calendar');
  
  // Clear active patient
  const handleClearActivePatient = () => {
    dispatch(clearActivePatient());
  };
  
  if (!activePatient) return null;
  
  return (
    <div className="bg-primary-light/20 dark:bg-primary-dark/20 border-l-4 border-primary dark:border-primary-light mb-6 rounded-r-lg">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <UserIcon className="h-5 w-5 text-primary dark:text-primary-light mr-2" />
          <span className="font-medium text-primary-dark dark:text-primary-light">
            Active Patient: {activePatient.firstName} {activePatient.lastName}
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/records')} 
            className="text-primary dark:text-primary-light flex items-center text-sm hover:underline"
          >
            <FileTextIcon className="h-4 w-4 mr-1" /> Medical Records
          </button>
          <button 
            onClick={handleClearActivePatient}
            className="text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700 p-1 rounded-full"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientContextBanner;