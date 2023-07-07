import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { GET_ALL_PROJECTS_SAGA } from "../../../redux/constants/ProjectConst";

const TaskStatusChart = () => {
   // Mock data
   //  const mockData = [
   //     { project: "Project A", completedTaskCount: 8, incompletedTaskCount: 2 },
   //     { project: "Project B", completedTaskCount: 5, incompletedTaskCount: 3 },
   //     { project: "Project C", completedTaskCount: 10, incompletedTaskCount: 1 },
   //     { project: "Project D", completedTaskCount: 12, incompletedTaskCount: 4 },
   //     { project: "Project E", completedTaskCount: 6, incompletedTaskCount: 2 },
   //  ];
   const mockData = [];
   const dispatch = useDispatch();

   const projects = useSelector((state) => state.ProjectReducer.projects);
   projects.map((project) => {
      const completedTaskCount = project?.tasks.reduce((total, x) => (x.status === "DONE" ? total + 1 : total), 0);
      const incompletedTaskCount = project?.tasks.length - completedTaskCount;
      mockData.push({
         project: project.name,
         completedTaskCount,
         incompletedTaskCount,
      });
      return {
         project: project.name,
         completedTaskCount,
         incompletedTaskCount,
      };
   });

   const projectNames = mockData.map((data) => data.project);
   const completedTaskCounts = mockData.map((data) => data.completedTaskCount);
   const incompletedTaskCounts = mockData.map((data) => data.incompletedTaskCount);

   const chartData = {
      labels: projectNames,
      datasets: [
         {
            label: "Completed Tasks",
            data: completedTaskCounts,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
         },
         {
            label: "Incompleted Tasks",
            data: incompletedTaskCounts,
            backgroundColor: "rgba(255, 99, 132, 0.6)",
         },
      ],
   };

   useEffect(() => {
      dispatch({
         type: GET_ALL_PROJECTS_SAGA,
      });
      return () => {};
   }, []);

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
