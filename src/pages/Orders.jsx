import React from 'react';
import { Box, Typography, Paper, Container, IconButton, Button, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BottomNav from '../components/BottomNav';

export default function Orders() {
  const navigate = useNavigate();

  const orders = [
    { id: 'ORD-5491', item: 'Standard Care Plan (1 Month)', price: '₹1,999', date: '01 Aug 2026', status: 'Active' },
    { id: 'ORD-5210', item: 'Indoor Snake Plant + Pot', price: '₹649', date: '15 Jul 2026', status: 'Delivered' }
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
          My Orders 📦
        </Typography>
      </Box>

      {/* CONTENT */}
      <Container maxWidth="sm" sx={{ py: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {orders.length > 0 ? (
          orders.map((order) => (
            <Paper
              key={order.id}
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
                  {order.id}
                </Typography>
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.5,
                    bgcolor: order.status === 'Active' ? '#e8f5e9' : '#e0f7fa',
                    color: order.status === 'Active' ? '#2e7d32' : '#006064',
                    px: 1.5,
                    py: 0.4,
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}
                >
                  <CheckCircleIcon sx={{ fontSize: 14 }} />
                  {order.status}
                </Box>
              </Box>

              <Typography variant="body1" fontWeight="bold" sx={{ color: '#0f382c', mb: 0.5 }}>
                {order.item}
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Ordered on: {order.date}
                </Typography>
                <Typography variant="subtitle1" fontWeight="900" sx={{ color: '#0e4d28' }}>
                  {order.price}
                </Typography>
              </Box>

              <Divider sx={{ my: 1.5, borderColor: '#f0f0f0' }} />

              <Button
                variant="outlined"
                fullWidth
                startIcon={<VisibilityIcon />}
                sx={{
                  color: '#0e4d28',
                  borderColor: '#0e4d28',
                  '&:hover': { borderColor: '#09361c', bgcolor: '#f1f8e9' },
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  py: 0.8
                }}
              >
                View Details
              </Button>
            </Paper>
          ))
        ) : (
          <Paper elevation={0} sx={{ p: 4, textAlign: 'center', borderRadius: '20px', border: '1px solid #e0e0e0' }}>
            <LocalShippingIcon sx={{ fontSize: 48, color: '#ccc', mb: 1 }} />
            <Typography variant="body1" color="text.secondary">No orders found.</Typography>
          </Paper>
        )}
      </Container>

      <BottomNav />
    </Box>
  );
}
