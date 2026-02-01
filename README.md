# Posts and Comments REST API

A comprehensive REST API built with Node.js and Express for managing posts and comments.

## Features

### Posts API
- ✅ Add a New Post
- ✅ Get All Posts
- ✅ Get Post by ID
- ✅ Get Posts by Sender
- ✅ Update Post

### Comments API (Full CRUD)
- ✅ Create Comment
- ✅ Read Comments (All/By ID/By Post)
- ✅ Update Comment
- ✅ Delete Comment

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

3. The API will be available at `http://localhost:3000`

## API Endpoints

### Posts

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts` | Get all posts |
| GET | `/api/post/:id` | Get post by ID |
| GET | `/api/post?sender=:sender_id` | Get posts by sender |
| POST | `/api/posts` | Create new post |
| PUT | `/api/post/:id` | Update post |

### Comments

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/comments` | Get all comments |
| GET | `/api/comments/:id` | Get comment by ID |
| GET | `/api/post/:postId/comments` | Get comments for a post |
| POST | `/api/comments` | Create new comment |
| PUT | `/api/comments/:id` | Update comment |
| DELETE | `/api/comments/:id` | Delete comment |

## Testing

Use the `request.rest` file with the REST Client extension in VS Code to test all endpoints. The file includes:

- All required API calls
- Sample data creation
- Error testing scenarios
- Complete CRUD operations

## Data Models

### Post
```json
{
  "id": 1,
  "title": "Post Title",
  "content": "Post content...",
  "senderId": "user123",
  "createdAt": "2026-02-02T...",
  "updatedAt": "2026-02-02T..."
}
```

### Comment
```json
{
  "id": 1,
  "content": "Comment content...",
  "authorId": "user456",
  "postId": 1,
  "createdAt": "2026-02-02T...",
  "updatedAt": "2026-02-02T..."
}
```

## Project Structure

```
├── server.js              # Main application file
├── package.json           # Dependencies and scripts
├── request.rest           # API testing file
├── controllers/
│   ├── postController.js  # Post business logic
│   └── commentController.js # Comment business logic
├── models/
│   ├── Post.js           # Post data model
│   └── Comment.js        # Comment data model
└── routes/
    ├── posts.js          # Post routes
    └── comments.js       # Comment routes
```
