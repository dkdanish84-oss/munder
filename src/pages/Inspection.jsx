import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, IconButton, Container, TextField, Avatar, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShieldIcon from '@mui/icons-material/Shield';
import StarIcon from '@mui/icons-material/Star';
import HomeIcon from '@mui/icons-material/Home';
import DeleteIcon from '@mui/icons-material/Delete';
import BottomNav from '../components/BottomNav';

export default function Inspection() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [gardenSize, setGardenSize] = useState('Small');
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    location: '',
    date: '',
    notes: ''
  });
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Aaj ki date YYYY-MM-DD format mein taaki past date select na ho sake
  const todayStr = new Date().toISOString().split('T')[0];

  // Cleanup object URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // 1. Validation: Mobile number 10 digits check
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(formData.mobile)) {
      setError('Please enter a valid 10-digit mobile number.');
      setOpenSnackbar(true);
      return;
    }

    // 2. Validation: Visit date check (aaj se pehle ki na ho)
    if (formData.date < todayStr) {
      setError('Preferred visit date cannot be in the past.');
      setOpenSnackbar(true);
      return;
    }

    if (!formData.name || !formData.location) {
      setError('Please fill in all required fields.');
      setOpenSnackbar(true);
      return;
    }

    setSubmitted(true);
  };

  const handleContinueOnWhatsApp = () => {
    const text = `🌿 *Free Garden Inspection Request*%0A%0A👤 *Name:* ${formData.name}%0A📱 *Mobile:* ${formData.mobile}%0A📍 *Area:* ${formData.location}%0A🌳 *Garden Size:* ${gardenSize}%0A📅 *Preferred Date:* ${formData.date}%0A📝 *Notes:* ${formData.notes || 'None'}`;
    window.open(`https://wa.me/917987468974?text=${text}`, '_blank');
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
          onClick={() => window.open("https://wa.me/917987468974?text=Hi%20I%20want%20Garden%20Inspection", "_blank")}
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

      {/* CONTAINER */}
      <Container maxWidth="sm" sx={{ py: 3 }}>
        
        {!submitted ? (
          /* FORM SECTION */
          <Paper
            elevation={0}
            component="form"
            onSubmit={handleSubmit}
            sx={{
              p: { xs: 2.5, sm: 3.5 },
              borderRadius: '24px',
              border: '1px solid #e0e0e0',
              bgcolor: '#ffffff',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="caption" fontWeight="bold" sx={{ color: '#2e7d32', letterSpacing: 0.5 }}>
                STEP 1 OF 2
              </Typography>
              <Box sx={{ border: '1px solid #c8e6c9', bgcolor: '#f1f8e9', px: 1.5, py: 0.4, borderRadius: '12px' }}>
                <Typography variant="caption" fontWeight="bold" sx={{ color: '#2e7d32', fontSize: '0.7rem' }}>
                  Quick & Easy
                </Typography>
              </Box>
            </Box>

            <Typography variant="h5" fontWeight="900" sx={{ color: '#0f382c', mb: 2.5 }}>
              Book Free Inspection
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Box>
                <Typography variant="caption" fontWeight="bold" sx={{ color: '#333', mb: 0.5, display: 'block' }}>Full Name *</Typography>
                <TextField
                  fullWidth
                  required
                  placeholder="Enter your full name"
                  variant="outlined"
                  size="small"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                />
              </Box>

              <Box>
                <Typography variant="caption" fontWeight="bold" sx={{ color: '#333', mb: 0.5, display: 'block' }}>Mobile Number * (10 digits)</Typography>
                <TextField
                  fullWidth
                  required
                  placeholder="Enter 10-digit mobile number"
                  variant="outlined"
                  size="small"
                  inputProps={{ maxLength: 10 }}
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                />
              </Box>

              <Box>
                <Typography variant="caption" fontWeight="bold" sx={{ color: '#333', mb: 0.5, display: 'block' }}>City / Area *</Typography>
                <TextField
                  fullWidth
                  required
                  placeholder="Enter your area or society name"
                  variant="outlined"
                  size="small"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                />
              </Box>

              {/* GARDEN SIZE */}
              <Box>
                <Typography variant="caption" fontWeight="bold" sx={{ color: '#333', mb: 1, display: 'block' }}>Garden Size *</Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1.5 }}>
                  {[
                    { title: 'Small', desc: 'Up to 500 sq.ft' },
                    { title: 'Medium', desc: '500 - 1500 sq.ft' },
                    { title: 'Large', desc: 'Above 1500 sq.ft' }
                  ].map((size) => {
                    const isSelected = gardenSize === size.title;
                    return (
                      <Paper
                        key={size.title}
                        onClick={() => setGardenSize(size.title)}
                        elevation={0}
                        sx={{
                          p: 1.5,
                          textAlign: 'center',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          border: isSelected ? '2px solid #0e4d28' : '1px solid #e0e0e0',
                          bgcolor: isSelected ? '#f1f8e9' : '#ffffff',
                          transition: 'all 0.2s',
                          '&:hover': { borderColor: '#0e4d28' }
                        }}
                      >
                        <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#0f382c', fontSize: '0.85rem' }}>{size.title}</Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem', display: 'block', mt: 0.5 }}>{size.desc}</Typography>
                      </Paper>
                    );
                  })}
                </Box>
              </Box>

              {/* GARDEN PHOTO WITH THUMBNAIL PREVIEW */}
              <Box>
                <Typography variant="caption" fontWeight="bold" sx={{ color: '#333', mb: 0.5, display: 'block' }}>Garden Photo (Optional)</Typography>
                
                {!photoPreview ? (
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<PhotoCameraIcon />}
                    fullWidth
                    sx={{
                      borderColor: '#e0e0e0',
                      color: '#555',
                      borderRadius: '12px',
                      py: 1.2,
                      textTransform: 'none',
                      bgcolor: '#fafafa',
                      '&:hover': { bgcolor: '#f0f0f0', borderColor: '#ccc' }
                    }}
                  >
                    Take / Upload Photo
                    <input type="file" hidden accept="image/*" onChange={handlePhotoChange} />
                  </Button>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1.5, border: '1px solid #c8e6c9', borderRadius: '12px', bgcolor: '#f1f8e9' }}>
                    <Avatar src={photoPreview} variant="rounded" sx={{ width: 56, height: 56 }} />
                    <Box sx={{ flex: 1, overflow: 'hidden' }}>
                      <Typography variant="caption" fontWeight="bold" sx={{ color: '#2e7d32', display: 'block' }}>Photo Attached</Typography>
                      <Button
                        component="label"
                        size="small"
                        sx={{ textTransform: 'none', p: 0, minWidth: 'auto', color: '#0e4d28', fontWeight: 'bold', fontSize: '0.8rem' }}
                      >
                        Change Photo
                        <input type="file" hidden accept="image/*" onChange={handlePhotoChange} />
                      </Button>
                    </Box>
                    <IconButton size="small" onClick={() => { setPhoto(null); setPhotoPreview(null); }} color="error">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                )}
              </Box>

              <Box>
                <Typography variant="caption" fontWeight="bold" sx={{ color: '#333', mb: 0.5, display: 'block' }}>Preferred Visit Date *</Typography>
                <TextField
                  fullWidth
                  required
                  type="date"
                  variant="outlined"
                  size="small"
                  inputProps={{ min: todayStr }}
                  InputLabelProps={{ shrink: true }}
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                />
              </Box>

              <Box>
                <Typography variant="caption" fontWeight="bold" sx={{ color: '#333', mb: 0.5, display: 'block' }}>Additional Notes (Optional)</Typography>
                <TextField
                  fullWidth
                  placeholder="Any specific issue or requirement?"
                  variant="outlined"
                  size="small"
                  multiline
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                />
              </Box>

              {/* SUBMIT BUTTON */}
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: '#0e4d28',
                  '&:hover': { bgcolor: '#09361c' },
                  borderRadius: '12px',
                  py: 1.5,
                  fontWeight: 'bold',
                  textTransform: 'none',
                  fontSize: '1rem',
                  mt: 1
                }}
              >
                SUBMIT REQUEST
              </Button>
            </Box>
          </Paper>
        ) : (
          /* THANK YOU & REDIRECT SCREEN */
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: '24px',
              border: '1px solid #c8e6c9',
              bgcolor: '#ffffff',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 64, color: '#2e7d32', mb: 2 }} />
            <Typography variant="h4" fontWeight="900" sx={{ color: '#0f382c', mb: 1 }}>
              Thank You! 🌿
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
              Your Free Garden Inspection request has been received.
            </Typography>

            <Box sx={{ bgcolor: '#f1f8e9', p: 2, borderRadius: '16px', mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              <Typography variant="body2" fontWeight="bold" sx={{ color: '#2e7d32' }}>
                ✔ Our expert will contact you within 2 hours.
              </Typography>
            </Box>

            {/* CONTINUE ON WHATSAPP */}
            <Button
              variant="contained"
              onClick={handleContinueOnWhatsApp}
              startIcon={<WhatsAppIcon />}
              fullWidth
              sx={{
                bgcolor: '#25D366',
                '&:hover': { bgcolor: '#1EBE5D' },
                color: '#fff',
                borderRadius: '12px',
                py: 1.5,
                fontWeight: 'bold',
                textTransform: 'none',
                fontSize: '1rem',
                boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)',
                mb: 1.5
              }}
            >
              Continue on WhatsApp
            </Button>

            {/* BACK TO HOME BUTTON */}
            <Button
              variant="outlined"
              onClick={() => navigate('/')}
              startIcon={<HomeIcon />}
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
              Back to Home
            </Button>

            <Button
              variant="text"
              onClick={() => setSubmitted(false)}
              sx={{ mt: 2, color: 'text.secondary', textTransform: 'none', fontSize: '0.85rem' }}
            >
              ← Edit details or submit another request
            </Button>
          </Paper>
        )}

        {/* SECURITY NOTE */}
        <Box sx={{ textAlign: 'center', my: 2.5 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
            🔒 Your information is secure. No spam.
          </Typography>
        </Box>

        {/* TRUST BADGES SECTION (2-Column Responsive Grid) */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mt: 3 }}>
          <Paper elevation={0} sx={{ p: 2, borderRadius: '16px', border: '1px solid #e0e0e0', textAlign: 'center', bgcolor: '#ffffff' }}>
            <AccessTimeIcon sx={{ fontSize: 28, color: '#0e4d28', mb: 0.5 }} />
            <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#0f382c', fontSize: '0.85rem' }}>Response in 2 Hours</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>Quick scheduling guaranteed</Typography>
          </Paper>

          <Paper elevation={0} sx={{ p: 2, borderRadius: '16px', border: '1px solid #e0e0e0', textAlign: 'center', bgcolor: '#ffffff' }}>
            <ShieldIcon sx={{ fontSize: 28, color: '#0e4d28', mb: 0.5 }} />
            <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#0f382c', fontSize: '0.85rem' }}>Certified Experts</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>Trained professional gardeners</Typography>
          </Paper>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Paper elevation={0} sx={{ p: 2, borderRadius: '16px', border: '1px solid #e0e0e0', textAlign: 'center', bgcolor: '#ffffff' }}>
            <StarIcon sx={{ fontSize: 28, color: '#0e4d28', mb: 0.5 }} />
            <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#0f382c', fontSize: '0.85rem' }}>1000+ Happy Clients</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>Trusted across homes & societies</Typography>
          </Paper>
        </Box>

      </Container>

      {/* SNACKBAR FOR PROFESSIONAL ERROR NOTIFICATIONS */}
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

      {/* COMMON BOTTOM NAVIGATION */}
      <BottomNav />

    </Box>
  );
}
