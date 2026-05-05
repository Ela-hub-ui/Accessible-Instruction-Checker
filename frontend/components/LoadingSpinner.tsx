import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = "Analyzing text..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-4" role="status" aria-live="polite">
      <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" aria-hidden="true" />
      <p className="text-lg font-medium text-gray-700">{message}</p>
      <span className="sr-only">Loading</span>
    </div>
  );
};

export default LoadingSpinner;
