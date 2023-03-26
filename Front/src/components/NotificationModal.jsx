import { React, useState } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { axiosClient } from "../api/api.ts";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { CustomSnackBar } from "./CustomSnackBar";

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export const NotificationModal = ({ showModal, notifications, onClose, removeNotifications }) => {
  const [open, setOpen] = useState(showModal);
  const [switchLabel, setSwitchLabel] = useState("No");
  const [switchValue, setSwitchValue] = useState(false);

  const convertFormatDate = (selectedDate) => {
    const dateAsArray = selectedDate.split("-");
    return `${dateAsArray[2]}/${dateAsArray[1]}/${dateAsArray[0]}`;
  };

  const handleSwitch = (e) => {
    setSwitchValue(e.target.checked);
    e.target.checked ? setSwitchLabel("Si") : setSwitchLabel("No");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (switchValue) {
      const body = notifications.map((n) => n._id);
      axiosClient
        .put("reminders/deactivate", body)
        .then(() => {
          removeNotifications();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      onClose();
    }
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
          <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
            Aviso de recordatorios
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Box sx={{ mb: 3 }}>
              {notifications.map((r) => {
                return (
                  <Typography sx={{ mt: 1 }} key={r._id}>
                    {r.title} - <b>{convertFormatDate(r.date)}</b>
                  </Typography>
                );
              })}
            </Box>
            <FormGroup>
              <Typography>
                ¿Desea desactivar las notificaciones de hoy?
              </Typography>
              <FormControlLabel
                onChange={handleSwitch}
                control={<Switch />}
                label={switchLabel}
              />
            </FormGroup>
            <Box
              sx={{
                marginTop: 3,
                display: "flex",
                justifyContent: "end",
              }}
            >
              <Button onClick={() => onClose()}>Cancelar</Button>
              <Button type="submit" variant="contained">
                Aceptar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
