import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Avatar,
  Tooltip,
} from "@mui/material";

import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";

import { useNavigate } from "react-router-dom";

export default function CustomerHeader() {
  const navigate = useNavigate();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "#ffffff",
        color: "#0E4D28",
        borderBottom: "1px solid #E8EEE9",
        zIndex: 1200,
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 72, sm: 80 },
          px: { xs: 2, sm: 3, md: 4 },
          justifyContent: "space-between",
        }}
      >
        <Box
          component="button"
          onClick={() => navigate("/dashboard")}
          aria-label="Go to dashboard"
          sx={{
            border: 0,
            background: "transparent",
            padding: 0,
            margin: 0,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src="/images/munder-logo-horizontal.png"
            alt="Munder"
            sx={{
              height: { xs: 52, sm: 52 },
              width: "auto",
              display: "block",
            }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Tooltip title="Notifications">
            <IconButton
              onClick={() => navigate("/notifications")}
              aria-label="Notifications"
              sx={{ color: "#0E4D28" }}
            >
              <NotificationsNoneRoundedIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Profile">
            <IconButton
              onClick={() => navigate("/profile")}
              aria-label="Profile"
              sx={{ p: 0.4 }}
            >
              <Avatar
                sx={{
                  width: 38,
                  height: 38,
                  bgcolor: "#E8F5E9",
                  color: "#0E4D28",
                  fontWeight: 700,
                }}
              >
                U
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
