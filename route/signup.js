const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../databse');

router.get('/', (req, res) => {
    res.render('pages/signup.ejs');
    // res.send('Hello signup details');
});

router.post('/', (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    // coming data fname lname email password confirm password
    // 1. validate the user data
    db.oneOrNone('SELECT * FROM users WHERE email = $1;', [email])
        .then((usersExists) => {
            if (usersExists) {
                // user exists pls send to prompt to login // check if user exists in db
                res.redirect('/login?message=User%20already%20exists');
            } else {
                // hash passwrod - clean the mail
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(password, salt);
                const cleanEmail = email.toLowerCase().trim();
                // insert into db
                db.none(
                        'INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4);', [firstname, lastname, cleanEmail, hash]
                    )
                    .then(() =>
                        res.redirect('/login?message=User%20succesfully%20created')
                    )
                    .catch((error) => console.log(error));
            }
        })
        .catch((error) => {
            console.log(error);
            res.json(error);
        });
});

module.exports = router;