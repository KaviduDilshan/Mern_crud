const express = require('express')
const Post = require('../models/posts')
const router  = express.Router()

// Save posts
router.post('/post/save', async (req, res) => {
    try {
        const newPost = new Post(req.body)
        await newPost.save()
        res.status(201).json({ success: "Post saved successfully" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});

module.exports = router
