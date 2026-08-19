import React, { useState, useEffect } from 'react';   

import {
  Box,
  Typography,
  Button,
  Paper,
  Container,
  TextField,
  Avatar,
  Snackbar,
  Alert,
  IconButton
} from '@mui/material';

import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShieldIcon from '@mui/icons-material/Shield';
import StarIcon from '@mui/icons-material/Star';
import HomeIcon from '@mui/icons-material/Home';
import DeleteIcon from '@mui/icons-material/Delete';


export default function Visit() {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedService = location.state?.service || 'Garden Maintenance';
  const [submitted, setSubmitted] = useState(false);
  const [gardenSize, setGardenSize] = useState('Small');
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    location: '',
    notes: ''
  });
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [error, setError] = useState(''); 
  const [openSnackbar, setOpenSnackbar] = useState(false);

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


const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(formData.mobile)) { 
      setError('Please enter a valid 10-digit mobile number.');
      setOpenSnackbar(true);
      return;
    }

    if (!formData.name || !formData.location) {
      setError('Please fill in all required fields.'); 
      setOpenSnackbar(true);
      return;
    }

const token = localStorage.getItem("token");

let photoData = "";

    if (photo) {
      photoData = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ""));
        reader.onerror = () => resolve("");
        reader.readAsDataURL(photo);
      }); 
    }

    const response = await axios.post(
      "/api/visit", 
      {
        name: formData.name,
        mobile: formData.mobile,
        address: formData.location,
        gardenType: gardenSize,
        service: selectedService,
        visitTime: "Morning",
        notes: formData.notes,
        photo: photoData,
      },
      {
        headers: token
          ? { Authorization: `Bearer ${token}` }
          : {},
      }
    );

    if (!response.data?.success) {
      throw new Error(
        response.data?.message || "Unable to save visit request."
      );
    }

    setSubmitted(true);
  };

  const handleContinueOnWhatsApp = () => { 
    const text = ` *Free Garden Visit Request*%0A%0A *Name:* ${formData.name}%0A *Mobile:* ${formData.mobile}%0A *Area:*${formData.location}%0A *Garden Size:* ${gardenSize}%0A
one'}`;
    window.open(`https://wa.me/917987468974?text=${text}`, '_blank');
  };

  return (
    <Box sx={{ width: '100%', bgcolor: '#f7f9f6', minHeight: '100vh', pb: 14, position: 'relative' }}>

      <Container
        maxWidth={false}
        sx={{
          py: 3,
          px: { xs: 1.5, sm: 3, md: 5 },
        }}
      >

        {!submitted ? (
          <Paper
            elevation={0}
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: '100%',
              maxWidth: { xs: '100%', md: 900 },
              mx: 'auto',
              p: { xs: 2.5, sm: 3.5, md: 4 },
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
              Book Free Visit
            </Typography>

            <Box
              sx={{
                mb: 2.5,
                p: 1.5, 
                borderRadius: '12px',
                bgcolor: '#f1f8e9',
                border: '1px solid #c8e6c9',
              }} 
            >
              <Typography
                variant="caption"
                sx={{
                  color: '#2e7d32',
                  fontWeight: 700,
                  display: 'block', 
                  mb: 0.3,
                }}
              >
                SELECTED SERVICE
              </Typography>
              <Typography
                sx={{
                  color: '#0f382c',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                }}
              >
                {selectedService} 
              </Typography>
            </Box>

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
                      <Typography variant="caption" fontWeight="bold" sx={{ color: '#2e7d32', display: 'block' }}>Photo 
Attached</Typography> 
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
              Thank You!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}> 
              Your Free Garden Visit request has been received.
            </Typography>

            <Box sx={{ bgcolor: '#f1f8e9', p: 2, borderRadius: '16px', mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              <Typography variant="body2" fontWeight="bold" sx={{ color: '#2e7d32' }}> 

              </Typography>
            </Box>

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

            </Button>
          </Paper>
        )}

        <Box sx={{ textAlign: 'center', my: 2.5 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>

                            </Typography>
        </Box> 

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mt: 3 }}>
          <Paper elevation={0} sx={{ p: 2, borderRadius: '16px', border: '1px solid #e0e0e0', textAlign: 'center', bgcolor: '#ffffff' }}>            <AccessTimeIcon sx={{ fontSize: 28, color: '#0e4d28', mb: 0.5 }} />
            <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#0f382c', fontSize: '0.85rem' }}>Response in 2 Hours</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>Quick scheduling guaranteed</Typography>
          </Paper>

          <Paper elevation={0} sx={{ p: 2, borderRadius: '16px', border: '1px solid #e0e0e0', textAlign: 'center', bgcolor: '#ffffff' }}>            <ShieldIcon sx={{ fontSize: 28, color: '#0e4d28', mb: 0.5 }} />
            <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#0f382c', fontSize: '0.85rem' }}>Certified Experts</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>Trained professional gardeners</Typography>
          </Paper>
        </Box> 

        <Box sx={{ mt: 2 }}>
          <Paper elevation={0} sx={{ p: 2, borderRadius: '16px', border: '1px solid #e0e0e0', textAlign: 'center', bgcolor: '#ffffff' }}>            <StarIcon sx={{ fontSize: 28, color: '#0e4d28', mb: 0.5 }} />
            <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#0f382c', fontSize: '0.85rem' }}>1000+ Happy Clients</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>Trusted across homes & societies</Typography>
          </Paper>
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
