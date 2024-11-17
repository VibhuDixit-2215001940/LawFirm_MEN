// routes/login.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

router.get('/login', (req, res) => {// Render login page
    res.render('login/index');
});
router.post('/login', async (req, res) => {// Handle login form submission
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.render("404/index");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render("404/index");
        }
        req.session.user = user;  
        res.redirect('/land');
    } catch (err) {
        console.error(err);
        res.render("404/index");
    }
});
router.post('/signup', async (req, res) => {// Handle signup form submission
    const { username, lname, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });// Check if user already exists
        if (existingUser) {
            return res.status(400).send('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);// Hash the password
        const newUser = new User({// Create new user
            username,
            lname,
            email,
            password: hashedPassword,
            lastLogin: new Date()
        });
        await newUser.save();
        res.redirect('/login'); // Redirect to login after successful signup
    } catch (error) {
        console.error(error);
        res.render("404/index");
    }
});
router.get('/land', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login'); // Redirect if user is not logged in
    }
    const userName = req.session.user.username || 'Guest'; // Access username from session
    res.render('landing/index.ejs', { userName });
});

module.exports = router;
