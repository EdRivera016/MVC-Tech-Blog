const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ 
  helpers,
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'), 
  partialsDir: path.join(__dirname, 'views/partials') 
});

// Set up session middleware with Sequelize store
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Set up Handlebars engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(routes);

// Sync sequelize models and start server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});

// const path = require('path');
// const express = require('express');
// const session = require('express-session');
// const exphbs = require('express-handlebars');
// const routes = require('./controllers');
// const helpers = require('./utils/helpers');

// const sequelize = require('./config/connection');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);

// const app = express();
// const PORT = process.env.PORT || 3001;

// // // Set up Handlebars.js engine with custom helpers
// // const hbs = exphbs.create({
// //   helpers,
// //   defaultLayout: 'main',
// //   layoutsDir: path.join(__dirname, 'views/layouts'),
// //   partialsDir: [
// //     path.join(__dirname, 'views/partials'),
// //     path.join(__dirname, 'views/layouts')
// //   ],
// //   extname: '.handlebars'
// // });
// const hbs = exphbs.create({
//   helpers,
//   defaultLayout: 'main',
//   layoutsDir: path.join(__dirname, 'views/layouts'),
//   partialsDir: [
//     path.join(__dirname, 'views/partials')
//   ],
//   extname: '.handlebars'
// });

// // Debugging paths
// console.log('Layouts Dir:', path.join(__dirname, 'views/layouts'));
// console.log('Partials Dir:', path.join(__dirname, 'views/partials'));

// // Set up session middleware with Sequelize store
// const sess = {
//   secret: 'Super secret secret',
//   cookie: {},
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize
//   })
// };

// app.use(session(sess));

// // Set up Handlebars engine
// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');
// app.set('views', path.join(__dirname, 'views'));

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// // Routes
// app.use(routes);

// // Sync sequelize models and start server
// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
// });
