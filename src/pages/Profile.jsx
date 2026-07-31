import React from 'react';
import { Box, Typography, Button, Paper, Container, Avatar, Divider, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import BottomNav from '../components/BottomNav';

export default function Profile() {
  const navigate = useNavigate();
  const userName = localStorage.getItem('munder_user_name') || 'Munder User';
  const userMobile = localStorage.getItem('munder_user_mobile') || '+91 9876543210';

  const handleLogout = () => {
    localStorage.removeItem('munder_user_mobile');
    localStorage.removeItem('munder_user_name');
    navigate('/login');
  };

  const menuItems = [
    { text: 'My Inspection History', icon: <AssignmentIcon sx={{ color: '#0e4d28' }} />, path: '/inspections' },
    { text: 'My Orders', icon: <LocalShippingIcon sx={{ color: '#0e4d28' }} />, path: '/orders' },
    { text: 'Wishlist / Saved Plants', icon: <FavoriteIcon sx={{ color: '#0e4d28' }} />, path: '/wishlist' },
    { text: 'Notifications', icon: <NotificationsIcon sx={{ color: '#0e4d28' }} />, path: '/notifications' },
    { text: 'Settings', icon: <SettingsIcon sx={{ color: '#0e4d28' }} />, path: '/settings' },
  ];

  return (
    <Box sx={{ width: '100%', bgcolor: '#f7f9f6', minHeight: '100vh', pb: 14 }}>
      {/* HEADER BANNER */}
      <Box sx={{ bgcolor: '#0e4d28', color: '#fff', pt: 4, pb: 6, px: 3, borderBottomLeftRadius: '32px', borderBottomRightRadius: '32px' }}>
        <Container maxWidth="sm">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" fontWeight="950">My Profile 🌿</Typography>
            <IconButton sx={{ color: '#ffffff', bgcolor: 'rgba(255,255,255,0.15)', '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' } }}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ width: 64, height: 64, bgcolor: '#ffffff', color: '#0e4d28', fontWeight: 'bold', fontSize: '1.5rem' }}>
              {userName.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight="bold">{userName}</Typography>
              <Typography variant="body2" sx={{ opacity: 0.85 }}>{userMobile}</Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* MENU OPTIONS CONTAINER */}
      <Container maxWidth="sm" sx={{ mt: -3 }}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: '24px',
            border: '1px solid #e0e0e0',
            bgcolor: '#ffffff',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
          }}
        >
          <List disablePadding>
            {menuItems.map((item, index) => (
              <React.Fragment key={item.text}>
                <ListItem 
                  button 
                  onClick={() => navigate(item.path)}
                  sx={{ py: 2, px: 3, '&:hover': { bgcolor: '#f1f8e9' } }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={<Typography variant="body1" fontWeight="bold" sx={{ color: '#0f382c' }}>{item.text}</Typography>} />
                </ListItem>
                {index < menuItems.length - 1 && <Divider component="li" sx={{ borderColor: '#f0f0f0' }} />}
              </React.Fragment>
            ))}
          </List>
        </Paper>

        <Box sx={{ mt: 3 }}>
          <Button
            variant="outlined"
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
            fullWidth
            sx={{
              borderColor: '#d32f2f',
              color: '#d32f2f',
              borderRadius: '16px',
              py: 1.5,
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': { bgcolor: '#ffebee', borderColor: '#d32f2f' }
            }}
          >
            Logout
          </Button>
        </Box>
      </Container>

      {/* COMMON BOTTOM NAVIGATION */}
      <BottomNav />
    </Box>
  );
}
