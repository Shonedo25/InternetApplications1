class Comment {
    constructor(id, content, authorId, postId) {
        this.id = id;
        this.content = content;
        this.authorId = authorId;
        this.postId = postId;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    update(content) {
        if (content) this.content = content;
        this.updatedAt = new Date();
    }
}

let comments = [];
let nextCommentId = 1;

class CommentModel {
    static getAll() {
        return comments;
    }

    static getById(id) {
        return comments.find(comment => comment.id === parseInt(id));
    }

    static getByPostId(postId) {
        return comments.filter(comment => comment.postId === parseInt(postId));
    }

    static create(commentData) {
        const { content, authorId, postId } = commentData;
        const newComment = new Comment(nextCommentId++, content, authorId, parseInt(postId));
        comments.push(newComment);
        return newComment;
    }

    static update(id, commentData) {
        const comment = this.getById(id);
        if (!comment) return null;

        const { content } = commentData;
        comment.update(content);
        return comment;
    }

    static delete(id) {
        const index = comments.findIndex(comment => comment.id === parseInt(id));
        if (index === -1) return false;
        
        comments.splice(index, 1);
        return true;
    }
}

module.exports = { Comment, CommentModel };