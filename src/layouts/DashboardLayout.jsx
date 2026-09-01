import { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout() {
  const handleLogout = () => {
    // Main admin session clear
    sessionStorage.removeItem("munder-main-admin");

    // Extra safety: remove any old admin sessions
    sessionStorage.removeItem("munder-admin");
    localStorage.removeItem("munder-main-admin");
    localStorage.removeItem("munder-admin");

    // Force redirect to login page
    window.location.replace("/admin-login");
  };

  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F5F7FA",
      }}
    >
      <Header
        onMenuClick={() => setOpen(true)}
        onLogout={handleLogout}
      />

      <Sidebar
        open={open}
        onClose={() => setOpen(false)}
      />

      <Toolbar
        sx={{
          minHeight: "70px !important",
        }}
      />

      <Box sx={{ p: 2 }}>
        <Outlet />
      </Box>
    </Box>
  );
}







