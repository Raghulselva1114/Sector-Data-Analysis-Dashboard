import React from 'react';
import { ChevronDown } from 'lucide-react';
import { formatSectorName } from '../utils/dataUtils';
import sectorData from '../data/sectorData';

interface SectorSelectorProps {
  selectedSector: string;
  onSelectSector: (sector: string) => void;
}

const SectorSelector: React.FC<SectorSelectorProps> = ({ 
  selectedSector, 
  onSelectSector 
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const sectorKeys = Object.keys(sectorData);
  
  const handleSelect = (sector: string) => {
    onSelectSector(sector);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center justify-between w-full px-4 py-2 bg-white rounded-md shadow text-left border border-gray-200 hover:border-primary-400 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="block truncate text-gray-700">
          {formatSectorName(selectedSector)}
        </span>
        <ChevronDown 
          className={`ml-2 h-5 w-5 text-gray-500 transition-transform duration-150 ${isOpen ? 'transform rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div 
          className="absolute z-10 w-full mt-1 bg-white shadow-lg max-h-60 rounded-md overflow-auto border border-gray-200"
          role="listbox"
        >
          <ul className="py-1">
            {sectorKeys.map((sector) => (
              <li
                key={sector}
                className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-primary-50 ${
                  selectedSector === sector ? 'bg-primary-100 text-primary-700' : 'text-gray-700'
                }`}
                role="option"
                aria-selected={selectedSector === sector}
                onClick={() => handleSelect(sector)}
              >
                <span className="block truncate">
                  {formatSectorName(sector)}
                </span>
                {selectedSector === sector && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary-600">
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SectorSelector;