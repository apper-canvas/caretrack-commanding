import { useMemo } from 'react';
import { format } from 'date-fns';
import { getIcon } from '../../utils/iconUtils';

const TimelineView = ({ records, onViewRecord, loading }) => {
  // Icons
  const PillIcon = getIcon('pill');
  const StethoscopeIcon = getIcon('stethoscope');
  const TestTubeIcon = getIcon('flask');
  const ScissorsIcon = getIcon('scissors');
  const ScanIcon = getIcon('scan');
  
  // Group records by month/year
  const groupedRecords = useMemo(() => {
    if (!records || !records.length) return [];
    
    const groups = records.reduce((acc, record) => {
      const date = new Date(record.date);
      const monthYear = `${date.getFullYear()}-${date.getMonth()}`;
      
      if (!acc[monthYear]) {
        acc[monthYear] = {
          label: format(date, 'MMMM yyyy'),
          items: []
        };
      }
      
      acc[monthYear].items.push(record);
      return acc;
    }, {});
    
    // Convert to array and sort by date (newest first)
    return Object.values(groups).sort((a, b) => {
      const aDate = new Date(a.items[0].date);
      const bDate = new Date(b.items[0].date);
      return bDate - aDate;
    });
  }, [records]);
  
  // Get icon based on record type
  const getRecordIcon = (type) => {
    switch (type) {
      case 'medication':
        return <PillIcon className="h-4 w-4" />;
      case 'visit':
        return <StethoscopeIcon className="h-4 w-4" />;
      case 'lab':
        return <TestTubeIcon className="h-4 w-4" />;
      case 'procedure':
        return <ScissorsIcon className="h-4 w-4" />;
      case 'imaging':
        return <ScanIcon className="h-4 w-4" />;
      default:
        return <StethoscopeIcon className="h-4 w-4" />;
    }
  };
  
  // Get record type color
  const getTypeColor = (type) => {
    const typeColors = {
      'medication': 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
      'visit': 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
      'lab': 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
      'procedure': 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400',
      'imaging': 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400'
    };
    
    return typeColors[type] || 'bg-gray-100 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400';
  };
  
  // Format record date
  const formatRecordDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'MMM dd, yyyy • h:mm a');
  };
  
  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2 text-surface-600 dark:text-surface-400">Loading medical records...</span>
      </div>
    );
  }
  
  // Empty state
  if (!records || records.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <StethoscopeIcon className="w-12 h-12 text-surface-400 mb-4" />
        <h2 className="text-xl font-semibold text-surface-700 dark:text-surface-300 mb-2">No Medical Records</h2>
        <p className="text-surface-600 dark:text-surface-400 text-center max-w-md">
          There are no medical records available for this patient.
        </p>
      </div>
    );
  }
  
  return (
    <div className="divide-y divide-surface-200 dark:divide-surface-700">
      {groupedRecords.map((group, groupIndex) => (
        <div key={groupIndex} className="py-4">
          <h3 className="text-lg font-medium text-surface-700 dark:text-surface-300 mb-4">{group.label}</h3>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-3.5 top-0 h-full w-0.5 bg-surface-200 dark:bg-surface-700"></div>
            
            {/* Records */}
            <div className="space-y-4">
              {group.items.map((record, index) => (
                <div key={index} className="relative pl-10">
                  {/* Timeline dot */}
                  <div className={`absolute left-0 top-1.5 h-7 w-7 rounded-full flex items-center justify-center ${getTypeColor(record.type)}`}>
                    {getRecordIcon(record.type)}
                  </div>
                  
                  {/* Record card */}
                  <div 
                    className="bg-white dark:bg-surface-800 p-4 rounded-lg border border-surface-200 dark:border-surface-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => onViewRecord(record)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-base font-medium">{record.title}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded ${getTypeColor(record.type)}`}>
                        {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-surface-600 dark:text-surface-400 line-clamp-2 mb-2">
                      {record.description}
                    </p>
                    
                    <div className="flex justify-between items-center text-xs text-surface-500 dark:text-surface-500">
                      <span>{formatRecordDate(record.date)}</span>
                      <span>{record.provider}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimelineView;