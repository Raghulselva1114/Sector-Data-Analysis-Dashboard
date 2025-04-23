import React, { useRef } from 'react';
import { ChartType } from '../types';
import BarChart from './BarChart';
import LineChart from './LineChart';
import ScatterChart from './ScatterChart';
import BoxPlotChart from './BoxPlotChart';
import ExportButton from './ExportButton';

interface ChartContainerProps {
  data: number[];
  title: string;
  chartType: ChartType;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ 
  data, 
  title, 
  chartType 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const exportChart = () => {
    if (!containerRef.current) return;
    
    // Find canvas element
    const canvas = containerRef.current.querySelector('canvas');
    if (!canvas) return;
    
    // Create image and trigger download
    const image = canvas.toDataURL('image/png', 1.0);
    const link = document.createElement('a');
    link.download = `${title.replace(/\s+/g, '-').toLowerCase()}_${chartType}_chart.png`;
    link.href = image;
    link.click();
  };

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return <BarChart data={data} title={title} />;
      case 'line':
        return <LineChart data={data} title={title} />;
      case 'scatter':
        return <ScatterChart data={data} title={title} />;
      case 'boxplot':
        return <BoxPlotChart data={data} title={title} />;
      default:
        return <div>Please select a chart type</div>;
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-800">{title}</h3>
        <ExportButton onExport={exportChart} />
      </div>
      
      <div 
        ref={containerRef} 
        className="w-full h-80"
      >
        {renderChart()}
      </div>
    </div>
  );
};

export default ChartContainer;