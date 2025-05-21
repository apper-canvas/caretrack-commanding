/**
 * Service for appointment status operations
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
 * Get all appointment statuses
 */
export const getAppointmentStatuses = async () => {
  try {
    const apperClient = getApperClient();
    const tableName = 'appointment_status';
    
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
    console.error("Error fetching appointment statuses:", error);
    throw error;
  }
};