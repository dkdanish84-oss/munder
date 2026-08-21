import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import CustomerHeader from "../components/customer/CustomerHeader";
import BottomNav from "../components/BottomNav";

export default function CustomerLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F7F9F6",
        pb: { xs: 11, sm: 12 },
      }}
    >
      <CustomerHeader />

      <Box
        component="main"
        sx={{
          minHeight: "calc(100vh - 80px)",
        }}
      >
        <Outlet />
      </Box>

      <BottomNav />
    </Box>
  );
}
