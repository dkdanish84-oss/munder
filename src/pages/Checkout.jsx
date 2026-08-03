import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Alert,
  LinearProgress,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function Checkout() {
  const navigate = useNavigate();

  const [addr, setAddr] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    pincode: ''
  });

  const [err, setErr] = useState('');

  const handleGPS = () => {
    if (!navigator.geolocation) {
      setErr('Geolocation is not supported on this device.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(5);
        const lng = position.coords.longitude.toFixed(5);

        setAddr(prev => ({
          ...prev,
          street: `GPS: ${lat}, ${lng}`
        }));

        setErr('');
      },
      () => {
        setErr('Unable to get your location. Please enter address manually.');
      }
    );
  };

  const handleNext = () => {
    if (addr.name.trim() === '') {
      setErr('Please enter your full name.');
      return;
    }

    if (!/^[0-9]{10}$/.test(addr.phone)) {
      setErr('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (addr.street.trim() === '') {
      setErr('Please enter your address.');
      return;
    }

    if (addr.city.trim() === '') {
      setErr('Please enter city.');
      return;
    }

    if (!/^[0-9]{6}$/.test(addr.pincode)) {
      setErr('Please enter a valid 6-digit pincode.');
      return;
    }

    setErr('');

    localStorage.setItem(
      'munder_address',
      JSON.stringify(addr)
    );

    navigate('/garden-details');
  };

  return (
    <Box p={3} pb={12}>

      <Typography
        variant="caption"
        fontWeight="bold"
        color="#0e4d28"
      >
        Step 2 of 6 • Service Address
      </Typography>

      <LinearProgress
        variant="determinate"
        value={33}
        sx={{
          mt: 1,
          mb: 3,
          height: 8,
          borderRadius: 5,
          '& .MuiLinearProgress-bar': {
            bgcolor: '#0e4d28'
          }
        }}
      />

      {err && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {err}
        </Alert>
      )}

      <Button
        fullWidth
        variant="outlined"
        onClick={handleGPS}
        sx={{
          mb: 3,
          color: '#0e4d28',
          borderColor: '#0e4d28'
        }}
      >
        📍 Detect Current Location
      </Button>

      <Paper
        elevation={2}
        sx={{
          p: 3,
          borderRadius: 3
        }}
      >

        <TextField
          fullWidth
          label="Full Name"
          margin="normal"
          value={addr.name}
          onChange={(e)=>
            setAddr({
              ...addr,
              name:e.target.value
            })
          }
        />

        <TextField
          fullWidth
          label="Mobile Number"
          margin="normal"
          inputProps={{ maxLength:10 }}
          value={addr.phone}
          onChange={(e)=>
            setAddr({
              ...addr,
              phone:e.target.value
            })
          }
        />

        <TextField
          fullWidth
          label="House No / Street / GPS"
          margin="normal"
          value={addr.street}
          onChange={(e)=>
            setAddr({
              ...addr,
              street:e.target.value
            })
          }
        />

        <TextField
          fullWidth
          label="City"
          margin="normal"
          value={addr.city}
          onChange={(e)=>
            setAddr({
              ...addr,
              city:e.target.value
            })
          }
        />

        <TextField
          fullWidth
          label="Pincode"
          margin="normal"
          inputProps={{ maxLength:6 }}
          value={addr.pincode}
          onChange={(e)=>
            setAddr({
              ...addr,
              pincode:e.target.value
            })
          }
        />

      </Paper>

      <Button
        fullWidth
        variant="contained"
        onClick={handleNext}
        sx={{
          mt: 3,
          py: 1.5,
          bgcolor:'#0e4d28'
        }}
      >
        Next → Garden Details
      </Button>

    </Box>
  );
}


