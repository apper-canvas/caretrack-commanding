// Mock patient data
export const patients = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    dob: "1985-05-15",
    gender: "Male",
    phone: "555-123-4567",
    email: "john.doe@example.com",
    address: "123 Main St, Anytown, CA 94567",
    insuranceProvider: "BlueCross",
    insuranceNumber: "BC123456789",
    medicalConditions: ["Hypertension", "Type 2 Diabetes"],
    allergies: ["Penicillin"],
    lastVisit: "2023-09-10",
    status: "Active"
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    dob: "1990-11-22",
    gender: "Female",
    phone: "555-987-6543",
    email: "jane.smith@example.com",
    address: "456 Oak Ave, Somewhere, CA 95123",
    insuranceProvider: "Aetna",
    insuranceNumber: "AE987654321",
    medicalConditions: ["Asthma"],
    allergies: ["Latex", "Nuts"],
    lastVisit: "2023-10-05",
    status: "Active"
  },
  {
    id: 3,
    firstName: "Michael",
    lastName: "Johnson",
    dob: "1978-03-08",
    gender: "Male",
    phone: "555-456-7890",
    email: "michael.johnson@example.com",
    address: "789 Pine St, Elsewhere, CA 91234",
    insuranceProvider: "UnitedHealth",
    insuranceNumber: "UH567891234",
    medicalConditions: ["Arthritis"],
    allergies: [],
    lastVisit: "2023-08-15",
    status: "Inactive"
  },
  {
    id: 4,
    firstName: "Emily",
    lastName: "Williams",
    dob: "1992-07-19",
    gender: "Female",
    phone: "555-789-0123",
    email: "emily.williams@example.com",
    address: "321 Cedar Rd, Nowhere, CA 92345",
    insuranceProvider: "Cigna",
    insuranceNumber: "CI654321987",
    medicalConditions: ["Migraines", "Anxiety"],
    allergies: ["Sulfa drugs"],
    lastVisit: "2023-11-01",
    status: "Active"
  }
];

// Get patient by ID
export const getPatientById = (id) => {
  return patients.find(patient => patient.id === id);
};

// Get age from date of birth
export const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  return age;
};