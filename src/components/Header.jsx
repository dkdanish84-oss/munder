import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Header({ title, showBack = true, backPath = '/', rightAction = null }) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: 2, sm: 3 },
        py: 2,
        bgcolor: "#ffffff",
        borderBottom: "1px solid #eaeaea",
        position: "sticky",
        top: 0,
        zIndex: 1100
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {showBack && (
          <IconButton onClick={() => navigate(backPath)} sx={{ color: '#0e4d28' }}>
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography variant="h6" fontWeight="bold" sx={{ color: '#0f382c' }}>
          {title}
        </Typography>
      </Box>
      {rightAction && <Box>{rightAction}</Box>}
    </Box>
  );
}
