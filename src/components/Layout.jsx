import React from "react";
import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";

import GuestHeader from "./guest/GuestHeader";
import Footer from "./guest/Footer";
import Header from "./Header";
import BottomNav from "./BottomNav";

export default function Layout() {
  const location = useLocation();

  const guestPages = [
    "/",
    "/login",
    "/garden-maintenance-bhopal",
    "/services",
    "/plans",
    "/visit",
    "/shop",
    "/cart",
    "/checkout",
    "/payment",
  ];

  const isGuestPage = guestPages.includes(location.pathname);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: isGuestPage ? "#ffffff" : "#f7f9f6",
        pb: isGuestPage ? 0 : 10,
      }}
    >
      {isGuestPage ? <GuestHeader /> : <Header />}

      <Box
        component="main"
        sx={{
          minHeight: "calc(100vh - 80px)",
        }}
      >
        <Outlet />
      </Box>

      {isGuestPage ? <Footer /> : <BottomNav />}
    </Box>
  );
}
