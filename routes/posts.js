const express = require('express')
const Post = require('../models/posts')
const router  = express.Router()

// Save posts
router.post('/post/save', async (req, res) => {
    try {
        const newPost = new Post(req.body)
        await newPost.save()
        res.status(201).json({ success: "Post saved successfully"})
    } catch (error) {
        res.status(400).json({ error: error.message })
    } 
});

// Get all posts
router.get('/post', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({ success: true, existingPosts: posts });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update post
router.put('/post/update/:id', async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true } // Returns the updated document
        );
        if (!updatedPost) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.status(200).json({ success: "Post updated successfully", updatedPost });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete post
router.delete('/post/delete/:id', async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.status(200).json({ message: "Post deleted successfully", deletedPost });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



module.exports = router
