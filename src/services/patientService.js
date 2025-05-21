// Patient Service
// This service handles all patient-related API operations

/**
 * Fetch patients from the database
 * @param {Object} params - Optional query parameters for filtering, pagination, etc.
 * @returns {Promise<Array>} - Array of patient records
 */
export const fetchPatients = async (params = {}) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const response = await apperClient.fetchRecords('patient', params);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching patients:', error);
    throw error;
  }
};

/**
 * Fetch a specific patient by ID
 * @param {string|number} patientId - The ID of the patient to fetch
 * @returns {Promise<Object>} - Patient record
 */
export const fetchPatientById = async (patientId) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const response = await apperClient.getRecordById('patient', patientId);
    return response.data;
  } catch (error) {
    console.error(`Error fetching patient with ID ${patientId}:`, error);
    throw error;
  }
};

/**
 * Create a new patient record
 * @param {Object} patientData - The patient data to create
 * @returns {Promise<Object>} - Newly created patient record
 */
export const createPatient = async (patientData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      records: [patientData]
    };
    
    const response = await apperClient.createRecord('patient', params);
    
    if (response.success && response.results && response.results.length > 0) {
      return response.results[0].data;
    } else {
      throw new Error(response.message || 'Failed to create patient');
    }
  } catch (error) {
    console.error('Error creating patient:', error);
    throw error;
  }
};

/**
 * Update an existing patient record
 * @param {Object} patientData - The patient data to update (must include Id)
 * @returns {Promise<Object>} - Updated patient record
 */
export const updatePatient = async (patientData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    if (!patientData.Id) {
      throw new Error('Patient ID is required for update');
    }
    
    const params = {
      records: [patientData]
    };
    
    const response = await apperClient.updateRecord('patient', params);
    
    if (response.success && response.results && response.results.length > 0) {
      return response.results[0].data;
    } else {
      throw new Error(response.message || 'Failed to update patient');
    }
  } catch (error) {
    console.error('Error updating patient:', error);
    throw error;
  }
};

/**
 * Delete a patient record
 * @param {string|number} patientId - The ID of the patient to delete
 * @returns {Promise<boolean>} - True if deletion was successful
 */
export const deletePatient = async (patientId) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      RecordIds: [patientId]
    };
    
    const response = await apperClient.deleteRecord('patient', params);
    
    if (response.success) {
      return true;
    } else {
      throw new Error(response.message || 'Failed to delete patient');
    }
  } catch (error) {
    console.error(`Error deleting patient with ID ${patientId}:`, error);
    throw error;
  }
};