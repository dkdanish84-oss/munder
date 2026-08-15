import React from 'react';
import { Box, Container, Grid, Typography, Card } from '@mui/material';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import GrassIcon from '@mui/icons-material/Grass';

const services = [
  { title: 'Lawn Care', desc: 'Mowing, edging & clean up', icon: <GrassIcon fontSize="large" /> },
  { title: 'Plant Pruning', desc: 'Expert pruning for healthy growth', icon: <ContentCutIcon fontSize="large" /> },
  { title: 'Plant Health Care', desc: 'Nutrition, treatment & protection', icon: <LocalFloristIcon fontSize="large" /> },
  { title: 'Irrigation Management', desc: 'Smart watering for healthy plants', icon: <WaterDropIcon fontSize="large" /> },
  { title: 'Garden Clean-up', desc: 'Weed control & garden cleaning', icon: <CleaningServicesIcon fontSize="large" /> },
  { title: 'Regular Visits', desc: 'Trained team for regular maintenance', icon: <AssignmentTurnedInIcon fontSize="large" /> },
];

export default function ServicesSection() {
  return (
    <Container maxWidth="lg" sx={{ py: 4, px: 2 }}>
      <Typography
        variant="subtitle2"
        align="center"
        sx={{ fontWeight: 800, color: '#0f3822', letterSpacing: '0.5px', mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, fontSize: '0.85rem' }}
      >
        🌿 OUR GARDEN MAINTENANCE SERVICES 🌿
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1.5 }}>
        {services.map((service, index) => (
          <Card
            key={index}
            elevation={0}
            sx={{
              borderRadius: '20px',
              border: '1px solid #e2e8e3',
              bgcolor: '#ffffff',
              textAlign: 'center',
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '160px'
            }}
          >
            <Box sx={{ color: '#2e7d32', mb: 1, display: 'flex', justifyContent: 'center' }}>{service.icon}</Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1a1a1a', fontSize: '0.85rem', mb: 0.5, lineHeight: 1.2 }}>
              {service.title}
            </Typography>
            <Typography variant="caption" sx={{ color: '#666', fontSize: '0.68rem', lineHeight: 1.2 }}>
              {service.desc}
            </Typography>
          </Card>
        ))}
      </Box>
    </Container>
  );
}
