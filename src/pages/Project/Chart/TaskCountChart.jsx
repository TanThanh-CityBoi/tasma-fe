import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { GET_ALL_PROJECTS_SAGA } from "../../../redux/constants/ProjectConst";

const TaskCountChart = () => {
   // Mock data
   //  const mockData = [
   //     { project: "Project A", taskCount: 10 },
   //     { project: "Project B", taskCount: 5 },
   //     { project: "Project C", taskCount: 8 },
   //     { project: "Project D", taskCount: 12 },
   //     { project: "Project E", taskCount: 6 },
   //     { project: "Project F", taskCount: 25 },
   //     { project: "Project G", taskCount: 18 },
   //     { project: "Project H", taskCount: 10 },
   //  ];

   const dispatch = useDispatch();

   const projects = useSelector((state) => state.ProjectReducer.projects);
   const mockData = projects.map((project) => {
      return {
         project: project?.name,
         taskCount: project?.tasks?.length || 0,
      };
   });

   /* ============ */

   const projectNames = mockData.map((data) => data.project);
   const taskCounts = mockData.map((data) => data.taskCount);

   const chartData = {
      labels: projectNames,
      datasets: [
         {
            label: "Number of Tasks",
            data: taskCounts,
            fill: false,
            borderColor: "#007bff",
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
