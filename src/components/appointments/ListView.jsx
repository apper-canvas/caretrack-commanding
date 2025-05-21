import React, { useState, useEffect } from 'react';
import { format, isToday, isTomorrow, isYesterday, isThisWeek, isThisMonth } from 'date-fns';
import { getIcon } from '../../utils/iconUtils';

const ListView = ({ appointments, onAppointmentClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [dateFilter, setDateFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  
  // Get icons
  const SearchIcon = getIcon('search');
  const FilterIcon = getIcon('filter');
  const SortIcon = getIcon('arrow-up-down');
  const ChevronLeftIcon = getIcon('chevron-left');
  const ChevronRightIcon = getIcon('chevron-right');
  const ClockIcon = getIcon('clock');
  const UserIcon = getIcon('user');
  
  // Get unique statuses and types from appointments
  const statuses = [...new Set(appointments.map(a => a.status))];
  const types = [...new Set(appointments.map(a => a.type.name))];
  
  // Filter and sort appointments
  useEffect(() => {
    let filtered = [...appointments];
    
    // Date filter
    if (dateFilter !== 'all') {
      filtered = filtered.filter(appt => {
        const apptDate = new Date(appt.date);
        switch (dateFilter) {
          case 'today': return isToday(apptDate);
          case 'tomorrow': return isTomorrow(apptDate);
          case 'yesterday': return isYesterday(apptDate);
          case 'thisWeek': return isThisWeek(apptDate, { weekStartsOn: 0 });
          case 'thisMonth': return isThisMonth(apptDate);
          default: return true;
        }
      });
    }
    
    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(appt => appt.status === statusFilter);
    }
    
    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(appt => appt.type.name === typeFilter);
    }
    
    // Sort
    filtered.sort((a, b) => {
      if (sortField === 'date') {
        return sortDirection === 'asc' 
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      } else if (sortField === 'patient') {
        return sortDirection === 'asc'
          ? a.patientName.localeCompare(b.patientName)
          : b.patientName.localeCompare(a.patientName);
      } else if (sortField === 'type') {
        return sortDirection === 'asc'
          ? a.type.name.localeCompare(b.type.name)
          : b.type.name.localeCompare(a.type.name);
      } else if (sortField === 'status') {
        return sortDirection === 'asc'
          ? a.status.localeCompare(b.status)
          : b.status.localeCompare(a.status);
      }
      return 0;
    });
    
    setFilteredAppointments(filtered);
    setCurrentPage(1); // Reset to first page on filter change
  }, [appointments, dateFilter, statusFilter, typeFilter, sortField, sortDirection]);
  
  // Handle sort change
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Pagination
  const totalPages = Math.ceil(filteredAppointments.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentAppointments = filteredAppointments.slice(startIndex, startIndex + pageSize);
  
  return (
    <div>
      {/* Filter controls */}
      <div className="mb-4 bg-surface-50 dark:bg-surface-800 p-4 rounded-lg border border-surface-200 dark:border-surface-700">
        <div className="font-medium mb-2 flex items-center">
          <FilterIcon className="h-4 w-4 mr-2" />
          Filters
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Date Range</label>
            <select 
              className="form-input"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="yesterday">Yesterday</option>
              <option value="thisWeek">This Week</option>
              <option value="thisMonth">This Month</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select 
              className="form-input"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Appointment Type</label>
            <select 
              className="form-input"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Results info */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-surface-600 dark:text-surface-400">
          Showing {filteredAppointments.length} appointments
          {dateFilter !== 'all' && ` (${dateFilter})`}
          {statusFilter !== 'all' && ` with status "${statusFilter}"`}
          {typeFilter !== 'all' && ` of type "${typeFilter}"`}
        </p>
        
        <div className="flex items-center">
          <span className="text-sm text-surface-600 dark:text-surface-400 mr-2">Sort by:</span>
          <button 
            className={`px-2 py-1 text-sm rounded ${sortField === 'date' ? 'bg-primary-light/20 text-primary dark:bg-primary-dark/20 dark:text-primary-light' : 'hover:bg-surface-100 dark:hover:bg-surface-700'}`}
            onClick={() => handleSort('date')}
          >
            Date {sortField === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
          </button>
          <button 
            className={`px-2 py-1 text-sm rounded ml-1 ${sortField === 'patient' ? 'bg-primary-light/20 text-primary dark:bg-primary-dark/20 dark:text-primary-light' : 'hover:bg-surface-100 dark:hover:bg-surface-700'}`}
            onClick={() => handleSort('patient')}
          >
            Patient {sortField === 'patient' && (sortDirection === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </div>
      
      {/* Appointments list */}
      {currentAppointments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {currentAppointments.map(appointment => (
            <div 
              key={appointment.id}
              onClick={() => onAppointmentClick(appointment)}
              className="bg-white dark:bg-surface-800 rounded-lg shadow-sm border border-surface-200 dark:border-surface-700 p-4 cursor-pointer hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start mb-2">
                <div className={`px-2 py-1 rounded-md text-xs font-medium bg-${appointment.type.color}-100 dark:bg-${appointment.type.color}-900/20 text-${appointment.type.color}-600 dark:text-${appointment.type.color}-400`}>
                  {appointment.type.name}
                </div>
                <div className={`${appointment.statusColor} px-2 py-1 rounded-md text-xs`}>
                  {appointment.status}
                </div>
              </div>
              
              <h4 className="font-medium mb-1">{appointment.patientName}</h4>
              
              <div className="text-sm text-surface-600 dark:text-surface-400 flex items-center mb-1">
                <ClockIcon className="h-4 w-4 mr-1" />
                {format(new Date(appointment.date), 'MMM d, yyyy')} • {appointment.formattedTime} - {appointment.formattedEndTime}
              </div>
              
              <div className="text-sm text-surface-600 dark:text-surface-400 flex items-center">
                <UserIcon className="h-4 w-4 mr-1" />
                {appointment.provider}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-surface-800 p-8 rounded-lg text-center border border-surface-200 dark:border-surface-700">
          <p className="text-surface-600 dark:text-surface-400">No appointments found matching your filters</p>
        </div>
      )}
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-surface-600 dark:text-surface-400">
            Page {currentPage} of {totalPages}
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-md bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 disabled:opacity-50"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 disabled:opacity-50"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListView;