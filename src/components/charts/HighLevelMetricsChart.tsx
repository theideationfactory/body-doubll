import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import type { DailyRecord } from '../../types/records';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface HighLevelMetricsChartProps {
  records: DailyRecord[];
}

export function HighLevelMetricsChart({ records }: HighLevelMetricsChartProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'High-Level Performance Metrics',
        color: 'rgba(255, 255, 255, 0.8)',
        font: {
          size: 16,
          weight: 'bold'
        }
      }
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)'
        }
      },
      y: {
        stacked: false, // Changed to false for better visibility
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          callback: (value: number) => value.toString(),
          stepSize: 5,
          min: 0,
          max: 20,
          precision: 0
        },
        beginAtZero: true
      }
    }
  };

  const data = {
    labels: records.map(record => record.date),
    datasets: [
      {
        label: 'Session Score',
        data: records.map(record => record.sessionScore),
        backgroundColor: 'rgba(234, 179, 8, 0.7)',
        borderColor: 'rgb(234, 179, 8)',
        borderWidth: 1
      },
      {
        label: 'Shadow Score',
        data: records.map(record => record.shadowScore),
        backgroundColor: 'rgba(107, 114, 128, 0.7)',
        borderColor: 'rgb(107, 114, 128)',
        borderWidth: 1
      },
      {
        label: 'Competition Score',
        data: records.map(record => 
          Math.max(record.competitiveScores.amarie, record.competitiveScores.adam)
        ),
        backgroundColor: 'rgba(139, 92, 246, 0.7)',
        borderColor: 'rgb(139, 92, 246)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="w-full h-[400px] p-4">
      <Bar options={options} data={data} />
    </div>
  );
}