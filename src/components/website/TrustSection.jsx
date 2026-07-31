import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const trustItems = [
  { icon: <PeopleOutlinedIcon />, title: 'Trusted Experts', desc: 'Trained & Experienced' },
  { icon: <AccessTimeIcon />, title: 'On-Time Service', desc: 'Always on schedule' },
  { icon: <VerifiedUserOutlinedIcon />, title: 'Quality Assured', desc: 'Best tools & safe products' },
  { icon: <CurrencyRupeeIcon />, title: 'Affordable Plans', desc: 'Flexible monthly plans' },
];

export default function TrustSection() {
  return (
    <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10, mt: -3, mb: 4, px: 2 }}>
      <Box
        sx={{
          bgcolor: '#0f3822',
          color: '#fff',
          borderRadius: '16px',
          pt: 2.5,
          pb: 3,
          px: 2,
          boxShadow: '0px 8px 24px rgba(0,0,0,0.18)',
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          gap: 2,
        }}
      >
        {trustItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box sx={{ color: '#81c784', mb: 0.5, '& .MuiSvgIcon-root': { fontSize: 26 } }}>{item.icon}</Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.8rem', lineHeight: 1.2 }}>
              {item.title}
            </Typography>
            <Typography variant="caption" sx={{ color: '#a5d6a7', fontSize: '0.65rem', display: 'block', mt: 0.5, lineHeight: 1.2 }}>
              {item.desc}
            </Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
