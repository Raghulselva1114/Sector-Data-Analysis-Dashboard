import React from 'react';
import { formatSectorName } from '../utils/dataUtils';
import sectorData from '../data/sectorData';

interface ComparisonSelectorProps {
  selectedSector: string;
  comparisonSector: string | null;
  onSelectComparison: (sector: string | null) => void;
}

const ComparisonSelector: React.FC<ComparisonSelectorProps> = ({ 
  selectedSector, 
  comparisonSector, 
  onSelectComparison 
}) => {
  const sectorKeys = Object.keys(sectorData).filter(key => key !== selectedSector);
  
  return (
    <div className="flex flex-col">
      <label htmlFor="comparison-select" className="block text-sm font-medium text-gray-700 mb-1">
        Compare with:
      </label>
      <select
        id="comparison-select"
        value={comparisonSector || ''}
        onChange={(e) => onSelectComparison(e.target.value || null)}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white px-3 py-2 border"
      >
        <option value="">No comparison</option>
        {sectorKeys.map((sector) => (
          <option key={sector} value={sector}>
            {formatSectorName(sector)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ComparisonSelector;