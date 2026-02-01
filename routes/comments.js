const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/commentController');

// Get all comments
router.get('/comments', CommentController.getAllComments);

// Get comment by ID
router.get('/comments/:id', CommentController.getCommentById);

// Get all comments for a specific post
router.get('/post/:postId/comments', CommentController.getCommentsByPostId);

// Create new comment
router.post('/comments', CommentController.createComment);

// Update comment
router.put('/comments/:id', CommentController.updateComment);

// Delete comment
router.delete('/comments/:id', CommentController.deleteComment);

module.exports = router;