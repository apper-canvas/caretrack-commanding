/**
 * Service for patient-related operations
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
 * Get all patients with optional filtering
 */
export const getPatients = async (filters = {}) => {
  try {
    const apperClient = getApperClient();
    const tableName = 'patient';
    
    const params = {
      fields: ["id", "Name", "Tags", "Owner", "firstName", "lastName", "dob", "gender", "phone", 
               "email", "address", "insuranceProvider", "insuranceNumber", "medicalConditions", 
               "allergies", "lastVisit", "status"],
      orderBy: [
        {
          field: "lastName",
          direction: "asc"
        }
      ]
    };
    
    // Apply filters if provided
    if (filters.search) {
      params.whereGroups = [{
        operator: "OR",
        subGroups: [
          {
            conditions: [
              {
                FieldName: "firstName",
                operator: "Contains",
                values: [filters.search]
              }
            ]
          },
          {
            conditions: [
              {
                FieldName: "lastName",
                operator: "Contains",
                values: [filters.search]
              }
            ]
          },
          {
            conditions: [
              {
                FieldName: "email",
                operator: "Contains",
                values: [filters.search]
              }
            ]
          },
          {
            conditions: [
              {
                FieldName: "phone",
                operator: "Contains",
                values: [filters.search]
              }
            ]
          }
        ]
      }];
    }
    
    // Add status filter
    if (filters.status && filters.status !== 'all') {
      params.where = [
        {
          fieldName: "status",
          Operator: "ExactMatch",
          values: [filters.status]
        }
      ];
    }
    
    // Add gender filter
    if (filters.gender && filters.gender !== 'all') {
      if (!params.where) params.where = [];
      params.where.push({
        fieldName: "gender",
        Operator: "ExactMatch",
        values: [filters.gender]
      });
    }
    
    const response = await apperClient.fetchRecords(tableName, params);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching patients:", error);
    throw error;
  }
};

/**
 * Create a new patient
 */
export const createPatient = async (patientData) => {
  try {
    const apperClient = getApperClient();
    const tableName = 'patient';
    
    const params = {
      records: [{
        Name: `${patientData.firstName} ${patientData.lastName}`,
        firstName: patientData.firstName,
        lastName: patientData.lastName,
        dob: patientData.dob,
        gender: patientData.gender,
        phone: patientData.phone,
        email: patientData.email,
        address: patientData.address,
        insuranceProvider: patientData.insuranceProvider,
        insuranceNumber: patientData.insuranceNumber,
        medicalConditions: patientData.medicalConditions?.join(',') || '',
        allergies: patientData.allergies?.join(',') || '',
        status: patientData.status,
        lastVisit: patientData.lastVisit || new Date().toISOString().split('T')[0]
      }]
    };
    
    const response = await apperClient.createRecord(tableName, params);
    
    if (response.success && response.results && response.results[0].success) {
      return response.results[0].data;
    } else {
      throw new Error(response.results[0]?.message || "Failed to create patient");
    }
  } catch (error) {
    console.error("Error creating patient:", error);
    throw error;
  }
};

/**
 * Update an existing patient
 */
export const updatePatient = async (patientData) => {
  try {
    const apperClient = getApperClient();
    const tableName = 'patient';
    
    const params = {
      records: [{
        Id: patientData.id,
        Name: `${patientData.firstName} ${patientData.lastName}`,
        firstName: patientData.firstName,
        lastName: patientData.lastName,
        dob: patientData.dob,
        gender: patientData.gender,
        phone: patientData.phone,
        email: patientData.email,
        address: patientData.address,
        insuranceProvider: patientData.insuranceProvider,
        insuranceNumber: patientData.insuranceNumber,
        medicalConditions: patientData.medicalConditions?.join(',') || '',
        allergies: patientData.allergies?.join(',') || '',
        status: patientData.status
      }]
    };
    
    const response = await apperClient.updateRecord(tableName, params);
    
    if (response.success && response.results && response.results[0].success) {
      return response.results[0].data;
    } else {
      throw new Error(response.results[0]?.message || "Failed to update patient");
    }
  } catch (error) {
    console.error("Error updating patient:", error);
    throw error;
  }
};

/**
 * Delete a patient by ID
 */
export const deletePatient = async (patientId) => {
  try {
    const apperClient = getApperClient();
    const tableName = 'patient';
    
    const params = {
      RecordIds: [patientId]
    };
    
    const response = await apperClient.deleteRecord(tableName, params);
    
    if (response.success && response.results && response.results[0].success) {
      return true;
    } else {
      throw new Error(response.results[0]?.message || "Failed to delete patient");
    }
  } catch (error) {
    console.error("Error deleting patient:", error);
    throw error;
  }
};

/**
 * Get patient by ID
 */
export const getPatientById = async (patientId) => {
  try {
    const apperClient = getApperClient();
    const tableName = 'patient';
    
    const response = await apperClient.getRecordById(tableName, patientId);
    
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Patient not found");
    }
  } catch (error) {
    console.error(`Error fetching patient with ID ${patientId}:`, error);
    throw error;
  }
};