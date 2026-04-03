import React, { useEffect, useState } from 'react';
import { 
  Container, Typography, Box, TextField, Button, 
  Card, CardContent, Divider, Avatar, CardMedia 
} from '@mui/material';
import { Favorite, FavoriteBorder, ChatBubbleOutline } from '@mui/icons-material';
import axios from 'axios';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // Added for Step 2 requirement
  const username = localStorage.getItem('username') || "GuestUser";

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/posts/all');
      setPosts(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePost = async () => {
    // Requirement: Either text or image is enough
    if (!text.trim() && !imageUrl.trim()) {
      return toast.error("Please add some text or an image URL!");
    }

    try {
      await axios.post('http://localhost:5000/api/posts/create', { 
        username: username, 
        text: text,
        imageUrl: imageUrl 
      });
      setText("");
      setImageUrl("");
      fetchPosts();
      toast.success("Posted successfully!");
    } catch (err) {
      toast.error("Error creating post.");
    }
  };

  const handleLike = async (postId) => {
    try {
      // Step 4 Requirement: Instant UI update
      const res = await axios.put(`http://localhost:5000/api/posts/like/${postId}`, { username });
      
      // Update the post in our local state immediately using the data returned from server
      setPosts(posts.map(p => p._id === postId ? res.data : p));
    } catch (err) {
      toast.error("Error liking post");
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f0f2f5', minHeight: '100vh', pb: 4 }}>
      <Navbar />
      
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        {/* Create Post Box */}
        <Card sx={{ mb: 4, p: 1, borderRadius: 3, boxShadow: '0px 2px 10px rgba(0,0,0,0.1)' }}>
          <CardContent>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Avatar sx={{ bgcolor: '#1976d2' }}>{username[0].toUpperCase()}</Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <TextField 
                  fullWidth 
                  multiline 
                  placeholder="What's on your mind?" 
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                  value={text} 
                  onChange={(e) => setText(e.target.value)} 
                />
                <TextField 
                  fullWidth 
                  placeholder="Paste Image URL (Optional)" 
                  variant="standard"
                  size="small"
                  sx={{ mt: 1, fontSize: '0.8rem' }}
                  InputProps={{ disableUnderline: true, style: { fontSize: 14 } }}
                  value={imageUrl} 
                  onChange={(e) => setImageUrl(e.target.value)} 
                />
              </Box>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                variant="contained" 
                sx={{ borderRadius: 5, px: 4, textTransform: 'none' }} 
                onClick={handlePost}
              >
                Post
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Display Posts */}
        {posts.map((post) => (
          <Card key={post._id} sx={{ mb: 3, borderRadius: 3, overflow: 'hidden' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Avatar sx={{ width: 32, height: 32, fontSize: '0.8rem' }}>
                  {post.username ? post.username[0].toUpperCase() : "?"}
                </Avatar>
                <Typography variant="subtitle2" fontWeight="bold">
                  {post.username}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  • {new Date(post.createdAt).toLocaleTimeString()}
                </Typography>
              </Box>

              <Typography variant="body1" sx={{ mb: post.imageUrl ? 2 : 0 }}>
                {post.text}
              </Typography>
            </CardContent>

            {/* Display Image if it exists */}
            {post.imageUrl && (
              <CardMedia
                component="img"
                image={post.imageUrl}
                alt="Post content"
                sx={{ maxHeight: 400, objectFit: 'cover' }}
                onError={(e) => { e.target.style.display = 'none'; }} // Hide if link is broken
              />
            )}

            <CardContent sx={{ pt: 0 }}>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Button 
                  startIcon={post.likes?.includes(username) ? <Favorite color="error" /> : <FavoriteBorder />} 
                  color="inherit"
                  onClick={() => handleLike(post._id)}
                  sx={{ textTransform: 'none' }}
                >
                  {post.likes?.length || 0}
                </Button>
                <Button 
                  startIcon={<ChatBubbleOutline />} 
                  color="inherit"
                  sx={{ textTransform: 'none' }}
                >
                  {post.comments?.length || 0}
                </Button>
              </Box>
              
              {/* Simple Comment List Display */}
              {post.comments?.length > 0 && (
                <Box sx={{ mt: 2, bgcolor: '#f8f9fa', p: 1, borderRadius: 2 }}>
                  {post.comments.map((c, i) => (
                    <Typography key={i} variant="caption" display="block" sx={{ mb: 0.5 }}>
                      <strong>{c.username}:</strong> {c.text}
                    </Typography>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        ))}
      </Container>
    </Box>
  );
};

export default Feed;