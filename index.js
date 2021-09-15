require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('express-flash');

const app = express();
const PORT = process.env.PORT || 3008;

const homeRouter = require('./route/home');
const postRouter = require('./route/post');
const signUp = require('./route/signup');
const logIn = require('./route/login');
const logoutRouter = require('./route/logout');

const session_config = require('./session_config');

const { redirectToLogin, redirectToHome } = require('./middleware');

// BODY PARESER
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(morgan('dev'));

// view
app.set('view engine', 'ejs');

// session
// app.use(express.cookieParser('keyboard cat'));
app.use(session(session_config));
app.use(flash());

// route middleware
app.use('/signup', redirectToHome, signUp);

app.use('/login', redirectToHome, logIn);

app.use('/', redirectToLogin, homeRouter);

app.use('/logout', redirectToLogin, logoutRouter);
// app.use('/posts', postRouter);

app.listen(PORT, () => {
    console.log(`Your Port is : http://localhost:${PORT}`);
});