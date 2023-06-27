import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
const TaskChart = () => {

    //fetch data here
    const completedTasks = 10; // Số lượng task đã hoàn thành
    const uncompletedTasks = 5; // Số lượng task chưa hoàn thành

  // Dữ liệu biểu đồ
  const data = {
    labels: ['Hoàn thành', 'Chưa hoàn thành'],
    datasets: [
      {
        label: 'Số lượng task',
        data: [completedTasks, uncompletedTasks],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  // Cấu hình biểu đồ
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default TaskChart;
