const express = require('express');
const User = require('../models/User');
const Complain = require('../models/Complain');
const router = express.Router();
const moment = require('moment-timezone');

// Custom ensureAuthenticated middleware
function ensureAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }
    res.redirect('/login');
}

// Route to render Profile page
router.get('/Profile', async (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    try {
        const user = await User.findById(req.session.user._id);
        user.lastLogin = moment(user.lastLogin).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
        const complainCount = await Complain.countDocuments({ email: user.email });

        res.render('Profile/index', { user, complainCount });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Route to render user's complaints
router.get('/Profile/complaints', ensureAuthenticated, async (req, res) => {
    try {
        const complaints = await Complain.find({ userId: req.session.user._id });
        res.render('Profile/complain.ejs', { complaints });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
