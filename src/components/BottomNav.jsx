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

    if (path === "/dashboard") {
      return 0;
    }

    if (
      path === "/garden-maintenance-bhopal" ||
      path === "/services" ||
      path === "/visit" ||
      path === "/plans" ||
      path === "/shop" ||
      path === "/cart" ||
      path === "/checkout" ||
      path === "/garden-details" ||
      path === "/choose-date" ||
      path === "/payment"
    ) {
      return 1;
    }

    if (
      path === "/orders" ||
      path === "/order-success"
    ) {
      return 2;
    }

    if (path === "/wishlist") {
      return 3;
    }

    if (
      path === "/profile" ||
      path === "/notifications" ||
      path === "/settings"
    ) {
      return 4;
    }

    return 0;
  };

  const handleNavigation = (value) => {
    switch (value) {
      case 0:
        navigate("/dashboard");
        break;

      case 1:
        navigate("/garden-maintenance-bhopal");
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
        navigate("/dashboard");
        break;
    }
  };

  return (
    <Paper
      elevation={8}
      sx={{
        position: "fixed",
        bottom: {
          xs: 8,
          sm: 12,
        },
        left: {
          xs: 8,
          sm: 12,
        },
        right: {
          xs: 8,
          sm: 12,
        },
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
          handleNavigation(value);
        }}
        sx={{
          height: {
            xs: 68,
            sm: 72,
          },
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
          label="Dashboard"
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
