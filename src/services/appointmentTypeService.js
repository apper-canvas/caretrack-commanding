// Appointment Type Service
// This service handles all appointment type-related API operations

/**
 * Fetch appointment types from the database
 * @param {Object} params - Optional query parameters for filtering, pagination, etc.
 * @returns {Promise<Array>} - Array of appointment type records
 */
export const fetchAppointmentTypes = async (params = {}) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const response = await apperClient.fetchRecords('appointment_type', params);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching appointment types:', error);
    throw error;
  }
};

/**
 * Fetch a specific appointment type by ID
 * @param {string|number} typeId - The ID of the appointment type to fetch
 * @returns {Promise<Object>} - Appointment type record
 */
export const fetchAppointmentTypeById = async (typeId) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const response = await apperClient.getRecordById('appointment_type', typeId);
    return response.data;
  } catch (error) {
    console.error(`Error fetching appointment type with ID ${typeId}:`, error);
    throw error;
  }
};

/**
 * Create a new appointment type record
 * @param {Object} typeData - The appointment type data to create
 * @returns {Promise<Object>} - Newly created appointment type record
 */
export const createAppointmentType = async (typeData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      records: [typeData]
    };
    
    const response = await apperClient.createRecord('appointment_type', params);
    
    if (response.success && response.results && response.results.length > 0) {
      return response.results[0].data;
    } else {
      throw new Error(response.message || 'Failed to create appointment type');
    }
  } catch (error) {
    console.error('Error creating appointment type:', error);
    throw error;
  }
};

/**
 * Update an existing appointment type record
 * @param {Object} typeData - The appointment type data to update (must include Id)
 * @returns {Promise<Object>} - Updated appointment type record
 */
export const updateAppointmentType = async (typeData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    if (!typeData.Id) {
      throw new Error('Appointment type ID is required for update');
    }
    
    const params = {
      records: [typeData]
    };
    
    const response = await apperClient.updateRecord('appointment_type', params);
    
    if (response.success && response.results && response.results.length > 0) {
      return response.results[0].data;
    } else {
      throw new Error(response.message || 'Failed to update appointment type');
    }
  } catch (error) {
    console.error('Error updating appointment type:', error);
    throw error;
  }
};

/**
 * Delete an appointment type record
 * @param {string|number} typeId - The ID of the appointment type to delete
 * @returns {Promise<boolean>} - True if deletion was successful
 */
export const deleteAppointmentType = async (typeId) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      RecordIds: [typeId]
    };
    
    const response = await apperClient.deleteRecord('appointment_type', params);
    
    if (response.success) {
      return true;
    } else {
      throw new Error(response.message || 'Failed to delete appointment type');
    }
  } catch (error) {
    console.error(`Error deleting appointment type with ID ${typeId}:`, error);
    throw error;
  }
};

/**
 * Alias for fetchAppointmentTypes to maintain compatibility with existing code
 * @param {Object} params - Optional query parameters for filtering, pagination, etc.
 * @returns {Promise<Array>} - Array of appointment type records
 */
export const getAppointmentTypes = async (params = {}) => {
  return fetchAppointmentTypes(params);
};
