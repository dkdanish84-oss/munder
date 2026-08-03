import React, { useState } from 'react';
import { Box, Typography, Button, TextField, LinearProgress, Stack, FormControlLabel, Switch } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function GardenDetails() {
  const navigate = useNavigate();
  const [size, setSize] = useState('200 sq ft');
  const [plantCount, setPlantCount] = useState('10-25 plants');
  const [lawn, setLawn] = useState(true);
  const [irrigation, setIrrigation] = useState(false);
  const [instructions, setInstructions] = useState('');

  const handleNext = () => {
    localStorage.setItem('munder_garden', JSON.stringify({ size, plantCount, lawn, irrigation, instructions }));
    navigate('/choose-date');
  };

  return (
    <Box p={3} pb={10}>
      <Box mb={2}>
        <Typography variant="caption" color="#0e4d28" fontWeight="bold">Step 3 of 6: Garden Specifications</Typography>
        <LinearProgress variant="determinate" value={50} sx={{ mt: 1, height: 6, borderRadius: 3, '& .MuiLinearProgress-bar': { bgcolor: '#0e4d28' } }} />
      </Box>

      <Typography variant="subtitle2" fontWeight="bold" mt={2}>Garden Size</Typography>
      <Stack direction="row" spacing={1} my={1} flexWrap="wrap">
        {['100 sq ft', '200 sq ft', '500 sq ft', '1000+ sq ft'].map(s => (
          <Button key={s} variant={size === s ? 'contained' : 'outlined'} onClick={()=>setSize(s)} sx={{ my: 0.5, bgcolor: size === s ? '#0e4d28' : 'transparent', color: size === s ? '#fff' : '#0e4d28', borderColor: '#0e4d28' }}>{s}</Button>
        ))}
      </Stack>

      <Typography variant="subtitle2" fontWeight="bold" mt={2}>Number of Plants</Typography>
      <Stack direction="row" spacing={1} my={1} flexWrap="wrap">
        {['1-10 plants', '10-25 plants', '25-50 plants', '50+ plants'].map(p => (
          <Button key={p} variant={plantCount === p ? 'contained' : 'outlined'} onClick={()=>setPlantCount(p)} sx={{ my: 0.5, bgcolor: plantCount === p ? '#0e4d28' : 'transparent', color: plantCount === p ? '#fff' : '#0e4d28', borderColor: '#0e4d28' }}>{p}</Button>
        ))}
      </Stack>

      <Box display="flex" justifyContent="space-between" alignItems="center" my={2} p={1.5} bgcolor="#f9f9f9" borderRadius={2}>
        <Typography variant="subtitle2">Lawn Area Available?</Typography>
        <Switch checked={lawn} onChange={(e) => setLawn(e.target.checked)} color="success" />
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" my={2} p={1.5} bgcolor="#f9f9f9" borderRadius={2}>
        <Typography variant="subtitle2">Irrigation System Installed?</Typography>
        <Switch checked={irrigation} onChange={(e) => setIrrigation(e.target.checked)} color="success" />
      </Box>

      <Button variant="outlined" component="label" fullWidth sx={{ my: 2, color: '#0e4d28', borderColor: '#0e4d28', borderStyle: 'dashed' }}>
        📷 Upload Garden Photos (Optional)
        <input type="file" hidden accept="image/*" />
      </Button>

      <TextField label="Special Instructions" fullWidth multiline rows={2} margin="normal" value={instructions} onChange={e=>setInstructions(e.target.value)} placeholder="Entry notes, water source availability..." />

      <Button variant="contained" fullWidth onClick={handleNext} sx={{ mt: 3, bgcolor: '#0e4d28', py: 1.5 }}>
        Next: Date & Time →
      </Button>
    </Box>
  );
}


