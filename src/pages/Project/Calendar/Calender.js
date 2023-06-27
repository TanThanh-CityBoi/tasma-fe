import React from "react";
import useSWR from "swr";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
const defaultEvents = [
  {
    id: "aahahahhahah",
    start: "2023-06-08T13:00",
    end: "2023-06-18T13:45",
    title: "Lunch @ Butcher's",
    allDay: false,
    color: "#009788",
    // url: "url click ", // Có thể xài thằng này để navigate tới cái trang edit sự kiện ( nhưng cũng có thể open modal bằng thằng event onClick, mày tự implement nha.)
  },
  {
    id: 2,
    start: "2023-06-04T15:00",
    end: "2023-06-24T16:00",
    title: "General orientation",
    allDay: false,
    color: "#ff9900",
  },
  {
    id: 3,
    start: "2023-06-23T18:00",
    end: "2023-06-29T22:00",
    title: "Dexter BD",
    allDay: false,
    color: "#3f51b5",
  },
  {
    id: 4,
    start: "2023-06-24T10:30",
    end: "2023-06-25T11:30",
    title: "Stakeholder mtg.",
    allDay: false,
    color: "#f44437",
  },
];

const Calendar = () => {
  const fetchCalendarEvents = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(defaultEvents);
      }, 1000);
    });
  };

  const { data, isLoading, error } = useSWR(
    "get_calendar_events",
    fetchCalendarEvents
  );
  const handleEventDrop = (e) => {
    alert(
      JSON.stringify(
        { ...e.event._instance.range, id: e.event._def.publicId },
        null,
        2
      )
    );
  };

  const handleEventClick = (e) => {
    alert(e.event._def.publicId);
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h3>Error: {JSON.stringify(error)}</h3>;

  return (
    <FullCalendar
      events={data}
      eventClick={handleEventClick}
      initialView=""
      plugins={[dayGridPlugin, interactionPlugin]}
      eventContent={renderEventContent}
      eventDrop={handleEventDrop}
      editable={true}
      droppable={true}
    />
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
