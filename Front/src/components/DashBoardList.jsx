import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ViewListIcon from "@mui/icons-material/ViewList";
import TodayIcon from "@mui/icons-material/Today";
import { useNavigate } from "react-router-dom";

export const DashBoardList = ({ listOption }) => {
  const navigate = useNavigate();

  const setOption = (option) => {
    listOption(option);
  };

  return (
    <>
      <ListItemButton onClick={() => setOption("calendar")}>
        <ListItemIcon>
          <TodayIcon />
        </ListItemIcon>
        <ListItemText primary="Calendario" />
      </ListItemButton>
      <ListItemButton onClick={() => setOption("organizer")}>
        <ListItemIcon>
          <ViewListIcon />
        </ListItemIcon>
        <ListItemText primary="Organizador" />
      </ListItemButton>
    </>
  );
};
