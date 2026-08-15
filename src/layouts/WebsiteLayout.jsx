import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "../components/website/Navbar";

export default function WebsiteLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f8faf8",
      }}
    >
      <Navbar />

      <Outlet />
    </Box>
  );
}
