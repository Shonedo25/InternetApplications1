class Post {
    constructor(id, title, content, senderId) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.senderId = senderId;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    update(title, content) {
        if (title) this.title = title;
        if (content) this.content = content;
        this.updatedAt = new Date();
    }
}

let posts = [];
let nextPostId = 1;

class PostModel {
    static getAll() {
        return posts;
    }

    static getById(id) {
        return posts.find(post => post.id === parseInt(id));
    }

    static getBySender(senderId) {
        return posts.filter(post => post.senderId === senderId);
    }

    static create(postData) {
        const { title, content, senderId } = postData;
        const newPost = new Post(nextPostId++, title, content, senderId);
        posts.push(newPost);
        return newPost;
    }

    static update(id, postData) {
        const post = this.getById(id);
        if (!post) return null;

        const { title, content } = postData;
        post.update(title, content);
        return post;
    }

    static delete(id) {
        const index = posts.findIndex(post => post.id === parseInt(id));
        if (index === -1) return false;
        
        posts.splice(index, 1);
        return true;
    }

    static exists(id) {
        return posts.some(post => post.id === parseInt(id));
    }
}

module.exports = { Post, PostModel };