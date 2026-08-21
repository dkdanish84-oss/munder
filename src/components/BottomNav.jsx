import React from "react";
import {
  Paper,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LocalFloristRoundedIcon from "@mui/icons-material/LocalFloristRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

import { useNavigate, useLocation } from "react-router-dom";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const paths = [
    "/dashboard",
    "/my-garden",
    "/my-visits",
    "/profile",
  ];

  const value = Math.max(
    0,
    paths.indexOf(location.pathname)
  );

  return (
    <Paper
      elevation={10}
      sx={{
        position: "fixed",
        bottom: { xs: 8, sm: 12 },
        left: { xs: 8, sm: 12 },
        right: { xs: 8, sm: 12 },
        borderRadius: "22px",
        overflow: "hidden",
        zIndex: 1500,
        bgcolor: "#ffffff",
        boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_, newValue) => {
          navigate(paths[newValue]);
        }}
        sx={{
          height: { xs: 68, sm: 72 },
          bgcolor: "transparent",

          "& .MuiBottomNavigationAction-root": {
            color: "#8A8A8A",
            minWidth: 60,
          },

          "& .MuiBottomNavigationAction-label": {
            fontSize: "11px",
            fontWeight: 600,
          },

          "& .Mui-selected": {
            color: "#0E4D28 !important",
          },

          "& .MuiSvgIcon-root": {
            fontSize: 25,
          },

          "& .Mui-selected .MuiSvgIcon-root": {
            backgroundColor: "#E8F5E9",
            borderRadius: "50%",
            padding: "7px",
            fontSize: 40,
          },
        }}
      >
        <BottomNavigationAction
          label="Dashboard"
          icon={<HomeRoundedIcon />}
        />

        <BottomNavigationAction
          label="My Garden"
          icon={<LocalFloristRoundedIcon />}
        />

        <BottomNavigationAction
          label="My Visits"
          icon={<CalendarMonthRoundedIcon />}
        />

        <BottomNavigationAction
          label="Profile"
          icon={<PersonRoundedIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}
