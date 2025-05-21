// Mock medical records data
const medicalRecords = [
  // Patient 1 (John Doe) Records
  {
    id: 101,
    patientId: 1,
    type: 'visit',
    title: 'Annual Physical Examination',
    description: 'Routine annual physical with blood pressure check and general health assessment.',
    date: '2023-09-10T09:30:00',
    provider: 'Dr. Sarah Johnson',
    notes: 'Patient is in good overall health. Blood pressure is slightly elevated at 135/85. Recommended lifestyle modifications including reduced sodium intake and increased physical activity.'
  },
  {
    id: 102,
    patientId: 1,
    type: 'lab',
    title: 'Comprehensive Metabolic Panel',
    description: 'Blood test measuring glucose, electrolyte, and fluid balance; kidney and liver function.',
    date: '2023-09-10T11:45:00',
    provider: 'Quest Diagnostics',
    results: 'Glucose: 110 mg/dL (High)\nSodium: 139 mmol/L (Normal)\nPotassium: 4.1 mmol/L (Normal)\nChloride: 101 mmol/L (Normal)\nCO2: 24 mmol/L (Normal)\nBUN: 15 mg/dL (Normal)\nCreatinine: 0.9 mg/dL (Normal)\nAlbumin: 4.2 g/dL (Normal)\nTotal Protein: 7.0 g/dL (Normal)\nALT: 22 U/L (Normal)\nAST: 25 U/L (Normal)\nAlkaline Phosphatase: 70 U/L (Normal)'
  },
  {
    id: 103,
    patientId: 1,
    type: 'medication',
    title: 'Metformin Prescription',
    description: 'Prescription for Type 2 Diabetes management',
    date: '2023-09-12T14:20:00',
    provider: 'Dr. Sarah Johnson',
    dosage: '500mg',
    frequency: 'Twice daily with meals',
    duration: '3 months'
  },
  {
    id: 104,
    patientId: 1,
    type: 'visit',
    title: 'Diabetes Follow-up',
    description: 'Follow-up appointment to assess diabetes management and medication efficacy.',
    date: '2023-06-15T10:00:00',
    provider: 'Dr. Sarah Johnson',
    notes: 'Patient reports improved energy levels. Blood glucose levels have stabilized. Continuing current medication regimen.'
  },
  {
    id: 105,
    patientId: 1,
    type: 'lab',
    title: 'HbA1c Test',
    description: 'Blood test measuring average blood glucose levels over past 3 months',
    date: '2023-06-15T11:30:00',
    provider: 'Quest Diagnostics',
    results: 'HbA1c: 6.8% (Moderately Elevated)\nReference Range: <5.7% (Normal), 5.7-6.4% (Prediabetes), >6.5% (Diabetes)'
  },
  
  // Patient 2 (Jane Smith) Records
  {
    id: 201,
    patientId: 2,
    type: 'visit',
    title: 'Asthma Assessment',
    description: 'Evaluation of asthma symptoms and management plan.',
    date: '2023-10-05T13:15:00',
    provider: 'Dr. Michael Chen',
    notes: 'Patient reports increased wheezing during physical activity. Lung function tests show decreased peak flow. Adjusted medication dosage and recommended daily use of inhaler before exercise.'
  },
  {
    id: 202,
    patientId: 2,
    type: 'procedure',
    title: 'Pulmonary Function Test',
    description: 'Spirometry to evaluate lung function',
    date: '2023-10-05T14:00:00',
    provider: 'Respiratory Therapy Dept',
    results: 'FEV1: 75% of predicted value (Moderate restriction)\nFVC: 80% of predicted value (Mild restriction)\nFEV1/FVC Ratio: 0.78 (Normal range: >0.70)'
  },
  {
    id: 203,
    patientId: 2,
    type: 'medication',
    title: 'Albuterol Inhaler Prescription',
    description: 'Rescue inhaler for asthma symptoms',
    date: '2023-10-05T15:30:00',
    provider: 'Dr. Michael Chen',
    dosage: '90mcg/actuation',
    frequency: '2 inhalations as needed for symptoms, 15-20 minutes before exercise',
    duration: 'Refills: 3'
  },
  {
    id: 204,
    patientId: 2,
    type: 'imaging',
    title: 'Chest X-Ray',
    description: 'Evaluation of lung condition',
    date: '2023-08-22T09:45:00',
    provider: 'Dr. Lisa Wong, Radiology',
    results: 'No acute cardiopulmonary process identified. Lung fields are clear. Heart size is normal. No pleural effusion.'
  },
  
  // Additional records can be added for other patients
];

// Get all medical records
export const getAllMedicalRecords = () => {
  return medicalRecords;
};

// Get medical records by patient ID
export const getMedicalRecordsByPatientId = (patientId) => {
  return medicalRecords.filter(record => record.patientId === patientId);
};

// Get a specific medical record by its ID
export const getMedicalRecordById = (recordId) => {
  return medicalRecords.find(record => record.id === recordId);
};

// Get medical records by type
export const getMedicalRecordsByType = (type) => {
  return medicalRecords.filter(record => record.type === type);
};

// Get medical records by date range
export const getMedicalRecordsByDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  end.setHours(23, 59, 59); // End of day
  
  return medicalRecords.filter(record => {
    const recordDate = new Date(record.date);
    return recordDate >= start && recordDate <= end;
  });
};