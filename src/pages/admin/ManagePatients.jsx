import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import AdminPanel from '../../components/admin/AdminPanel.jsx';
import EntityTable from '../../components/admin/EntityTable.jsx';
import EntityForm from '../../components/admin/EntityForm.jsx';
import DeleteConfirmation from '../../components/admin/DeleteConfirmation.jsx';
import { 
  fetchPatients, 
  createPatient, 
  updatePatient, 
  deletePatient 
} from '../../services/patientService.js';

const ManagePatients = () => {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [formError, setFormError] = useState(null);

  // Table columns configuration
  const columns = [
    { key: 'Name', label: 'Name', sortable: true },
    { key: 'firstName', label: 'First Name', sortable: true },
    { key: 'lastName', label: 'Last Name', sortable: true },
    { key: 'gender', label: 'Gender', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'phone', label: 'Phone', sortable: true },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      render: (value) => {
        const statusClass = value === 'Active' 
          ? 'badge badge-green' 
          : 'badge badge-red';
        return <span className={statusClass}>{value}</span>;
      }
    },
  ];

  // Form fields configuration
  const formFields = [
    { name: 'Name', label: 'Name', type: 'Text', required: true },
    { name: 'firstName', label: 'First Name', type: 'Text', required: true },
    { name: 'lastName', label: 'Last Name', type: 'Text', required: true },
    { name: 'gender', label: 'Gender', type: 'Picklist', picklistValues: 'Male,Female,Other,Prefer not to say', required: true },
    { name: 'dob', label: 'Date of Birth', type: 'Date' },
    { name: 'email', label: 'Email', type: 'Email', required: true },
    { name: 'phone', label: 'Phone', type: 'Phone' },
    { name: 'address', label: 'Address', type: 'MultilineText' },
    { name: 'insuranceProvider', label: 'Insurance Provider', type: 'Text' },
    { name: 'insuranceNumber', label: 'Insurance Number', type: 'Text' },
    { name: 'medicalConditions', label: 'Medical Conditions', type: 'Tag' },
    { name: 'allergies', label: 'Allergies', type: 'Tag' },
    { name: 'status', label: 'Status', type: 'Picklist', picklistValues: 'Active,Inactive', required: true },
  ];

  // Fetch patients on component mount
  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    setIsLoading(true);
    try {
      const data = await fetchPatients();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
      toast.error('Failed to load patients');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle add patient
  const handleAddPatient = () => {
    setCurrentPatient(null);
    setFormError(null);
    setShowForm(true);
  };

  // Handle edit patient
  const handleEditPatient = (patient) => {
    setCurrentPatient(patient);
    setFormError(null);
    setShowForm(true);
  };

  // Handle delete patient
  const handleDeleteClick = (patient) => {
    setCurrentPatient(patient);
    setShowDeleteConfirm(true);
  };

  // Handle form submission
  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setFormError(null);
    
    try {
      if (currentPatient) {
        // Update existing patient
        await updatePatient({ ...formData, Id: currentPatient.Id });
        toast.success('Patient updated successfully');
      } else {
        // Create new patient
        await createPatient(formData);
        toast.success('Patient created successfully');
      }
      
      // Reload patients and close form
      await loadPatients();
      setShowForm(false);
    } catch (error) {
      console.error('Error saving patient:', error);
      setFormError(error.message || 'Failed to save patient');
      toast.error('Failed to save patient');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete confirmation
  const handleConfirmDelete = async () => {
    if (!currentPatient) return;
    
    setIsDeleting(true);
    try {
      await deletePatient(currentPatient.Id);
      toast.success('Patient deleted successfully');
      
      // Reload patients and close dialog
      await loadPatients();
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Error deleting patient:', error);
      toast.error('Failed to delete patient');
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
            <h1 className="text-2xl md:text-3xl font-bold text-surface-800 dark:text-surface-100">Manage Patients</h1>
            <p className="mt-1 text-surface-500 dark:text-surface-400">Add, edit, or remove patient records</p>
          </div>
        </div>
        
        <AdminPanel />
        
        {showForm ? (
          <EntityForm 
            title={currentPatient ? 'Edit Patient' : 'Add New Patient'}
            fields={formFields}
            initialData={currentPatient}
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
            isLoading={isSubmitting}
            error={formError}
          />
        ) : (
          <EntityTable 
            title="Patients"
            data={patients}
            columns={columns}
            isLoading={isLoading}
            onAdd={handleAddPatient}
            onEdit={handleEditPatient}
            onDelete={handleDeleteClick}
          />
        )}
        
        <DeleteConfirmation 
          isOpen={showDeleteConfirm}
          entityName={currentPatient?.Name}
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDeleteConfirm(false)}
          isLoading={isDeleting}
        />
      </motion.div>
    </div>
  );
};

export default ManagePatients;