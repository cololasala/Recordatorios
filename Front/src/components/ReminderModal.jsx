import { React, useState } from "react";
import { useForm } from "../hooks/useForm";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, Grid, TextField } from "@mui/material";
import Box from "@mui/material/Box";

const formValidations = {
  message: [(value) => value.length >= 1, "El recordatorio es obligatorio"],
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

export const ReminderModal = ({ selectedDate, showModal, onClose }) => {
  const [open, setOpen] = useState(showModal);

  const {
    handleTouch,
    touched,
    onInputChange,
    isFormValid,
    messageValid,
    formState,
  } = useForm(
    {
      message: "",
    },
    formValidations,
    {
      message: false,
    }
  );

  const handleSubmit = () => {
    // llamada a back y cerrado de modal y reseteo calendario
  };

  const convertFormatDate = (selectedDate) => {
    const dateAsArray = selectedDate.split("-");
    return `${dateAsArray[2]}/${dateAsArray[1]}/${dateAsArray[0]}`;
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Typography variant="h5">
            Agregar recordatorio en fecha:{" "}
            <b>"{convertFormatDate(selectedDate)}"</b>
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Recordatorio"
              id="message"
              name="message"
              multiline
              rows={5}
              sx={{ mt: 2, width: "100%" }}
              onBlur={() => handleTouch("message")}
              onChange={onInputChange}
              error={touched["message"] && !!messageValid}
              helperText={touched["message"] && messageValid}
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
