const express = require('express');
const User = require('../models/User');
const router = express.Router();
const moment = require('moment-timezone');

router.get('/Profile', async (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    const user = await User.findById(req.session.user._id);
    user.lastLogin = moment(user.lastLogin).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
    res.render('Profile/index', { user });
});
module.exports = router;
