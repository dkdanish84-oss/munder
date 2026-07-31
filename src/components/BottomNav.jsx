import React from 'react';
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PersonIcon from '@mui/icons-material/Person';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide BottomNav on Login and Register pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  const getActiveTab = () => {
    if (location.pathname.startsWith('/inspection')) return 1;
    if (location.pathname.startsWith('/plans')) return 2;
    if (
      location.pathname.startsWith('/shop') ||
      location.pathname.startsWith('/cart') ||
      location.pathname.startsWith('/wishlist')
    ) return 3;
    if (
      location.pathname.startsWith('/profile') ||
      location.pathname.startsWith('/orders') ||
      location.pathname.startsWith('/settings')
    ) return 4;
    return 0;
  };

  return (
    <Paper
      elevation={8}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
        bgcolor: '#ffffff',
        borderTop: '1px solid #eaeaea',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
        pb: 'calc(env(safe-area-inset-bottom, 12px) + 8px)',
        pt: 1
      }}
    >
      <BottomNavigation
        value={getActiveTab()}
        onChange={(event, newValue) => {
          switch (newValue) {
            case 0: navigate('/'); break;
            case 1: navigate('/inspection'); break;
            case 2: navigate('/plans'); break;
            case 3: navigate('/shop'); break;
            case 4: navigate('/profile'); break;
            default: navigate('/');
          }
        }}
        showLabels
        sx={{
          bgcolor: 'transparent',
          '& .MuiBottomNavigationAction-root': {
            color: '#717171',
            minWidth: 'auto',
            padding: '6px 0',
            transition: 'all 0.2s ease',
            '&.Mui-selected': {
              color: '#0e4d28',
              '& .MuiSvgIcon-root': {
                bgcolor: '#e8f5e9',
                padding: '6px 18px',
                borderRadius: '20px',
                fontSize: '1.8rem',
                boxShadow: '0 2px 8px rgba(14,77,40,0.12)',
                transform: 'scale(1.05)',
                transition: 'transform 0.15s ease-in-out',
              },
              '& .MuiBottomNavigationAction-label': {
                fontWeight: '900',
                fontSize: '0.75rem',
              }
            }
          }
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Inspect" icon={<AssignmentIcon />} />
        <BottomNavigationAction label="Plans" icon={<TaskAltIcon />} />
        <BottomNavigationAction label="Shop" icon={<ShoppingBagIcon />} />
        <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
