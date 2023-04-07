const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

Post.belongsTo(User, {
    foreignKey: 'postUserId',
    onDelete: 'CASCADE'
});

User.hasMany(Post, {
    foreignKey: 'userPostId', 
    onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
    foreignKey: 'postCommentId',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'commentUserId',
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'userCommentId',
    onDelete: 'CASCADE'
});

module.exports = {
    User,
    Comment,
    Post
}; 