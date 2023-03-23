import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { ReminderModal } from "./ReminderModal";

const buttonText = {
  today: "Hoy",
  month: "Mes",
  week: "Semana",
  day: "Dia",
  list: "Lista",
  prev: "Mes anterior",
  next: "Mes siguiente"
};


export const Calendar = () => {
  const [eventsCalendar, setEventsCalendar] = useState([
    // yyyy-mm-dd
    { title: "event 1", date: "2023-03-03" },
    { title: "event 2", date: "2023-03-04" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (e) => {
    console.log(e.dateStr);
    setShowModal(true);
    setSelectedDate(e.dateStr);
  };

  return (
    <>
      <FullCalendar
        locale="es"
        buttonText={buttonText}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={eventsCalendar}
        dateClick={handleDateClick}
      />
      {showModal && (
        <ReminderModal
          selectedDate={selectedDate}
          showModal={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};
