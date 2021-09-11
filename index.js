require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3008;

const signUp = require('./route/signup');
const logIn = require('./route/login');
const homeRouter = require('./route/home');
const postRouter = require('./route/post');
const session_config = require('./session_config');

const { redirectToLogin } = require('./middleware');

// BODY PARESER
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(morgan('dev'));

// view
app.set('view engine', 'ejs');

// session
app.use(session(session_config));

// route middleware
app.use('/signup', signUp);

app.use('/login', logIn);

// app.use('/', homeRouter);

// app.use('/posts', postRouter);

app.listen(PORT, () => {
    console.log(`Your Port is : http://localhost:${PORT}`);
});