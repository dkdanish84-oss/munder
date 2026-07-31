import React from 'react';
import { Box, Typography, Button, Paper, IconButton, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SecurityIcon from '@mui/icons-material/Security';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VerifiedIcon from '@mui/icons-material/Verified';
import PaymentIcon from '@mui/icons-material/Payment';
import GrassIcon from '@mui/icons-material/Grass';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import BottomNav from '../components/BottomNav';

export default function Plans() {
  const navigate = useNavigate();

  const handleWhatsAppChat = (planName) => {
    window.open(`https://wa.me/917987468974?text=Hi%20I%20want%20to%20know%20more%20about%20${planName}`, '_blank');
  };

  return (
    <Box sx={{ width: '100%', bgcolor: '#f7f9f6', minHeight: '100vh', pb: 14, position: 'relative' }}>
      
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 1.5, sm: 3 },
          py: 0.8,
          height: { xs: 68, sm: 76 },
          borderBottom: "1px solid #eaeaea",
          bgcolor: "#ffffff",
          position: "sticky",
          top: 0,
          zIndex: 1100,
          boxShadow: "0 2px 10px rgba(0,0,0,.04)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1 }}>
          <IconButton edge="start" sx={{ color: "#1b4d3e", p: 0.5 }}>
            <MenuIcon sx={{ fontSize: 28 }} />
          </IconButton>
          <Box
            component="img"
            src="/images/munder-logo-horizontal.png"
            alt="Munder Logo"
            sx={{ width: { xs: 170, sm: 210, md: 260 }, height: "auto", objectFit: "contain", display: "block" }}
          />
        </Box>
        <Button
          variant="contained"
          onClick={() => handleWhatsAppChat("General Plans Inquiry")}
          startIcon={<WhatsAppIcon />}
          sx={{
            bgcolor: "#0e4d28",
            "&:hover": { bgcolor: "#09361c" },
            borderRadius: "8px",
            textTransform: "none",
            whiteSpace: "nowrap",
            fontSize: { xs: "0.70rem", sm: "0.85rem" },
            px: { xs: 1.3, sm: 2 },
            py: 0.8,
            flexShrink: 0,
          }}
        >
          Chat on WhatsApp
        </Button>
      </Box>

      {/* PLANS CONTENT */}
      <Container maxWidth="sm" sx={{ py: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
        
        {/* TOP 4 TRUST FEATURES GRID */}
        <Paper elevation={0} sx={{ p: 2.5, borderRadius: '24px', border: '1px solid #e0e0e0', bgcolor: '#ffffff', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2.5, textAlign: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box sx={{ width: 44, height: 44, borderRadius: '50%', bgcolor: '#f1f8e9', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                <SecurityIcon sx={{ color: '#0e4d28', fontSize: 24 }} />
              </Box>
              <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#0f382c', fontSize: '0.85rem' }}>Trusted Experts</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>Trained & Experienced Professionals</Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box sx={{ width: 44, height: 44, borderRadius: '50%', bgcolor: '#f1f8e9', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                <AccessTimeIcon sx={{ color: '#0e4d28', fontSize: 24 }} />
              </Box>
              <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#0f382c', fontSize: '0.85rem' }}>On-Time Service</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>We value your time, always on schedule.</Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box sx={{ width: 44, height: 44, borderRadius: '50%', bgcolor: '#f1f8e9', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                <VerifiedIcon sx={{ color: '#0e4d28', fontSize: 24 }} />
              </Box>
              <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#0f382c', fontSize: '0.85rem' }}>Quality Assured</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>Best tools, safe products & proven methods.</Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box sx={{ width: 44, height: 44, borderRadius: '50%', bgcolor: '#f1f8e9', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                <PaymentIcon sx={{ color: '#0e4d28', fontSize: 24 }} />
              </Box>
              <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#0f382c', fontSize: '0.85rem' }}>Affordable Plans</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>Flexible monthly plans that suit your needs.</Typography>
            </Box>
          </Box>
        </Paper>

        {/* SECTION HEADER */}
        <Box sx={{ textAlign: 'center', mt: 1, mb: 0.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 0.5 }}>
            <GrassIcon sx={{ color: '#0e4d28', fontSize: 20 }} />
            <Typography variant="caption" fontWeight="bold" sx={{ color: '#0e4d28', letterSpacing: 1 }}>PRICING PLANS</Typography>
            <GrassIcon sx={{ color: '#0e4d28', fontSize: 20 }} />
          </Box>
          <Typography variant="h5" fontWeight="900" sx={{ color: '#0f382c', mb: 0.8 }}>
            Choose the Right Plan for Your Garden
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
            Flexible monthly maintenance plans designed for every garden.
          </Typography>
        </Box>

        {/* 1. BASIC CARE PLAN */}
        <Paper elevation={0} sx={{ p: 3, borderRadius: '24px', border: '1px solid #e0e0e0', bgcolor: '#ffffff', textAlign: 'center', position: 'relative' }}>
          <Box sx={{ width: 56, height: 56, borderRadius: '50%', bgcolor: '#f1f8e9', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 1.5 }}>
            <GrassIcon sx={{ color: '#0e4d28', fontSize: 30 }} />
          </Box>
          <Typography variant="h6" fontWeight="900" sx={{ color: '#0f382c', letterSpacing: 0.5 }}>BASIC CARE</Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>Essential care for small gardens</Typography>
          
          <Typography variant="h4" fontWeight="900" sx={{ color: '#0e4d28', mb: 0.2 }}>₹999</Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>/ Month</Typography>

          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, bgcolor: '#f1f8e9', px: 2, py: 0.6, borderRadius: '16px', mb: 3 }}>
            <EventAvailableIcon sx={{ fontSize: 16, color: '#0e4d28' }} />
            <Typography variant="caption" fontWeight="bold" sx={{ color: '#0e4d28' }}>2 Visits / Month</Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, textAlign: 'left', mb: 3, px: 1 }}>
            {['Lawn Cleaning', 'Basic Pruning', 'Weed Removal', 'Garden Clean-up', 'WhatsApp Support'].map((feat, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <CheckCircleIcon sx={{ fontSize: 18, color: '#2e7d32' }} />
                <Typography variant="body2" sx={{ color: '#333', fontSize: '0.9rem' }}>{feat}</Typography>
              </Box>
            ))}
          </Box>

          <Button
            variant="outlined"
            onClick={() => handleWhatsAppChat("Basic Care Plan")}
            fullWidth
            sx={{
              borderColor: '#0e4d28',
              color: '#0e4d28',
              borderRadius: '12px',
              py: 1.2,
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': { bgcolor: '#f1f8e9', borderColor: '#0e4d28' }
            }}
          >
            View Plan
          </Button>
        </Paper>

        {/* 2. STANDARD CARE PLAN (MOST POPULAR) */}
        <Paper elevation={0} sx={{ p: 3, borderRadius: '24px', border: '2px solid #0e4d28', bgcolor: '#ffffff', textAlign: 'center', position: 'relative', mt: 1 }}>
          <Box
            sx={{
              position: 'absolute',
              top: -14,
              left: '50%',
              transform: 'translateX(-50%)',
              bgcolor: '#0e4d28',
              color: '#fff',
              px: 2.5,
              py: 0.4,
              borderRadius: '12px',
              fontSize: '0.7rem',
              fontWeight: 'bold',
              letterSpacing: 0.5
            }}
          >
            ⭐ MOST POPULAR
          </Box>

          <Box sx={{ width: 56, height: 56, borderRadius: '50%', bgcolor: '#f1f8e9', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 1.5, mt: 1 }}>
            <GrassIcon sx={{ color: '#0e4d28', fontSize: 30 }} />
          </Box>
          <Typography variant="h6" fontWeight="900" sx={{ color: '#0f382c', letterSpacing: 0.5 }}>STANDARD CARE</Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>Perfect balance of care & value</Typography>
          
          <Typography variant="h4" fontWeight="900" sx={{ color: '#0e4d28', mb: 0.2 }}>₹1,999</Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>/ Month</Typography>

          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, bgcolor: '#f1f8e9', px: 2, py: 0.6, borderRadius: '16px', mb: 3 }}>
            <EventAvailableIcon sx={{ fontSize: 16, color: '#0e4d28' }} />
            <Typography variant="caption" fontWeight="bold" sx={{ color: '#0e4d28' }}>4 Visits / Month</Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, textAlign: 'left', mb: 3, px: 1 }}>
            {['Lawn Maintenance', 'Plant Pruning', 'Fertilizer Application', 'Pest Inspection', 'Irrigation Check', 'Garden Clean-up', 'Priority Support'].map((feat, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <CheckCircleIcon sx={{ fontSize: 18, color: '#2e7d32' }} />
                <Typography variant="body2" sx={{ color: '#333', fontSize: '0.9rem' }}>{feat}</Typography>
              </Box>
            ))}
          </Box>

          <Button
            variant="contained"
            onClick={() => handleWhatsAppChat("Standard Care Plan")}
            fullWidth
            sx={{
              bgcolor: '#0e4d28',
              '&:hover': { bgcolor: '#09361c' },
              borderRadius: '12px',
              py: 1.2,
              fontWeight: 'bold',
              textTransform: 'none'
            }}
          >
            Choose This Plan →
          </Button>
        </Paper>

        {/* 3. PREMIUM CARE PLAN */}
        <Paper elevation={0} sx={{ p: 3, borderRadius: '24px', border: '1px solid #e0e0e0', bgcolor: '#ffffff', textAlign: 'center', position: 'relative', mt: 1 }}>
          <Box sx={{ width: 56, height: 56, borderRadius: '50%', bgcolor: '#f1f8e9', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 1.5 }}>
            <GrassIcon sx={{ color: '#0e4d28', fontSize: 30 }} />
          </Box>
          <Typography variant="h6" fontWeight="900" sx={{ color: '#0f382c', letterSpacing: 0.5 }}>PREMIUM CARE</Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>Complete care for lush gardens</Typography>
          
          <Typography variant="h4" fontWeight="900" sx={{ color: '#0e4d28', mb: 0.2 }}>₹3,499</Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>/ Month</Typography>

          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, bgcolor: '#f1f8e9', px: 2, py: 0.6, borderRadius: '16px', mb: 3 }}>
            <EventAvailableIcon sx={{ fontSize: 16, color: '#0e4d28' }} />
            <Typography variant="caption" fontWeight="bold" sx={{ color: '#0e4d28' }}>Weekly Visits</Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, textAlign: 'left', mb: 3, px: 1 }}>
            {['Complete Maintenance', 'Plant Health Monitoring', 'Irrigation Management', 'Seasonal Planting', 'Pest Control', 'Emergency Visit', 'Priority Support'].map((feat, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <CheckCircleIcon sx={{ fontSize: 18, color: '#2e7d32' }} />
                <Typography variant="body2" sx={{ color: '#333', fontSize: '0.9rem' }}>{feat}</Typography>
              </Box>
            ))}
          </Box>

          <Button
            variant="outlined"
            onClick={() => handleWhatsAppChat("Premium Care Plan")}
            fullWidth
            sx={{
              borderColor: '#0e4d28',
              color: '#0e4d28',
              borderRadius: '12px',
              py: 1.2,
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': { bgcolor: '#f1f8e9', borderColor: '#0e4d28' }
            }}
          >
            View Plan
          </Button>
        </Paper>

      </Container>

      {/* COMMON BOTTOM NAVIGATION */}
      <BottomNav />

    </Box>
  );
}
