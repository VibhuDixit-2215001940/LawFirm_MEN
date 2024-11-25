// routes/login.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();
const complainRoutes = require('../models/Complain');
router.get('/FIR', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login'); // Redirect if user is not logged in
    }
    const userName = req.session.user.username || 'Guest';
    res.render('FIR/index', { userName });
});
router.post('/FIR', async (req, res) => {
    const { firstName, lastName, email, address, city, state, phone } = req.body;
    try {const newComplaint = new complainRoutes({firstName,lastName,email,address,city,state,phone});
        await newComplaint.save();
        res.render('Thanks/index.ejs',{newComplaint});
    } catch (err) {
        console.log(err)
        res.render('404/index')
    }
});
module.exports = router;