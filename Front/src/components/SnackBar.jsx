import { React, useState, useEffect } from "react";
import { Alert, Snackbar } from "@mui/material";

export const SnackBar = ({ showSnackBar, message, severity, onClosed }) => {
  const [open, setOpen] = useState(showSnackBar);

  useEffect(() => {
    setOpen(showSnackBar);
  }, [showSnackBar]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    onClosed();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={2500}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        variant="filled"
        severity={severity}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
