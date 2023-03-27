import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { ReminderModal } from "./ReminderModal";
import timeGridPlugin from "@fullcalendar/timegrid";
import { WeekModal } from "./WeekModal";
import { axiosClient } from "../api/api.ts";
import { CustomSnackBar } from "./CustomSnackBar";
import { DropReminderModal } from "./DropReminderModal";

const buttonText = {
  today: "Ir a hoy",
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

const buttonHints = {
  next: "$0 siguiente",
  prev: "$0 anterior",
  month: "Mes",
  week: "Semana",
  today: "Ir a hoy",
};

export const Calendar = ({ sendNotifications }) => {
  const [eventsCalendar, setEventsCalendar] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showWeekModal, setShowWeekModal] = useState(false);
  const [showDropModal, setShowDropModal] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState(null);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getEventsCalendar();
  }, []);

  const selectDay = (e) => {
    if (e.allDay) {
      // es seleccion individual
      setShowModal(true);
      setSelectedDate(e.dateStr);
    }
  };

  const selectWeek = (e) => {
    if (!e.allDay) {
      // es seleccion por semana
      const startDate = e.startStr.split("T")[0];
      const endDate = e.endStr.split("T")[0];
      if (startDate !== endDate) {
        setSelectedDate({ start: startDate, end: endDate });
        setShowWeekModal(true);
      }
    }
  };

  const getEventsCalendar = (firstLoad = true, snackBarMessage = "") => {
    axiosClient
      .get("reminders")
      .then(({ data }) => {
        setEventsCalendar(data);
        if (!firstLoad) {
          closeModals();
          setSnackBarMessage(snackBarMessage);
          setShowSnackBar(true);
          prepareNotifications(data);
        } else {
          prepareNotifications(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const prepareNotifications = (data) => {
    const today = new Date();
    const todayPlusFive = new Date();
    todayPlusFive.setDate(today.getDate() + 5);
    const formatIso = todayPlusFive.toISOString().split("T")[0];
    const notifications = data.filter((d) => d.active && d.date === formatIso);
    setNotifications(notifications);
    sendNotifications(notifications);
  };

  const closeModals = () => {
    setShowModal(false);
    setShowWeekModal(false);
    setShowDropModal(false);
  };

  const removeEvent = (e) => {
    const reminderId = e.event._def.extendedProps._id;
    const title = e.event._def.title;
    const eventReminder = { id: reminderId, title: title };
    setSelectedReminder(eventReminder);
    setShowDropModal(true);
  };

  return (
    <>
      <CustomSnackBar
        showSnackBar={showSnackBar}
        message={snackBarMessage}
        severity={"success"}
        onClosed={() => setShowSnackBar(false)}
      />
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
        eventClick={removeEvent}
        buttonHints={buttonHints}
      />

      {showModal && (
        <ReminderModal
          showModal={showModal}
          selectedDate={selectedDate}
          onClose={() => setShowModal(false)}
          onSuccess={() =>
            getEventsCalendar(false, "Recordatorio creado exitosamente")
          }
        />
      )}

      {showWeekModal && (
        <WeekModal
          showWeekModal={showWeekModal}
          selectedDate={selectedDate}
          onClose={() => setShowWeekModal(false)}
          onSuccess={() =>
            getEventsCalendar(false, "Semana creada exitosamente")
          }
        />
      )}

      {showDropModal && (
        <DropReminderModal
          showDropModal={showDropModal}
          selectedReminder={selectedReminder}
          onClose={() => setShowDropModal(false)}
          onSuccess={() =>
            getEventsCalendar(false, "Evento eliminado exitosamente")
          }
        />
      )}
    </>
  );
};
