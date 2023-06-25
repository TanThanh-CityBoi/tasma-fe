import React from 'react'
import { Bar } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { enUS } from 'date-fns/locale';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default function DeadlineChart() {
  const projectData = [
    {
      projectName: 'Project 1',
      deadline: '29/03/2023',
    },
    {
      projectName: 'Project 2',
      deadline: '29/05/2023',
    },
    {
      projectName: 'Project 3',
      deadline: '29/06/2023',
    },
    // Thêm dữ liệu cho các project khác tại đây
  ];
    // Tạo mảng các labels từ tên các project
  const labels = projectData.map(data => data.projectName);

  // Tạo mảng deadlines từ dữ liệu project
  const deadlines = projectData.map(data => data.deadline);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Ngày đến hạn',
        data: deadlines,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: {
            day: 'DD/MM/YYYY',
          },
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
}
