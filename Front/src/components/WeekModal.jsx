import { React, useState } from "react";
import { useForm } from "../hooks/useForm";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { axiosClient } from "../api/api.ts";

const formValidations = {
  title: [(value) => value.length >= 1, "El titulo es obligatorio"],
};

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export const WeekModal = ({
  selectedDate,
  showWeekModal,
  onClose,
  onSuccess,
}) => {
  const {
    handleTouch,
    touched,
    onInputChange,
    isFormValid,
    titleValid,
    formState,
  } = useForm(
    {
      title: "",
    },
    formValidations,
    {
      title: false,
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      user: JSON.parse(sessionStorage.getItem("user")).email,
      title: formState.title,
      start: selectedDate.start,
      end: selectedDate.end,
      color: "#378006",
    };
    axiosClient
      .post("reminders", body)
      .then(() => {
        onSuccess();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const rangeWeek = (selectedDate) => {
    const start = selectedDate.start.split("-");
    const startFormatDate = `${start[2]}/${start[1]}/${start[0]}`;
    const end = selectedDate.end.split("-");
    const endFormatDate = `${end[2]}/${end[1]}/${end[0]}`;
    const startEndFormat = {
      startFormatDate: startFormatDate,
      endFormatDate: endFormatDate,
    };
    return startEndFormat;
  };

  return (
    <>
      <Modal
        open={showWeekModal}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Typography variant="h5" sx={{mb: 1}}>Ingrese titulo de la semana:</Typography>
          <Typography>
            Desde: {rangeWeek(selectedDate).startFormatDate}
          </Typography>
          <Typography>
            Hasta: {rangeWeek(selectedDate).endFormatDate} <span style={{color: "gray"}}>(no inclusive)</span>
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Titulo"
              id="title"
              name="title"
              multiline
              rows={5}
              sx={{ mt: 2, width: "100%" }}
              onBlur={() => handleTouch("title")}
              onChange={onInputChange}
              error={touched["title"] && !!titleValid}
              helperText={touched["title"] && titleValid}
            />
            <Box
              sx={{
                marginTop: 3,
                display: "flex",
                justifyContent: "end",
              }}
            >
              <Button onClick={() => onClose()}>Cancelar</Button>
              <Button type="submit" variant="contained" disabled={!isFormValid}>
                Aceptar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
