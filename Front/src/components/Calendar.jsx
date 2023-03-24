import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { ReminderModal } from "./ReminderModal";
import timeGridPlugin from "@fullcalendar/timegrid";
import { WeekModal } from "./WeekModal";
import { axiosClient } from "../api/api.ts";

const buttonText = {
  today: "Hoy",
  month: "Mes",
  week: "Semana",
  day: "Dia",
  list: "Lista",
};

const headerToolbar = {
  center: "title",
  left: "today",
  right: "prev,next,dayGridMonth,timeGridWeek",
};

export const Calendar = () => {
  const [eventsCalendar, setEventsCalendar] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showWeekModal, setShowWeekModal] = useState(null);
  
  useEffect(() => {
    getEventsCalendar();
  }, [])

  const selectDay = (e) => {
    if (e.allDay) {
      // es seleccion individual
      setShowModal(true);
      setSelectedDate(e.dateStr);
    }
  };

  const selectWeek = (e) => {
    if (!e.allDay) {         // es seleccion por semana
      const startDate = e.startStr.split("T")[0];
      const endDate = e.endStr.split("T")[0];
      if (startDate !== endDate) {
        setSelectedDate({ start: startDate, end: endDate });
        setShowWeekModal(true);
      }
    }
  };

  const getEventsCalendar = () => {
    axiosClient.get("reminders").then(({data}) => {
      setEventsCalendar(data);
      console.log(data)
      setShowModal(false);
      setShowWeekModal(false);
    }).catch((err) => {
      console.log(err);
    })
  };
  
  return (
    <>
      <FullCalendar
        locale="es"
        buttonText={buttonText}
        headerToolbar={headerToolbar}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={eventsCalendar}
        dateClick={selectDay}
        selectable={true}
        select={selectWeek}
      />
      {showModal && (
        <ReminderModal
          selectedDate={selectedDate}
          showModal={showModal}
          onClose={() => setShowModal(false)}
          resetCalendar={() => getEventsCalendar()}
        />
      )}

      {showWeekModal && (
        <WeekModal
          selectedDate={selectedDate}
          showWeekModal={showWeekModal}
          onClose={() => setShowWeekModal(false)}
          resetCalendar={() => getEventsCalendar()}
        />
      )}
    </>
  );
};
