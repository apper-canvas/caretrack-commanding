import React, { useState, useEffect } from 'react';
import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  format, 
  isSameMonth, 
  isSameDay, 
  addMonths, 
  subMonths,
  isToday
} from 'date-fns';
import { getIcon } from '../../utils/iconUtils';
import AppointmentItem from './AppointmentItem';

const CalendarView = ({ appointments, onAppointmentClick }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);
  const [showDayView, setShowDayView] = useState(false);
  const [dayAppointments, setDayAppointments] = useState([]);
  
  // Get icons
  const ChevronLeftIcon = getIcon('chevron-left');
  const ChevronRightIcon = getIcon('chevron-right');
  const XIcon = getIcon('x');
  
  // Generate calendar days for the current month view
  useEffect(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    setCalendarDays(days);
  }, [currentMonth]);
  
  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  // Navigate to today
  const goToToday = () => {
    setCurrentMonth(new Date());
    setSelectedDate(new Date());
  };
  
  // Handle day click - show appointments for that day
  const handleDayClick = (day) => {
    setSelectedDate(day);
    const dayAppts = appointments.filter(appt => 
      isSameDay(new Date(appt.date), day)
    );
    setDayAppointments(dayAppts);
    setShowDayView(true);
  };
  
  // Get appointments for a specific day (for calendar cells)
  const getAppointmentsForDay = (day) => {
    return appointments.filter(appt => 
      isSameDay(new Date(appt.date), day)
    );
  };
  
  // Format month name for the header
  const monthName = format(currentMonth, 'MMMM yyyy');
  
  return (
    <div className="relative">
      {/* Calendar header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">{monthName}</h3>
        <div className="flex items-center space-x-2">
          <button 
            className="p-1 rounded-md hover:bg-surface-100 dark:hover:bg-surface-700"
            onClick={goToToday}
          >
            Today
          </button>
          <button 
            className="p-1 rounded-md hover:bg-surface-100 dark:hover:bg-surface-700"
            onClick={prevMonth}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button 
            className="p-1 rounded-md hover:bg-surface-100 dark:hover:bg-surface-700"
            onClick={nextMonth}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-px bg-surface-200 dark:bg-surface-700 rounded-lg overflow-hidden shadow-sm">
        {/* Weekday headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div 
            key={day} 
            className="bg-surface-100 dark:bg-surface-800 p-2 text-center text-sm font-medium"
          >
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {calendarDays.map(day => {
          const dayAppointments = getAppointmentsForDay(day);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isTodayDate = isToday(day);
          
          return (
            <div
              key={day.toString()}
              onClick={() => handleDayClick(day)}
              className={`
                min-h-[120px] p-1 bg-white dark:bg-surface-800 
                ${!isCurrentMonth ? 'text-surface-400 dark:text-surface-600 bg-surface-50 dark:bg-surface-900' : ''}
                ${isTodayDate ? 'ring-2 ring-inset ring-primary dark:ring-primary-light' : ''}
                cursor-pointer hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors
              `}
            >
              <div className="text-right p-1">
                <span className={`
                  text-sm inline-flex h-6 w-6 items-center justify-center
                  ${isTodayDate ? 'rounded-full bg-primary text-white' : ''}
                `}>
                  {format(day, 'd')}
                </span>
              </div>
              
              <div className="overflow-y-auto max-h-[80px]">
                {dayAppointments.slice(0, 3).map(appointment => (
                  <AppointmentItem
                    key={appointment.id}
                    appointment={appointment}
                    viewType="calendar-compact"
                    onClick={(appt) => {
                      onAppointmentClick(appt);
                      // Stop event propagation to prevent day click
                      event.stopPropagation();
                    }}
                  />
                ))}
                {dayAppointments.length > 3 && (
                  <div className="text-xs text-surface-500 dark:text-surface-400 px-2">
                    +{dayAppointments.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Day view modal */}
      {showDayView && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-surface-800 rounded-lg shadow-xl w-full max-w-lg p-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-medium">
                {format(selectedDate, 'MMMM d, yyyy')}
                {isToday(selectedDate) && <span className="ml-2 text-sm badge-blue">Today</span>}
              </h3>
              <button 
                onClick={() => setShowDayView(false)}
                className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            
            {dayAppointments.length > 0 ? (
              <div className="space-y-2">
                {dayAppointments.map(appointment => (
                  <AppointmentItem
                    key={appointment.id}
                    appointment={appointment}
                    viewType="calendar-full"
                    onClick={(appt) => {
                      onAppointmentClick(appt);
                      setShowDayView(false);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-surface-500 dark:text-surface-400">
                No appointments scheduled for this day
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;