const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// 1. CREATE A POST (Text, Image, or Both)
router.post('/create', async (req, res) => {
    try {
        const { username, text, imageUrl } = req.body;

        // Requirement: At least one field is provided
        if (!text && !imageUrl) {
            return res.status(400).json({ message: "Post must have either text or an image." });
        }

        const newPost = new Post({
            username,
            text,
            imageUrl: imageUrl || "", // Default to empty string if no image
            likes: [],
            comments: []
        });

        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. GET ALL POSTS (The Public Feed)
router.get('/all', async (req, res) => {
    try {
        // Sort by 'createdAt' descending (newest first)
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. LIKE / UNLIKE A POST
router.put('/like/:id', async (req, res) => {
    try {
        const { username } = req.body;
        const post = await Post.findById(req.params.id);
        
        if (!post) return res.status(404).json({ message: "Post not found" });

        // Check if user already liked the post
        if (!post.likes.includes(username)) {
            post.likes.push(username); // Add like
        } else {
            post.likes = post.likes.filter((user) => user !== username); // Remove like (Unlike)
        }

        const updatedPost = await post.save();
        res.status(200).json(updatedPost); // Return updated post for instant UI update
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. COMMENT ON A POST
router.post('/comment/:id', async (req, res) => {
    try {
        const { username, text } = req.body;
        if (!text) return res.status(400).json({ message: "Comment cannot be empty" });

        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        const newComment = {
            username,
            text,
            createdAt: new Date()
        };

        post.comments.push(newComment);
        const updatedPost = await post.save();
        
        res.status(200).json(updatedPost); // Return updated post for instant UI update
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;