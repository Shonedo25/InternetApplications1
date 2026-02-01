const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', postRoutes);
app.use('/api', commentRoutes);

// Base route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Posts and Comments REST API',
        endpoints: {
            posts: {
                'GET /api/posts': 'Get all posts',
                'GET /api/post/:id': 'Get post by ID',
                'GET /api/post?sender=:sender_id': 'Get posts by sender',
                'POST /api/posts': 'Add new post',
                'PUT /api/post/:id': 'Update post'
            },
            comments: {
                'GET /api/comments': 'Get all comments',
                'GET /api/comments/:id': 'Get comment by ID',
                'GET /api/post/:postId/comments': 'Get comments for a specific post',
                'POST /api/comments': 'Create new comment',
                'PUT /api/comments/:id': 'Update comment',
                'DELETE /api/comments/:id': 'Delete comment'
            }
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API documentation available at http://localhost:${PORT}`);
});

module.exports = app;