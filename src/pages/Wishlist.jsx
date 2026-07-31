import React from 'react';
import { Box, Typography, Paper, Container, IconButton, Button, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BottomNav from '../components/BottomNav';

export default function Wishlist() {
  const navigate = useNavigate();

  const wishlistItems = [
    { id: 1, name: 'Snake Plant (Sansevieria)', price: '₹499', category: 'Indoor & Air Purifying' },
    { id: 2, name: 'Areca Palm', price: '₹799', category: 'Lush Green / Office' }
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
          My Wishlist ❤️
        </Typography>
      </Box>

      {/* CONTENT */}
      <Container maxWidth="sm" sx={{ py: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {wishlistItems.length > 0 ? (
          wishlistItems.map((item) => (
            <Paper
              key={item.id}
              elevation={0}
              sx={{
                p: 2,
                borderRadius: '20px',
                border: '1px solid #e0e0e0',
                bgcolor: '#ffffff',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar variant="rounded" sx={{ width: 56, height: 56, bgcolor: '#f1f8e9', color: '#0e4d28' }}>
                    🌿
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#0f382c' }}>
                      {item.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                      {item.category}
                    </Typography>
                    <Typography variant="subtitle2" fontWeight="900" sx={{ color: '#0e4d28' }}>
                      {item.price}
                    </Typography>
                  </Box>
                </Box>

                <IconButton color="error" size="small">
                  <DeleteIcon />
                </IconButton>
              </Box>

              <Button
                variant="contained"
                fullWidth
                startIcon={<ShoppingCartIcon />}
                sx={{
                  bgcolor: '#0e4d28',
                  '&:hover': { bgcolor: '#09361c' },
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  py: 1
                }}
              >
                Add to Cart
              </Button>
            </Paper>
          ))
        ) : (
          <Paper elevation={0} sx={{ p: 4, textAlign: 'center', borderRadius: '20px', border: '1px solid #e0e0e0' }}>
            <FavoriteIcon sx={{ fontSize: 48, color: '#ccc', mb: 1 }} />
            <Typography variant="body1" color="text.secondary">Your wishlist is empty.</Typography>
          </Paper>
        )}
      </Container>

      <BottomNav />
    </Box>
  );
}
