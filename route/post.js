const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('../views/pages/post');
});

router.get('/new', (req, res) => {
    res.render('../views/pages/new-post');
});

module.exports = router;