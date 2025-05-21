import { motion } from 'framer-motion';
import { getIcon } from '../../utils/iconUtils.js';

const DeleteConfirmation = ({ 
  isOpen, 
  title = 'Confirm Deletion', 
  message = 'Are you sure you want to delete this item? This action cannot be undone.',
  entityName = null,
  onConfirm, 
  onCancel,
  isLoading = false 
}) => {
  if (!isOpen) return null;
  
  // Icons
  const AlertTriangleIcon = getIcon('alert-triangle');
  const XIcon = getIcon('x');
  const TrashIcon = getIcon('trash-2');
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div 
        className="bg-white dark:bg-surface-800 rounded-xl shadow-xl p-6 max-w-md w-full mx-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <div className="flex items-center text-red-500 mb-4">
          <AlertTriangleIcon className="h-6 w-6 mr-2" />
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        
        <p className="text-surface-600 dark:text-surface-300 mb-6">{message}</p>
        {entityName && (
          <p className="font-semibold mb-6">{entityName}</p>
        )}
        
        <div className="flex justify-end space-x-3">
          <button onClick={onCancel} className="btn btn-outline flex items-center" disabled={isLoading}>
            <XIcon className="h-5 w-5 mr-1" />
            <span>Cancel</span>
          </button>
          <button onClick={onConfirm} className="btn bg-red-500 hover:bg-red-600 text-white flex items-center" disabled={isLoading}>
            {isLoading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div> : <TrashIcon className="h-5 w-5 mr-1" />}
            <span>{isLoading ? 'Deleting...' : 'Delete'}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DeleteConfirmation;