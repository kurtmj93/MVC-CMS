const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

// get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll({ include: { model: User, attributes: ['username'] } });
        res.status(200).json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// get one post by post id
router.get('/:id', async (req, res) => {
    try {
      const post = await Post.findByPk(req.params.id, {
        include: [
      {
        model: Comment,
        include: [{
          model: User, attributes: ['username'] // username of comment author
        }]
      },
      {
        model: User, attributes: ['username'] // username of post author
      }]
      });
      
      if (!post) { // return specific error if there is no product found with this id
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// create a new post
router.post('/', async (req, res) => {
    try {
      const newPost = await Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.userid,
      });
  
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
  });

// delete a post by post id
router.delete('/:id', async (req, res) => {
    try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
  
      res.status(200).end();
    } catch (err) {
      res.status(500).json(err);
    }
  });

// create a new comment
router.post('/:id/comments/', async (req, res) => {
    try {
      const newComment = await Comment.create({
        text: req.body.text,
        user_id: req.session.userid || req.body.user_id, // pipe here allows me to pass it from the back-end via JSON or from req.session
        post_id: req.params.id
      });
  
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });

// get comments by post_id
router.get('/:id/comments', async (req, res) =>{
  try {
    const comments = await Comment.findAll({
      where: {
        post_id: req.params.id,
      },
    });
    
    if (!comments) { // return specific error if there is no product found with this id
      res.status(404).json({ message: 'No comments here!' });
      return;
    }
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});
  
// delete a comment by comment id
router.post('/:id/comments/:commentId', async (req, res) => {
    try {
        const commentData = await Comment.destroy({
          where: {
            id: req.params.commentId,
          },
        });
    
        if (!commentData) {
          res.status(404).json({ message: 'No comment found with this id!' });
          return;
        }
    
        res.status(200).end();
      } catch (err) {
        res.status(500).json(err);
      }
});

module.exports = router;