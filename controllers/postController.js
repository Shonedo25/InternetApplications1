const { PostModel } = require('../models/Post');

class PostController {
    // Get all posts
    static getAllPosts(req, res) {
        try {
            const { sender } = req.query;
            
            let posts;
            if (sender) {
                posts = PostModel.getBySender(sender);
            } else {
                posts = PostModel.getAll();
            }
            
            res.status(200).json({
                success: true,
                count: posts.length,
                data: posts
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Server Error',
                message: error.message
            });
        }
    }

    // Get post by ID
    static getPostById(req, res) {
        try {
            const { id } = req.params;
            const post = PostModel.getById(id);

            if (!post) {
                return res.status(404).json({
                    success: false,
                    error: 'Post not found'
                });
            }

            res.status(200).json({
                success: true,
                data: post
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Server Error',
                message: error.message
            });
        }
    }

    // Create new post
    static createPost(req, res) {
        try {
            const { title, content, senderId } = req.body;

            // Validation
            if (!title || !content || !senderId) {
                return res.status(400).json({
                    success: false,
                    error: 'Please provide title, content, and senderId'
                });
            }

            const newPost = PostModel.create({ title, content, senderId });

            res.status(201).json({
                success: true,
                data: newPost,
                message: 'Post created successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Server Error',
                message: error.message
            });
        }
    }

    // Update post
    static updatePost(req, res) {
        try {
            const { id } = req.params;
            const { title, content } = req.body;

            // Check if post exists
            const existingPost = PostModel.getById(id);
            if (!existingPost) {
                return res.status(404).json({
                    success: false,
                    error: 'Post not found'
                });
            }

            // Validation
            if (!title && !content) {
                return res.status(400).json({
                    success: false,
                    error: 'Please provide title or content to update'
                });
            }

            const updatedPost = PostModel.update(id, { title, content });

            res.status(200).json({
                success: true,
                data: updatedPost,
                message: 'Post updated successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Server Error',
                message: error.message
            });
        }
    }

    // Delete post (optional - not in requirements but useful for complete CRUD)
    static deletePost(req, res) {
        try {
            const { id } = req.params;

            const deleted = PostModel.delete(id);
            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    error: 'Post not found'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Post deleted successfully'
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

module.exports = PostController;