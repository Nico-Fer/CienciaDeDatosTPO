import React from 'react';

interface RatingScaleProps {
  label: string;
  name: string;
  value: number;
  onChange: (name: string, value: number) => void;
  min: number;
  max: number;
  required?: boolean;
  description?: string;
}

export const RatingScale: React.FC<RatingScaleProps> = ({
  label,
  name,
  value,
  onChange,
  min,
  max,
  required = false,
  description
}) => {
  const handleChange = (selectedValue: number) => {
    onChange(name, selectedValue);
  };

  const generateOptions = () => {
    const options = [];
    for (let i = min; i <= max; i++) {
      options.push(i);
    }
    return options;
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500">Bajo</span>
          <span className="text-xs text-gray-500">Alto</span>
        </div>
        
        <div className="flex items-center justify-between space-x-2">
          {generateOptions().map((option) => (
            <div key={option} className="flex flex-col items-center space-y-1">
              <input
                type="radio"
                id={`${name}-${option}`}
                name={name}
                value={option}
                checked={value === option}
                onChange={() => handleChange(option)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                required={required}
              />
              <label
                htmlFor={`${name}-${option}`}
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}
    </div>
  );
};