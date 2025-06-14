import React from 'react';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const FormSection: React.FC<FormSectionProps> = ({ title, children, icon }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
      <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
        {icon && <div className="text-blue-600">{icon}</div>}
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
};