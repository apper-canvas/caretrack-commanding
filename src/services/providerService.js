/**
 * Service for provider-related operations
 */

// Helper function to get ApperClient instance
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

/**
 * Get all providers
 */
export const getProviders = async () => {
  try {
    const apperClient = getApperClient();
    const tableName = 'provider';
    
    const params = {
      fields: ["id", "Name", "specialty", "color"],
      orderBy: [
        {
          field: "Name",
          direction: "asc"
        }
      ]
    };
    
    const response = await apperClient.fetchRecords(tableName, params);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching providers:", error);
    throw error;
  }
};

/**
 * Create a new provider
 */
export const createProvider = async (providerData) => {
  try {
    const apperClient = getApperClient();
    const tableName = 'provider';
    
    const params = {
      records: [{
        Name: providerData.name,
        specialty: providerData.specialty,
        color: providerData.color || "#4f46e5" // Default color
      }]
    };
    
    const response = await apperClient.createRecord(tableName, params);
    
    if (response.success && response.results && response.results[0].success) {
      return response.results[0].data;
    } else {
      throw new Error(response.results[0]?.message || "Failed to create provider");
    }
  } catch (error) {
    console.error("Error creating provider:", error);
    throw error;
  }
};

/**
 * Get provider by ID
 */
export const getProviderById = async (providerId) => {
  try {
    const apperClient = getApperClient();
    const tableName = 'provider';
    
    const response = await apperClient.getRecordById(tableName, providerId);
    
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Provider not found");
    }
  } catch (error) {
    console.error(`Error fetching provider with ID ${providerId}:`, error);
    throw error;
  }
};