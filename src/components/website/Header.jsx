import React from 'react';
import { AppBar, Toolbar, Box, Typography, Button, Container, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function Header() {
  return (
    <AppBar position="sticky" color="default" elevation={0} sx={{ bgcolor: '#ffffff', borderBottom: '1px solid #f0f0f0' }}>
      <Container maxWidth="lg" disableGutters sx={{ px: 2 }}>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: '64px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ p: 0.5, mr: 0.5 }}>
              <MenuIcon sx={{ fontSize: '28px', color: '#1b5e20' }} />
            </IconButton>
            
            {/* SVG Replica of MUNDER Original Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 10 C30 10, 10 30, 10 50 C10 70, 30 90, 50 90 C70 90, 90 70, 90 50 Z" fill="#2d5a27"/>
                <path d="M50 20 L80 80 L50 65 L20 80 Z" fill="#ffffff"/>
                <path d="M50 35 L70 75 L50 62 Z" fill="#c8a165"/>
              </svg>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 900, color: '#0d321d', lineHeight: 1, letterSpacing: '1px', fontSize: '1.25rem' }}>
                  MUNDER
                </Typography>
                <Typography variant="caption" sx={{ fontSize: '0.48rem', color: '#666', fontWeight: 700, letterSpacing: '0.5px', display: 'block', mt: 0.2 }}>
                  Landscape • Maintenance • Plants
                </Typography>
              </Box>
            </Box>
          </Box>

          <Button
            variant="contained"
            startIcon={<WhatsAppIcon sx={{ fontSize: '18px !important' }} />}
            sx={{
              bgcolor: '#0d321d',
              color: '#fff',
              textTransform: 'none',
              borderRadius: '8px',
              px: 1.8,
              py: 0.8,
              fontSize: '0.75rem',
              fontWeight: 700,
              boxShadow: 'none',
              '&:hover': { bgcolor: '#144d2d' },
            }}
          >
            Chat on WhatsApp
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
