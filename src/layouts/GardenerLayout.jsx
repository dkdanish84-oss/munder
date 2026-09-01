import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { auth, signOut } from "../config/firebase";
import { useAuthStore } from "../store/authStore";

export default function GardenerLayout() {
  const navigate = useNavigate();
  const logoutStore = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } finally {
      logoutStore();
      navigate("/gardener/login", { replace: true });
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F4F7F4" }}>
      <Box
        sx={{
          height: { xs: 64, sm: 72 },
          px: { xs: 2, sm: 4 },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: "#0E4D28",
          color: "#fff",
          position: "sticky",
          top: 0,
          zIndex: 20,
          boxShadow: "0 3px 14px rgba(0,0,0,.12)",
        }}
      >
        <Box>
          <Typography sx={{ fontWeight: 900, fontSize: { xs: 20, sm: 24 } }}>
            MUNDER
          </Typography>
          <Typography sx={{ fontSize: 12, opacity: 0.85 }}>
            Gardener Panel
          </Typography>
        </Box>

        <Button
          onClick={handleLogout}
          startIcon={<LogoutIcon />}
          sx={{
            color: "#fff",
            textTransform: "none",
            fontWeight: 800,
            borderRadius: 2,
          }}
        >
          Logout
        </Button>
      </Box>

      <Box sx={{ maxWidth: 1200, mx: "auto", p: { xs: 2, sm: 3, md: 4 } }}>
        <Outlet />
      </Box>
    </Box>
  );
}
