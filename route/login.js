const express = require('express');
const router = express.Router();
const db = require('../databse');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.render('pages/login', {
        title: 'Login page',
        message: req.query.message,
    });
});

router.post('/', (req, res) => {
    const { email, password } = req.body;
    // convert the email in lower case and aslo trim the spaces
    const cleanEmail = email.toLowerCase().trim();
    // 1.validate
    db.oneOrNone('SELECT * FROM users WHERE email = $1;', [cleanEmail])
        .then((user) => {
            console.log(user);
            console.log(user.id);
            console.log(user.password);
            console.log(req.session);
            if (!user) {
                res.redirect('/login?message=Email%20or%20password%20incorrect');
            } else {
                bcrypt
                    .compare(password, user.password)
                    .then((result) => {
                        console.log(result);
                        if (result) {
                            // TODO: edit session and redirect with success message
                            // req.session.userId = user.id;
                            // console.log(req.session.userId);
                            res.send('Succefully Logged in');
                            // res.redirect('/');
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        res.send(error);
                    });
            }
        })
        .catch((error) => {
            console.log(error);
            res.send(error);
        });
    // 2.does the email exists in the db

    // 3. if so verify password
});

module.exports = router;