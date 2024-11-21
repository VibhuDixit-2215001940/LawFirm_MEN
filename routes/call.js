const express = require('express');
const User = require('../models/User');
const Lawyer = require('../models/Lawyer');
const router = express.Router();

router.get('/Call', async (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    const user = await User.findById(req.session.user._id);
    const lawyer = await Lawyer.find();
    res.render('Call/index', { user, lawyer });
});
router.get('/Payment', async (req, res) => {
    res.render('Call/payment');
})
module.exports = router;
