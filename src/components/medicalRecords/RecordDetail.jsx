import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { getIcon } from '../../utils/iconUtils';
import { toast } from 'react-toastify';

const RecordDetail = ({ record, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...record });
  
  // Icons
  const XIcon = getIcon('x');
  const EditIcon = getIcon('edit');
  const SaveIcon = getIcon('save');
  const PrinterIcon = getIcon('printer');
  const DownloadIcon = getIcon('download');
  const ShareIcon = getIcon('share');
  
  // Type-specific record displays
  const renderRecordContent = () => {
    if (isEditing) {
      return (
        <div className="space-y-4">
          <div>
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-input"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          <div>
            <label className="form-label">Description</label>
            <textarea
              className="form-input min-h-[100px]"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-input"
                value={formData.date.split('T')[0]}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="form-label">Provider</label>
              <input
                type="text"
                className="form-input"
                value={formData.provider}
                onChange={(e) => setFormData({...formData, provider: e.target.value})}
              />
            </div>
          </div>
          {record.type === 'lab' && (
            <div>
              <label className="form-label">Results</label>
              <textarea
                className="form-input min-h-[100px]"
                value={formData.results || ''}
                onChange={(e) => setFormData({...formData, results: e.target.value})}
              />
            </div>
          )}
          {record.type === 'medication' && (
            <>
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <label className="form-label">Dosage</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.dosage || ''}
                    onChange={(e) => setFormData({...formData, dosage: e.target.value})}
                  />
                </div>
                <div className="flex-1 min-w-[200px]">
                  <label className="form-label">Frequency</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.frequency || ''}
                    onChange={(e) => setFormData({...formData, frequency: e.target.value})}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        <div className="border-b border-surface-200 dark:border-surface-700 pb-3">
          <h3 className="text-xl font-medium text-surface-800 dark:text-surface-200">{record.title}</h3>
          <p className="text-surface-600 dark:text-surface-400 mt-1">{record.description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-surface-500 dark:text-surface-500">Date</p>
            <p className="font-medium">{format(parseISO(record.date), 'MMMM d, yyyy h:mm a')}</p>
          </div>
          <div>
            <p className="text-sm text-surface-500 dark:text-surface-500">Provider</p>
            <p className="font-medium">{record.provider}</p>
          </div>
        </div>
        
        {/* Type-specific content */}
        {record.type === 'lab' && record.results && (
          <div className="border-t border-surface-200 dark:border-surface-700 pt-3">
            <p className="text-sm text-surface-500 dark:text-surface-500 mb-2">Lab Results</p>
            <pre className="whitespace-pre-wrap bg-surface-50 dark:bg-surface-800 p-3 rounded-lg text-surface-700 dark:text-surface-300">{record.results}</pre>
          </div>
        )}
        
        {record.type === 'medication' && (
          <div className="border-t border-surface-200 dark:border-surface-700 pt-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-surface-500 dark:text-surface-500">Dosage</p>
                <p className="font-medium">{record.dosage}</p>
              </div>
              <div>
                <p className="text-sm text-surface-500 dark:text-surface-500">Frequency</p>
                <p className="font-medium">{record.frequency}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const handleEdit = () => {
    if (isEditing) {
      // Save changes
      toast.success("Record updated successfully");
      setIsEditing(false);
      // In a real app, you would dispatch an action to update the record
    } else {
      setIsEditing(true);
    }
  };

  const handlePrint = () => {
    toast.info("Printing record...");
    // In a real app, this would trigger a print dialog
  };

  const handleDownload = () => {
    toast.success("Record downloaded successfully");
    // In a real app, this would trigger a file download
  };

  const handleShare = () => {
    toast.info("Sharing options opened");
    // In a real app, this would open sharing options
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-surface-800 rounded-xl p-6 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mr-2 ${
              record.type === 'visit' ? 'bg-primary-light/20 text-primary dark:bg-primary-dark/20 dark:text-primary-light' :
              record.type === 'lab' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
              record.type === 'medication' ? 'bg-secondary-light/20 text-secondary-dark dark:bg-secondary-dark/30 dark:text-secondary-light' :
              record.type === 'procedure' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' :
              record.type === 'vaccination' ? 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300' :
              record.type === 'imaging' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' :
              'bg-surface-100 text-surface-700 dark:bg-surface-800 dark:text-surface-300'
            }`}>
              {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
            </span>
            <h2 className="text-xl font-bold">{isEditing ? 'Edit' : 'View'} Record</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
          >
            <XIcon className="w-5 h-5 text-surface-600 dark:text-surface-400" />
          </button>
        </div>
        
        {renderRecordContent()}
        
        <div className="flex flex-wrap justify-between mt-6 gap-3">
          <div className="flex flex-wrap gap-2">
            <button 
              className="btn btn-outline flex items-center"
              onClick={handleEdit}
            >
              {isEditing ? (
                <>
                  <SaveIcon className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <EditIcon className="w-4 h-4 mr-2" />
                  Edit Record
                </>
              )}
            </button>
            {!isEditing && (
              <>
                <button className="btn btn-outline flex items-center" onClick={handlePrint}>
                  <PrinterIcon className="w-4 h-4 mr-2" />
                  Print
                </button>
                <button className="btn btn-outline flex items-center" onClick={handleDownload}>
                  <DownloadIcon className="w-4 h-4 mr-2" />
                  Download
                </button>
                <button className="btn btn-outline flex items-center" onClick={handleShare}>
                  <ShareIcon className="w-4 h-4 mr-2" />
                  Share
                </button>
              </>
            )}
          </div>
          
          <button 
            className="btn btn-outline"
            onClick={isEditing ? () => setIsEditing(false) : onClose}
          >
            {isEditing ? 'Cancel' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordDetail;