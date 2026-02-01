const { CommentModel } = require('../models/Comment');
const { PostModel } = require('../models/Post');

class CommentController {
    // Get all comments
    static getAllComments(req, res) {
        try {
            const comments = CommentModel.getAll();
            
            res.status(200).json({
                success: true,
                count: comments.length,
                data: comments
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Server Error',
                message: error.message
            });
        }
    }

    // Get comment by ID
    static getCommentById(req, res) {
        try {
            const { id } = req.params;
            const comment = CommentModel.getById(id);

            if (!comment) {
                return res.status(404).json({
                    success: false,
                    error: 'Comment not found'
                });
            }

            res.status(200).json({
                success: true,
                data: comment
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Server Error',
                message: error.message
            });
        }
    }

    // Get comments for a specific post
    static getCommentsByPostId(req, res) {
        try {
            const { postId } = req.params;

            // Check if post exists
            if (!PostModel.exists(postId)) {
                return res.status(404).json({
                    success: false,
                    error: 'Post not found'
                });
            }

            const comments = CommentModel.getByPostId(postId);
            
            res.status(200).json({
                success: true,
                count: comments.length,
                postId: parseInt(postId),
                data: comments
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Server Error',
                message: error.message
            });
        }
    }

    // Create new comment
    static createComment(req, res) {
        try {
            const { content, authorId, postId } = req.body;

            // Validation
            if (!content || !authorId || !postId) {
                return res.status(400).json({
                    success: false,
                    error: 'Please provide content, authorId, and postId'
                });
            }

            // Check if post exists
            if (!PostModel.exists(postId)) {
                return res.status(404).json({
                    success: false,
                    error: 'Post not found'
                });
            }

            const newComment = CommentModel.create({ content, authorId, postId });

            res.status(201).json({
                success: true,
                data: newComment,
                message: 'Comment created successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Server Error',
                message: error.message
            });
        }
    }

    // Update comment
    static updateComment(req, res) {
        try {
            const { id } = req.params;
            const { content } = req.body;

            // Check if comment exists
            const existingComment = CommentModel.getById(id);
            if (!existingComment) {
                return res.status(404).json({
                    success: false,
                    error: 'Comment not found'
                });
            }

            // Validation
            if (!content) {
                return res.status(400).json({
                    success: false,
                    error: 'Please provide content to update'
                });
            }

            const updatedComment = CommentModel.update(id, { content });

            res.status(200).json({
                success: true,
                data: updatedComment,
                message: 'Comment updated successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Server Error',
                message: error.message
            });
        }
    }

    // Delete comment
    static deleteComment(req, res) {
        try {
            const { id } = req.params;

            const deleted = CommentModel.delete(id);
            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    error: 'Comment not found'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Comment deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Server Error',
                message: error.message
            });
        }
    }
}

module.exports = CommentController;