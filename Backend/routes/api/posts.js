const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validatioResult} = require('express-validator');

// @route     POST api/posts
// @desc      Create post
// @access    Private
router.post('/', (req, res) => {
    res.send("POSTS ROUTE");
});

module.exports = router;