import React, { useState } from 'react';
import { Box, Typography, Paper, Container, Grid, Button, IconButton, Rating, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BottomNav from '../components/BottomNav';

export default function Shop() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState({});
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const shopItems = [
    { id: 1, name: 'Snake Plant (Sansevieria)', category: 'Indoor & Air Purifying', price: '₹499', rating: 4.8, image: '🌿' },
    { id: 2, name: 'Areca Palm', category: 'Lush Green / Office', price: '₹799', rating: 4.6, image: '🌴' },
    { id: 3, name: 'Monstera Deliciosa', category: 'Premium Indoor', price: '₹1,299', rating: 4.9, image: '🪴' },
    { id: 4, name: 'Peace Lily', category: 'Flowering / Shade', price: '₹599', rating: 4.7, image: '🌸' }
  ];

  const toggleWishlist = (id, name) => {
    setWishlist(prev => {
      const updated = { ...prev, [id]: !prev[id] };
      setSnackbarMessage(updated[id] ? `${name} added to Wishlist ❤️` : `${name} removed from Wishlist`);
      setOpenSnackbar(true);
      return updated;
    });
  };

  const handleAddToCart = (name) => {
    setSnackbarMessage(`${name} added to Cart 🛒`);
    setOpenSnackbar(true);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: '#f7f9f6', minHeight: '100vh', pb: 14 }}>
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 2, sm: 3 },
          py: 2,
          bgcolor: "#ffffff",
          borderBottom: "1px solid #eaeaea",
          position: "sticky",
          top: 0,
          zIndex: 1100
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={() => navigate('/')} sx={{ color: '#0e4d28' }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" fontWeight="bold" sx={{ color: '#0f382c' }}>
            Munder Nursery Shop 🛒
          </Typography>
        </Box>
        <IconButton onClick={() => navigate('/cart')} sx={{ color: '#0e4d28', bgcolor: '#f1f8e9' }}>
          <ShoppingCartIcon />
        </IconButton>
      </Box>

      {/* CONTENT GRID */}
      <Container maxWidth="sm" sx={{ py: 3 }}>
        <Grid container spacing={2}>
          {shopItems.map((item) => (
            <Grid item xs={12} sm={6} key={item.id}>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: '24px',
                  border: '1px solid #e0e0e0',
                  bgcolor: '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Wishlist Button */}
                <IconButton
                  onClick={() => toggleWishlist(item.id, item.name)}
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    bgcolor: '#f7f9f6',
                    '&:hover': { bgcolor: '#f1f8e9' }
                  }}
                  size="small"
                >
                  {wishlist[item.id] ? <FavoriteIcon sx={{ color: '#d32f2f' }} /> : <FavoriteBorderIcon sx={{ color: '#666' }} />}
                </IconButton>

                <Box sx={{ textAlign: 'center', my: 2 }}>
                  <Typography variant="h2" sx={{ mb: 1 }}>{item.image}</Typography>
                  <Typography variant="caption" sx={{ bgcolor: '#f1f8e9', color: '#0e4d28', px: 1.5, py: 0.5, borderRadius: '8px', fontWeight: 'bold' }}>
                    {item.category}
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#0f382c', mt: 1 }}>
                    {item.name}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1.5 }}>
                  <Rating value={item.rating} precision={0.1} readOnly size="small" />
                  <Typography variant="caption" color="text.secondary">({item.rating})</Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto', pt: 1, borderTop: '1px solid #f0f0f0' }}>
                  <Typography variant="h6" fontWeight="900" sx={{ color: '#0e4d28' }}>
                    {item.price}
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<ShoppingCartIcon />}
                    onClick={() => handleAddToCart(item.name)}
                    sx={{
                      bgcolor: '#0e4d28',
                      '&:hover': { bgcolor: '#09361c' },
                      borderRadius: '12px',
                      textTransform: 'none',
                      fontWeight: 'bold',
                      px: 2
                    }}
                  >
                    Add
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* SNACKBAR NOTIFICATION */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" variant="filled" sx={{ width: '100%', borderRadius: '12px' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <BottomNav />
    </Box>
  );
}
