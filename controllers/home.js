const router = require('express').Router();
const { Post, User } = require('../models');

// get all posts for main feed
router.get('/', async (req, res) => {

    try {
        const postData = await Post.findAll({
            limit: 10, 
            order: [[ 'date_created', 'DESC' ]],
            include: { model: User, attributes: ['username'] }
        });

        const posts = postData.map((post => post.get ({ plain: true })));
        res.render('home', 
        { posts, 
          loggedIn: req.session.loggedIn, // passes this info to handlebars render so it can be used as a conditional
          user_id: req.session.userid
        }); 
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/.*', async (req, res) => { // checks for any value

    if (req.session.loggedIn) { // check if loggedin
        res.redirect('/');
        return;
      }
    res.render('signup');
});