import React from 'react';
import { BarChart3, LineChart, ScatterChart, Bot as BoxPlot } from 'lucide-react';
import { ChartType } from '../types';

interface ChartTypeSelectorProps {
  selectedType: ChartType;
  onSelectType: (type: ChartType) => void;
}

const ChartTypeSelector: React.FC<ChartTypeSelectorProps> = ({ 
  selectedType, 
  onSelectType 
}) => {
  const chartTypes: { type: ChartType; icon: React.ReactNode; label: string }[] = [
    { 
      type: 'bar', 
      icon: <BarChart3 size={20} />, 
      label: 'Bar Chart' 
    },
    { 
      type: 'line', 
      icon: <LineChart size={20} />, 
      label: 'Line Chart' 
    },
    { 
      type: 'scatter', 
      icon: <ScatterChart size={20} />, 
      label: 'Scatter Plot' 
    },
    { 
      type: 'boxplot', 
      icon: <BoxPlot size={20} />, 
      label: 'Box Plot' 
    },
  ];

  return (
    <div className="flex space-x-2 bg-gray-100 p-1 rounded-md">
      {chartTypes.map(({ type, icon, label }) => (
        <button
          key={type}
          className={`flex items-center px-3 py-2 rounded-md transition-colors ${
            selectedType === type
              ? 'bg-white text-primary-700 shadow-sm'
              : 'text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => onSelectType(type)}
          title={label}
        >
          {icon}
          <span className="ml-2 hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default ChartTypeSelector;