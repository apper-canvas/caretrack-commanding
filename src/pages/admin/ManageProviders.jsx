import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import AdminPanel from '../../components/admin/AdminPanel.jsx';
import EntityTable from '../../components/admin/EntityTable.jsx';
import EntityForm from '../../components/admin/EntityForm.jsx';
import DeleteConfirmation from '../../components/admin/DeleteConfirmation.jsx';
import { 
  fetchProviders,
  createProvider,
  updateProvider,
  deleteProvider
} from '../../services/providerService.js';

const ManageProviders = () => {
  const [providers, setProviders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentProvider, setCurrentProvider] = useState(null);
  const [formError, setFormError] = useState(null);

  // Table columns configuration
  const columns = [
    { key: 'Name', label: 'Name', sortable: true },
    { key: 'specialty', label: 'Specialty', sortable: true },
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
    { name: 'specialty', label: 'Specialty', type: 'Text', required: true },
    { name: 'color', label: 'Color', type: 'Text', placeholder: '#RRGGBB', required: true },
    { name: 'Tags', label: 'Tags', type: 'Tag' },
  ];

  // Fetch providers on component mount
  useEffect(() => {
    loadProviders();
  }, []);

  const loadProviders = async () => {
    setIsLoading(true);
    try {
      const data = await fetchProviders();
      setProviders(data);
    } catch (error) {
      console.error('Error fetching providers:', error);
      toast.error('Failed to load providers');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle add provider
  const handleAddProvider = () => {
    setCurrentProvider(null);
    setFormError(null);
    setShowForm(true);
  };

  // Handle edit provider
  const handleEditProvider = (provider) => {
    setCurrentProvider(provider);
    setFormError(null);
    setShowForm(true);
  };

  // Handle delete provider
  const handleDeleteClick = (provider) => {
    setCurrentProvider(provider);
    setShowDeleteConfirm(true);
  };

  // Handle form submission
  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setFormError(null);
    
    try {
      if (currentProvider) {
        // Update existing provider
        await updateProvider({ ...formData, Id: currentProvider.Id });
        toast.success('Provider updated successfully');
      } else {
        // Create new provider
        await createProvider(formData);
        toast.success('Provider created successfully');
      }
      
      // Reload providers and close form
      await loadProviders();
      setShowForm(false);
    } catch (error) {
      console.error('Error saving provider:', error);
      setFormError(error.message || 'Failed to save provider');
      toast.error('Failed to save provider');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete confirmation
  const handleConfirmDelete = async () => {
    if (!currentProvider) return;
    
    setIsDeleting(true);
    try {
      await deleteProvider(currentProvider.Id);
      toast.success('Provider deleted successfully');
      
      // Reload providers and close dialog
      await loadProviders();
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Error deleting provider:', error);
      toast.error('Failed to delete provider');
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
            <h1 className="text-2xl md:text-3xl font-bold text-surface-800 dark:text-surface-100">Manage Providers</h1>
            <p className="mt-1 text-surface-500 dark:text-surface-400">Add, edit, or remove healthcare providers</p>
          </div>
        </div>
        
        <AdminPanel />
        
        {showForm ? (
          <EntityForm 
            title={currentProvider ? 'Edit Provider' : 'Add New Provider'}
            fields={formFields}
            initialData={currentProvider}
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
            isLoading={isSubmitting}
            error={formError}
          />
        ) : (
          <EntityTable 
            title="Providers"
            data={providers}
            columns={columns}
            isLoading={isLoading}
            onAdd={handleAddProvider}
            onEdit={handleEditProvider}
            onDelete={handleDeleteClick}
          />
        )}
        
        <DeleteConfirmation 
          isOpen={showDeleteConfirm}
          entityName={currentProvider?.Name}
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDeleteConfirm(false)}
          isLoading={isDeleting}
        />
      </motion.div>
    </div>
  );
};

export default ManageProviders;