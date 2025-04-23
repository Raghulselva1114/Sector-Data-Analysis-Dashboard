import React from 'react';
import { SectorStats } from '../types';
import { formatNumber } from '../utils/dataUtils';

interface StatsPanelProps {
  stats: SectorStats;
  title: string;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ stats, title }) => {
  const statItems = [
    { label: 'Mean', value: stats.mean, icon: 'M' },
    { label: 'Median', value: stats.median, icon: 'Md' },
    { label: 'Min', value: stats.min, icon: 'Min' },
    { label: 'Max', value: stats.max, icon: 'Max' },
    { label: 'Range', value: stats.range, icon: 'R' },
    { label: 'Std Dev', value: stats.standardDeviation, icon: 'σ' },
    { label: 'Count', value: stats.count, icon: '#' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">{title} Statistics</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {statItems.map((item) => (
          <div key={item.label} className="bg-gray-50 rounded-lg p-3 transition-all hover:shadow-sm">
            <div className="flex items-center mb-1">
              <span className="w-7 h-7 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-medium mr-2">
                {item.icon}
              </span>
              <span className="text-sm text-gray-600">{item.label}</span>
            </div>
            <div className="text-lg font-semibold text-gray-800">
              {formatNumber(item.value)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsPanel;