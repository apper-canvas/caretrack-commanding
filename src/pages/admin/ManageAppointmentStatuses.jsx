import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import AdminPanel from '../../components/admin/AdminPanel.jsx';
import EntityTable from '../../components/admin/EntityTable.jsx';
import EntityForm from '../../components/admin/EntityForm.jsx';
import DeleteConfirmation from '../../components/admin/DeleteConfirmation.jsx';
import { 
  fetchAppointmentStatuses,
  createAppointmentStatus,
  updateAppointmentStatus,
  deleteAppointmentStatus
} from '../../services/appointmentStatusService.js';

const ManageAppointmentStatuses = () => {
  const [appointmentStatuses, setAppointmentStatuses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [formError, setFormError] = useState(null);

  // Table columns configuration
  const columns = [
    { key: 'Name', label: 'Name', sortable: true },
    { 
      key: 'color', 
      label: 'Color', 
      sortable: false,
      render: (value) => (
        <div 
          className="w-6 h-6 rounded-full" 
          style={{ backgroundColor: value || '#cccccc' }}
          title={value}
        />
      )
    },
  ];

  // Form fields configuration
  const formFields = [
    { name: 'Name', label: 'Name', type: 'Text', required: true },
    { name: 'color', label: 'Color', type: 'Text', placeholder: '#RRGGBB', required: true },
    { name: 'Tags', label: 'Tags', type: 'Tag' },
  ];

  // Fetch appointment statuses on component mount
  useEffect(() => {
    loadAppointmentStatuses();
  }, []);

  const loadAppointmentStatuses = async () => {
    setIsLoading(true);
    try {
      const data = await fetchAppointmentStatuses();
      setAppointmentStatuses(data);
    } catch (error) {
      console.error('Error fetching appointment statuses:', error);
      toast.error('Failed to load appointment statuses');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle add appointment status
  const handleAddStatus = () => {
    setCurrentStatus(null);
    setFormError(null);
    setShowForm(true);
  };

  // Handle edit appointment status
  const handleEditStatus = (status) => {
    setCurrentStatus(status);
    setFormError(null);
    setShowForm(true);
  };

  // Handle delete appointment status
  const handleDeleteClick = (status) => {
    setCurrentStatus(status);
    setShowDeleteConfirm(true);
  };

  // Handle form submission
  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setFormError(null);
    
    try {
      if (currentStatus) {
        // Update existing appointment status
        await updateAppointmentStatus({ ...formData, Id: currentStatus.Id });
        toast.success('Appointment status updated successfully');
      } else {
        // Create new appointment status
        await createAppointmentStatus(formData);
        toast.success('Appointment status created successfully');
      }
      
      // Reload appointment statuses and close form
      await loadAppointmentStatuses();
      setShowForm(false);
    } catch (error) {
      console.error('Error saving appointment status:', error);
      setFormError(error.message || 'Failed to save appointment status');
      toast.error('Failed to save appointment status');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete confirmation
  const handleConfirmDelete = async () => {
    if (!currentStatus) return;
    
    setIsDeleting(true);
    try {
      await deleteAppointmentStatus(currentStatus.Id);
      toast.success('Appointment status deleted successfully');
      
      // Reload appointment statuses and close dialog
      await loadAppointmentStatuses();
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Error deleting appointment status:', error);
      toast.error('Failed to delete appointment status');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-surface-800 dark:text-surface-100">Manage Appointment Statuses</h1>
            <p className="mt-1 text-surface-500 dark:text-surface-400">Add, edit, or remove appointment statuses</p>
          </div>
        </div>
        
        <AdminPanel />
        
        {showForm ? (
          <EntityForm 
            title={currentStatus ? 'Edit Appointment Status' : 'Add New Appointment Status'}
            fields={formFields}
            initialData={currentStatus}
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
            isLoading={isSubmitting}
            error={formError}
          />
        ) : (
          <EntityTable 
            title="Appointment Statuses"
            data={appointmentStatuses}
            columns={columns}
            isLoading={isLoading}
            onAdd={handleAddStatus}
            onEdit={handleEditStatus}
            onDelete={handleDeleteClick}
          />
        )}
        
        <DeleteConfirmation 
          isOpen={showDeleteConfirm}
          entityName={currentStatus?.Name}
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDeleteConfirm(false)}
          isLoading={isDeleting}
        />
      </motion.div>
    </div>
  );
};

export default ManageAppointmentStatuses;