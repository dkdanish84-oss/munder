import React, { useState } from 'react';
import { Box, Typography, Paper, Container, IconButton, Switch, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BottomNav from '../components/BottomNav';

export default function Settings() {
  const navigate = useNavigate();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);

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
          Settings ⚙️
        </Typography>
      </Box>

      {/* CONTENT */}
      <Container maxWidth="sm" sx={{ py: 3 }}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: '20px',
            border: '1px solid #e0e0e0',
            bgcolor: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,
            boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
          }}
        >
          <Typography variant="subtitle1" fontWeight="900" sx={{ color: '#0e4d28', mb: 0.5 }}>
            Preferences
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="body1" fontWeight="bold" sx={{ color: '#0f382c' }}>Push Notifications</Typography>
              <Typography variant="caption" color="text.secondary">Receive reminders for inspection & tips</Typography>
            </Box>
            <Switch
              checked={notificationsEnabled}
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
              sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0e4d28' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#0e4d28' } }}
            />
          </Box>

          <Divider sx={{ borderColor: '#f0f0f0' }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="body1" fontWeight="bold" sx={{ color: '#0f382c' }}>WhatsApp Alerts</Typography>
              <Typography variant="caption" color="text.secondary">Get updates directly on WhatsApp</Typography>
            </Box>
            <Switch
              checked={whatsappAlerts}
              onChange={(e) => setWhatsappAlerts(e.target.checked)}
              sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0e4d28' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#0e4d28' } }}
            />
          </Box>
        </Paper>
      </Container>

      <BottomNav />
    </Box>
  );
}
