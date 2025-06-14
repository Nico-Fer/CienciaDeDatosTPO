import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'number' | 'select';
  value: string | number;
  onChange: (name: string, value: string | number) => void;
  options?: string[];
  placeholder?: string;
  min?: number;
  max?: number;
  required?: boolean;
  description?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  options,
  placeholder,
  min,
  max,
  required = false,
  description
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (type === 'number') {
      // Allow empty string to enable clearing the field
      const newValue = e.target.value === '' ? '' : parseFloat(e.target.value) || '';
      onChange(name, newValue);
    } else {
      onChange(name, e.target.value);
    }
  };

  // Fields that should not have spinner controls
  const noSpinnerFields = [
    'age',
    'distanceFromHome', 
    'totalWorkingYears',
    'numCompaniesWorked',
    'yearsAtCompany',
    'yearsInCurrentRole',
    'yearsSinceLastPromotion',
    'yearsWithCurrManager',
    'monthlyIncome',
    'trainingTimesLastYear'
  ];

  const shouldHideSpinner = type === 'number' && noSpinnerFields.includes(name);

  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          required={required}
        >
          <option value="">Select {label}</option>
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          min={min}
          max={max}
          className={`w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
            shouldHideSpinner ? 'no-spinner' : ''
          }`}
          required={required}
        />
      )}
      
      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}
    </div>
  );
};