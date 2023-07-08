import React, { useEffect, useState } from "react";
import useSWR from "swr";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import { useSelector, useDispatch } from "react-redux";
import { GET_ALL_PROJECTS_SAGA } from "../../../redux/constants/ProjectConst";
// const defaultEvents = [
//    {
//       id: "aahahahhahah",
//       start: "2023-06-08T13:00",
//       end: "2023-06-18T13:45",
//       title: "Lunch @ Butcher's",
//       allDay: false,
//       color: "#009788",
//       // url: "url click ", // Có thể xài thằng này để navigate tới cái trang edit sự kiện ( nhưng cũng có thể open modal bằng thằng event onClick, mày tự implement nha.)
//    },
//    {
//       id: 2,
//       start: "2023-06-04T15:00",
//       end: "2023-06-24T16:00",
//       title: "General orientation",
//       allDay: false,
//       color: "#ff9900",
//    },
//    {
//       id: 3,
//       start: "2023-06-23T18:00",
//       end: "2023-06-29T22:00",
//       title: "Dexter BD",
//       allDay: false,
//       color: "#3f51b5",
//    },
//    {
//       id: 4,
//       start: "2023-06-24T10:30",
//       end: "2023-06-25T11:30",
//       title: "Stakeholder mtg.",
//       allDay: false,
//       color: "#f44437",
//    },
// ];

const Colors = {
   BACKLOG: "#c4c5c6",
   INPROGRESS: "#62a0ce",
   UNDERREVIEW: "#F9D900",
   CANCELLED: "#E50000",
   DONE: "#5fb03e",
};

const Calendar = () => {
   const dispatch = useDispatch();
   const projects = useSelector((state) => state.ProjectReducer.projects) || [];
   const [currentProject, setCurrentProject] = useState(projects[0] || {});
   const defaultEvents = currentProject?.tasks?.map((task) => {
      return {
         id: task?.id,
         start: task?.createdDate,
         end: task?.dueDate,
         title: task?.name,
         allDay: true,
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
      alert(JSON.stringify({ ...e.event._instance.range, id: e.event._def.publicId }, null, 2));
   };

   const handleEventClick = (e) => {
      alert(e.event._def.publicId);
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
            initialEvents={defaultEvents}
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
