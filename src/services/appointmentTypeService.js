/**
 * Service for appointment type operations
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
 * Get all appointment types
 */
export const getAppointmentTypes = async () => {
  try {
    const apperClient = getApperClient();
    const tableName = 'appointment_type';
    
    const params = {
      fields: ["id", "Name", "color"],
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
    console.error("Error fetching appointment types:", error);
    throw error;
  }
};