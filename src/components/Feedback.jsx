import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';  

const Feedback = ({ feedbackIdMap, feedbackFrequency, title }) => {
  // Prepare chart data using props
  const data = {
    labels: Object.keys(feedbackIdMap).map(key => feedbackIdMap[key].text),
    datasets: [
      {
        label: 'Frequency',
        data: Object.values(feedbackFrequency),
        backgroundColor: 'rgba(33, 37, 41, 0.8)', // A dark shade for bars
        borderColor: '#F95501', // Border color
        borderWidth: 1,
      },
    ],
  };

  // Chart options for a darker theme without grid lines
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false, // Disable Y-axis grid lines
        },
        ticks: {
          color: '#ffffff', // White color for y-axis labels
        },
      },
      x: {
        grid: {
          display: false, // Disable X-axis grid lines
        },
        ticks: {
          color: '#ffffff', // White color for x-axis labels
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#ffffff', // Legend text color
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-[#212529] p-4 rounded-lg">
      <h2 className="text-white text-2xl mb-4">{title}</h2>
      <div style={{ height: '400px' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default Feedback;
