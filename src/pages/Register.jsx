import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Container, TextField, Snackbar, Alert } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    city: ''
  });
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(formData.mobile)) {
      setError('Please enter a valid 10-digit mobile number.');
      setOpenSnackbar(true);
      return;
    }
    if (!formData.name || !formData.city) {
      setError('Please fill in all required fields.');
      setOpenSnackbar(true);
      return;
    }

    localStorage.setItem('munder_user_mobile', formData.mobile);
    localStorage.setItem('munder_user_name', formData.name);
    navigate('/profile');
  };

  return (
    <Box sx={{ width: '100%', bgcolor: '#f7f9f6', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', py: 4 }}>
      <Container maxWidth="xs">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: '24px',
            border: '1px solid #e0e0e0',
            bgcolor: '#ffffff',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
          }}
        >
          <Box
            component="img"
            src="/images/munder-logo-horizontal.png"
            alt="Munder Logo"
            sx={{ width: 180, height: 'auto', mx: 'auto', mb: 3, display: 'block' }}
          />

          <Box sx={{ width: 48, height: 48, bgcolor: '#f1f8e9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2, color: '#0e4d28' }}>
            <PersonAddOutlinedIcon />
          </Box>

          <Typography variant="h5" fontWeight="900" sx={{ color: '#0f382c', mb: 1 }}>
            Create Account 🌿
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Join Munder to manage your garden journey easily.
          </Typography>

          <Box component="form" onSubmit={handleRegister} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              required
              placeholder="Full Name"
              variant="outlined"
              size="small"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
            />

            <TextField
              fullWidth
              required
              placeholder="10-digit Mobile Number"
              variant="outlined"
              size="small"
              inputProps={{ maxLength: 10 }}
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
            />

            <TextField
              fullWidth
              required
              placeholder="City / Area"
              variant="outlined"
              size="small"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                bgcolor: '#0e4d28',
                '&:hover': { bgcolor: '#09361c' },
                borderRadius: '12px',
                py: 1.4,
                fontWeight: 'bold',
                textTransform: 'none',
                fontSize: '1rem',
                mt: 1
              }}
            >
              Register & Continue
            </Button>
          </Box>

          <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #f0f0f0' }}>
            <Typography variant="caption" color="text.secondary">
              Already have an account?{' '}
              <Typography component={RouterLink} to="/login" variant="caption" fontWeight="bold" sx={{ color: '#0e4d28', textDecoration: 'none' }}>
                Login here
              </Typography>
            </Typography>
          </Box>
        </Paper>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button
            variant="text"
            onClick={() => navigate('/')}
            sx={{ color: 'text.secondary', textTransform: 'none', fontSize: '0.85rem' }}
          >
            ← Back to Home
          </Button>
        </Box>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="error" variant="filled" sx={{ width: '100%', borderRadius: '12px' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}
