import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import AdminPanel from '../../components/admin/AdminPanel.jsx';
import EntityTable from '../../components/admin/EntityTable.jsx';
import EntityForm from '../../components/admin/EntityForm.jsx';
import DeleteConfirmation from '../../components/admin/DeleteConfirmation.jsx';
import { 
  fetchAppointmentTypes,
  createAppointmentType,
  updateAppointmentType,
  deleteAppointmentType
} from '../../services/appointmentTypeService.js';

const ManageAppointmentTypes = () => {
  const [appointmentTypes, setAppointmentTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentType, setCurrentType] = useState(null);
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

  // Fetch appointment types on component mount
  useEffect(() => {
    loadAppointmentTypes();
  }, []);

  const loadAppointmentTypes = async () => {
    setIsLoading(true);
    try {
      const data = await fetchAppointmentTypes();
      setAppointmentTypes(data);
    } catch (error) {
      console.error('Error fetching appointment types:', error);
      toast.error('Failed to load appointment types');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle add appointment type
  const handleAddType = () => {
    setCurrentType(null);
    setFormError(null);
    setShowForm(true);
  };

  // Handle edit appointment type
  const handleEditType = (type) => {
    setCurrentType(type);
    setFormError(null);
    setShowForm(true);
  };

  // Handle delete appointment type
  const handleDeleteClick = (type) => {
    setCurrentType(type);
    setShowDeleteConfirm(true);
  };

  // Handle form submission
  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setFormError(null);
    
    try {
      if (currentType) {
        // Update existing appointment type
        await updateAppointmentType({ ...formData, Id: currentType.Id });
        toast.success('Appointment type updated successfully');
      } else {
        // Create new appointment type
        await createAppointmentType(formData);
        toast.success('Appointment type created successfully');
      }
      
      // Reload appointment types and close form
      await loadAppointmentTypes();
      setShowForm(false);
    } catch (error) {
      console.error('Error saving appointment type:', error);
      setFormError(error.message || 'Failed to save appointment type');
      toast.error('Failed to save appointment type');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete confirmation
  const handleConfirmDelete = async () => {
    if (!currentType) return;
    
    setIsDeleting(true);
    try {
      await deleteAppointmentType(currentType.Id);
      toast.success('Appointment type deleted successfully');
      
      // Reload appointment types and close dialog
      await loadAppointmentTypes();
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Error deleting appointment type:', error);
      toast.error('Failed to delete appointment type');
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
            <h1 className="text-2xl md:text-3xl font-bold text-surface-800 dark:text-surface-100">Manage Appointment Types</h1>
            <p className="mt-1 text-surface-500 dark:text-surface-400">Add, edit, or remove appointment types</p>
          </div>
        </div>
        
        <AdminPanel />
        
        {showForm ? (
          <EntityForm 
            title={currentType ? 'Edit Appointment Type' : 'Add New Appointment Type'}
            fields={formFields}
            initialData={currentType}
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
            isLoading={isSubmitting}
            error={formError}
          />
        ) : (
          <EntityTable 
            title="Appointment Types"
            data={appointmentTypes}
            columns={columns}
            isLoading={isLoading}
            onAdd={handleAddType}
            onEdit={handleEditType}
            onDelete={handleDeleteClick}
          />
        )}
        
        <DeleteConfirmation 
          isOpen={showDeleteConfirm}
          entityName={currentType?.Name}
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDeleteConfirm(false)}
          isLoading={isDeleting}
        />
      </motion.div>
    </div>
  );
};

export default ManageAppointmentTypes;