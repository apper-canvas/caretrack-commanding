// Provider Service
// This service handles all provider-related API operations

/**
 * Fetch providers from the database
 * @param {Object} params - Optional query parameters for filtering, pagination, etc.
 * @returns {Promise<Array>} - Array of provider records
 */
export const fetchProviders = async (params = {}) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const response = await apperClient.fetchRecords('provider', params);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching providers:', error);
    throw error;
  }
};

/**
 * Get providers from the database (alias for fetchProviders)
 * @param {Object} params - Optional query parameters for filtering, pagination, etc.
 * @returns {Promise<Array>} - Array of provider records
 */
export const getProviders = async (params = {}) => {
  // This is an alias for fetchProviders to maintain backward compatibility
  return fetchProviders(params);
};

/**
 * Fetch a specific provider by ID
 * @param {string|number} providerId - The ID of the provider to fetch
 * @returns {Promise<Object>} - Provider record
 */
export const fetchProviderById = async (providerId) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const response = await apperClient.getRecordById('provider', providerId);
    return response.data;
  } catch (error) {
    console.error(`Error fetching provider with ID ${providerId}:`, error);
    throw error;
  }
};

/**
 * Create a new provider record
 * @param {Object} providerData - The provider data to create
 * @returns {Promise<Object>} - Newly created provider record
 */
export const createProvider = async (providerData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      records: [providerData]
    };
    
    const response = await apperClient.createRecord('provider', params);
    
    if (response.success && response.results && response.results.length > 0) {
      return response.results[0].data;
    } else {
      throw new Error(response.message || 'Failed to create provider');
    }
  } catch (error) {
    console.error('Error creating provider:', error);
    throw error;
  }
};

/**
 * Update an existing provider record
 * @param {Object} providerData - The provider data to update (must include Id)
 * @returns {Promise<Object>} - Updated provider record
 */
export const updateProvider = async (providerData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    if (!providerData.Id) {
      throw new Error('Provider ID is required for update');
    }
    
    const params = {
      records: [providerData]
    };
    
    const response = await apperClient.updateRecord('provider', params);
    
    if (response.success && response.results && response.results.length > 0) {
      return response.results[0].data;
    } else {
      throw new Error(response.message || 'Failed to update provider');
    }
  } catch (error) {
    console.error('Error updating provider:', error);
    throw error;
  }
};

/**
 * Delete a provider record
 * @param {string|number} providerId - The ID of the provider to delete
 * @returns {Promise<boolean>} - True if deletion was successful
 */
export const deleteProvider = async (providerId) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      RecordIds: [providerId]
    };
    
    const response = await apperClient.deleteRecord('provider', params);
    
    if (response.success) {
      return true;
    } else {
      throw new Error(response.message || 'Failed to delete provider');
    }
  } catch (error) {
    console.error(`Error deleting provider with ID ${providerId}:`, error);
    throw error;
  }
};