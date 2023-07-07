import React from 'react';
import { Pie } from 'react-chartjs-2';

const StatusChart = () => {
  // Mock data
  const mockData = [
    {
      projectName: 'Project 1',
      status: {
        completed: 10,
        inProgress: 5,
        pending: 3,
      },
    },
    {
      projectName: 'Project 2',
      status: {
        completed: 8,
        inProgress: 4,
        pending: 2,
      },
    },
    {
      projectName: 'Project 3',
      status: {
        completed: 6,
        inProgress: 2,
        pending: 1,
      },
    },
  ];

  const labels = mockData.map((data) => data.projectName);
  const statusData = mockData.map((data) => ({
    data: Object.values(data.status),
    backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
  }));

  const chartData = {
    labels: ['Completed', 'In Progress', 'Pending'],
    datasets: statusData,
  };

  return (
    <div>
      <Pie
        data={chartData}
        options={{
          responsive: true,
        }}
      />
    </div>
  );
};

export default StatusChart;
