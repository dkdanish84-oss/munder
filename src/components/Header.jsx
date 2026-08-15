import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function Header({
  title = "Dashboard",
  onMenuClick,
}) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const openWhatsApp = () => {
    window.open(
      "https://wa.me/917987468974?text=Hi%20Munder,%20I%20need%20garden%20services.",
      "_blank"
    );
  };

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        bgcolor: "#ffffff",
        color: "#1B5E20",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <Toolbar>

        {!isDesktop && (
          <IconButton
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 1, color: "#1B5E20" }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Box
          component={RouterLink}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
            flexGrow: 1,
          }}
        >

          <Box
            component="img"
            src="/images/munder-logo-horizontal.png"
            alt="Munder"
            sx={{
              height: 42,
              mr: 1.5,
            }}
          />

          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },
            }}
          >
            {title}
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<WhatsAppIcon />}
          onClick={openWhatsApp}
          sx={{
            bgcolor: "#1B5E20",
            "&:hover": {
              bgcolor: "#14471a",
            },
            textTransform: "none",
            borderRadius: "10px",
            px: 2.5,
            display: {
              xs: "none",
              sm: "inline-flex",
            },
          }}
        >
          WhatsApp
        </Button>

      </Toolbar>
    </AppBar>
  );
}
