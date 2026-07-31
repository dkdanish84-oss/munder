import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Container,
  Stack,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

const menu = [
  { title: "Home", path: "/" },
  { title: "Services", path: "/services" },
  { title: "Projects", path: "/projects" },
  { title: "Plans", path: "/plans" },
  { title: "Plants Shop", path: "/shop" },
  { title: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={1}
        sx={{
          bgcolor: "#fff",
          color: "#1B5E20",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>

            <Typography
              component={Link}
              to="/"
              sx={{
                flexGrow: 1,
                textDecoration: "none",
                color: "#1B5E20",
                fontSize: 34,
                fontWeight: 800,
              }}
            >
              Munder
            </Typography>

            <Stack
              direction="row"
              spacing={3}
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },
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
            </Stack>

            <Button
              variant="contained"
              sx={{
                display: {
                  xs: "none",
                  md: "inline-flex",
                },
                bgcolor: "#2E7D32",
                borderRadius: 3,
                textTransform: "none",
                px: 3,
              }}
            >
              Free Inspection
            </Button>

            <IconButton
              sx={{
                display: {
                  xs: "flex",
                  md: "none",
                },
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
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
            }}
          >
            <Typography
              fontWeight={700}
              color="#1B5E20"
            >
              Munder
            </Typography>

            <IconButton
              onClick={() => setOpen(false)}
            >
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
                <ListItemText
                  primary={item.title}
                />
              </ListItemButton>
            ))}
          </List>

        </Box>
      </Drawer>
    </>
  );
}


