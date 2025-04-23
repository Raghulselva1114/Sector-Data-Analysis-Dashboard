import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { getChartColors } from '../utils/colors';

interface ScatterChartProps {
  data: number[];
  title: string;
}

const ScatterChart: React.FC<ScatterChartProps> = ({ data, title }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  
  useEffect(() => {
    if (!chartRef.current) return;
    
    // Clean up previous chart instance
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;
    
    const colors = getChartColors();
    
    // Convert array data to scatter format
    const scatterData = data.map((value, index) => ({
      x: index + 1,
      y: value,
    }));
    
    chartInstance.current = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: title,
            data: scatterData,
            backgroundColor: colors.bg,
            borderColor: colors.border,
            borderWidth: 1,
            pointRadius: 6,
            pointHoverRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1000,
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: 10,
            cornerRadius: 6,
            callbacks: {
              label: (context) => {
                const point = context.raw as { x: number; y: number };
                return `Index: ${point.x}, Value: ${point.y.toFixed(4)}`;
              },
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Data Point Index',
            },
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: false,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)',
            },
          },
        },
      },
    });
    
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, title]);
  
  return (
    <div className="w-full h-full min-h-[300px]">
      <canvas ref={chartRef} />
    </div>
  );
};

export default ScatterChart;