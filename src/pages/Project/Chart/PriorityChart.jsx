import React from 'react';
import { Bar } from 'react-chartjs-2';

const PriorityChart = () => {
  // Mock data
  const mockData = [
    {
      projectName: 'Project 1',
      highPriority: 5,
      mediumPriority: 3,
      lowPriority: 2,
    },
    {
      projectName: 'Project 2',
      highPriority: 8,
      mediumPriority: 6,
      lowPriority: 4,
    },
    {
      projectName: 'Project 3',
      highPriority: 3,
      mediumPriority: 2,
      lowPriority: 1,
    },
    {
        projectName: 'Project 4',
        highPriority: 1,
        mediumPriority: 4,
        lowPriority: 5,
    },
    {
        projectName: 'Project 5',
        highPriority: 7,
        mediumPriority: 1,
        lowPriority: 12,
    },
  ];

  const labels = mockData.map((data) => data.projectName);
  const highPriorityData = mockData.map((data) => data.highPriority);
  const mediumPriorityData = mockData.map((data) => data.mediumPriority);
  const lowPriorityData = mockData.map((data) => data.lowPriority);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'High Priority',
        data: highPriorityData,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'Medium Priority',
        data: mediumPriorityData,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Low Priority',
        data: lowPriorityData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          scales: {
            x: { stacked: true },
            y: { stacked: true },
          },
        }}
      />
    </div>
  );
};

export default PriorityChart;
