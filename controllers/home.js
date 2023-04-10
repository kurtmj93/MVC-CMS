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

// get posts by user id for dashboard
router.get('/dashboard', async (req, res) => {
if (req.session.loggedIn) { // check if loggedin
    try {
        const postData = await Post.findAll({
            where: { user_id: req.session.userid },
            order: [[ 'createdAt', 'DESC' ]]
        });

        const posts = postData.map((post => post.get ({ plain: true })));
        res.render('dashboard', 
        { posts, 
          loggedIn: req.session.loggedIn, // passes this info to handlebars render so it can be used as a conditional
          user_id: req.session.userid
        }); 
    } catch (err) {
        res.status(500).json(err);
    }
} else {
    res.redirect('/login');
    return;
}
});

router.get('/signup', async (req, res) => { // no logic here - signup link will only show if not logged-in
    res.render('signup');
});

router.get('/login', async (req, res) => { // no logic here - login link will only show up if not logged-in
    res.render('login');
});

router.get('/new', async (req, res) => { 

    if (req.session.loggedIn) {
        res.render('new',
        {   loggedIn: req.session.loggedIn, // passes this info to handlebars render so it can be used as a conditional
            user_id: req.session.userid
        });
        return;
    } else {
        res.redirect('/login'); // redirect to login if not 
    }
});

module.exports = router;