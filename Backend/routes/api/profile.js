const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');

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
    } catch(err) {
        return res.status(500).json({ msg: err.message});
    }
    
});

module.exports = router;