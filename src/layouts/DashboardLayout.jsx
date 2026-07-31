import { useState } from "react";
import { Box, Toolbar, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout() {
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
      />

      <Sidebar
        open={open}
        onClose={() => setOpen(false)}
      />

      <Toolbar />

      <Box sx={{ p: 2 }}>
        <Outlet />
      </Box>
      <Fab
        color="success"
        sx={{
          position: "fixed",
          right: 20,
          bottom: 20,
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}
