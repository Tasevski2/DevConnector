const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route     Post api/users
// @desc      Register user
// @access    Public
router.post('/',[
    check('name')
        .notEmpty().withMessage('Enter some name'),
    check('email')
        .isEmail().withMessage('Enter a valid email'),
    check('password')
        .isLength({ min: 6 }).withMessage('The password must be at least 6 characters')
] ,async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors});
    }
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'The email is already taken!' }] });
        }
        const avatar = gravatar.url(email);
        user = new User({
            name,
            email,
            avatar,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload,
            config.get('jwt_secret'),
            {expiresIn: 360000},
            (err, token) => {
                return res.json({token});
            });
    } catch(err) {
        return res.status(500).json({errors: [{msg: err.message}]});
    }
})

module.exports = router;