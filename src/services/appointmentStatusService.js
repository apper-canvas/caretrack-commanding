// Appointment Status Service
// This service handles all appointment status-related API operations

/**
 * Fetch appointment statuses from the database
 * @param {Object} params - Optional query parameters for filtering, pagination, etc.
 * @returns {Promise<Array>} - Array of appointment status records
 */
export const fetchAppointmentStatuses = async (params = {}) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const response = await apperClient.fetchRecords('appointment_status', params);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching appointment statuses:', error);
    throw error;
  }
};

/**
 * Fetch a specific appointment status by ID
 * @param {string|number} statusId - The ID of the appointment status to fetch
 * @returns {Promise<Object>} - Appointment status record
 */
export const fetchAppointmentStatusById = async (statusId) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const response = await apperClient.getRecordById('appointment_status', statusId);
    return response.data;
  } catch (error) {
    console.error(`Error fetching appointment status with ID ${statusId}:`, error);
    throw error;
  }
};

/**
 * Create a new appointment status record
 * @param {Object} statusData - The appointment status data to create
 * @returns {Promise<Object>} - Newly created appointment status record
 */
export const createAppointmentStatus = async (statusData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      records: [statusData]
    };
    
    const response = await apperClient.createRecord('appointment_status', params);
    
    if (response.success && response.results && response.results.length > 0) {
      return response.results[0].data;
    } else {
      throw new Error(response.message || 'Failed to create appointment status');
    }
  } catch (error) {
    console.error('Error creating appointment status:', error);
    throw error;
  }
};

/**
 * Update an existing appointment status record
 * @param {Object} statusData - The appointment status data to update (must include Id)
 * @returns {Promise<Object>} - Updated appointment status record
 */
export const updateAppointmentStatus = async (statusData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    if (!statusData.Id) {
      throw new Error('Appointment status ID is required for update');
    }
    
    const params = {
      records: [statusData]
    };
    
    const response = await apperClient.updateRecord('appointment_status', params);
    
    if (response.success && response.results && response.results.length > 0) {
      return response.results[0].data;
    } else {
      throw new Error(response.message || 'Failed to update appointment status');
    }
  } catch (error) {
    console.error('Error updating appointment status:', error);
    throw error;
  }
};

/**
 * Delete an appointment status record
 * @param {string|number} statusId - The ID of the appointment status to delete
 * @returns {Promise<boolean>} - True if deletion was successful
 */
export const deleteAppointmentStatus = async (statusId) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      RecordIds: [statusId]
    };
    
    const response = await apperClient.deleteRecord('appointment_status', params);
    
    if (response.success) {
      return true;
    } else {
      throw new Error(response.message || 'Failed to delete appointment status');
    }
  } catch (error) {
    console.error(`Error deleting appointment status with ID ${statusId}:`, error);
    throw error;
  }
};

// Export the fetchAppointmentStatuses function as getAppointmentStatuses for compatibility
// with existing code that imports this function name
export const getAppointmentStatuses = fetchAppointmentStatuses;
