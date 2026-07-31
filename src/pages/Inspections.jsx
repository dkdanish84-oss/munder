import React from 'react';
import { Box, Typography, Paper, Container, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BottomNav from '../components/BottomNav';

export default function Inspections() {
  const navigate = useNavigate();

  // Mock inspection history data
  const inspections = [
    { id: 'INS-1082', date: '05 Aug 2026', area: 'Arera Colony, Bhopal', size: 'Medium', status: 'Scheduled' },
    { id: 'INS-1045', date: '12 Jun 2026', area: 'MP Nagar, Bhopal', size: 'Small', status: 'Completed' }
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
          My Inspection History 📋
        </Typography>
      </Box>

      {/* CONTENT */}
      <Container maxWidth="sm" sx={{ py: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {inspections.length > 0 ? (
          inspections.map((item) => (
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
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#0e4d28' }}>
                  {item.id}
                </Typography>
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.5,
                    bgcolor: item.status === 'Completed' ? '#e8f5e9' : '#fff3e0',
                    color: item.status === 'Completed' ? '#2e7d32' : '#e65100',
                    px: 1.5,
                    py: 0.4,
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}
                >
                  {item.status === 'Completed' ? <CheckCircleIcon sx={{ fontSize: 14 }} /> : <AccessTimeIcon sx={{ fontSize: 14 }} />}
                  {item.status}
                </Box>
              </Box>

              <Typography variant="body2" sx={{ color: '#333', mb: 0.5 }}>
                <strong>Area:</strong> {item.area}
              </Typography>
              <Typography variant="body2" sx={{ color: '#333', mb: 0.5 }}>
                <strong>Garden Size:</strong> {item.size}
              </Typography>
              <Typography variant="body2" sx={{ color: '#333' }}>
                <strong>Preferred Date:</strong> {item.date}
              </Typography>
            </Paper>
          ))
        ) : (
          <Paper elevation={0} sx={{ p: 4, textAlign: 'center', borderRadius: '20px', border: '1px solid #e0e0e0' }}>
            <AssignmentIcon sx={{ fontSize: 48, color: '#ccc', mb: 1 }} />
            <Typography variant="body1" color="text.secondary">No inspection history found.</Typography>
          </Paper>
        )}
      </Container>

      <BottomNav />
    </Box>
  );
}
