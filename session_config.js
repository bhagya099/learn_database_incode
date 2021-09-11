const session_config = {
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        // secure: process.env.NODE_ENV === true ? true : false,
    },
    name: 'mrcoffee_sid',
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESS_SECRET,
};

module.exports = session_config;