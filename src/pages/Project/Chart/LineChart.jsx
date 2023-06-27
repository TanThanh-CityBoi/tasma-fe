import React from 'react'
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { enUS } from 'date-fns/locale';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default function LineChart() {
    const taskData = [
        {
          completedTasks: 10,
          taskMembers: 4,
          deadlines: '1/5/2023',
        },
        {
          completedTasks: 15,
          taskMembers: 5,
          deadlines: '2023-02-01',
        },
        {
          completedTasks: 20,
          taskMembers: 6,
          deadlines: '2023-03-01',
        },
        {
          completedTasks: 8,
          taskMembers: 3,
          deadlines: '2023-04-01',
        },
        {
          completedTasks: 12,
          taskMembers: 5,
          deadlines: '2023-05-01',
        },
      ];
  // Dữ liệu biểu đồ
  const datasets = taskData.map((data, index) => ({
    label: `Số lượng task đã hoàn thành (${index + 1})`,
    data: [data.completedTasks],
    borderColor: '#36A2EB',
    fill: false,
  }));

  // Tạo mảng chứa tất cả các deadlines từ các đối tượng taskData
  const deadlines = taskData.map(data => data.deadlines);

  const data = {
    labels: deadlines,
    datasets: datasets,
  };

  // Cấu hình biểu đồ
  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
        // add this:
        adapters: {
            date: {
            locale: enUS,
            },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}
