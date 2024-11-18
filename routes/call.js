const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/Call', async (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    const user = await User.findById(req.session.user._id);
    res.render('Call/index', { user });
});
module.exports = router;
