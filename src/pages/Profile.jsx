import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useAuthStore } from "../store/authStore";
import {
  Box,
  Avatar,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
} from "@mui/material";
import {
  Person as PersonIcon,
  ShoppingBag as OrdersIcon,
  Favorite as WishlistIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

export default function Profile() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", pb: 10, bgcolor: "#f9f9f9", minHeight: "100vh" }}>
      {/* Header Banner */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          p: 3,
          textAlign: "center",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          My Profile
        </Typography>

        <Avatar
          src={user?.photoURL || ""}
          alt={user?.displayName || "User"}
          sx={{
            width: 80,
            height: 80,
            mx: "auto",
            mb: 1.5,
            border: "3px solid white",
          }}
        >
          {!user?.photoURL && <PersonIcon sx={{ fontSize: 40 }} />}
        </Avatar>

        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {user?.displayName || "Munder User"}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          {user?.email || "No Email Provided"}
        </Typography>
      </Box>

      {/* Menu Options Section */}
      <Box sx={{ p: 2 }}>
        <Paper elevation={1} sx={{ borderRadius: 3, overflow: "hidden", mb: 3 }}>
          <List disablePadding>
            <ListItem button onClick={() => navigate("/orders")}>
              <ListItemIcon><OrdersIcon color="primary" /></ListItemIcon>
              <ListItemText primary="My Orders" secondary="Check your order status" />
            </ListItem>
            <Divider />

            <ListItem button onClick={() => navigate("/wishlist")}>
              <ListItemIcon><WishlistIcon color="error" /></ListItemIcon>
              <ListItemText primary="Wishlist" secondary="Your saved items" />
            </ListItem>
            <Divider />

            <ListItem button onClick={() => navigate("/notifications")}>
              <ListItemIcon><NotificationsIcon color="action" /></ListItemIcon>
              <ListItemText primary="Notifications" secondary="App alerts and updates" />
            </ListItem>
            <Divider />

            <ListItem button onClick={() => navigate("/settings")}>
              <ListItemIcon><SettingsIcon color="action" /></ListItemIcon>
              <ListItemText primary="Settings" secondary="Preferences and security" />
            </ListItem>
          </List>
        </Paper>

        {/* Logout Button */}
        <Button
          fullWidth
          variant="outlined"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            py: 1.5,
            borderRadius: 2,
            fontWeight: "bold",
            textTransform: "none",
            borderColor: "#ff4d4f",
            backgroundColor: "white",
            "&:hover": {
              backgroundColor: "#fff1f0",
            },
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}
