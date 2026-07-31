import React from 'react';
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Paper,
  IconButton,
  Container
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VerifiedIcon from '@mui/icons-material/Verified';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShieldIcon from '@mui/icons-material/Shield';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import GrassIcon from '@mui/icons-material/Grass';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import GroupIcon from '@mui/icons-material/Group';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PersonIcon from '@mui/icons-material/Person';

const SERVICES_DATA = [
  { title: 'Lawn Care', desc: 'Mowing, edging & clean up', icon: <GrassIcon sx={{ fontSize: 32, color: '#1b4d3e' }} /> },
  { title: 'Plant Pruning', desc: 'Expert pruning for healthy growth', icon: <ContentCutIcon sx={{ fontSize: 32, color: '#1b4d3e' }} /> },
  { title: 'Plant Health Care', desc: 'Nutrition, treatment & protection', icon: <LocalFloristIcon sx={{ fontSize: 32, color: '#1b4d3e' }} /> },
  { title: 'Irrigation Management', desc: 'Smart watering for healthy plants', icon: <WaterDropIcon sx={{ fontSize: 32, color: '#1b4d3e' }} /> },
  { title: 'Garden Clean-up', desc: 'Weed control & garden cleaning', icon: <CleaningServicesIcon sx={{ fontSize: 32, color: '#1b4d3e' }} /> },
  { title: 'Regular Visits', desc: 'Trained team for regular maintenance', icon: <EventAvailableIcon sx={{ fontSize: 32, color: '#1b4d3e' }} /> },
];

export default function Home() {
  const navigate = useNavigate();

  const handleWhatsAppChat = () => {
    window.open(
      "https://wa.me/917987468974?text=Hi%20I%20want%20Garden%20Maintenance",
      "_blank"
    );
  };

  return (
    <Box sx={{ width: '100%', bgcolor: '#ffffff', minHeight: '100vh', pb: 12, position: 'relative', overflowX: 'hidden' }}>
      
      {/* 1. HEADER */}
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
          onClick={handleWhatsAppChat}
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

      {/* 2. HERO SECTION */}
      <Box
        sx={{
          position: 'relative',
          px: 2.5,
          pt: 4,
          pb: 5,
          minHeight: { xs: '520px', md: '620px' },
          display: 'flex',
          alignItems: 'center',
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,.96) 38%, rgba(255,255,255,.72) 55%, rgba(0,0,0,.18) 100%), url("/images/hero-gardener.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'right center',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 520 }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              border: '1px solid #2e7d32',
              bgcolor: '#f1f8e9',
              px: 1.5,
              py: 0.4,
              borderRadius: '20px',
              mb: 2
            }}
          >
            <CheckCircleIcon sx={{ fontSize: '14px', color: '#2e7d32' }} />
            <Typography variant="caption" fontWeight="bold" sx={{ color: '#2e7d32', letterSpacing: 0.5, fontSize: '0.7rem' }}>
              EXPERT CARE • ON TIME • EVERY TIME
            </Typography>
          </Box>

          <Typography variant="h4" fontWeight="800" sx={{ color: '#0f382c', lineHeight: 1.2, mb: 1.5, fontSize: { xs: '1.9rem', sm: '2.2rem' } }}>
            Professional <br />
            <Box component="span" sx={{ color: '#1b4d3e' }}>Garden Maintenance</Box> <br />
            Services
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, fontWeight: 500, fontSize: '0.9rem' }}>
            Healthy Garden. Expert Care. <br />
            <Box component="span" sx={{ color: '#2e7d32', fontWeight: 700 }}>Every Month.</Box>
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 2 }}>
            <Paper
              elevation={0}
              onClick={() => navigate('/inspection')}
              sx={{
                p: 1.8,
                bgcolor: '#0e4d28',
                color: '#ffffff',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: "all .2s ease",
                "&:hover": { transform: "translateY(-2px)", boxShadow: "0 6px 15px rgba(14,77,40,.25)" }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                <VerifiedIcon sx={{ fontSize: '22px', color: '#a5d6a7' }} />
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold" sx={{ lineHeight: 1.2, fontSize: '0.85rem' }}>FREE GARDEN INSPECTION</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.85, fontSize: '0.72rem' }}>No Cost • No Obligation</Typography>
                </Box>
              </Box>
              <Typography variant="h6">›</Typography>
            </Paper>

            <Paper
              variant="outlined"
              onClick={() => navigate('/plans')}
              sx={{
                p: 1.8,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderColor: '#e0e0e0',
                bgcolor: '#ffffff',
                cursor: 'pointer',
                transition: "all .2s ease",
                "&:hover": { transform: "translateY(-2px)", boxShadow: "0 6px 15px rgba(0,0,0,.08)" }
              }}
            >
              <Box>
                <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#0f382c', lineHeight: 1.2, fontSize: '0.85rem' }}>MAINTENANCE PLANS</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.72rem' }}>View & Choose Plan</Typography>
              </Box>
              <Typography variant="h6" sx={{ color: '#757575' }}>›</Typography>
            </Paper>
          </Box>

          <Typography variant="caption" fontWeight="600" sx={{ color: '#333', fontSize: '0.75rem' }}>
            🛡 Trusted by 1000+ Homes & Societies
          </Typography>
        </Box>
      </Box>

      {/* 3. TRUST FEATURES */}
      <Box sx={{ px: 2, py: 2.5 }}>
        <Paper elevation={0} sx={{ bgcolor: '#0e4d28', color: '#ffffff', p: 2, borderRadius: '16px' }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 2 }}>
            <Box sx={{ textAlign: 'center', p: 1 }}>
              <GroupIcon sx={{ fontSize: '26px', mb: 0.5, color: '#a5d6a7' }} />
              <Typography variant="caption" fontWeight="bold" sx={{ display: 'block', fontSize: '0.75rem', lineHeight: 1.2 }}>Trusted Experts</Typography>
              <Typography variant="caption" sx={{ opacity: 0.75, display: 'block', fontSize: '0.62rem', mt: 0.3 }}>Trained & Experienced</Typography>
            </Box>
            <Box sx={{ textAlign: 'center', p: 1 }}>
              <AccessTimeIcon sx={{ fontSize: '26px', mb: 0.5, color: '#a5d6a7' }} />
              <Typography variant="caption" fontWeight="bold" sx={{ display: 'block', fontSize: '0.75rem', lineHeight: 1.2 }}>On-Time Service</Typography>
              <Typography variant="caption" sx={{ opacity: 0.75, display: 'block', fontSize: '0.62rem', mt: 0.3 }}>Always on schedule.</Typography>
            </Box>
            <Box sx={{ textAlign: 'center', p: 1 }}>
              <ShieldIcon sx={{ fontSize: '26px', mb: 0.5, color: '#a5d6a7' }} />
              <Typography variant="caption" fontWeight="bold" sx={{ display: 'block', fontSize: '0.75rem', lineHeight: 1.2 }}>Quality Assured</Typography>
              <Typography variant="caption" sx={{ opacity: 0.75, display: 'block', fontSize: '0.62rem', mt: 0.3 }}>Best tools & safe products.</Typography>
            </Box>
            <Box sx={{ textAlign: 'center', p: 1 }}>
              <CurrencyRupeeIcon sx={{ fontSize: '26px', mb: 0.5, color: '#a5d6a7' }} />
              <Typography variant="caption" fontWeight="bold" sx={{ display: 'block', fontSize: '0.75rem', lineHeight: 1.2 }}>Affordable Plans</Typography>
              <Typography variant="caption" sx={{ opacity: 0.75, display: 'block', fontSize: '0.62rem', mt: 0.3 }}>Value for money packages.</Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* FOOTER NAVIGATION */}
      <Paper
        elevation={10}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: '#ffffff',
          borderTop: '1px solid #eaeaea',
          zIndex: 1200,
          py: 0.8,
          px: 1,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <Box sx={{ textAlign: 'center', color: '#0e4d28', cursor: 'pointer' }} onClick={() => navigate('/')}>
            <GrassIcon sx={{ fontSize: 22 }} />
            <Typography variant="caption" fontWeight="bold" sx={{ display: 'block', fontSize: '0.65rem' }}>Home</Typography>
          </Box>
          <Box sx={{ textAlign: 'center', color: '#777', cursor: 'pointer' }} onClick={() => navigate('/plans')}>
            <EventAvailableIcon sx={{ fontSize: 22 }} />
            <Typography variant="caption" sx={{ display: 'block', fontSize: '0.65rem' }}>Plans</Typography>
          </Box>
          <Box sx={{ textAlign: 'center', color: '#777', cursor: 'pointer' }} onClick={() => navigate('/shop')}>
            <StorefrontIcon sx={{ fontSize: 22 }} />
            <Typography variant="caption" sx={{ display: 'block', fontSize: '0.65rem' }}>Shop</Typography>
          </Box>
          <Box sx={{ textAlign: 'center', color: '#777', cursor: 'pointer' }} onClick={() => navigate('/profile')}>
            <PersonIcon sx={{ fontSize: 22 }} />
            <Typography variant="caption" sx={{ display: 'block', fontSize: '0.65rem' }}>Profile</Typography>
          </Box>
        </Box>
      </Paper>

    </Box>
  );
}
