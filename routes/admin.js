const express = require('express');
const router = express.Router();
const session = require('express-session');
const User = require('../models/User'); 
const { v4: uuidv4 } = require('uuid');


function generateShortId() {
    return uuidv4().split('-').join('').slice(0, 8); // Take first 8 characters of the UUID without dashes
}


router.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


function ensureAuthenticated(req, res, next) {
    if (req.session.userId) {
        return next();
    }
    res.redirect('/AdminLogin');
}


router.get('/AdminLogin', (req, res) => {
    res.render('Admin/adminLogin.ejs');
});


router.post('/AdminLogin', async (req, res) => {
    const { Username, password } = req.body;
    console.log('Username:', Username);
    console.log('Password:', password);
    if (Username === 'admin' && password === 'admin') {
        req.session.userId = 'Admin';
        res.redirect('/Admin');
    } else {
        res.redirect('/Error');
    }
});


router.get('/Admin', ensureAuthenticated, async (req, res) => {
    res.render('Admin/index.ejs');
});


router.get('/AdminLogout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/Admin');
        }
        res.redirect('/');
    });
});
module.exports = router;
