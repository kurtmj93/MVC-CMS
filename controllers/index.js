const router = require('express').Router();
const apiRoutes = require('./api');
const home = require('./home.js');

router.use('/api', apiRoutes);
router.use('/', home);

module.exports = router;