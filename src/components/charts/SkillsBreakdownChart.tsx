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

interface SkillsBreakdownChartProps {
  records: DailyRecord[];
}

export function SkillsBreakdownChart({ records }: SkillsBreakdownChartProps) {
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
        text: 'Skills Breakdown',
        color: 'rgba(255, 255, 255, 0.8)',
        font: {
          size: 16,
          weight: 'bold'
        }
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
      // Core Skills
      {
        label: 'Fluidity',
        data: records.map(record => record.skills?.fluidity || 0),
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1
      },
      {
        label: 'Imagination',
        data: records.map(record => record.skills?.imagination || 0),
        backgroundColor: 'rgba(168, 85, 247, 0.7)',
        borderColor: 'rgb(168, 85, 247)',
        borderWidth: 1
      },
      {
        label: 'Fun',
        data: records.map(record => record.skills?.fun || 0),
        backgroundColor: 'rgba(236, 72, 153, 0.7)',
        borderColor: 'rgb(236, 72, 153)',
        borderWidth: 1
      },
      // Management Skills
      {
        label: 'Time Management',
        data: records.map(record => record.skills?.timeManagement || 0),
        backgroundColor: 'rgba(6, 182, 212, 0.7)',
        borderColor: 'rgb(6, 182, 212)',
        borderWidth: 1
      },
      {
        label: 'Priority Management',
        data: records.map(record => record.skills?.priorityManagement || 0),
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 1
      },
      {
        label: 'Calendaring',
        data: records.map(record => record.skills?.calendaring || 0),
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
        borderColor: 'rgb(99, 102, 241)',
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