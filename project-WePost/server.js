if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// users array usage is for comparison email&password in authentication method
const users = [];

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const User = require('./models/user');

const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
);

const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');
const articleRouter = require('./routes/articles');
const authorArticleRouter = require('./routes/authorArticles');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

app.use(expressLayouts);
app.use(express.static('public'));
// for access in form fields with post method in routes:
app.use(express.urlencoded({ limit: '10mb', extended: false }));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(methodOverride('_method'));

app.use(passport.initialize());
app.use(passport.session());

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

app.use('/', indexRouter);
app.use('/articles', articleRouter);
app.use('/authorArticles', authorArticleRouter);
  
app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs');
});
  
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/articles/new',
    failureRedirect: '/login',
    failureFlash: true
}));
  
app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs');
});
  
app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      users.push({
        id: Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      });

      User.create({
        id: Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      });

      res.redirect('/login');
    } catch {
      res.redirect('/register');
    }
});
  
app.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
});
  
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}
  
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
}

app.listen(process.env.PORT || 3000);