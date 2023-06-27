import React from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default function MemberChart() {

  const projectData = [
    {
      projectName: 'Project X',
      isCompletedProject: true,
      projectMembers: 5,
    },
    {
      projectName: 'Project Y',
      isCompletedProject: false,
      projectMembers: 8,
    },
    {
      projectName: 'Project Z',
      isCompletedProject: false,
      projectMembers: 10,
    },
    {
      projectName: 'Project custome',
      isCompletedProject: true,
      projectMembers: 3,
    },
    {
      projectName: 'Project KTC',
      isCompletedProject: false,
      projectMembers: 15,
    },
    {
      projectName: 'Project Bandke',
      isCompletedProject: true,
      projectMembers: 6,
    },
    // Thêm dữ liệu cho các project khác tại đây
  ];

  // Tạo mảng các labels từ tên các project
  const labels = projectData.map(data => data.projectName);

  // Tạo mảng số lượng project đã hoàn thành và số lượng thành viên từ dữ liệu project
  const completedProjects = projectData.map(data =>
    data.isCompletedProject ? true : false
  );
  const projectMembers = projectData.map(data => data.projectMembers);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Số lượng thành viên',
        data: projectMembers,
        backgroundColor: 'rgba(54, 162, 235, 0.6)' ,
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
}
