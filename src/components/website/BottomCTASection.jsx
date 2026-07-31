import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CallIcon from '@mui/icons-material/Call';
import ParkIcon from '@mui/icons-material/Park';

export default function BottomCTASection() {
  return (
    <Container maxWidth="lg" sx={{ py: 4, px: 2 }}>
      <Box
        sx={{
          bgcolor: '#f5f6ee',
          p: { xs: 2.5, md: 4 },
          borderRadius: '16px',
          border: '1px solid #e0e4d0',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ bgcolor: '#fff', p: 1.5, borderRadius: '50%', color: '#1b5e20', display: { xs: 'none', sm: 'flex' } }}>
            <ParkIcon fontSize="medium" />
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1a1a1a', fontSize: '0.95rem' }}>
              We take care of your garden like our own.
            </Typography>
            <Typography variant="caption" sx={{ color: '#666' }}>
              You relax, we make it beautiful and healthy.
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 1.5, width: { xs: '100%', md: 'auto' } }}>
          <Button
            variant="contained"
            startIcon={<WhatsAppIcon />}
            sx={{ bgcolor: '#0f3822', flex: 1, textTransform: 'none', borderRadius: '10px', fontSize: '0.8rem', py: 1.2, '&:hover': { bgcolor: '#164f30' } }}
          >
            Chat on WhatsApp
          </Button>
          <Button
            variant="outlined"
            startIcon={<CallIcon />}
            sx={{ bgcolor: '#fff', color: '#333', borderColor: '#ccc', flex: 1, textTransform: 'none', borderRadius: '10px', fontSize: '0.8rem', py: 1.2 }}
          >
            Call Us
          </Button>
        </Box>
      </Box>

      {/* Grid using CSS Grid for perfect 2-column mobile stat items */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' }, gap: 2, mt: 4, pt: 3, borderTop: '1px solid #eee', textAlign: 'center' }}>
        {[
          { count: '100+', label: 'Expert Team' },
          { count: '2500+', label: 'Gardens Maintained' },
          { count: '50+', label: 'Residential Societies' },
          { count: '1000+', label: 'Happy Customers' },
        ].map((stat, idx) => (
          <Box key={idx} sx={{ p: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#1a1a1a', fontSize: '1.4rem' }}>
              {stat.count}
            </Typography>
            <Typography variant="caption" sx={{ color: '#666', fontWeight: 600, fontSize: '0.75rem' }}>
              {stat.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
