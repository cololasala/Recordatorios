import { Button, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { axiosClient } from "../api/api.ts";

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export const DropReminderModal = ({
  showDropModal,
  onClose,
  selectedReminder,
  onSuccess,
}) => {

  const onAccept = (reminderId) => {
    axiosClient
      .delete(`reminders/${reminderId}`)
      .then(() => {
        onSuccess();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal
      open={showDropModal}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleModal}>
        <Typography sx={{textAlign: 'center'}} variant="h5">¿Desea eliminar el evento del calendario?</Typography>
        <Typography sx={{mt: 2}}>{selectedReminder.title}</Typography>
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <Button onClick={() => onClose()}>Cancelar</Button>
          <Button variant="contained" onClick={() => onAccept(selectedReminder.id)}>Aceptar</Button>
        </Box>
      </Box>
    </Modal>
  );
};
