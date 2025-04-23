import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { getChartColors } from '../utils/colors';
import { formatSectorName } from '../utils/dataUtils';

interface ComparisonChartProps {
  primaryData: number[];
  primaryTitle: string;
  comparisonData: number[] | null;
  comparisonTitle: string | null;
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({ 
  primaryData, 
  primaryTitle, 
  comparisonData, 
  comparisonTitle 
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  
  useEffect(() => {
    if (!chartRef.current || !comparisonData || !comparisonTitle) return;
    
    // Clean up previous chart instance
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;
    
    // Create labels for comparison
    const primaryLabels = Array.from({ length: primaryData.length }, (_, i) => `P${i + 1}`);
    const comparisonLabels = Array.from({ length: comparisonData.length }, (_, i) => `C${i + 1}`);
    
    // Choose primary and comparison colors
    const primaryColors = getChartColors(0);
    const comparisonColors = getChartColors(1);
    
    // Normalize data to similar scale for better visualization
    const primaryMax = Math.max(...primaryData);
    const comparisonMax = Math.max(...comparisonData);
    const normalizationFactor = primaryMax / comparisonMax;
    
    const formattedPrimaryTitle = formatSectorName(primaryTitle);
    const formattedComparisonTitle = formatSectorName(comparisonTitle);
    
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Mean', 'Median', 'Min', 'Max', 'Standard Deviation'],
        datasets: [
          {
            label: formattedPrimaryTitle,
            data: [
              calculateMean(primaryData),
              calculateMedian(primaryData),
              Math.min(...primaryData),
              Math.max(...primaryData),
              calculateStandardDeviation(primaryData)
            ],
            backgroundColor: primaryColors.bg,
            borderColor: primaryColors.border,
            borderWidth: 1,
          },
          {
            label: formattedComparisonTitle,
            data: [
              calculateMean(comparisonData),
              calculateMedian(comparisonData),
              Math.min(...comparisonData),
              Math.max(...comparisonData),
              calculateStandardDeviation(comparisonData)
            ],
            backgroundColor: comparisonColors.bg,
            borderColor: comparisonColors.border,
            borderWidth: 1,
          }
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += context.parsed.y.toFixed(4);
                }
                return label;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [primaryData, primaryTitle, comparisonData, comparisonTitle]);
  
  // Calculate statistics
  const calculateMean = (data: number[]): number => {
    return data.reduce((acc, val) => acc + val, 0) / data.length;
  };
  
  const calculateMedian = (data: number[]): number => {
    const sorted = [...data].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid];
  };
  
  const calculateStandardDeviation = (data: number[]): number => {
    const mean = calculateMean(data);
    const squareDiffs = data.map(value => Math.pow(value - mean, 2));
    const variance = calculateMean(squareDiffs);
    return Math.sqrt(variance);
  };
  
  if (!comparisonData || !comparisonTitle) {
    return (
      <div className="w-full h-full min-h-[300px] flex items-center justify-center">
        <div className="text-gray-500">
          Select a sector to compare with
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full h-full min-h-[300px]">
      <canvas ref={chartRef} />
    </div>
  );
};

export default ComparisonChart;