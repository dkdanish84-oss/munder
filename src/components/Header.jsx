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
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const adminMenu = [
  ["Dashboard", "/admin"],
  ["Leads", "/admin/leads"],
  ["Customers", "/admin/customers"],
  ["Gardeners", "/admin/gardeners"],
  ["Categories", "/admin/categories"],
  ["Products", "/admin/products"],
  ["Inventory", "/admin/inventory"],
  ["Projects", "/admin/projects"],
  ["Quotations", "/admin/quotations"],
];

export default function Header({
  title = "Dashboard",
  onMenuClick,
  onLogout,
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
      <Toolbar
        sx={{
          minHeight: "70px !important",
          height: "70px",
          px: { xs: 2, md: 3 },
          gap: 2,
        }}
      >
        {!isDesktop && (
          <IconButton
            edge="start"
            onClick={onMenuClick}
            sx={{
              color: "#1B5E20",
              flexShrink: 0,
            }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Box
          component={RouterLink}
          to="/admin"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
            flexShrink: 0,
          }}
        >
          <Box
            component="img"
            src="/images/munder-logo-horizontal.png"
            alt="Munder"
            sx={{
              height: 70,
width: "auto",
transform: "scale(1.35)",
transformOrigin: "left center",
display: "block",
            }}
          />

          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              ml: 1.5,
              display: {
                xs: "none",
                xl: "block",
              },
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </Typography>
        </Box>

        <Box
          component="nav"
          aria-label="Admin navigation"
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
            gap: 0.25,
            flexGrow: 1,
            minWidth: 0,
            overflowX: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {adminMenu.map(([label, path]) => (
            <Box
              key={path}
              component={RouterLink}
              to={path}
              sx={{
                flexShrink: 0,
                px: {
                  md: 0.65,
                  lg: 0.9,
                  xl: 1.15,
                },
                py: 0.8,
                borderRadius: 2,
                textDecoration: "none",
                color: "#183B2A",
                fontSize: {
                  md: 13,
lg: 14,
xl: 16,
                },
                fontWeight: 700,
                whiteSpace: "nowrap",
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: "#F0F6F1",
                  color: "#1B5E20",
                },
              }}
            >
              {label}
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              display: {
                xs: "none",
                lg: "flex",
              },
              alignItems: "center",
              gap: 1,
              px: 1.5,
              py: 0.7,
              bgcolor: "#F0F6F1",
              borderRadius: 2,
            }}
          >
            <AdminPanelSettingsIcon
              sx={{
                color: "#1B5E20",
              }}
            />

            <Box>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: "#183B2A",
                  lineHeight: 1.2,
                }}
              >
                Main Admin
              </Typography>

              <Typography
                sx={{
                  fontSize: 10,
                  color: "#6B7280",
                }}
              >
                Administrator
              </Typography>
            </Box>
          </Box>

          <Button
            variant="outlined"
            startIcon={<LogoutIcon />}
            onClick={() => {
              if (typeof onLogout === "function") {
                onLogout();
              }
            }}
            sx={{
              color: "#B42318",
              borderColor: "#FECACA",
              textTransform: "none",
              fontWeight: 700,
              borderRadius: 2,
              "&:hover": {
                borderColor: "#B42318",
                bgcolor: "#FEF2F2",
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}






