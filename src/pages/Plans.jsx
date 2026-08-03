import React, { useState, useRef } from 'react';
import { Box, Typography, Button, Paper, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Plan() {
  const navigate = useNavigate();

  const plans = [
    {
      id: 1,
      name: 'Basic Care Plan',
      badge: 'Starter',
      badgeBg: '#e8f5e9',
      badgeColor: '#0e4d28',
      suitable: '🏡 Balcony Garden',
      price: 999,
      duration: 'per month',
      image: '/images/Maintenance01.jpg',
      features: [
        '2 Gardener visits per month',
        'Basic plant watering & cleaning',
        'Weed removal & soil loosening',
        'WhatsApp expert support'
      ]
    },
    {
      id: 2,
      name: 'Pro Garden Plan',
      badge: 'Most Popular ⭐',
      badgeBg: '#fff3e0',
      badgeColor: '#e65100',
      suitable: '🏠 Home Garden',
      price: 1999,
      duration: 'per month',
      image: '/images/Development01.jpg',
      features: [
        '4 Gardener visits per month',
        'Professional pruning & trimming',
        'Organic pest & disease control',
        'Free seasonal flower seeds',
        'Priority WhatsApp & Call support'
      ]
    },
    {
      id: 3,
      name: 'Ultimate Estate Plan',
      badge: 'Premium',
      badgeBg: '#f3e5f5',
      badgeColor: '#6a1b9a',
      suitable: '🌳 Villa / Luxury Lawn',
      price: 3999,
      duration: 'per month',
      image: '/images/slide03.jpg', // Distinct Villa landscape image
      features: [
        'Weekly dedicated gardener visits',
        'Lawn mowing & edge trimming',
        'Smart irrigation system check',
        'Custom landscape styling advice',
        'Free replacement guarantee for sick plants'
      ]
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(1);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    if (touchStartX.current - touchEndX.current > swipeThreshold) {
      setCurrentIndex((prev) => (prev + 1) % plans.length);
    } else if (touchEndX.current - touchStartX.current > swipeThreshold) {
      setCurrentIndex((prev) => (prev - 1 + plans.length) % plans.length);
    }
  };

  const handleSelectPlan = (plan) => {
    // Multi-item cart integration (Zustand / LocalStorage Array ready)
    const existingCart = JSON.parse(localStorage.getItem('munder_cart') || '[]');
    const existingIndex = existingCart.findIndex((item) => item.id === plan.id);

    if (existingIndex > -1) {
      existingCart[existingIndex].quantity += 1;
    } else {
      existingCart.push({
        id: plan.id,
        name: plan.name,
        price: plan.price,
        duration: plan.duration,
        suitable: plan.suitable,
        quantity: 1,
        type: 'Garden Maintenance Plan'
      });
    }

    localStorage.setItem('munder_cart', JSON.stringify(existingCart));
    navigate('/cart');
  };

  const primaryBtnStyles = {
    borderRadius: '16px',
    height: '48px',
    fontWeight: 700,
    textTransform: 'none',
  };

  return (
    <Box sx={{ width: '100%', bgcolor: '#f7f9f6', minHeight: '100vh', pb: 14, position: 'relative' }}>
      
      {/* 1. Simplified Header */}
      <Box sx={{ pt: 4, pb: 2, px: 3, textAlign: 'center' }}>
        <Typography variant="h5" fontWeight="900" sx={{ color: '#0f382c', mb: 0.5 }}>
          Our Plans
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Choose the perfect maintenance plan
        </Typography>
      </Box>

      <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>

        {/* Swipeable Cards with 9. Smooth Zoom Animation */}
        <Box 
          sx={{ position: 'relative', py: 1 }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              position: 'relative',
              minHeight: 530,
              overflow: 'hidden',
              px: 1
            }}
          >
            {plans.map((plan, idx) => {
              const isSelected = idx === currentIndex;
              const isPrev = idx === (currentIndex - 1 + plans.length) % plans.length;
              const isNext = idx === (currentIndex + 1) % plans.length;

              if (!isSelected && !isPrev && !isNext) return null;

              let transformStyle = 'scale(1.03) translateX(0px)';
              let zIndex = 10;
              let opacity = 1;

              if (isPrev) {
                transformStyle = 'scale(0.90) translateX(-58%)';
                zIndex = 5;
                opacity = 0.55;
              } else if (isNext) {
                transformStyle = 'scale(0.90) translateX(58%)';
                zIndex = 5;
                opacity = 0.55;
              }

              return (
                <Paper
                  key={plan.id}
                  elevation={isSelected ? 8 : 1}
                  onClick={() => setCurrentIndex(idx)}
                  sx={{
                    position: 'absolute',
                    width: '84%',
                    maxWidth: '350px',
                    borderRadius: '28px',
                    overflow: 'hidden',
                    bgcolor: '#ffffff',
                    color: '#0f382c',
                    border: isSelected ? '2px solid #0e4d28' : '2px solid #E5E7EB',
                    boxShadow: isSelected ? '0 18px 40px rgba(14,77,40,.18)' : '0 4px 15px rgba(0,0,0,0.03)',
                    transform: transformStyle,
                    zIndex: zIndex,
                    opacity: opacity,
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  {/* 2 & 5. Card Top Image & 9. Badge Styling */}
                  <Box sx={{ position: 'relative', height: 130, width: '100%', overflow: 'hidden' }}>
                    <Box 
                      component="img" 
                      src={plan.image} 
                      alt={plan.name} 
                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                    <Box 
                      sx={{ 
                        position: 'absolute', 
                        top: 12, 
                        left: 12, 
                        bgcolor: plan.badgeBg, 
                        color: plan.badgeColor, 
                        px: 1.5, 
                        py: 0.4, 
                        borderRadius: '10px', 
                        fontSize: '0.7rem', 
                        fontWeight: 'bold',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                    >
                      {plan.badge}
                    </Box>
                  </Box>

                  <Box sx={{ p: 3, pb: 2 }}>
                    <Typography variant="h6" fontWeight="900" sx={{ mb: 0.5 }}>
                      {plan.name}
                    </Typography>

                    {/* 7. Suitable For */}
                    <Typography variant="caption" fontWeight="bold" sx={{ color: '#0e4d28', display: 'block', mb: 1.5 }}>
                      Suitable for: {plan.suitable}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, mb: 0.5 }}>
                      <Typography variant="h4" fontWeight="900" sx={{ color: '#0e4d28' }}>
                        ₹{plan.price}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        / {plan.duration}
                      </Typography>
                    </Box>

                    {/* 4. GST & No Hidden Charges */}
                    <Typography variant="caption" sx={{ display: 'block', color: '#16a34a', fontWeight: 700, fontSize: '0.72rem', mb: 2 }}>
                      ✓ GST Included &nbsp;•&nbsp; No Hidden Charges
                    </Typography>

                    {/* Features List */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                      {plan.features.map((feat, fIdx) => (
                        <Box key={fIdx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CheckCircleIcon sx={{ fontSize: 16, color: '#0e4d28' }} />
                          <Typography variant="body2" sx={{ fontSize: '0.82rem', color: '#444' }}>
                            {feat}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  {/* 3 & 5. Button with Cart Icon */}
                  <Box sx={{ p: 3, pt: 0 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<ShoppingCartIcon />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectPlan(plan);
                      }}
                      sx={{
                        ...primaryBtnStyles,
                        bgcolor: '#0e4d28',
                        '&:hover': { bgcolor: '#09361c' },
                        color: '#ffffff',
                        boxShadow: 'none'
                      }}
                    >
                      Select Plan
                    </Button>
                  </Box>
                </Paper>
              );
            })}
          </Box>

          {/* Dots Indicator */}
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mt: 1 }}>
            {plans.map((p, idx) => (
              <Box
                key={p.id}
                onClick={() => setCurrentIndex(idx)}
                sx={{
                  width: currentIndex === idx ? 24 : 8,
                  height: 8,
                  borderRadius: '4px',
                  bgcolor: currentIndex === idx ? '#0e4d28' : '#d0d0d0',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              />
            ))}
          </Box>
        </Box>

        {/* 10. Updated Trust Section with "Gardens Maintained" */}
        <Paper elevation={0} sx={{ p: 3, borderRadius: '24px', border: '1px solid #E5E7EB', bgcolor: '#ffffff', mt: 1 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3, textAlign: 'center' }}>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderRight: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0', pb: 2 }}>
              <StarIcon sx={{ color: '#FACC15', fontSize: 22, mb: 0.5 }} />
              <Typography variant="h6" fontWeight="900" sx={{ color: '#0f382c' }}>4.9 Rating</Typography>
              <Typography variant="caption" color="text.secondary">Verified Reviews</Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderBottom: '1px solid #f0f0f0', pb: 2 }}>
              <SentimentVerySatisfiedIcon sx={{ color: '#0e4d28', fontSize: 22, mb: 0.5 }} />
              <Typography variant="h6" fontWeight="900" sx={{ color: '#0f382c' }}>1000+</Typography>
              <Typography variant="caption" color="text.secondary">Gardens Maintained</Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderRight: '1px solid #f0f0f0', pt: 1 }}>
              <WorkspacePremiumIcon sx={{ color: '#0e4d28', fontSize: 22, mb: 0.5 }} />
              <Typography variant="h6" fontWeight="900" sx={{ color: '#0f382c' }}>5+ Years</Typography>
              <Typography variant="caption" color="text.secondary">Experience</Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 1 }}>
              <VerifiedUserIcon sx={{ color: '#0e4d28', fontSize: 22, mb: 0.5 }} />
              <Typography variant="h6" fontWeight="900" sx={{ color: '#0f382c' }}>98%</Typography>
              <Typography variant="caption" color="text.secondary">Customer Satisfaction</Typography>
            </Box>

          </Box>
        </Paper>

      </Container>
    </Box>
  );
}


