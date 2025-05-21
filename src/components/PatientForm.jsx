import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

/**
 * Reusable PatientForm component for both adding and editing patient information
 * @param {Object} patient - Patient data for editing (optional)
 * @param {Function} onSubmitForm - Function to call when form is submitted
 * @param {Function} onCancel - Function to call when form is cancelled
 */
const PatientForm = forwardRef(({ patient, onSubmitForm, onCancel }, ref) => {
  const isEdit = !!patient;

  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    insuranceProvider: '',
    insuranceNumber: '',
    medicalConditions: '',
    allergies: '',
    status: 'Active'
  });
  
  const [errors, setErrors] = useState({});
  
  // If editing, populate form with patient data
  useEffect(() => {
    if (patient) {
      setFormData({
        firstName: patient.firstName || '',
        lastName: patient.lastName || '',
        dob: patient.dob || '',
        gender: patient.gender || '',
        phone: patient.phone || '',
        email: patient.email || '',
        address: patient.address || '',
        insuranceProvider: patient.insuranceProvider || '',
        insuranceNumber: patient.insuranceNumber || '',
        medicalConditions: Array.isArray(patient.medicalConditions) ? patient.medicalConditions.join(', ') : '',
        allergies: Array.isArray(patient.allergies) ? patient.allergies.join(', ') : '',
        status: patient.status || 'Active'
      });
    }
  }, [patient]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {}; 
    
    // Required fields
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    getFormData: () => formData,
    checkValidity: validateForm
  }));
  
  // Modified to not use e.preventDefault since we're no longer in a form
  const handleSubmit = () => {
    if (!onSubmitForm) {
      console.error('No onSubmitForm handler provided to PatientForm');
      return;
    }
    if (validateForm()) {
      // Process data for submission
      const processedData = {
        ...formData,
        medicalConditions: formData.medicalConditions ? formData.medicalConditions.split(',').map(item => item.trim()) : [],
        allergies: formData.allergies ? formData.allergies.split(',').map(item => item.trim()) : []
      };
      
      if (isEdit) {
        // If editing, preserve the ID
        processedData.id = patient.id;
      } else {
        // If adding new, generate a temporary ID (this would be handled by the backend in real app)
        processedData.id = Date.now();
        processedData.lastVisit = new Date().toISOString().split('T')[0];
      }
      
      onSubmitForm(processedData);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="form-label">First Name <span className="text-red-500">*</span></label>
          <input 
            type="text" 
            id="firstName" 
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`form-input ${errors.firstName ? 'border-red-500' : ''}`}
          />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
        </div>
        
        <div>
          <label htmlFor="lastName" className="form-label">Last Name <span className="text-red-500">*</span></label>
          <input 
            type="text" 
            id="lastName" 
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`form-input ${errors.lastName ? 'border-red-500' : ''}`}
          />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
        </div>
        
        <div>
          <label htmlFor="dob" className="form-label">Date of Birth <span className="text-red-500">*</span></label>
          <input 
            type="date" 
            id="dob" 
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className={`form-input ${errors.dob ? 'border-red-500' : ''}`}
          />
          {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
        </div>
        
        <div>
          <label htmlFor="gender" className="form-label">Gender <span className="text-red-500">*</span></label>
          <select 
            id="gender" 
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`form-input ${errors.gender ? 'border-red-500' : ''}`}
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
          {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 mt-6">
        <button type="button" onClick={onCancel} className="btn btn-outline">Cancel</button>
        <button type="button" onClick={handleSubmit} className="btn btn-primary">{isEdit ? 'Update Patient' : 'Add Patient'}</button>
      </div>
    </div>
  );
});

export default PatientForm;