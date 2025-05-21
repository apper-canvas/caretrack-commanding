import { useState } from 'react';
import { format } from 'date-fns';
import { getIcon } from '../../utils/iconUtils';

const RecordDetail = ({ record, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Icons
  const XIcon = getIcon('x');
  const ClockIcon = getIcon('clock');
  const UserIcon = getIcon('user');
  const FileTextIcon = getIcon('file-text');
  const StethoscopeIcon = getIcon('stethoscope');
  const TestTubeIcon = getIcon('flask');
  const PillIcon = getIcon('pill');
  const ScissorsIcon = getIcon('scissors');
  const ScanIcon = getIcon('scan');
  
  // Get icon based on record type
  const getRecordIcon = (type) => {
    switch (type) {
      case 'medication':
        return <PillIcon className="h-5 w-5" />;
      case 'visit':
        return <StethoscopeIcon className="h-5 w-5" />;
      case 'lab':
        return <TestTubeIcon className="h-5 w-5" />;
      case 'procedure':
        return <ScissorsIcon className="h-5 w-5" />;
      case 'imaging':
        return <ScanIcon className="h-5 w-5" />;
      default:
        return <StethoscopeIcon className="h-5 w-5" />;
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
    return format(date, 'MMMM dd, yyyy • h:mm a');
  };
  
  // Show specific fields based on record type
  const renderTypeSpecificFields = () => {
    switch (record.type) {
      case 'medication':
        return (
          <>
            {record.dosage && (
              <div>
                <h4 className="text-sm text-surface-500 dark:text-surface-400 mb-1">Dosage</h4>
                <p>{record.dosage}</p>
              </div>
            )}
            {record.frequency && (
              <div>
                <h4 className="text-sm text-surface-500 dark:text-surface-400 mb-1">Frequency</h4>
                <p>{record.frequency}</p>
              </div>
            )}
            {record.duration && (
              <div>
                <h4 className="text-sm text-surface-500 dark:text-surface-400 mb-1">Duration</h4>
                <p>{record.duration}</p>
              </div>
            )}
          </>
        );
      case 'lab':
      case 'imaging':
        return (
          <>
            {record.results && (
              <div>
                <h4 className="text-sm text-surface-500 dark:text-surface-400 mb-1">Results</h4>
                <pre className="whitespace-pre-wrap bg-surface-50 dark:bg-surface-900 p-3 rounded-md text-sm">
                  {record.results}
                </pre>
              </div>
            )}
          </>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-surface-800 rounded-lg shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center border-b border-surface-200 dark:border-surface-700 p-4">
          <div className="flex items-center">
            <div className={`p-2 rounded-full mr-3 ${getTypeColor(record.type)}`}>
              {getRecordIcon(record.type)}
            </div>
            <div>
              <h2 className="text-lg font-semibold">{record.title}</h2>
              <p className="text-sm text-surface-600 dark:text-surface-400">{record.provider}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-5 overflow-y-auto">
          <div className="space-y-4">
            <div className="text-sm flex items-center text-surface-600 dark:text-surface-400">
              <ClockIcon className="h-4 w-4 mr-1" />
              <span>{formatRecordDate(record.date)}</span>
            </div>
            
            <div>
              <h4 className="text-sm text-surface-500 dark:text-surface-400 mb-1">Description</h4>
              <p>{record.description}</p>
            </div>
            
            {renderTypeSpecificFields()}
            
            {record.notes && (
              <div>
                <h4 className="text-sm text-surface-500 dark:text-surface-400 mb-1">Notes</h4>
                <p className="whitespace-pre-wrap bg-surface-50 dark:bg-surface-900 p-3 rounded-md">
                  {record.notes}
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div className="border-t border-surface-200 dark:border-surface-700 p-4 flex justify-end">
          <button 
            onClick={onClose}
            className="btn btn-outline"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordDetail;