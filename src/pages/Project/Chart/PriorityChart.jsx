import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { GET_ALL_PROJECTS_SAGA } from "../../../redux/constants/ProjectConst";

const PriorityChart = () => {

   const mockData = [];
   const dispatch = useDispatch();

   const projects = useSelector((state) => state.ProjectReducer.projects);
   projects.map((project) => {
      const highPriority = project?.tasks.reduce((total, x) => (x.priority === "High" ? total + 1 : total), 0);
      const mediumPriority = project?.tasks.reduce((total, x) => (x.priority === "Medium" ? total + 1 : total), 0);
      const lowPriority = project?.tasks.length - highPriority;
      mockData.push({
         projectName: project.name,
         highPriority,
         mediumPriority,
         lowPriority,
      });
   });

   const labels = mockData.map((data) => data.projectName);
   const highPriorityData = mockData.map((data) => data.highPriority);
   const mediumPriorityData = mockData.map((data) => data.mediumPriority);
   const lowPriorityData = mockData.map((data) => data.lowPriority);

   const chartData = {
      labels: labels,
      datasets: [
         {
            label: "High Priority",
            data: highPriorityData,
            backgroundColor: "rgba(255, 99, 132, 0.6)",
         },
         {
            label: "Medium Priority",
            data: mediumPriorityData,
            backgroundColor: "rgba(54, 162, 235, 0.6)",
         },
         {
            label: "Low Priority",
            data: lowPriorityData,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
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
                  x: { stacked: true },
                  y: { stacked: true },
               },
            }}
         />
      </div>
   );
};

export default PriorityChart;
