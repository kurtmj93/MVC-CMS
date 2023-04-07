// require express & call as function
const express = require('express');
const app = express();
// call for express session package to handle user sessions and handlebars for app engine
const session = require('express-session');
const handlebars = require('express-handlebars');

// connect to db
const sequelize = require('./config/connection');
// connect express session to db
const SequelizeStore = require('connect-session-sequelize')(
  session.Store
);

// set and use session connection info
const sess = {
    secret: 'Super secret secret',
    cookie: {
      maxAge: 300000, // WHEN I am idle on the site for more than a set time
                      // THEN I am able to view comments but I am prompted to log in again before I can add, update, or delete comments
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };
  app.use(session(sess));

// set handlebars as view engine
const bars = handlebars.create({ helpers });
app.engine('handlebars', bars.engine);
app.set('view engine', 'handlebars');

// connect and use controllers / api routes
const routes = require('/controllers');
app.use(routes);

// express middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set .env PORT, or localhost:3001
const PORT = process.env.PORT || 3001;

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(port, () => console.log('Now listening'));
  });