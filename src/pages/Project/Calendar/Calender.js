import React, { useEffect, useState } from "react";
import useSWR from "swr";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import { useSelector, useDispatch } from "react-redux";
import { GET_ALL_PROJECTS_SAGA } from "../../../redux/constants/ProjectConst";

const Colors = {
   BACKLOG: "#71717a",
   "IN PROGRESS": "#3b82f6",
   "UNDER REVIEW": "#eab308",
   CANCELLED: "#E50000",
   DONE: "#5fb03e",
};

const Calendar = () => {
   const dispatch = useDispatch();
   const projects = useSelector((state) => state.ProjectReducer.projects) || [];
   const [currentProject, setCurrentProject] = useState(projects[0] || {});
   const defaultEvents = currentProject?.tasks?.map((task) => {
      let isAllDay = false;
      const startDate = new Date(task?.createdDate);
      const endDate = task.dueDate ? new Date(task?.dueDate) : new Date();

      if (startDate.getDay() == endDate.getDay() && startDate.getMonth() == endDate.getMonth()) {
         isAllDay = true;
      }
      return {
         id: task?.id,
         start: task?.startDate,
         end: task?.dueDate,
         title: task?.name,
         allDay: isAllDay,
         color: Colors[task?.status || "BACKLOG"],
      };
   });

   const fetchCalendarEvents = () => {
      return new Promise((resolve) => {
         setTimeout(async () => {
            resolve(defaultEvents);
         }, 500);
      });
   };

   const { data, isLoading, error } = useSWR("get_calendar_events", fetchCalendarEvents);
   const handleEventDrop = (e) => {
      // alert(
      //   JSON.stringify(
      //     { ...e.event._instance.range, id: e.event._def.publicId },
      //     null,
      //     2
      //   )
      // );
   };

   const handleEventClick = (e) => {
      // alert(e.event._def.publicId);
   };

   useEffect(() => {
      dispatch({
         type: GET_ALL_PROJECTS_SAGA,
      });
      return () => {};
   }, []);

   if (isLoading) return <h1>Loading...</h1>;
   if (error) return <h3>Error: {JSON.stringify(error)}</h3>;
   //
   return (
      <div>
         <div className="d-flex justify-content-end mb-4">
            <select
               name="projects"
               id="projects"
               onChange={(e) => {
                  setCurrentProject(projects[e.target.value]);
               }}
               className="p-2"
               style={{ minWidth: "200px" }}
            >
               {projects?.map((pr, _id) => {
                  return <option value={_id}>{pr.name}</option>;
               })}
            </select>
         </div>
         <FullCalendar
            headerToolbar={{
               left: "prev,next today",
               center: "title",
               right: "dayGridMonth,dayGridWeek,dayGridYear",
            }}
            events={defaultEvents}
            eventClick={handleEventClick}
            initialView="dayGridMonth"
            plugins={[dayGridPlugin, interactionPlugin]}
            eventContent={renderEventContent}
            eventDrop={handleEventDrop}
            editable={true}
            droppable={true}
            // initialEvents={defaultEvents}
         />
      </div>
   );
};

function renderEventContent(eventInfo) {
  return (
    <div>
      <b>{eventInfo.timeText} </b>
      <i>{eventInfo.event.title}</i>
    </div>
  );
}

export default Calendar;
