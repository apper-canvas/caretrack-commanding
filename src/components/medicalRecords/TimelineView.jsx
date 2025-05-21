import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { getIcon } from '../../utils/iconUtils';

const TimelineView = ({ records, onViewRecord, loading }) => {
  // Icons for each record type
  const getRecordIcon = (type) => {
    switch (type) {
      case 'visit':
        return getIcon('stethoscope');
      case 'lab':
        return getIcon('flask');
      case 'medication':
        return getIcon('pill');
      case 'procedure':
        return getIcon('scissors');
      case 'vaccination':
        return getIcon('shield');
      case 'imaging':
        return getIcon('scan');
      case 'note':
        return getIcon('file-text');
      default:
        return getIcon('file');
    }
  };

  // Get color class based on record type
  const getTypeColor = (type) => {
    switch (type) {
      case 'visit':
        return 'border-primary-light text-primary dark:text-primary-light dark:border-primary-dark';
      case 'lab':
        return 'border-purple-400 text-purple-600 dark:text-purple-300 dark:border-purple-700';
      case 'medication':
        return 'border-secondary-light text-secondary dark:text-secondary-light dark:border-secondary-dark';
      case 'procedure':
        return 'border-amber-400 text-amber-600 dark:text-amber-300 dark:border-amber-700';
      case 'vaccination':
        return 'border-teal-400 text-teal-600 dark:text-teal-300 dark:border-teal-700';
      case 'imaging':
        return 'border-indigo-400 text-indigo-600 dark:text-indigo-300 dark:border-indigo-700';
      case 'note':
        return 'border-surface-400 text-surface-600 dark:text-surface-300 dark:border-surface-600';
      default:
        return 'border-surface-300 text-surface-600 dark:text-surface-400 dark:border-surface-700';
    }
  };

  // Group records by date
  const groupRecordsByDate = () => {
    const groupedRecords = {};
    
    records.forEach(record => {
      const formattedDate = format(parseISO(record.date), 'yyyy-MM-dd');
      if (!groupedRecords[formattedDate]) {
        groupedRecords[formattedDate] = [];
      }
      groupedRecords[formattedDate].push(record);
    });
    
    return Object.entries(groupedRecords)
      .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
      .map(([date, records]) => ({
        date,
        displayDate: format(parseISO(date), 'MMMM d, yyyy'),
        records
      }));
  };

  const groupedRecords = groupRecordsByDate();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="text-center py-10">
        <div className="inline-flex items-center justify-center bg-surface-100 dark:bg-surface-800 rounded-full p-3 mb-4">
          {getIcon('file-text')({ className: "w-6 h-6 text-surface-500" })}
        </div>
        <h3 className="text-lg font-medium text-surface-700 dark:text-surface-300">No Records Found</h3>
        <p className="text-surface-500 dark:text-surface-400 mt-1">There are no medical records matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="relative pb-6">
      {groupedRecords.map((group, groupIndex) => (
        <div key={group.date} className="mb-6">
          <div className="sticky top-0 bg-white dark:bg-surface-800 z-10 py-2 border-b border-surface-200 dark:border-surface-700 mb-3">
            <h3 className="text-md font-medium text-surface-700 dark:text-surface-300">{group.displayDate}</h3>
          </div>
          
          <div className="space-y-3">
            {group.records.map((record) => {
              const IconComponent = getRecordIcon(record.type);
              return (
                <div 
                  key={record.id} 
                  className="flex items-start p-3 rounded-lg border border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800 cursor-pointer transition-colors"
                  onClick={() => onViewRecord(record)}
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full border-2 ${getTypeColor(record.type)} flex items-center justify-center mr-3`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium text-surface-800 dark:text-surface-200">{record.title}</h4>
                    <p className="text-sm text-surface-600 dark:text-surface-400 truncate">{record.description}</p>
                    <p className="text-xs text-surface-500 dark:text-surface-500 mt-1">Provider: {record.provider} · {format(parseISO(record.date), 'h:mm a')}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimelineView;