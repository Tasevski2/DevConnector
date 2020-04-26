const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route     GET api/profile/me
// @desc      Get my profile
// @access    Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
        if (!profile) {
            return res.status(404).json({ msg: "Profile not found" });
        }
        return res.status(200).json({ profile });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }

});

// @route     GET api/profile
// @desc      Create and update profile
// @access    Private
router.post('/', [auth, [
    check('status')
        .notEmpty().withMessage('Status is required!'),
    check('skills')
        .notEmpty().withMessage('Skills are required!')
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors });
    }
    const {
        company,
        website,
        location,
        status,
        skills,
        bio,
        githubusername,
        youtube,
        facebook,
        twitter,
        linkedin,
        instagram
    } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (status) profileFields.status = status;
    if (bio) profileFields.bio = bio;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
        let profile = await Profile.findOne({ user: req.user.id });

        if (profile) {
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, profileFields, {
                new: true
            });

            return res.status(200).json(profile);
        }

        profile = new Profile(profileFields);

        await profile.save();

        return res.status(200).json(profile);

    } catch(err) {
        console.log(err.message);
        return res.status(500).json({ errors: [{ msg: 'Server error!'}]});
    }
    
});

// @route     GET api/profile
// @desc      Get all profiles
// @access    Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        return res.status(200).json(profiles);
    } catch(err) {
        console.log(err.message);
        return res.status(500).json({ msg: "Server error!"});
    }
});

// @route     GET api/profile/user/:id
// @desc      Get profile by User id
// @access    Public
router.get('/user/:id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.id}).populate('user', ['name', 'avatar']);
        if(!profile) {
            return res.status(404).json({ msg: "Profile not found!"});
        }
        return res.status(200).json(profile);
    } catch(err) {
        const valid = mongoose.isValidObjectId(req.params.id);
        console.log(err.message);
        if(!valid) {
            return res.status(404).json({ msg: "Profile not found!"});
        }
        return res.status(500).json({error: "Server error!"});
    }
});

// @route     DELETE api/profile
// @desc      Delete user, profile & posts
// @access    Private
router.delete('/', auth, async (req, res) => {
    try {
        // @todo - delete users posts

        // Remove profile
        await Profile.findOneAndRemove({ user: req.user.id });
        // Remove user
        await User.findOneAndRemove({ _id: req.user.id });

        return res.status(200).json({ msg: "Profile removed." });
    } catch (err) {
        console.log(err.msg);
        return res.status(500).json({ msg: "Server error!"});
    }
    
});

// @route     PUT api/profile/experience
// @desc      Add experience
// @access    Private
router.put('/experience', [auth, [
    check('title')
        .notEmpty().withMessage('Title is required!'),
    check('company')
        .notEmpty().withMessage('Company is required!'),
    check('from')
        .notEmpty().withMessage('From date is required!')
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors });
    }
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;
    let fields = {};
    if(title) fields.title = title;
    if (company) fields.company = company;
    if (location) fields.location = location;
    if (from) fields.from = from;
    if (to) fields.to = to;
    if (current) fields.current = current;
    if (description) fields.description = description;

    try {
        const profile = await Profile.findOne({ user: req.user.id}).select('experience');
        profile.experience.unshift(fields);
        await profile.save();
        return res.status(200).json({ msg: "Experience added!"});
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: "Server error!"});
    }    
});

module.exports = router;