import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Link } from "react-router-dom";

const menu = [
  { title: "Home", path: "/" },
  { title: "Services", path: "/garden-maintenance-bhopal" },
  { title: "Plans", path: "/plans" },
  { title: "Login", path: "/login" },
];

export default function GuestHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "#fff",
          borderBottom: "1px solid #e8ece8",
          color: "#1B5E20",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: 72 }}>
            <Box
              component={Link}
              to="/"
              sx={{
                flexGrow: 1,
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
                  height: 52,
                  width: "auto",
                }}
              />
            </Box>

            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 1,
                mr: 3,
              }}
            >
              {menu.map((item) => (
                <Button
                  key={item.title}
                  component={Link}
                  to={item.path}
                  color="inherit"
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  {item.title}
                </Button>
              ))}
            </Box>

            <Button
              variant="contained"
              startIcon={<WhatsAppIcon />}
              href="https://wa.me/917987468974"
              target="_blank"
              sx={{
                display: { xs: "none", md: "inline-flex" },
                bgcolor: "#2E7D32",
                borderRadius: 2,
                textTransform: "none",
                px: 3,
              }}
            >
              WhatsApp
            </Button>

            <IconButton
              sx={{
                display: { xs: "flex", md: "none" },
                color: "#1B5E20",
              }}
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={{ width: 280 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
            }}
          >
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {menu.map((item) => (
              <ListItemButton
                key={item.title}
                component={Link}
                to={item.path}
                onClick={() => setOpen(false)}
              >
                <ListItemText primary={item.title} />
              </ListItemButton>
            ))}
          </List>

          <Box sx={{ p: 2 }}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<WhatsAppIcon />}
              href="https://wa.me/917987468974"
              target="_blank"
              sx={{
                bgcolor: "#2E7D32",
                textTransform: "none",
              }}
            >
              Chat on WhatsApp
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
