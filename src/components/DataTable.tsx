import React, { useState } from 'react';
import { ArrowUpDown, Download } from 'lucide-react';
import { formatNumber } from '../utils/dataUtils';

interface DataTableProps {
  data: number[];
  title: string;
}

const DataTable: React.FC<DataTableProps> = ({ data, title }) => {
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const sortedData = [...data].sort((a, b) => 
    sortDirection === 'asc' ? a - b : b - a
  );

  const toggleSort = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const exportCSV = () => {
    // Create CSV content
    const csvContent = [
      'Index,Value',
      ...sortedData.map((value, index) => `${index + 1},${value}`)
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${title.replace(/\s+/g, '-').toLowerCase()}_data.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-800">{title} Data</h3>
        <div className="flex items-center">
          <button 
            onClick={toggleSort}
            className="p-2 rounded-md hover:bg-gray-100 text-gray-600 flex items-center mr-2"
            title={`Sort ${sortDirection === 'asc' ? 'Descending' : 'Ascending'}`}
          >
            <ArrowUpDown size={18} />
            <span className="sr-only">Sort</span>
          </button>
          <button 
            onClick={exportCSV}
            className="p-2 rounded-md hover:bg-gray-100 text-gray-600 flex items-center"
            title="Export as CSV"
          >
            <Download size={18} />
            <span className="sr-only">Export</span>
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto max-h-96">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Index
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Value
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((value, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                  {index + 1}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {formatNumber(value)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;