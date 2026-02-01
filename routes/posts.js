const express = require('express');
const router = express.Router();
const PostController = require('../controllers/postController');

// Get all posts or posts by sender (query parameter)
router.get('/posts', PostController.getAllPosts);

// Get post by sender (alternative route with query parameter)
// This is handled in the getAllPosts method with query parameters

// Get posts by sender as specified in requirements: /post?sender=<sender_id>
router.get('/post', PostController.getAllPosts);

// Get post by ID: /post/<post_id>
router.get('/post/:id', PostController.getPostById);

// Add a new post
router.post('/posts', PostController.createPost);

// Update a post: PUT /post/<post_id>
router.put('/post/:id', PostController.updatePost);

// Optional: Delete post (for complete CRUD, though not in requirements)
router.delete('/post/:id', PostController.deletePost);

module.exports = router;