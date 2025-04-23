import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { getChartColors } from '../utils/colors';
import { calculateStats } from '../utils/dataUtils';

Chart.register(CategoryScale);

interface BoxPlotChartProps {
  data: number[];
  title: string;
}

const BoxPlotChart: React.FC<BoxPlotChartProps> = ({ data, title }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!chartRef.current) return;
    
    // Clean up previous chart instance
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    try {
      const ctx = chartRef.current.getContext('2d');
      if (!ctx) return;
      
      // Since Chart.js doesn't have built-in boxplot, we'll simulate one with a bar chart
      const stats = calculateStats(data);
      const colors = getChartColors();
      
      // Simple boxplot representation using a modified bar chart
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [title],
          datasets: [
            {
              label: 'Min to Max Range',
              data: [stats.max - stats.min],
              backgroundColor: colors.bg + '40', // translucent
              borderColor: colors.border,
              borderWidth: 1,
              barPercentage: 0.5,
            },
            {
              label: 'Median',
              data: [0.05], // Just a marker
              backgroundColor: colors.border,
              borderColor: colors.border,
              borderWidth: 2,
              barPercentage: 0.8,
            }
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y',
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                title: () => title,
                label: () => {
                  return [
                    `Min: ${stats.min.toFixed(4)}`,
                    `Q1: ${(stats.min + (stats.median - stats.min) / 2).toFixed(4)}`,
                    `Median: ${stats.median.toFixed(4)}`,
                    `Q3: ${(stats.median + (stats.max - stats.median) / 2).toFixed(4)}`,
                    `Max: ${stats.max.toFixed(4)}`,
                  ];
                },
              },
            },
          },
          scales: {
            y: {
              stacked: true,
              grid: {
                display: false,
              },
            },
            x: {
              min: stats.min - stats.range * 0.1,
              max: stats.max + stats.range * 0.1,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)',
              },
            },
          },
        },
      });
      
      // Add annotations for quartiles and median
      const ctx2d = ctx as CanvasRenderingContext2D;
      setTimeout(() => {
        if (chartInstance.current) {
          const chartArea = chartInstance.current.chartArea;
          const yAxis = chartInstance.current.scales.y;
          const xAxis = chartInstance.current.scales.x;
          
          const yCenter = yAxis.getPixelForValue(0);
          const xMin = xAxis.getPixelForValue(stats.min);
          const xMax = xAxis.getPixelForValue(stats.max);
          const xMedian = xAxis.getPixelForValue(stats.median);
          
          // Draw median line
          ctx2d.save();
          ctx2d.beginPath();
          ctx2d.moveTo(xMedian, yCenter - 15);
          ctx2d.lineTo(xMedian, yCenter + 15);
          ctx2d.lineWidth = 2;
          ctx2d.strokeStyle = colors.border;
          ctx2d.stroke();
          ctx2d.restore();
          
          chartInstance.current.update();
        }
      }, 500);
      
      setError(null);
    } catch (err) {
      console.error('Error creating boxplot chart', err);
      setError('Failed to create box plot chart');
    }
    
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, title]);
  
  if (error) {
    return (
      <div className="w-full h-full min-h-[300px] flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }
  
  return (
    <div className="w-full h-full min-h-[300px]">
      <canvas ref={chartRef} />
    </div>
  );
};

export default BoxPlotChart;