import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function OrderSuccess() {
  const navigate = useNavigate();
  const latest = JSON.parse(localStorage.getItem('munder_latest') || '{}');

  return (
    <Box p={3} textAlign="center" pb={10}>
      <Typography variant="h3" mb={1}>🎉</Typography>
      <Typography variant="h5" fontWeight="bold" color="#0e4d28">Booking Successful!</Typography>
      <Typography variant="body2" color="text.secondary" my={1}>Order ID: <b>{latest.orderId}</b></Typography>

      <Card sx={{ my: 2, textAlign: 'left', bgcolor: '#e8f5e9', border: '1px solid #c8e6c9' }}>
        <CardContent>
          <Typography variant="body2" fontWeight="bold" color="#2e7d32">✅ Estimated Arrival</Typography>
          <Typography variant="body2" my={0.5}>Slot: {latest.slot}</Typography>
          <Typography variant="body2" color="text.secondary">Your gardener will contact you within 30 minutes.</Typography>
        </CardContent>
      </Card>

      <Card sx={{ my: 2, textAlign: 'left', bgcolor: '#f9f9f9' }}>
        <CardContent>
          <Typography variant="body2"><b>Assigned Status:</b> <span style={{ color: '#e65100', fontWeight: 'bold' }}>Pending Assignment</span></Typography>
          <Typography variant="body2" mt={1}><b>Payment Mode:</b> {latest.method}</Typography>
          <Typography variant="body2" mt={1}><b>Total Paid:</b> ₹{latest.total}</Typography>
        </CardContent>
      </Card>

      <Button variant="outlined" fullWidth onClick={()=>alert('Downloading professional invoice PDF...')} sx={{ my: 1, color: '#0e4d28', borderColor: '#0e4d28', py: 1.2 }}>
        📄 Download Invoice
      </Button>

      <Button variant="contained" fullWidth onClick={()=>window.open('tel:+919876543210', '_self')} sx={{ my: 1, bgcolor: '#0e4d28', py: 1.2 }}>
        📞 Call Support
      </Button>

      <Button variant="contained" fullWidth onClick={()=>navigate('/orders')} sx={{ my: 1, bgcolor: '#2e7d32', py: 1.5 }}>
        📦 View Orders & Progress
      </Button>
    </Box>
  );
}

