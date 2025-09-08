import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Bar, Scatter, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Sample datasets
const scatterData = {
  datasets: [{
    label: 'Height vs Weight',
    data: [
      { x: 165, y: 60 },
      { x: 170, y: 65 },
      { x: 175, y: 70 },
      { x: 160, y: 55 },
      { x: 180, y: 75 },
      { x: 167, y: 62 },
      { x: 172, y: 68 },
      { x: 168, y: 63 },
      { x: 178, y: 72 },
      { x: 182, y: 78 },
    ],
    backgroundColor: '#ff8200',
  }],
};

const histogramData = {
  labels: ['0-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61-70', '71-80', '81-90', '91-100'],
  datasets: [{
    label: 'Exam Scores',
    data: [2, 5, 8, 12, 15, 20, 15, 10, 8, 5],
    backgroundColor: '#ff8200',
    borderColor: '#58595b',
    borderWidth: 1,
  }],
};

const barChartData = {
  labels: ['A', 'B', 'C', 'D', 'F'],
  datasets: [{
    label: 'Grade Distribution',
    data: [25, 35, 20, 15, 5],
    backgroundColor: '#ff8200',
    borderColor: '#58595b',
    borderWidth: 1,
  }],
};

const lineChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Monthly Sales',
    data: [65, 72, 68, 85, 80, 95],
    borderColor: '#ff8200',
    backgroundColor: 'rgba(255, 130, 0, 0.1)',
    tension: 0.4,
  }],
};

const commonOptions: ChartOptions<any> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
  scales: {
    x: {
      grid: {
        color: '#e5e7eb',
      },
    },
    y: {
      grid: {
        color: '#e5e7eb',
      },
    },
  },
};

export type VisualizationType = 'scatter' | 'histogram' | 'bar' | 'boxplot' | 'line';

interface DataPoint {
  x: number;
  y: number;
  label?: string;
}

interface VisualizationProps {
  data: DataPoint[];
  title: string;
  xLabel: string;
  yLabel: string;
  type: 'scatter' | 'bar' | 'line' | 'boxplot' | 'histogram';
}

export default function GameVisualizations() {
  const containerStyle = {
    height: '300px',
    width: '100%',
  };

  return (
    <div style={containerStyle}>
      <Scatter data={scatterData} options={commonOptions} />
    </div>
  );
} 