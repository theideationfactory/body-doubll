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

interface RecordsBarChartProps {
  records: DailyRecord[];
}

export function RecordsBarChart({ records }: RecordsBarChartProps) {
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
        display: false
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)'
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          stepSize: 5,
          max: 20
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
        backgroundColor: 'rgba(234, 179, 8, 0.5)',
        borderColor: 'rgb(234, 179, 8)',
        borderWidth: 1
      },
      {
        label: 'Shadow Score',
        data: records.map(record => record.shadowScore),
        backgroundColor: 'rgba(107, 114, 128, 0.5)',
        borderColor: 'rgb(107, 114, 128)',
        borderWidth: 1
      },
      {
        label: 'Fluidity',
        data: records.map(record => record.skills?.fluidity || 0),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1
      },
      {
        label: 'Imagination',
        data: records.map(record => record.skills?.imagination || 0),
        backgroundColor: 'rgba(168, 85, 247, 0.5)',
        borderColor: 'rgb(168, 85, 247)',
        borderWidth: 1
      },
      {
        label: 'Fun',
        data: records.map(record => record.skills?.fun || 0),
        backgroundColor: 'rgba(236, 72, 153, 0.5)',
        borderColor: 'rgb(236, 72, 153)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="w-full h-[600px] p-4">
      <Bar options={options} data={data} />
    </div>
  );
}