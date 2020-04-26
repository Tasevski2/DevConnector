const express = require('express');
const router = express.Router();
const config = require('config');
const request = require('request');
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

// @route     DELETE api/profile/experience/:exp_id
// @desc      Delete experience
// @access    Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id}).select('experience');
        const newExperiences = profile.experience.filter(exp => {
            return exp._id != req.params.exp_id;
        });
        profile.experience = [...newExperiences];
        await profile.save();
        return res.status(200).json({ msg: "Experiene deleted!"});
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ msg: "Server error!"});
    }
});

// @route     PUT api/profile/education
// @desc      Add education
// @access    Private
router.put('/education', [auth, [
    check('school')
        .notEmpty().withMessage('School is required!'),
    check('degree')
        .notEmpty().withMessage('Degree is required!'),
    check('fieldofstudy')
        .notEmpty().withMessage('Field of study is required!'),
    check('from')
        .notEmpty().withMessage('From is required!')
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors });
    }
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;
    let fields = {};
    if(school) fields.school = school;
    if (degree) fields.degree = degree;
    if (fieldofstudy) fields.fieldofstudy = fieldofstudy;
    if (from) fields.from = from;
    if (to) fields.to = to;
    if (current) fields.current = current;
    if (description) fields.description = description;

    try {
        const profile = await Profile.findOne({ user: req.user.id}).select('education');
        profile.education.unshift(fields);
        await profile.save();
        return res.status(200).json({ msg: "Education added!"});
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: "Server error!"});
    }    
});

// @route     DELETE api/profile/education/:edu_id
// @desc      Delete education
// @access    Private
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id}).select('education');
        const newEducation = profile.education.filter(edu => edu._id != req.params.edu_id);
        profile.education = [...newEducation];
        await profile.save();
        res.status(200).json({ msg: "Education removed!"});
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: "Server error!"});
    }
});

// @route     GET api/profile/github/:username
// @desc      Get github profile
// @access    Public
router.get('/github/:username', (req, res) => {
    try {
        const options = {
        uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('github_client_id')}&client_secret=${config.get('github_client_secret')}`,
        method: 'GET',
        headers: {
            'user-agent': 'node js'
        }
    }
        request(options, (error, response, body) => {
            if(error) console.log(error);

            if(response.statusCode !== 200) return res.status(404).json({ msg: "No GitHub profile found!"});

            return res.status(200).json(JSON.parse(body));
        })
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: "Server error!"});
    }
})

module.exports = router;