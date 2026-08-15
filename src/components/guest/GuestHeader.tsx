import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Link as RouterLink, NavLink } from "react-router-dom";

const navItems = [
  { title: "Home", path: "/" },
  { title: "Services", path: "/garden-maintenance-bhopal" },
  { title: "Plans", path: "/plans" },
  { title: "Login", path: "/login" },
];

export default function GuestHeader(): React.ReactElement {
  const [open, setOpen] = useState(false);

  const openWhatsApp = (): void => {
    window.open(
      "https://wa.me/917987468974?text=Hi%20Munder,%20I%20need%20garden%20services.",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const closeMenu = (): void => {
    setOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          bgcolor: "#ffffff",
          color: "#1B5E20",
          borderBottom: "1px solid #e5e7eb",
          zIndex: 1200,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              minHeight: {
                xs: 70,
                md: 70,
              },
              height: 70,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            {/* Mobile Menu */}
            <IconButton
              edge="start"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              sx={{
                display: {
                  xs: "inline-flex",
                  md: "none",
                },
                color: "#1B5E20",
                mr: 1,
                position: "relative",
                zIndex: 9999,
              }}
            >
              <MenuIcon sx={{ fontSize: 32 }} />
            </IconButton>

            {/* Munder Logo */}
            <Box
              component={RouterLink}
              to="/"
              onClick={closeMenu}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                flexGrow: {
                  xs: 1,
                  md: 0,
                },
                height: 70,
                overflow: "visible",
              }}
            >
              <Box
                component="img"
                src="/images/munder-logo-horizontal.png"
                alt="Munder"
                sx={{
                  width: {
                    xs: 250,
                    sm: 270,
                    md: 290,
                  },
                  height: "auto",
                  maxHeight: 66,
                  transform: "scale(1.8)",
                  transformOrigin: "center",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </Box>

            {/* Desktop Navigation */}
            <Box
              component="nav"
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },
                alignItems: "center",
                gap: 1,
                ml: "auto",
                mr: 3,
              }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  component={NavLink}
                  to={item.path}
                  color="inherit"
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 2,
                    px: 1.5,
                    py: 1,
                    "&.active": {
                      color: "#2E7D32",
                    },
                    "&:hover": {
                      bgcolor: "#F1F8F2",
                    },
                  }}
                >
                  {item.title}
                </Button>
              ))}
            </Box>

            {/* WhatsApp */}
            <Button
              variant="contained"
              startIcon={<WhatsAppIcon />}
              onClick={openWhatsApp}
              sx={{
                bgcolor: "#006b38",
                color: "#ffffff",
                textTransform: "none",
                borderRadius: "10px",
                px: {
                  xs: 1.5,
                  sm: 2.5,
                },
                py: 1,
                minWidth: "auto",
                fontSize: {
                  xs: "0.72rem",
                  sm: "0.875rem",
                },
                fontWeight: 600,
                boxShadow: "none",
                whiteSpace: "nowrap",
                "&:hover": {
                  bgcolor: "#00542c",
                  boxShadow: "none",
                },
              }}
            >
              <Box
                component="span"
                sx={{
                  display: {
                    xs: "none",
                    sm: "inline",
                  },
                }}
              >
                Chat on WhatsApp
              </Box>

              <Box
                component="span"
                sx={{
                  display: {
                    xs: "inline",
                    sm: "none",
                  },
                }}
              >
                WhatsApp
              </Box>
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={open}
        onClose={closeMenu}
      >
        <Box
          sx={{
            width: 290,
            height: "100%",
            bgcolor: "#ffffff",
          }}
          role="presentation"
        >
          <Box
            sx={{
              height: 70,
              px: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            <Box
              component={RouterLink}
              to="/"
              onClick={closeMenu}
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              <Box
                component="img"
                src="/images/munder-logo-horizontal.png"
                alt="Munder"
                sx={{
                  width: 250,
                  height: "auto",
                  maxHeight: 62,
                  objectFit: "contain",
                }}
              />
            </Box>

            <IconButton
              onClick={closeMenu}
              aria-label="Close menu"
              sx={{
                color: "#1B5E20",
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <List sx={{ pt: 1 }}>
            {navItems.map((item) => (
              <ListItemButton
                key={item.path}
                component={NavLink}
                to={item.path}
                onClick={closeMenu}
                sx={{
                  py: 1.8,
                  px: 3,
                  "&.active": {
                    bgcolor: "#E8F5E9",
                    color: "#2E7D32",
                    "& .MuiListItemText-primary": {
                      fontWeight: 700,
                    },
                  },
                }}
              >
                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={{
                    fontSize: "1rem",
                    fontWeight: 500,
                  }}
                />
              </ListItemButton>
            ))}
          </List>

          <Box sx={{ px: 2.5, pt: 2 }}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<WhatsAppIcon />}
              onClick={openWhatsApp}
              sx={{
                bgcolor: "#006b38",
                textTransform: "none",
                borderRadius: 2,
                py: 1.4,
                fontWeight: 600,
                "&:hover": {
                  bgcolor: "#00542c",
                },
              }}
            >
              Chat on WhatsApp
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Header Spacer */}
      <Box
        sx={{
          height: {
            xs: 70,
            md: 70,
          },
        }}
      />
    </>
  );
}
