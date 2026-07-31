import React, { useState } from 'react';
import { Box, Typography, Paper, Container, IconButton, Button, Divider, Avatar, TextField, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import BottomNav from '../components/BottomNav';

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Snake Plant (Sansevieria)', price: 499, qty: 1, category: 'Indoor', image: '🌿' },
    { id: 2, name: 'Areca Palm', price: 799, qty: 2, category: 'Outdoor', image: '🌴' }
  ]);
  const [address, setAddress] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const handleQtyChange = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const handleRemove = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    setSnackbar({ open: true, message: 'Item removed from cart' });
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const deliveryFee = subtotal > 0 ? 49 : 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!address.trim()) {
      setSnackbar({ open: true, message: 'Please enter your delivery address' });
      return;
    }
    setSnackbar({ open: true, message: 'Order Placed Successfully! 🎉' });
    setTimeout(() => {
      navigate('/orders');
    }, 2000);
  };

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
        <IconButton onClick={() => navigate('/shop')} sx={{ color: '#0e4d28' }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" fontWeight="bold" sx={{ color: '#0f382c' }}>
          My Cart & Checkout 🛒
        </Typography>
      </Box>

      {/* CONTENT */}
      <Container maxWidth="sm" sx={{ py: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
        {cartItems.length > 0 ? (
          <>
            {/* ITEMS LIST */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="subtitle1" fontWeight="900" sx={{ color: '#0e4d28' }}>
                Review Items ({cartItems.length})
              </Typography>
              {cartItems.map((item) => (
                <Paper
                  key={item.id}
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: '20px',
                    border: '1px solid #e0e0e0',
                    bgcolor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar variant="rounded" sx={{ width: 56, height: 56, bgcolor: '#f1f8e9', color: '#0e4d28', fontSize: '1.5rem' }}>
                      {item.image}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#0f382c' }}>
                        {item.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                        ₹{item.price} each
                      </Typography>
                      <Typography variant="subtitle2" fontWeight="900" sx={{ color: '#0e4d28' }}>
                        ₹{item.price * item.qty}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                    <IconButton size="small" color="error" onClick={() => handleRemove(item.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                    <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #e0e0e0', borderRadius: '8px', bgcolor: '#f7f9f6' }}>
                      <IconButton size="small" onClick={() => handleQtyChange(item.id, -1)}>
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography variant="body2" fontWeight="bold" sx={{ px: 1 }}>
                        {item.qty}
                      </Typography>
                      <IconButton size="small" onClick={() => handleQtyChange(item.id, 1)}>
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Box>

            {/* CHECKOUT FORM & BILLING */}
            <Paper
              elevation={0}
              component="form"
              onSubmit={handleCheckout}
              sx={{
                p: 3,
                borderRadius: '24px',
                border: '1px solid #e0e0e0',
                bgcolor: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                gap: 2.5,
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
              }}
            >
              <Typography variant="subtitle1" fontWeight="900" sx={{ color: '#0e4d28' }}>
                Delivery Address
              </Typography>
              <TextField
                required
                multiline
                rows={2}
                placeholder="Enter complete delivery address with landmark..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />

              <Divider sx={{ borderColor: '#f0f0f0' }} />

              <Typography variant="subtitle1" fontWeight="900" sx={{ color: '#0e4d28' }}>
                Bill Details
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'column', flexDirection: 'gap', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Item Subtotal</Typography>
                  <Typography variant="body2" fontWeight="bold">₹{subtotal}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Delivery Charge</Typography>
                  <Typography variant="body2" fontWeight="bold">₹{deliveryFee}</Typography>
                </Box>
                <Divider sx={{ my: 1, borderColor: '#f0f0f0' }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle1" fontWeight="900" sx={{ color: '#0f382c' }}>Total Amount</Typography>
                  <Typography variant="subtitle1" fontWeight="900" sx={{ color: '#0e4d28' }}>₹{total}</Typography>
                </Box>
              </Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                startIcon={<ShoppingBagIcon />}
                sx={{
                  bgcolor: '#0e4d28',
                  '&:hover': { bgcolor: '#09361c' },
                  borderRadius: '16px',
                  py: 1.5,
                  fontWeight: 'bold',
                  textTransform: 'none',
                  fontSize: '1rem',
                  mt: 1
                }}
              >
                Place Order (COD)
              </Button>
            </Paper>
          </>
        ) : (
          <Paper elevation={0} sx={{ p: 5, textAlign: 'center', borderRadius: '24px', border: '1px solid #e0e0e0' }}>
            <ShoppingBagIcon sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
            <Typography variant="h6" fontWeight="bold" sx={{ color: '#0f382c', mb: 1 }}>Your Cart is Empty</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Explore our nursery shop and add some green plants!</Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/shop')}
              sx={{ bgcolor: '#0e4d28', '&:hover': { bgcolor: '#09361c' }, borderRadius: '12px', textTransform: 'none', fontWeight: 'bold', px: 4 }}
            >
              Go to Shop
            </Button>
          </Paper>
        )}
      </Container>

      {/* SNACKBAR */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity="success" variant="filled" sx={{ width: '100%', borderRadius: '12px' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <BottomNav />
    </Box>
  );
}
