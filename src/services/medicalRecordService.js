/**
 * Service for medical record operations
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
 * Get medical records with optional filtering
 */
export const getMedicalRecords = async (filters = {}) => {
  try {
    const apperClient = getApperClient();
    const tableName = 'medical_record';
    
    const params = {
      fields: ["id", "Name", "Tags", "type", "title", "description", "date", "provider", 
               "notes", "results", "dosage", "frequency", "duration", "patientId"],
      orderBy: [
        {
          field: "date",
          direction: "desc"
        }
      ]
    };
    
    // Apply patient ID filter
    if (filters.patientId) {
      params.where = [
        {
          fieldName: "patientId",
          Operator: "ExactMatch",
          values: [filters.patientId]
        }
      ];
    }
    
    // Apply search filter
    if (filters.search) {
      params.whereGroups = [{
        operator: "OR",
        subGroups: [
          {
            conditions: [
              {
                FieldName: "title",
                operator: "Contains",
                values: [filters.search]
              }
            ]
          },
          {
            conditions: [
              {
                FieldName: "description",
                operator: "Contains",
                values: [filters.search]
              }
            ]
          },
          {
            conditions: [
              {
                FieldName: "provider",
                operator: "Contains",
                values: [filters.search]
              }
            ]
          }
        ]
      }];
    }
    
    // Apply type filter
    if (filters.type && filters.type !== 'all') {
      if (!params.where) params.where = [];
      params.where.push({
        fieldName: "type",
        Operator: "ExactMatch",
        values: [filters.type]
      });
    }
    
    // Apply date range filters
    if (filters.startDate) {
      if (!params.where) params.where = [];
      params.where.push({
        fieldName: "date",
        Operator: "GreaterThanOrEqual",
        values: [filters.startDate]
      });
    }
    
    if (filters.endDate) {
      if (!params.where) params.where = [];
      // Add time to make it end of day
      const endDateTime = new Date(filters.endDate);
      endDateTime.setHours(23, 59, 59);
      params.where.push({
        fieldName: "date",
        Operator: "LessThanOrEqual",
        values: [endDateTime.toISOString()]
      });
    }
    
    const response = await apperClient.fetchRecords(tableName, params);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching medical records:", error);
    throw error;
  }
};

/**
 * Create a new medical record
 */
export const createMedicalRecord = async (recordData) => {
  try {
    const apperClient = getApperClient();
    const tableName = 'medical_record';
    
    const params = {
      records: [{
        Name: recordData.title,
        type: recordData.type,
        title: recordData.title,
        description: recordData.description,
        date: recordData.date,
        provider: recordData.provider,
        notes: recordData.notes,
        results: recordData.results,
        dosage: recordData.dosage,
        frequency: recordData.frequency,
        duration: recordData.duration,
        patientId: recordData.patientId
      }]
    };
    
    const response = await apperClient.createRecord(tableName, params);
    
    if (response.success && response.results && response.results[0].success) {
      return response.results[0].data;
    } else {
      throw new Error(response.results[0]?.message || "Failed to create medical record");
    }
  } catch (error) {
    console.error("Error creating medical record:", error);
    throw error;
  }
};

/**
 * Get medical record by ID
 */
export const getMedicalRecordById = async (recordId) => {
  try {
    const apperClient = getApperClient();
    const tableName = 'medical_record';
    
    const response = await apperClient.getRecordById(tableName, recordId);
    
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Medical record not found");
    }
  } catch (error) {
    console.error(`Error fetching medical record with ID ${recordId}:`, error);
    throw error;
  }
};