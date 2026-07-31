import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import EnergySavingsLeafOutlinedIcon from '@mui/icons-material/EnergySavingsLeafOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

export default function HeroSection() {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: '500px', sm: '550px' },
        overflow: 'hidden',
        bgcolor: '#f4f7f4',
        backgroundImage: 'url("https://images.unsplash.com/photo-1592417817098-8f3d6eb23659?q=80&w=1200&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'right 30% center',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Soft gradient blend so text stays readable and gardener image merges seamlessly */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: {
            xs: 'linear-gradient(to right, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.85) 55%, rgba(255,255,255,0.1) 100%)',
            md: 'linear-gradient(to right, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 100%)',
          },
          zIndex: 1,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, py: 3, px: 2 }}>
        <Box maxWidth="420px">
          {/* Badge */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.6,
              bgcolor: '#eef5ed',
              color: '#1b5e20',
              px: 1.5,
              py: 0.5,
              borderRadius: '50px',
              border: '1px solid #c8e6c9',
              fontSize: '0.65rem',
              fontWeight: 800,
              mb: 2,
            }}
          >
            <EnergySavingsLeafOutlinedIcon sx={{ fontSize: '14px' }} />
            EXPERT CARE • ON TIME • EVERY TIME
          </Box>

          {/* Headline */}
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 900,
              color: '#0d321d',
              lineHeight: 1.1,
              mb: 1.5,
              fontSize: { xs: '2.1rem', sm: '2.6rem' },
            }}
          >
            Professional <br />
            <Box component="span" sx={{ color: '#2e7d32' }}>Garden Maintenance</Box> <br />
            Services
          </Typography>

          {/* Subtitle */}
          <Typography variant="body2" sx={{ color: '#444', fontWeight: 600, mb: 3, lineHeight: 1.4, fontSize: '0.85rem' }}>
            Healthy Garden. Expert Care. <br />
            <Box component="span" sx={{ color: '#2e7d32', fontWeight: 800 }}>Every Month.</Box>
          </Typography>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, mb: 2.5 }}>
            <Button
              variant="contained"
              disableElevation
              disableRipple
              startIcon={<EnergySavingsLeafOutlinedIcon />}
              endIcon={<ChevronRightIcon />}
              sx={{
                bgcolor: '#0d321d',
                color: '#fff',
                p: '10px 16px',
                borderRadius: '12px',
                justifyContent: 'space-between',
                textTransform: 'none',
                textAlign: 'left',
                '&:hover': { bgcolor: '#144d2d' },
              }}
            >
              <Box sx={{ flexGrow: 1, ml: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, fontSize: '0.78rem', lineHeight: 1.2 }}>
                  FREE GARDEN INSPECTION
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8, fontSize: '0.62rem' }}>
                  No Cost • No Obligation
                </Typography>
              </Box>
            </Button>

            <Button
              variant="outlined"
              disableElevation
              disableRipple
              startIcon={<AssignmentOutlinedIcon sx={{ color: '#0d321d' }} />}
              endIcon={<ChevronRightIcon sx={{ color: '#333' }} />}
              sx={{
                bgcolor: '#ffffff',
                color: '#333',
                borderColor: '#d0d0d0',
                p: '10px 16px',
                borderRadius: '12px',
                justifyContent: 'space-between',
                textTransform: 'none',
                textAlign: 'left',
                '&:hover': { bgcolor: '#f9f9f9', borderColor: '#bbb' },
              }}
            >
              <Box sx={{ flexGrow: 1, ml: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, fontSize: '0.78rem', lineHeight: 1.2 }}>
                  MAINTENANCE PLANS
                </Typography>
                <Typography variant="caption" sx={{ color: '#666', fontSize: '0.62rem' }}>
                  View & Choose Plan
                </Typography>
              </Box>
            </Button>
          </Box>

          {/* Trust Check */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#333' }}>
            <ShieldOutlinedIcon sx={{ color: '#2e7d32', fontSize: '18px' }} />
            <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.72rem' }}>
              Trusted by 1000+ Homes & Societies
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
