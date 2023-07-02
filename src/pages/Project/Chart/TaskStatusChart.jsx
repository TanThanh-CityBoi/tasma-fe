import React from 'react';
import { Bar } from 'react-chartjs-2';

const TaskStatusChart = () => {
  // Mock data
  const mockData = [
    { project: 'Project A', completedTaskCount: 8, incompletedTaskCount: 2 },
    { project: 'Project B', completedTaskCount: 5, incompletedTaskCount: 3 },
    { project: 'Project C', completedTaskCount: 10, incompletedTaskCount: 1 },
    { project: 'Project D', completedTaskCount: 12, incompletedTaskCount: 4 },
    { project: 'Project E', completedTaskCount: 6, incompletedTaskCount: 2 },
  ];

  const projectNames = mockData.map((data) => data.project);
  const completedTaskCounts = mockData.map((data) => data.completedTaskCount);
  const incompletedTaskCounts = mockData.map((data) => data.incompletedTaskCount);

  const chartData = {
    labels: projectNames,
    datasets: [
      {
        label: 'Completed Tasks',
        data: completedTaskCounts,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Incompleted Tasks',
        data: incompletedTaskCounts,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
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

export default TaskStatusChart;
