import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface PredictionResultProps {
  prediction: 'Yes' | 'No' | null;
  confidence?: number;
}

export const PredictionResult: React.FC<PredictionResultProps> = ({ prediction, confidence }) => {
  if (!prediction) return null;

  const isStaying = prediction === 'No';

  return (
    <div
      className={`rounded-xl p-6 ${
        isStaying ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
      }`}
    >
      <div className='flex items-center space-x-3'>
        {isStaying ? (
          <CheckCircle className='h-8 w-8 text-green-600' />
        ) : (
          <XCircle className='h-8 w-8 text-red-600' />
        )}
        <div>
          <h3 className={`text-lg font-semibold ${isStaying ? 'text-green-900' : 'text-red-900'}`}>
            Predicción: Se va a {isStaying ? 'quedar' : 'ir'}
          </h3>
          {confidence && (
            <p className={`text-sm ${isStaying ? 'text-green-700' : 'text-red-700'}`}>
              Confianza: {(confidence * 100).toFixed(1)}%
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
