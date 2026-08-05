import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, Container, Avatar, Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SEO from "../components/SEO";

import GrassIcon from '@mui/icons-material/Grass';
import SecurityIcon from '@mui/icons-material/Security';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VerifiedIcon from '@mui/icons-material/Verified';
import StarIcon from '@mui/icons-material/Star';
import BuildIcon from '@mui/icons-material/Build';
import LandscapeIcon from '@mui/icons-material/Landscape';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import StorefrontIcon from '@mui/icons-material/Storefront';

export default function Home() {
  const navigate = useNavigate();

  const projectsImages = [
    '/images/slide01.jpg',
    '/images/slide02.jpg',
    '/images/slide03.jpg',
    '/images/slide04.jpg',
    '/images/slide05.jpg',
    '/images/slide06.jpg',
    '/images/slide07.jpg',
    '/images/slide08.jpg',
    '/images/slide09.jpg',
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % projectsImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [projectsImages.length]);

  const handleWhatsAppChat = (serviceName) => {
    window.open(`https://wa.me/917987468974?text=Hi%20I%20want%20to%20know%20more%20about%20${serviceName}`, '_blank');
  };

  const primaryBtnStyles = {
    borderRadius: '16px',
    height: '48px',
    fontWeight: 700,
    textTransform: 'none',
  };

  return (

<>
  <SEO
    title="Munder | Garden Maintenance & Landscaping Services in Bhopal"
    description="Professional garden maintenance, landscaping, lawn care, irrigation and plant care services in Bhopal. Book your free garden inspection with Munder."
    keywords="garden maintenance bhopal, landscaping bhopal, gardener service, lawn care, plant care, irrigation, munder"
    url="https://munder.in/"
  />
    <Box sx={{ width: '100%', bgcolor: '#f7f9f6', minHeight: '100vh', pb: 14, position: 'relative' }}>
      
      {/* 1. HERO SECTION */}
      <Box 
        sx={{ 
          backgroundImage: "linear-gradient(rgba(0,0,0,.18), rgba(0,0,0,.32)), url('/images/hero-gardener.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff', 
          py: { xs: 8, sm: 10 }, 
          px: 2, 
          textAlign: 'center',
          borderBottomLeftRadius: '32px',
          borderBottomRightRadius: '32px',
          mb: 3
        }}
      >
        <Container maxWidth="sm">
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(0,0,0,0.4)', px: 2, py: 0.5, borderRadius: '20px', mb: 2, backdropFilter: 'blur(4px)' }}>
            <GrassIcon sx={{ fontSize: 18, color: '#a5d6a7' }} />
            <Typography variant="caption" fontWeight="bold" sx={{ color: '#a5d6a7', letterSpacing: 0.5 }}>PROFESSIONAL GARDENING SERVICES</Typography>
          </Box>
          <Typography variant="h4" fontWeight="900" sx={{ mb: 1.5, lineHeight: 1.2, fontSize: { xs: '1.8rem', sm: '2.4rem' }, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
            Bring Your Dream Garden to Life 🌿
          </Typography>
          <Typography variant="body2" sx={{ color: '#f0f0f0', mb: 3, fontSize: '0.95rem', px: 1, textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
            Expert garden care, custom landscaping, and smart solutions delivered right to your doorstep.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/visit')}
            sx={{
              ...primaryBtnStyles,
              bgcolor: '#25D366',
              '&:hover': { bgcolor: '#1EBE5D' },
              color: '#fff',
              px: 4,
              fontSize: '1rem',
              boxShadow: '0 4px 15px rgba(37,211,102,0.4)'
            }}
          >
            Book Free Visit Now
          </Button>
        </Container>
      </Box>

      <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>

        {/* 2. FREE GARDEN VISIT */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            borderRadius: '24px', 
            border: '2px solid #0e4d28', 
            bgcolor: '#ffffff',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
            textAlign: 'center'
          }}
        >
          <Typography variant="caption" fontWeight="bold" sx={{ color: '#0e4d28', letterSpacing: 1, display: 'block', mb: 0.5 }}>
            100% FREE EXPERT INSPECTION
          </Typography>
          <Typography variant="h6" fontWeight="900" sx={{ color: '#0f382c', mb: 1 }}>
            Want to Transform Your Garden?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, fontSize: '0.85rem' }}>
            Schedule a free visit with our professional gardeners. Get custom quotes & expert consultation.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/visit')}
            fullWidth
            sx={{
              ...primaryBtnStyles,
              bgcolor: '#0e4d28',
              '&:hover': { bgcolor: '#09361c' },
            }}
          >
            Schedule Free Visit →
          </Button>
        </Paper>

        {/* 3. OUR SERVICES */}
        <Box>
          <Box sx={{ textAlign: 'center', mb: 2.5 }}>
            <Typography variant="caption" fontWeight="bold" sx={{ color: '#0e4d28', letterSpacing: 1 }}>WHAT WE DO</Typography>
            <Typography variant="h5" fontWeight="900" sx={{ color: '#0f382c' }}>Our Services</Typography>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
            
            {/* Service 1 */}
            <Paper elevation={0} sx={{ borderRadius: '24px', border: '1px solid #e0e0e0', overflow: 'hidden', bgcolor: '#ffffff', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
              <Box sx={{ overflow: 'hidden', height: 130 }}>
                <Box component="img" src="/images/Maintenance01.jpg" alt="Garden Maintenance" sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.05)' } }} />
              </Box>
              <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                    <BuildIcon sx={{ fontSize: 16, color: '#0e4d28' }} />
                    <Typography variant="subtitle2" fontWeight="900" sx={{ color: '#0f382c', fontSize: '0.85rem' }}>Maintenance</Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: '0.72rem', mb: 1.5 }}>Regular care & pruning.</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button variant="text" onClick={() => navigate("/garden-maintenance-bhopal")} sx={{ ...primaryBtnStyles, height: '32px', fontSize: '0.75rem', color: '#0e4d28', justifyContent: 'flex-start', p: 0 }}>
                    Learn More →
                  </Button>
                  <Button variant="contained" onClick={() => navigate("/garden-maintenance-bhopal")} sx={{ ...primaryBtnStyles, height: '36px', fontSize: '0.75rem', bgcolor: '#0e4d28', '&:hover': { bgcolor: '#09361c' } }}>
                    Book Service
                  </Button>
                </Box>
              </Box>
            </Paper>

            {/* Service 2 */}
            <Paper elevation={0} sx={{ borderRadius: '24px', border: '1px solid #e0e0e0', overflow: 'hidden', bgcolor: '#ffffff', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
              <Box sx={{ overflow: 'hidden', height: 130 }}>
                <Box component="img" src="/images/Development01.jpg" alt="Garden Development" sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.05)' } }} />
              </Box>
              <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                    <LandscapeIcon sx={{ fontSize: 16, color: '#0e4d28' }} />
                    <Typography variant="subtitle2" fontWeight="900" sx={{ color: '#0f382c', fontSize: '0.85rem' }}>Development</Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: '0.72rem', mb: 1.5 }}>Landscape & lawn setup.</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button variant="text" onClick={() => handleWhatsAppChat("Garden Development")} sx={{ ...primaryBtnStyles, height: '32px', fontSize: '0.75rem', color: '#0e4d28', justifyContent: 'flex-start', p: 0 }}>
                    View Gallery →
                  </Button>
                  <Button variant="contained" onClick={() => handleWhatsAppChat("Get Quote for Garden Development")} sx={{ ...primaryBtnStyles, height: '36px', fontSize: '0.75rem', bgcolor: '#0e4d28', '&:hover': { bgcolor: '#09361c' } }}>
                    Get Quote
                  </Button>
                </Box>
              </Box>
            </Paper>

            {/* Service 3 */}
            <Paper elevation={0} sx={{ borderRadius: '24px', border: '1px solid #e0e0e0', overflow: 'hidden', bgcolor: '#ffffff', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
              <Box sx={{ overflow: 'hidden', height: 130 }}>
                <Box component="img" src="/images/Irrigation01.jpg" alt="Smart Irrigation" sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.05)' } }} />
              </Box>
              <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                    <WaterDropIcon sx={{ fontSize: 16, color: '#0e4d28' }} />
                    <Typography variant="subtitle2" fontWeight="900" sx={{ color: '#0f382c', fontSize: '0.85rem' }}>Irrigation</Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: '0.72rem', mb: 1.5 }}>Automated watering systems.</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button variant="text" onClick={() => handleWhatsAppChat("Smart Irrigation")} sx={{ ...primaryBtnStyles, height: '32px', fontSize: '0.75rem', color: '#0e4d28', justifyContent: 'flex-start', p: 0 }}>
                    Learn More →
                  </Button>
                  <Button variant="contained" onClick={() => handleWhatsAppChat("Free Consultation for Irrigation")} sx={{ ...primaryBtnStyles, height: '36px', fontSize: '0.75rem', bgcolor: '#0e4d28', '&:hover': { bgcolor: '#09361c' } }}>
                    Free Consultation
                  </Button>
                </Box>
              </Box>
            </Paper>

            {/* Service 4 */}
            <Paper elevation={0} sx={{ borderRadius: '24px', border: '1px solid #e0e0e0', overflow: 'hidden', bgcolor: '#ffffff', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
              <Box sx={{ overflow: 'hidden', height: 130 }}>
                <Box component="img" src="/images/Plantshop01.jpg" alt="Plant Shop" sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.05)' } }} />
              </Box>
              <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                    <StorefrontIcon sx={{ fontSize: 16, color: '#0e4d28' }} />
                    <Typography variant="subtitle2" fontWeight="900" sx={{ color: '#0f382c', fontSize: '0.85rem' }}>Plant Shop</Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: '0.72rem', mb: 1.5 }}>Indoor & outdoor plants.</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button variant="text" onClick={() => navigate('/shop')} sx={{ ...primaryBtnStyles, height: '32px', fontSize: '0.75rem', color: '#0e4d28', justifyContent: 'flex-start', p: 0 }}>
                    Learn More →
                  </Button>
                  <Button variant="contained" onClick={() => navigate('/shop')} sx={{ ...primaryBtnStyles, height: '36px', fontSize: '0.75rem', bgcolor: '#0e4d28', '&:hover': { bgcolor: '#09361c' } }}>
                    Visit Shop
                  </Button>
                </Box>
              </Box>
            </Paper>

          </Box>
        </Box>

        {/* 4. OUR PROJECTS */}
        <Box>
          <Box sx={{ textAlign: 'center', mb: 2.5 }}>
            <Typography variant="caption" fontWeight="bold" sx={{ color: '#0e4d28', letterSpacing: 1 }}>OUR PORTFOLIO</Typography>
            <Typography variant="h5" fontWeight="900" sx={{ color: '#0f382c' }}>Our Recent Projects</Typography>
          </Box>

          <Paper elevation={0} sx={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid #e0e0e0', bgcolor: '#ffffff' }}>
            <Box 
              component="img" 
              src={projectsImages[currentSlide]} 
              alt="Munder Garden Project" 
              sx={{ width: '100%', height: 220, objectFit: 'cover', display: 'block', transition: 'all 0.5s ease-in-out' }} 
            />
            <Box sx={{ p: 2, textAlign: 'center', bgcolor: '#ffffff', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0.8 }}>
              {projectsImages.map((_, idx) => (
                <Box
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  sx={{
                    width: currentSlide === idx ? 16 : 8,
                    height: 8,
                    borderRadius: '4px',
                    bgcolor: currentSlide === idx ? '#0e4d28' : '#d0d0d0',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                />
              ))}
            </Box>
          </Paper>
        </Box>

        {/* 5. CUSTOMER REVIEWS */}
        <Box>
          <Box sx={{ textAlign: 'center', mb: 2.5 }}>
            <Typography variant="caption" fontWeight="bold" sx={{ color: '#0e4d28', letterSpacing: 1 }}>TESTIMONIALS</Typography>
            <Typography variant="h5" fontWeight="900" sx={{ color: '#0f382c' }}>What Our Clients Say</Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: '24px', border: '1px solid rgba(255,255,255,0.6)', bgcolor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)', boxShadow: '0 8px 32px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Rating value={5} readOnly size="small" />
              <Typography variant="body2" sx={{ color: '#333', fontStyle: 'italic', fontSize: '0.9rem', lineHeight: 1.5 }}>
                "Munder transformed our garden into a stunning paradise. Their team is professional, quick, and very thorough!"
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 0.5 }}>
                <Avatar sx={{ bgcolor: '#0e4d28', fontWeight: 'bold', width: 36, height: 36, fontSize: '0.9rem' }}>RS</Avatar>
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#0f382c', fontSize: '0.85rem' }}>Rajesh Sharma</Typography>
                  <Typography variant="caption" color="text.secondary">Bhopal</Typography>
                </Box>
              </Box>
            </Paper>

            <Paper elevation={0} sx={{ p: 3, borderRadius: '24px', border: '1px solid rgba(255,255,255,0.6)', bgcolor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)', boxShadow: '0 8px 32px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Rating value={5} readOnly size="small" />
              <Typography variant="body2" sx={{ color: '#333', fontStyle: 'italic', fontSize: '0.9rem', lineHeight: 1.5 }}>
                "The free visit booking was seamless, and the experts gave us amazing insights on maintaining our lawn."
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 0.5 }}>
                <Avatar sx={{ bgcolor: '#0e4d28', fontWeight: 'bold', width: 36, height: 36, fontSize: '0.9rem' }}>PV</Avatar>
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#0f382c', fontSize: '0.85rem' }}>Priya Verma</Typography>
                  <Typography variant="caption" color="text.secondary">Indore</Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>

        {/* 6. FAQ */}
        <Box>
          <Box sx={{ textAlign: 'center', mb: 2.5 }}>
            <Typography variant="caption" fontWeight="bold" sx={{ color: '#0e4d28', letterSpacing: 1 }}>GOT QUESTIONS?</Typography>
            <Typography variant="h5" fontWeight="900" sx={{ color: '#0f382c' }}>Frequently Asked Questions</Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Paper elevation={0} sx={{ p: 2.5, borderRadius: '20px', border: '1px solid #e0e0e0', bgcolor: '#ffffff' }}>
              <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#0f382c', mb: 0.5 }}>Q. Is the garden inspection really free?</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>Yes! Our initial site visit and expert assessment cost absolutely nothing.</Typography>
            </Paper>

            <Paper elevation={0} sx={{ p: 2.5, borderRadius: '20px', border: '1px solid #e0e0e0', bgcolor: '#ffffff' }}>
              <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#0f382c', mb: 0.5 }}>Q. How do monthly maintenance plans work?</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>Our trained gardener visits your property scheduled times per month to handle cleaning, pruning, and care.</Typography>
            </Paper>
          </Box>
        </Box>

        {/* 7. WHY CHOOSE MUNDER */}
        <Paper elevation={0} sx={{ p: 3, borderRadius: '24px', border: '1px solid #e0e0e0', bgcolor: '#ffffff' }}>
          <Box sx={{ textAlign: 'center', mb: 2.5 }}>
            <Typography variant="caption" fontWeight="bold" sx={{ color: '#0e4d28', letterSpacing: 1 }}>WHY US</Typography>
            <Typography variant="h5" fontWeight="900" sx={{ color: '#0f382c' }}>Why Choose Munder</Typography>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2.5, textAlign: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1, border: '2px solid #c8e6c9' }}>
                <SecurityIcon sx={{ color: '#0e4d28', fontSize: 24 }} />
              </Box>
              <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#0f382c', fontSize: '0.85rem' }}>Trusted Experts</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>Trained professionals</Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1, border: '2px solid #c8e6c9' }}>
                <AccessTimeIcon sx={{ color: '#0e4d28', fontSize: 24 }} />
              </Box>
              <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#0f382c', fontSize: '0.85rem' }}>On-Time Service</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>Always on schedule</Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1, border: '2px solid #c8e6c9' }}>
                <VerifiedIcon sx={{ color: '#0e4d28', fontSize: 24 }} />
              </Box>
              <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#0f382c', fontSize: '0.85rem' }}>Quality Assured</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>Safe & proven methods</Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1, border: '2px solid #c8e6c9' }}>
                <StarIcon sx={{ color: '#0e4d28', fontSize: 24 }} />
              </Box>
              <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#0f382c', fontSize: '0.85rem' }}>1000+ Clients</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>Happy homeowners</Typography>
            </Box>
          </Box>
        </Paper>

      </Container>


</Box>
</>
);
}
