import React from 'react';
import { Download } from 'lucide-react';

interface ExportButtonProps {
  onExport: () => void;
  label?: string;
}

const ExportButton: React.FC<ExportButtonProps> = ({ 
  onExport, 
  label = 'Export Chart' 
}) => {
  return (
    <button
      onClick={onExport}
      className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
    >
      <Download size={16} className="mr-2" />
      {label}
    </button>
  );
};

export default ExportButton;