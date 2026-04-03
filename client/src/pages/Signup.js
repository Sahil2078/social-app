import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', formData);
      toast.success('Account created! Please login.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 2 }}>
          <Typography variant="h5" align="center" gutterBottom fontWeight="bold" color="primary">
            Create Account
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth margin="normal" label="Username" name="username"
              onChange={handleChange} required
            />
            <TextField
              fullWidth margin="normal" label="Email Address" name="email"
              type="email" onChange={handleChange} required
            />
            <TextField
              fullWidth margin="normal" label="Password" name="password"
              type="password" onChange={handleChange} required
            />
            <Button
              fullWidth variant="contained" type="submit"
              sx={{ mt: 3, mb: 2, py: 1.5, textTransform: 'none', fontWeight: 'bold' }}
            >
              Sign Up
            </Button>
            <Typography variant="body2" align="center">
              Already have an account? <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>Login</Link>
            </Typography>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Signup;