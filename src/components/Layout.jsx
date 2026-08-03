import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';

export default function Layout() {
  return (
    <Box sx={{ width: '100%', bgcolor: '#f7f9f6', minHeight: '100vh', pb: 14, position: 'relative' }}>
      {/* Global Header */}
      <Header />

      {/* Page Content Render Hoga */}
      <Box component="main">
        <Outlet />
      </Box>

      {/* Global Bottom Navigation */}
      <BottomNav />
    </Box>
  );
}
