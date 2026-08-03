import React from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function Header({ title = "General Plans Inquiry" }) {
  const handleWhatsAppChat = (planName) => {
    window.open(`https://wa.me/917987468974?text=Hi%20I%20want%20to%20know%20more%20about%20${planName}`, '_blank');
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: { xs: 1.5, sm: 3 },
        py: 0.8,
        height: { xs: 68, sm: 76 },
        borderBottom: "1px solid #eaeaea",
        bgcolor: "#ffffff",
        position: "sticky",
        top: 0,
        zIndex: 1100,
        boxShadow: "0 2px 10px rgba(0,0,0,.04)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1 }}>
        <IconButton edge="start" sx={{ color: "#1b4d3e", p: 0.5 }}>
          <MenuIcon sx={{ fontSize: 28 }} />
        </IconButton>
        <Box
          component="img"
          src="/images/munder-logo-horizontal.png"
          alt="Munder Logo"
          sx={{ width: { xs: 170, sm: 210, md: 260 }, height: "auto", objectFit: "contain", display: "block" }}
        />
      </Box>
      <Button
        variant="contained"
        onClick={() => handleWhatsAppChat(title)}
        startIcon={<WhatsAppIcon />}
        sx={{
          bgcolor: "#0e4d28",
          "&:hover": { bgcolor: "#09361c" },
          borderRadius: "8px",
          textTransform: "none",
          whiteSpace: "nowrap",
          fontSize: { xs: "0.70rem", sm: "0.85rem" },
          px: { xs: 1.3, sm: 2 },
          py: 0.8,
          flexShrink: 0,
        }}
      >
        Chat on WhatsApp
      </Button>
    </Box>
  );
}
