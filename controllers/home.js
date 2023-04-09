const router = require('express').Router();
const { Post, User } = require('../models');

// get all posts for homepage
router.get('/', async (req, res) => {

    try {
        const postData = await Post.findAll({
            limit: 10, 
            order: [[ 'createdAt', 'DESC' ]],
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

// TODO: get all posts for dashboard?

router.get('/signup', async (req, res) => { // checks for any value

    if (req.session.loggedIn) { // check if loggedin & send back to main
        res.redirect('/');
        return;
      }
    res.render('signup');
});

router.get('/login', async (req, res) => { // checks for any value

    if (req.session.loggedIn) { // check if loggedin
        res.redirect('/');
        return;
      }
    res.render('login');
});

module.exports = router;