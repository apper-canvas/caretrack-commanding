/**
 * Service for appointment-related operations
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
 * Get all appointments with optional filters
 */
export const getAppointments = async (filters = {}) => {
  try {
    const apperClient = getApperClient();
    const tableName = 'appointment1';
    
    const params = {
      fields: ["id", "Name", "date", "endDate", "duration", "reason", "notes", 
               "isRecurring", "recurringPattern", "waitTime", "patientId", 
               "typeId", "providerId", "statusId"],
      orderBy: [
        {
          field: "date",
          direction: "asc"
        }
      ],
      expands: [
        {
          name: "patientId",
          alias: "patient"
        },
        {
          name: "typeId",
          alias: "type"
        },
        {
          name: "providerId",
          alias: "provider"
        },
        {
          name: "statusId",
          alias: "status"
        }
      ]
    };
    
    // Apply date range filter
    if (filters.startDate) {
      params.where = [
        {
          fieldName: "date",
          Operator: "GreaterThanOrEqual",
          values: [filters.startDate]
        }
      ];
    }
    
    if (filters.endDate) {
      if (!params.where) params.where = [];
      params.where.push({
        fieldName: "date",
        Operator: "LessThanOrEqual",
        values: [filters.endDate]
      });
    }
    
    // Apply provider filter
    if (filters.providerId) {
      if (!params.where) params.where = [];
      params.where.push({
        fieldName: "providerId",
        Operator: "ExactMatch",
        values: [filters.providerId]
      });
    }
    
    // Apply status filter
    if (filters.statusId) {
      if (!params.where) params.where = [];
      params.where.push({
        fieldName: "statusId",
        Operator: "ExactMatch",
        values: [filters.statusId]
      });
    }
    
    // Apply type filter
    if (filters.typeId) {
      if (!params.where) params.where = [];
      params.where.push({
        fieldName: "typeId",
        Operator: "ExactMatch",
        values: [filters.typeId]
      });
    }
    
    // Apply patient filter
    if (filters.patientId) {
      if (!params.where) params.where = [];
      params.where.push({
        fieldName: "patientId",
        Operator: "ExactMatch",
        values: [filters.patientId]
      });
    }
    
    const response = await apperClient.fetchRecords(tableName, params);
    
    // Process the appointments to add formatted dates and times
    const appointments = response.data || [];
    return appointments.map(appointment => {
      const startDate = new Date(appointment.date);
      const endDate = new Date(appointment.endDate);
      
      return {
        ...appointment,
        formattedDate: startDate.toISOString().split('T')[0],
        formattedTime: `${startDate.getHours().toString().padStart(2, '0')}:${startDate.getMinutes().toString().padStart(2, '0')}`,
        formattedEndTime: `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`,
        patientName: appointment.patient?.Name || 'Unknown Patient',
        status: appointment.status?.Name || 'Scheduled',
        statusColor: getStatusColorClass(appointment.status?.Name),
        type: {
          id: appointment.type?.id || 1,
          name: appointment.type?.Name || 'Check-up',
          color: appointment.type?.color || 'primary'
        }
      };
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
};

/**
 * Helper function to get status color class
 */
function getStatusColorClass(status) {
  const statusMap = {
    'Scheduled': 'badge-blue',
    'Confirmed': 'badge-green',
    'Checked In': 'badge-purple',
    'In Progress': 'badge-yellow',
    'Completed': 'badge-green',
    'Cancelled': 'badge-red',
    'No-show': 'badge-red',
    'Rescheduled': 'badge-purple'
  };
  
  return statusMap[status] || 'badge-blue';
}

/**
 * Create a new appointment
 */
export const createAppointment = async (appointmentData) => {
  try {
    const apperClient = getApperClient();
    const tableName = 'appointment1';
    
    const params = {
      records: [{
        Name: appointmentData.Name || `Appointment for ${appointmentData.patientName}`,
        date: appointmentData.date,
        endDate: appointmentData.endDate,
        duration: appointmentData.duration,
        reason: appointmentData.reason,
        notes: appointmentData.notes,
        isRecurring: appointmentData.isRecurring || false,
        recurringPattern: appointmentData.recurringPattern,
        waitTime: appointmentData.waitTime,
        patientId: appointmentData.patientId,
        typeId: appointmentData.typeId,
        providerId: appointmentData.providerId,
        statusId: appointmentData.statusId || 1 // Default to "Scheduled"
      }]
    };
    
    const response = await apperClient.createRecord(tableName, params);
    
    if (response.success && response.results && response.results[0].success) {
      return response.results[0].data;
    } else {
      throw new Error(response.results[0]?.message || "Failed to create appointment");
    }
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw error;
  }
};

/**
 * Get appointment by ID
 */
export const getAppointmentById = async (appointmentId) => {
  try {
    const apperClient = getApperClient();
    const tableName = 'appointment1';
    
    const response = await apperClient.getRecordById(tableName, appointmentId, {
      expands: [
        {
          name: "patientId",
          alias: "patient"
        },
        {
          name: "typeId",
          alias: "type"
        },
        {
          name: "providerId",
          alias: "provider"
        },
        {
          name: "statusId",
          alias: "status"
        }
      ]
    });
    
    if (response && response.data) {
      const appointment = response.data;
      const startDate = new Date(appointment.date);
      const endDate = new Date(appointment.endDate);
      
      return {
        ...appointment,
        formattedDate: startDate.toISOString().split('T')[0],
        formattedTime: `${startDate.getHours().toString().padStart(2, '0')}:${startDate.getMinutes().toString().padStart(2, '0')}`,
        formattedEndTime: `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`,
        patientName: appointment.patient?.Name || 'Unknown Patient',
        status: appointment.status?.Name || 'Scheduled',
        statusColor: getStatusColorClass(appointment.status?.Name),
        type: {
          id: appointment.type?.id || 1,
          name: appointment.type?.Name || 'Check-up',
          color: appointment.type?.color || 'primary'
        }
      };
    } else {
      throw new Error("Appointment not found");
    }
  } catch (error) {
    console.error(`Error fetching appointment with ID ${appointmentId}:`, error);
    throw error;
  }
};