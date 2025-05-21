import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils.js';

// Mock data for patient types
const patientTypes = ["Emergency", "Outpatient", "Inpatient", "Specialist Referral"];

// Mock data for medical providers
const medicalProviders = [
  { id: 1, name: "Dr. Sarah Johnson", specialty: "General Medicine", available: true },
  { id: 2, name: "Dr. Michael Chen", specialty: "Cardiology", available: true },
  { id: 3, name: "Dr. Emily Williams", specialty: "Pediatrics", available: false },
  { id: 4, name: "Dr. Robert Garcia", specialty: "Neurology", available: true },
  { id: 5, name: "Dr. Lisa Thompson", specialty: "Dermatology", available: true },
  { id: 6, name: "Dr. James Wilson", specialty: "Orthopedics", available: false }
];

const MainFeature = () => {
  // Form state
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    patientName: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    email: "",
    patientType: "",
    appointmentDate: "",
    appointmentTime: "",
    provider: "",
    reason: "",
    notes: ""
  });
  const [errors, setErrors] = useState({});
  const [providers, setProviders] = useState([]);
  
  // Get available time slots based on date and provider
  const getAvailableTimeSlots = () => {
    // In a real app, this would be an API call
    return [
      "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", 
      "11:00 AM", "11:30 AM", "1:00 PM", "1:30 PM", 
      "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM"
    ];
  };
  
  // Get icons
  const CalendarIcon = getIcon('calendar-days');
  const ClockIcon = getIcon('clock');
  const UserIcon = getIcon('user');
  const PhoneIcon = getIcon('phone');
  const MailIcon = getIcon('mail');
  const ClipboardIcon = getIcon('clipboard-list');
  const ArrowRightIcon = getIcon('arrow-right');
  const ArrowLeftIcon = getIcon('arrow-left');
  const CheckIcon = getIcon('check-circle');
  const PlusIcon = getIcon('plus-circle');
  
  // Update available providers when patientType changes
  useEffect(() => {
    if (formData.patientType) {
      // In a real app, this would filter providers based on specialty needed for the patient type
      setProviders(medicalProviders.filter(provider => provider.available));
    } else {
      setProviders([]);
    }
  }, [formData.patientType]);
  
  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };
  
  // Validate form for each step
  const validateStep = () => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.patientName.trim()) newErrors.patientName = "Patient name is required";
      if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
      if (!formData.gender) newErrors.gender = "Gender is required";
      if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
      if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid";
      }
    } else if (step === 2) {
      if (!formData.patientType) newErrors.patientType = "Patient type is required";
      if (!formData.appointmentDate) newErrors.appointmentDate = "Appointment date is required";
      if (!formData.appointmentTime) newErrors.appointmentTime = "Appointment time is required";
      if (!formData.provider) newErrors.provider = "Provider is required";
      if (!formData.reason.trim()) newErrors.reason = "Reason for visit is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle next step
  const handleNext = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
    }
  };
  
  // Handle previous step
  const handlePrevious = () => {
    setStep(prev => prev - 1);
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      // In a real app, this would be an API call
      console.log("Form submitted:", formData);
      toast.success("Appointment scheduled successfully!");
      
      // Reset form after successful submission
      setFormData({
        patientName: "",
        dateOfBirth: "",
        gender: "",
        phoneNumber: "",
        email: "",
        patientType: "",
        appointmentDate: "",
        appointmentTime: "",
        provider: "",
        reason: "",
        notes: ""
      });
      setStep(1);
    }
  };
  
  // Calculate today's date for the date input min attribute
  const today = new Date().toISOString().split('T')[0];
  
  // Prepare available time slots
  const timeSlots = getAvailableTimeSlots();
  
  return (
    <div className="card relative overflow-hidden">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <PlusIcon className="h-6 w-6 text-primary mr-2" />
        Schedule New Appointment
      </h2>
      
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className={`flex items-center ${step >= 1 ? 'text-primary' : 'text-surface-400'}`}>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-white' : 'bg-surface-200 dark:bg-surface-700'}`}>
              <UserIcon className="h-4 w-4" />
            </div>
            <span className="ml-2 text-sm font-medium">Patient Info</span>
          </div>
          
          <div className={`w-16 h-1 ${step >= 2 ? 'bg-primary' : 'bg-surface-200 dark:bg-surface-700'}`}></div>
          
          <div className={`flex items-center ${step >= 2 ? 'text-primary' : 'text-surface-400'}`}>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-white' : 'bg-surface-200 dark:bg-surface-700'}`}>
              <CalendarIcon className="h-4 w-4" />
            </div>
            <span className="ml-2 text-sm font-medium">Appointment Details</span>
          </div>
          
          <div className={`w-16 h-1 ${step >= 3 ? 'bg-primary' : 'bg-surface-200 dark:bg-surface-700'}`}></div>
          
          <div className={`flex items-center ${step >= 3 ? 'text-primary' : 'text-surface-400'}`}>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary text-white' : 'bg-surface-200 dark:bg-surface-700'}`}>
              <CheckIcon className="h-4 w-4" />
            </div>
            <span className="ml-2 text-sm font-medium">Confirmation</span>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="patientName" className="form-label">
                    Patient Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <UserIcon className="h-5 w-5 text-surface-400" />
                    </div>
                    <input
                      type="text"
                      id="patientName"
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleChange}
                      className={`form-input pl-10 ${errors.patientName ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="Full name"
                    />
                  </div>
                  {errors.patientName && <p className="mt-1 text-sm text-red-500">{errors.patientName}</p>}
                </div>
                
                <div>
                  <label htmlFor="dateOfBirth" className="form-label">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <CalendarIcon className="h-5 w-5 text-surface-400" />
                    </div>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      max={today}
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className={`form-input pl-10 ${errors.dateOfBirth ? 'border-red-500 focus:ring-red-500' : ''}`}
                    />
                  </div>
                  {errors.dateOfBirth && <p className="mt-1 text-sm text-red-500">{errors.dateOfBirth}</p>}
                </div>
                
                <div>
                  <label htmlFor="gender" className="form-label">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`form-input ${errors.gender ? 'border-red-500 focus:ring-red-500' : ''}`}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                  {errors.gender && <p className="mt-1 text-sm text-red-500">{errors.gender}</p>}
                </div>
                
                <div>
                  <label htmlFor="phoneNumber" className="form-label">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <PhoneIcon className="h-5 w-5 text-surface-400" />
                    </div>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className={`form-input pl-10 ${errors.phoneNumber ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="(123) 456-7890"
                    />
                  </div>
                  {errors.phoneNumber && <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="form-label">
                    Email (Optional)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <MailIcon className="h-5 w-5 text-surface-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-input pl-10 ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="email@example.com"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn btn-primary flex items-center"
                >
                  <span>Next Step</span>
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </button>
              </div>
            </motion.div>
          )}
          
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="patientType" className="form-label">
                    Patient Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="patientType"
                    name="patientType"
                    value={formData.patientType}
                    onChange={handleChange}
                    className={`form-input ${errors.patientType ? 'border-red-500 focus:ring-red-500' : ''}`}
                  >
                    <option value="">Select patient type</option>
                    {patientTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.patientType && <p className="mt-1 text-sm text-red-500">{errors.patientType}</p>}
                </div>
                
                <div>
                  <label htmlFor="appointmentDate" className="form-label">
                    Appointment Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <CalendarIcon className="h-5 w-5 text-surface-400" />
                    </div>
                    <input
                      type="date"
                      id="appointmentDate"
                      name="appointmentDate"
                      min={today}
                      value={formData.appointmentDate}
                      onChange={handleChange}
                      className={`form-input pl-10 ${errors.appointmentDate ? 'border-red-500 focus:ring-red-500' : ''}`}
                    />
                  </div>
                  {errors.appointmentDate && <p className="mt-1 text-sm text-red-500">{errors.appointmentDate}</p>}
                </div>
                
                <div>
                  <label htmlFor="appointmentTime" className="form-label">
                    Appointment Time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <ClockIcon className="h-5 w-5 text-surface-400" />
                    </div>
                    <select
                      id="appointmentTime"
                      name="appointmentTime"
                      value={formData.appointmentTime}
                      onChange={handleChange}
                      className={`form-input pl-10 ${errors.appointmentTime ? 'border-red-500 focus:ring-red-500' : ''}`}
                    >
                      <option value="">Select time</option>
                      {timeSlots.map((time, index) => (
                        <option key={index} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                  {errors.appointmentTime && <p className="mt-1 text-sm text-red-500">{errors.appointmentTime}</p>}
                </div>
                
                <div>
                  <label htmlFor="provider" className="form-label">
                    Provider <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="provider"
                    name="provider"
                    value={formData.provider}
                    onChange={handleChange}
                    disabled={!formData.patientType}
                    className={`form-input ${errors.provider ? 'border-red-500 focus:ring-red-500' : ''}`}
                  >
                    <option value="">Select provider</option>
                    {providers.map((provider) => (
                      <option key={provider.id} value={provider.id}>
                        {provider.name} - {provider.specialty}
                      </option>
                    ))}
                  </select>
                  {!formData.patientType && <p className="mt-1 text-sm text-amber-500">Select patient type first</p>}
                  {errors.provider && <p className="mt-1 text-sm text-red-500">{errors.provider}</p>}
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="reason" className="form-label">
                    Reason for Visit <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <ClipboardIcon className="h-5 w-5 text-surface-400" />
                    </div>
                    <textarea
                      id="reason"
                      name="reason"
                      rows="3"
                      value={formData.reason}
                      onChange={handleChange}
                      className={`form-input pl-10 ${errors.reason ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="Briefly describe the reason for this appointment"
                    ></textarea>
                  </div>
                  {errors.reason && <p className="mt-1 text-sm text-red-500">{errors.reason}</p>}
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="notes" className="form-label">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows="2"
                    value={formData.notes}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Any additional information that might be helpful"
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="btn btn-outline flex items-center"
                >
                  <ArrowLeftIcon className="mr-2 h-5 w-5" />
                  <span>Previous</span>
                </button>
                
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn btn-primary flex items-center"
                >
                  <span>Review</span>
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </button>
              </div>
            </motion.div>
          )}
          
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-surface-50 dark:bg-surface-800 rounded-lg p-6 border border-surface-200 dark:border-surface-700 mb-6">
                <h3 className="text-lg font-medium mb-4">Appointment Summary</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                  <div>
                    <p className="text-sm text-surface-500 dark:text-surface-400">Patient Name</p>
                    <p className="font-medium">{formData.patientName}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-surface-500 dark:text-surface-400">Date of Birth</p>
                    <p className="font-medium">{formData.dateOfBirth}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-surface-500 dark:text-surface-400">Gender</p>
                    <p className="font-medium capitalize">{formData.gender}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-surface-500 dark:text-surface-400">Phone Number</p>
                    <p className="font-medium">{formData.phoneNumber}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-surface-500 dark:text-surface-400">Email</p>
                    <p className="font-medium">{formData.email || "Not provided"}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-surface-500 dark:text-surface-400">Patient Type</p>
                    <p className="font-medium">{formData.patientType}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-surface-500 dark:text-surface-400">Appointment Date & Time</p>
                    <p className="font-medium">{formData.appointmentDate} at {formData.appointmentTime}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-surface-500 dark:text-surface-400">Provider</p>
                    <p className="font-medium">
                      {providers.find(p => p.id.toString() === formData.provider)?.name || ""}
                    </p>
                  </div>
                  
                  <div className="md:col-span-2">
                    <p className="text-sm text-surface-500 dark:text-surface-400">Reason for Visit</p>
                    <p className="font-medium">{formData.reason}</p>
                  </div>
                  
                  {formData.notes && (
                    <div className="md:col-span-2">
                      <p className="text-sm text-surface-500 dark:text-surface-400">Additional Notes</p>
                      <p className="font-medium">{formData.notes}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      By scheduling this appointment, you confirm that all the information provided is accurate and complete.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="btn btn-outline flex items-center"
                >
                  <ArrowLeftIcon className="mr-2 h-5 w-5" />
                  <span>Edit Details</span>
                </button>
                
                <button
                  type="submit"
                  className="btn bg-primary hover:bg-primary-dark text-white flex items-center"
                >
                  <span>Schedule Appointment</span>
                  <CheckIcon className="ml-2 h-5 w-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
};

export default MainFeature;