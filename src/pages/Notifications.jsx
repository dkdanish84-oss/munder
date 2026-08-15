import React from 'react';
import { Box, Typography, Paper, Container, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BottomNav from '../components/BottomNav';

export default function Notifications() {
  const navigate = useNavigate();

  // Mock notifications data
  const notifications = [
    { id: 1, title: 'Inspection Confirmed!', desc: 'Your free garden inspection is scheduled for 05 Aug 2026.', time: '2 hours ago' },
    { id: 2, title: 'Monsoon Gardening Tip 🌿', desc: 'Ensure proper drainage in your pots to prevent root rot during heavy rains.', time: '1 day ago' }
  ];

  return (
    <Box sx={{ width: '100%', bgcolor: '#f7f9f6', minHeight: '100vh', pb: 14 }}>
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          px: { xs: 2, sm: 3 },
          py: 2,
          bgcolor: "#ffffff",
          borderBottom: "1px solid #eaeaea",
          position: "sticky",
          top: 0,
          zIndex: 1100,
          gap: 2
        }}
      >
        <IconButton onClick={() => navigate('/profile')} sx={{ color: '#0e4d28' }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" fontWeight="bold" sx={{ color: '#0f382c' }}>
          Notifications 🔔
        </Typography>
      </Box>

      {/* CONTENT */}
      <Container maxWidth="sm" sx={{ py: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {notifications.length > 0 ? (
          notifications.map((item) => (
            <Paper
              key={item.id}
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: '20px',
                border: '1px solid #e0e0e0',
                bgcolor: '#ffffff',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
              }}
            >
              <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#0e4d28', mb: 0.5 }}>
                {item.title}
              </Typography>
              <Typography variant="body2" sx={{ color: '#333', mb: 1, lineHeight: 1.5 }}>
                {item.desc}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {item.time}
              </Typography>
            </Paper>
          ))
        ) : (
          <Paper elevation={0} sx={{ p: 4, textAlign: 'center', borderRadius: '20px', border: '1px solid #e0e0e0' }}>
            <NotificationsIcon sx={{ fontSize: 48, color: '#ccc', mb: 1 }} />
            <Typography variant="body1" color="text.secondary">No notifications yet.</Typography>
          </Paper>
        )}
      </Container>

      <BottomNav />
    </Box>
  );
}
