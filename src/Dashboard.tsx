import React, { useState, useEffect } from 'react';
import { ArrowDown, BarChart3, ChevronDown, Download, FileText, Info } from 'lucide-react';
import SectorSelector from './components/SectorSelector';
import ChartTypeSelector from './components/ChartTypeSelector';
import StatsPanel from './components/StatsPanel';
import DataTable from './components/DataTable';
import ChartContainer from './components/ChartContainer';
import ComparisonSelector from './components/ComparisonSelector';
import ComparisonChart from './components/ComparisonChart';
import { ChartType, SectorStats } from './types';
import { calculateStats, formatSectorName } from './utils/dataUtils';
import sectorData from './data/sectorData';

// Get the first sector key as default
const defaultSector = Object.keys(sectorData)[0];

const Dashboard: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<string>(defaultSector);
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [stats, setStats] = useState<SectorStats>({
    mean: 0,
    median: 0,
    min: 0,
    max: 0,
    range: 0,
    standardDeviation: 0,
    count: 0,
  });
  const [comparisonSector, setComparisonSector] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  // Update stats when selected sector changes
  useEffect(() => {
    if (selectedSector) {
      const sectorValues = sectorData[selectedSector as keyof typeof sectorData];
      setStats(calculateStats(sectorValues));
    }
  }, [selectedSector]);

  const handleSectorChange = (sector: string) => {
    setSelectedSector(sector);
    
    // Reset comparison if it matches the new selected sector
    if (comparisonSector === sector) {
      setComparisonSector(null);
    }
  };

  const exportFullData = () => {
    // Create CSV content including all sectors
    const csvRows = ['Sector,Value'];
    
    Object.entries(sectorData).forEach(([sector, values]) => {
      values.forEach((value, index) => {
        csvRows.push(`${sector},${value}`);
      });
    });
    
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'sector_data_complete.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-primary-600 mr-3" />
              <h1 className="text-2xl font-semibold text-gray-900">
                Sector Data Analysis Dashboard
              </h1>
            </div>
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title="About this dashboard"
            >
              <Info size={20} className="text-gray-500" />
            </button>
          </div>
        </div>
      </header>

      {/* Info Panel */}
      {showInfo && (
        <div className="bg-blue-50 border-b border-blue-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <Info className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">About This Dashboard</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    This dashboard allows you to analyze and compare industrial sector data. 
                    Select different sectors, visualize using multiple chart types, view statistics, 
                    and export the data for further analysis.
                  </p>
                </div>
                <div className="mt-3">
                  <button
                    type="button"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                    onClick={() => setShowInfo(false)}
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Controls */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Sector
              </label>
              <SectorSelector
                selectedSector={selectedSector}
                onSelectSector={handleSectorChange}
              />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chart Type
              </label>
              <ChartTypeSelector
                selectedType={chartType}
                onSelectType={setChartType}
              />
            </div>
            <div className="md:col-span-1">
              <ComparisonSelector
                selectedSector={selectedSector}
                comparisonSector={comparisonSector}
                onSelectComparison={setComparisonSector}
              />
            </div>
          </div>
          
          <div className="mt-4 border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  {formatSectorName(selectedSector)} Data Analysis
                </h2>
                <p className="text-sm text-gray-500">
                  {stats.count} data points
                </p>
              </div>
              <button
                onClick={exportFullData}
                className="flex items-center px-3 py-2 bg-primary-50 text-primary-600 rounded-md hover:bg-primary-100 transition-colors"
              >
                <Download size={16} className="mr-2" />
                Export All Data
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="lg:col-span-2">
            <ChartContainer
              data={sectorData[selectedSector as keyof typeof sectorData]}
              title={formatSectorName(selectedSector)}
              chartType={chartType}
            />
          </div>

          {/* Stats */}
          <div className="lg:col-span-1">
            <StatsPanel
              stats={stats}
              title={formatSectorName(selectedSector)}
            />
          </div>

          {/* Comparison Section */}
          <div className="lg:col-span-3">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Sector Comparison</h3>
              
              <div className="h-80">
                <ComparisonChart
                  primaryData={sectorData[selectedSector as keyof typeof sectorData]}
                  primaryTitle={selectedSector}
                  comparisonData={
                    comparisonSector
                      ? sectorData[comparisonSector as keyof typeof sectorData]
                      : null
                  }
                  comparisonTitle={comparisonSector}
                />
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="lg:col-span-3">
            <DataTable
              data={sectorData[selectedSector as keyof typeof sectorData]}
              title={formatSectorName(selectedSector)}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Sector Data Analysis Dashboard © 2025
            </p>
            <div className="flex space-x-4">
              <button className="text-sm text-gray-500 hover:text-gray-700">
                Help
              </button>
              <button className="text-sm text-gray-500 hover:text-gray-700">
                Documentation
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;