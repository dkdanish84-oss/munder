import React, { useState } from 'react';
import { Box, Typography, Button, LinearProgress, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function Payment() {
  const navigate = useNavigate();
  const [method, setMethod] = useState('UPI');

  const handlePay = () => {
    const orderId = `MND${new Date().toISOString().slice(0,10).replace(/-/g,'')}${Math.floor(1000+Math.random()*9000)}`;
    const newOrder = {
      orderId,
      method,
      slot: localStorage.getItem('munder_slot'),
      total: localStorage.getItem('munder_cart_total') || '1499',
      status: 'Confirmed',
      progressStep: 1 // 1: Confirmed, 2: Assigned, 3: On the Way, 4: Service Started, 5: Completed
    };
    const orders = JSON.parse(localStorage.getItem('munder_orders') || '[]');
    orders.unshift(newOrder);
    localStorage.setItem('munder_orders', JSON.stringify(orders));
    localStorage.setItem('munder_latest', JSON.stringify(newOrder));
    navigate('/order-success');
  };

  return (
    <Box p={3} pb={10}>
      <Box mb={2}>
        <Typography variant="caption" color="#0e4d28" fontWeight="bold">Step 5 of 6: Secure Payment</Typography>
        <LinearProgress variant="determinate" value={83} sx={{ mt: 1, height: 6, borderRadius: 3, '& .MuiLinearProgress-bar': { bgcolor: '#0e4d28' } }} />
      </Box>

      <Typography variant="subtitle2" fontWeight="bold" mb={1}>Select Payment Method</Typography>
      {['UPI (Google Pay, PhonePe, Paytm)', 'Cards (Credit / Debit)', 'Net Banking', 'Wallet', 'Cash after First Visit'].map(m => (
        <Button key={m} variant={method === m ? 'contained' : 'outlined'} fullWidth onClick={()=>setMethod(m)} sx={{ my: 1, justifyContent: 'flex-start', p: 1.5, bgcolor: method === m ? '#0e4d28' : '#fff', color: method === m ? '#fff' : '#0e4d28', borderColor: '#0e4d28' }}>{m}</Button>
      ))}

      <Card sx={{ bgcolor: '#f1f8e9', mt: 4, mb: 2, border: '1px solid #c8e6c9', textAlign: 'center' }}>
        <CardContent>
          <Typography variant="body2" fontWeight="bold" color="#0e4d28">🔒 100% Secure • SSL Certified • Fully Encrypted</Typography>
        </CardContent>
      </Card>

      <Button variant="contained" fullWidth onClick={handlePay} sx={{ mt: 2, bgcolor: '#0e4d28', py: 1.5 }}>
        Confirm & Pay Now
      </Button>
    </Box>
  );
}


