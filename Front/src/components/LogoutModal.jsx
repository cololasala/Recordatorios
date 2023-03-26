import { React, useState } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export const LogoutModal = ({ showModal, onClose }) => {
  const [open, setOpen] = useState(showModal);
  const navigate = useNavigate();

  const onAccept = () => {
    navigate("/sign-in");
  }

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
            ¿Desea cerrar sesión?
          </Typography>
          <Box>
            <Box
              sx={{
                marginTop: 3,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button onClick={() => onClose()}>Cancelar</Button>
              <Button variant="contained" onClick={() => onAccept()}>
                Aceptar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
