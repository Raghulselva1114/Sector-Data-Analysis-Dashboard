import { SectorStats } from '../types';

// Calculate basic statistics for an array of numbers
export const calculateStats = (data: number[]): SectorStats => {
  if (!data || data.length === 0) {
    return {
      mean: 0,
      median: 0,
      min: 0,
      max: 0,
      range: 0,
      standardDeviation: 0,
      count: 0,
    };
  }

  const sortedData = [...data].sort((a, b) => a - b);
  const min = sortedData[0];
  const max = sortedData[sortedData.length - 1];
  const sum = sortedData.reduce((acc, val) => acc + val, 0);
  const mean = sum / sortedData.length;
  
  // Calculate median
  let median;
  const midPoint = Math.floor(sortedData.length / 2);
  if (sortedData.length % 2 === 0) {
    median = (sortedData[midPoint - 1] + sortedData[midPoint]) / 2;
  } else {
    median = sortedData[midPoint];
  }

  // Calculate standard deviation
  const squareDiffs = sortedData.map(value => Math.pow(value - mean, 2));
  const variance = squareDiffs.reduce((acc, val) => acc + val, 0) / sortedData.length;
  const standardDeviation = Math.sqrt(variance);

  return {
    mean,
    median,
    min,
    max,
    range: max - min,
    standardDeviation,
    count: sortedData.length,
  };
};

// Format numbers for display
export const formatNumber = (num: number): string => {
  if (num === 0) return '0';
  
  // For very small numbers, use scientific notation
  if (Math.abs(num) < 0.001) {
    return num.toExponential(4);
  }
  
  // For larger numbers, use fixed precision
  if (Math.abs(num) >= 1000) {
    return num.toFixed(0);
  }
  
  // Default formatting for medium sized numbers
  return num.toFixed(Math.abs(num) < 0.1 ? 4 : Math.abs(num) < 1 ? 3 : 2);
};

// Generate labels for charts based on data length
export const generateLabels = (dataLength: number): string[] => {
  return Array.from({ length: dataLength }, (_, i) => `Data Point ${i + 1}`);
};

// Determine a good tick step for axis labels based on data range
export const calculateTickStep = (min: number, max: number): number => {
  const range = max - min;
  const magnitude = Math.floor(Math.log10(range));
  const step = Math.pow(10, magnitude) / 2;
  return step;
};

// Get a nice human-readable name for sector keys
export const formatSectorName = (key: string): string => {
  return key
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
    .replace('Set1', ' (Set 1)')
    .replace('Set2', ' (Set 2)')
    .replace('Set3', ' (Set 3)');
};