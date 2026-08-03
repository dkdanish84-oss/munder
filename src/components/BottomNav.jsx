import React from "react";
import {
  Paper,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import MiscellaneousServicesRoundedIcon from "@mui/icons-material/MiscellaneousServicesRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

import { useNavigate, useLocation } from "react-router-dom";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const getValue = () => {
    const path = location.pathname;

    if (path === "/" || path === "/home") return 0;

    if (
      path === "/services" ||
      path === "/visit" ||
      path === "/plans" ||
      path === "/cart" ||
      path === "/checkout" ||
      path === "/garden-details" ||
      path === "/choose-date" ||
      path === "/payment" ||
      path === "/order-success"
    )
      return 1;

    if (path === "/orders") return 2;

    if (path === "/wishlist") return 3;

    if (path === "/profile") return 4;

    return 0;
  };

  return (
    <Paper
      elevation={8}
      sx={{
        position: "fixed",
        bottom: 12,
        left: 12,
        right: 12,
        borderRadius: "22px",
        overflow: "hidden",
        zIndex: 1500,
        bgcolor: "#ffffff",
        boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
      }}
    >
      <BottomNavigation
        showLabels
        value={getValue()}
        onChange={(event, value) => {
          switch (value) {
            case 0:
              navigate("/");
              break;

            case 1:
              navigate("/services");
              break;

            case 2:
              navigate("/orders");
              break;

            case 3:
              navigate("/wishlist");
              break;

            case 4:
              navigate("/profile");
              break;

            default:
              navigate("/");
          }
        }}
        sx={{
          height: 72,
          bgcolor: "transparent",

          "& .MuiBottomNavigationAction-root": {
            color: "#8A8A8A",
            transition: "all .25s ease",
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
            fontSize: 26,
            transition: "all .25s ease",
          },

          "& .Mui-selected .MuiSvgIcon-root": {
            backgroundColor: "#E8F5E9",
            borderRadius: "50%",
            padding: "8px",
            fontSize: 42,
          },
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeRoundedIcon />}
        />

        <BottomNavigationAction
          label="Services"
          icon={<MiscellaneousServicesRoundedIcon />}
        />

        <BottomNavigationAction
          label="Orders"
          icon={<AssignmentRoundedIcon />}
        />

        <BottomNavigationAction
          label="Wishlist"
          icon={<FavoriteRoundedIcon />}
        />

        <BottomNavigationAction
          label="Profile"
          icon={<PersonRoundedIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}

