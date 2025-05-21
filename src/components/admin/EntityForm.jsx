import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getIcon } from '../../utils/iconUtils.js';

const EntityForm = ({ 
  title, 
  fields, 
  initialData = {}, 
  onSubmit, 
  onCancel, 
  isLoading = false, 
  error = null 
}) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  
  // Icons
  const SaveIcon = getIcon('save');
  const XIcon = getIcon('x');
  
  // Initialize form with initial data
  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let inputValue = value;
    
    // Handle special input types
    if (type === 'checkbox') {
      inputValue = checked;
    } else if (type === 'number') {
      inputValue = value === '' ? '' : Number(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: inputValue
    }));
    
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  // Field validation
  const validateField = (field, value) => {
    if (field.required && (value === undefined || value === null || value === '')) {
      return `${field.label} is required`;
    }
    
    if (field.type === 'Email' && value && !/^\S+@\S+\.\S+$/.test(value)) {
      return 'Please enter a valid email address';
    }
    
    if (field.type === 'Date' && value && isNaN(new Date(value).getTime())) {
      return 'Please enter a valid date';
    }
    
    if (field.type === 'Number' && value && isNaN(Number(value))) {
      return 'Please enter a valid number';
    }
    
    return null;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    let hasErrors = false;
    
    fields.forEach(field => {
      const error = validateField(field, formData[field.name]);
      if (error) {
        newErrors[field.name] = error;
        hasErrors = true;
      }
    });
    
    if (hasErrors) {
      setErrors(newErrors);
      return;
    }
    
    // Submit form data
    onSubmit(formData);
  };

  // Render form field based on field type
  const renderField = (field) => {
    const { name, label, type, options, disabled, placeholder } = field;
    const value = formData[name] !== undefined ? formData[name] : '';
    const fieldError = errors[name];
    
    switch (type) {
      case 'Text':
      case 'Email':
      case 'Phone':
      case 'Website':
        return (
          <input
            type={type === 'Email' ? 'email' : type === 'Phone' ? 'tel' : 'text'}
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            placeholder={placeholder || `Enter ${label}`}
            className={`form-input ${fieldError ? 'border-red-500 dark:border-red-500' : ''}`}
          />
        );
      case 'MultilineText':
        return (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            placeholder={placeholder || `Enter ${label}`}
            rows={4}
            className={`form-input ${fieldError ? 'border-red-500 dark:border-red-500' : ''}`}
          />
        );
      case 'Number':
        return (
          <input
            type="number"
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            placeholder={placeholder || `Enter ${label}`}
            className={`form-input ${fieldError ? 'border-red-500 dark:border-red-500' : ''}`}
          />
        );
      case 'Date':
        return (
          <input
            type="date"
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            className={`form-input ${fieldError ? 'border-red-500 dark:border-red-500' : ''}`}
          />
        );
      case 'Picklist':
        return (
          <select
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            className={`form-input ${fieldError ? 'border-red-500 dark:border-red-500' : ''}`}
          >
            <option value="">Select {label}</option>
            {(field.picklistValues || '').split(',').map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'Boolean':
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              id={name}
              name={name}
              checked={value === true}
              onChange={handleChange}
              disabled={disabled}
              className="h-4 w-4 rounded border-surface-300 dark:border-surface-700 text-primary focus:ring-primary"
            />
            <label htmlFor={name} className="ml-2 block text-sm text-surface-700 dark:text-surface-300">
              {label}
            </label>
          </div>
        );
      case 'Tag':
        // Simple text input for tags (comma-separated)
        return (
          <input
            type="text"
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            placeholder={placeholder || `Enter ${label} (comma-separated)`}
            className={`form-input ${fieldError ? 'border-red-500 dark:border-red-500' : ''}`}
          />
        );
      default:
        return (
          <input
            type="text"
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            placeholder={placeholder || `Enter ${label}`}
            className={`form-input ${fieldError ? 'border-red-500 dark:border-red-500' : ''}`}
          />
        );
    }
  };

  return (
    <motion.div 
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-semibold mb-6">{title}</h2>
      
      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((field) => (
            <div key={field.name} className={field.type === 'MultilineText' ? 'md:col-span-2' : ''}>
              <label htmlFor={field.name} className="form-label">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              {renderField(field)}
              {errors[field.name] && (
                <p className="mt-1 text-sm text-red-500">{errors[field.name]}</p>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-end space-x-3 pt-4 border-t border-surface-200 dark:border-surface-700">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-outline flex items-center"
            disabled={isLoading}
          >
            <XIcon className="h-5 w-5 mr-1" />
            <span>Cancel</span>
          </button>
          <button
            type="submit"
            className="btn btn-primary flex items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <SaveIcon className="h-5 w-5 mr-1" />
                <span>Save</span>
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default EntityForm;