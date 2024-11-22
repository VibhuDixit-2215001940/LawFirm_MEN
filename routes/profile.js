const express = require('express');
const User = require('../models/User');
const Complain = require('../models/Complain');
const router = express.Router();
const moment = require('moment-timezone');

function ensureAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }
    res.redirect('/login');
}

router.get('/Profile', async (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    try {
        const user = await User.findById(req.session.user._id);
        user.lastLogin = moment(user.lastLogin).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
        const complainCount = await Complain.countDocuments({ email: user.email });
        const resolvedCount = await Complain.countDocuments({ email: user.email, status: 'Resolved' });
        res.render('Profile/index', { user, complainCount, resolvedCount });
    } catch (err) {
        res.render('404/index')
    }
});

router.get('/Profile/complaints', ensureAuthenticated, async (req, res) => {
    try {
        const userEmail = req.session.user.email; 
        const complaints = await Complain.find({ email: userEmail }); 
        res.render('Profile/complain.ejs', { complaints });
    } catch (err) {
        res.render('404/index')
    }
});

module.exports = router;
