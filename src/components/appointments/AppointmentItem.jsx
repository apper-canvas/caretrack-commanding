import React from 'react';
import { format } from 'date-fns';
import { getIcon } from '../../utils/iconUtils';

/**
 * Appointment item component for displaying in both list and calendar views
 */
const AppointmentItem = ({ appointment, viewType = 'list', onClick }) => {
  const { 
    patientName, 
    formattedTime, 
    formattedEndTime, 
    type, 
    provider, 
    status, 
    statusColor 
  } = appointment;

  // Get icons
  const ClockIcon = getIcon('clock');
  const UserIcon = getIcon('user');
  const CalendarIcon = getIcon('calendar');

  // Determine style based on appointment type
  const typeColor = `bg-${type.color}-100 dark:bg-${type.color}-900/20 text-${type.color}-600 dark:text-${type.color}-400`;
  
  if (viewType === 'calendar-compact') {
    // Compact version for calendar cells
    return (
      <div 
        onClick={() => onClick?.(appointment)}
        className={`px-2 py-1 mb-1 rounded-md cursor-pointer hover:shadow-sm transition-all ${typeColor}`}
      >
        <div className="text-xs font-medium truncate">{formattedTime}</div>
        <div className="text-xs truncate">{patientName}</div>
      </div>
    );
  }
  
  if (viewType === 'calendar-full') {
    // Larger version for calendar day modal
    return (
      <div 
        onClick={() => onClick?.(appointment)}
        className="p-2 mb-2 border border-surface-200 dark:border-surface-700 rounded-lg cursor-pointer hover:shadow-md transition-all"
      >
        <div className={`text-xs px-1.5 py-0.5 rounded mb-1 inline-block ${typeColor}`}>{type.name}</div>
        <div className="font-medium">{patientName}</div>
        <div className="text-sm text-surface-600 dark:text-surface-400 flex items-center gap-1 mt-1">
          <ClockIcon className="h-3 w-3" />
          <span>{formattedTime} - {formattedEndTime}</span>
        </div>
      </div>
    );
  }
  
  // Default list view
  return (
    <div 
      onClick={() => onClick?.(appointment)}
      className="p-3 border border-surface-200 dark:border-surface-700 rounded-lg cursor-pointer hover:shadow-md transition-all"
    >
      <div className="flex justify-between items-start">
        <div className="flex-grow">
          <div className="flex items-center gap-2">
            <div className={`text-xs px-1.5 py-0.5 rounded ${typeColor}`}>{type.name}</div>
            <div className={`text-xs px-1.5 py-0.5 rounded ${statusColor}`}>{status}</div>
          </div>
          
          <div className="font-medium mt-1">{patientName}</div>
          
          <div className="text-sm text-surface-600 dark:text-surface-400 flex items-center gap-1 mt-1">
            <ClockIcon className="h-3 w-3" />
            <span>{formattedTime} - {formattedEndTime}</span>
          </div>
          
          <div className="text-sm text-surface-600 dark:text-surface-400 mt-1">
            {provider}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentItem;