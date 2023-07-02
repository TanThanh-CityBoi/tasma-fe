import React from 'react'
import { Line } from 'react-chartjs-2';

const TaskCountChart = () => {
  // Mock data
  const mockData = [
    { project: 'Project A', taskCount: 10 },
    { project: 'Project B', taskCount: 5 },
    { project: 'Project C', taskCount: 8 },
    { project: 'Project D', taskCount: 12 },
    { project: 'Project E', taskCount: 6 },
    { project: 'Project F', taskCount: 25 },
    { project: 'Project G', taskCount: 18 },
    { project: 'Project H', taskCount: 10 },
  ];

  const projectNames = mockData.map((data) => data.project);
  const taskCounts = mockData.map((data) => data.taskCount);

  const chartData = {
    labels: projectNames,
    datasets: [
      {
        label: 'Number of Tasks',
        data: taskCounts,
        fill: false,
        borderColor: '#007bff',
      },
    ],
  };

  return (
    <div>
      <Line
        data={chartData}
        options={{
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              precision: 0,
            },
          },
        }}
      />
    </div>
  );
};

export default TaskCountChart;
