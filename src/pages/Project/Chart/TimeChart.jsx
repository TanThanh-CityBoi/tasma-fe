import React from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

const TimeChart = () => {
  // Mock data
  const mockData = [
    {
      projectName: 'Project 1',
      completionTime: [
        '2023-06-15', // Ngày hoàn thành Task 1
        '2023-06-18', // Ngày hoàn thành Task 2
        '2023-06-21', // Ngày hoàn thành Task 3
        '2023-06-25', // Ngày hoàn thành Task 4
        '2023-06-30', // Ngày hoàn thành Task 5
      ],
    },
    {
      projectName: 'Project 2',
      completionTime: [
        '2023-06-16',
        '2023-06-19',
        '2023-06-22',
        '2023-06-26',
        '2023-07-01',
      ],
    },
    {
      projectName: 'Project 3',
      completionTime: [
        '2023-06-17',
        '2023-06-20',
        '2023-06-23',
        '2023-06-27',
        '2023-07-02',
      ],
    },
  ];

  const labels = ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'];

  const datasets = mockData.map((data) => {
    const formattedCompletionTime = data.completionTime.map((date) =>
      moment(date).format('YYYY-MM-DD')
    );

    return {
      label: data.projectName,
      data: formattedCompletionTime,
      borderColor: getRandomColor(),
      fill: false,
    };
  });

  const chartData = {
    labels: labels,
    datasets: datasets,
  };

  function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  return (
    <div>
      <p>Completion Time by Task</p>
      <Line
        data={chartData}
        options={{
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default TimeChart;
