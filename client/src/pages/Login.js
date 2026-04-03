import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    // Standard React way to update multiple input fields
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Make the API call to your Backend
      // Ensure this URL matches your server/index.js route prefix
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      
      // 2. Save user info to Local Storage
      // res.data.username comes from the backend we just updated
      localStorage.setItem('username', res.data.username);
      
      // Optional: If you implement JWT later, save the token too
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }
      
      toast.success(`Welcome back, ${res.data.username}!`);
      
      // 3. Redirect to the Feed page
      navigate('/'); 
    } catch (err) {
      // 4. Detailed error logging to help you debug
      console.error("Login Error:", err.response?.data);
      toast.error(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 4, boxShadow: '0px 4px 20px rgba(0,0,0,0.1)' }}>
          <Typography variant="h4" align="center" gutterBottom fontWeight="bold" color="primary">
            SocialApp
          </Typography>
          <Typography variant="body1" align="center" color="textSecondary" sx={{ mb: 3 }}>
            Log in to see what's happening
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField 
              fullWidth 
              margin="normal" 
              label="Email Address" 
              name="email" 
              type="email"
              variant="outlined"
              onChange={handleChange} 
              required 
            />
            <TextField 
              fullWidth 
              margin="normal" 
              label="Password" 
              name="password" 
              type="password" 
              variant="outlined"
              onChange={handleChange} 
              required 
            />
            <Button 
              fullWidth 
              variant="contained" 
              type="submit" 
              size="large"
              sx={{ mt: 3, mb: 2, py: 1.5, borderRadius: 2, textTransform: 'none', fontWeight: 'bold' }}
            >
              Log In
            </Button>
            
            <Divider sx={{ my: 2 }}>OR</Divider>

            <Typography variant="body2" align="center">
              Don't have an account? <Link to="/signup" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 'bold' }}>Sign Up</Link>
            </Typography>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

// Helper component for the "OR" text (Optional MUI styling)
const Divider = ({ children, sx }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', ...sx }}>
    <Box sx={{ flex: 1, height: '1px', bgcolor: 'divider' }} />
    <Typography variant="caption" sx={{ px: 2, color: 'text.secondary' }}>{children}</Typography>
    <Box sx={{ flex: 1, height: '1px', bgcolor: 'divider' }} />
  </Box>
);

export default Login;