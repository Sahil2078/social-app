import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2', mb: 4 }}>
      <Container maxWidth="sm">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" fontWeight="bold" sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
            SocialApp
          </Typography>
          {username ? (
            <Button color="inherit" onClick={handleLogout}>Logout (@{username})</Button>
          ) : (
            <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;