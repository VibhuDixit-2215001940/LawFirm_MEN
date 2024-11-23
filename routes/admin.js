const express = require('express');
const router = express.Router();
const session = require('express-session');
const User = require('../models/User'); 
const Complain = require('../models/Complain'); 
const Lawyer = require('../models/Lawyer');
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


router.get('/AdminLogin',async (req, res) => {
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
    const { search } = req.query;let filter = {};
    if (search) {
        const regex = new RegExp(search, 'i'); 
        filter = { $or: [{ address: regex }, { firstName: regex }] }; 
    }
    const userCount = await User.countDocuments();
    const complainCount = await Complain.countDocuments(filter);
    const complain = await Complain.find(filter);
    const lawyerCount = await Lawyer.countDocuments();
    const lawyer = await Lawyer.find();
    const users = await User.find();
    res.render('Admin/index.ejs', {users,userCount,complain,complainCount,lawyerCount,lawyer,});
});


router.get('/AdminLogout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/Admin');
        }
        res.redirect('/');
    });
});
router.post('/Admin/resolve/:id', ensureAuthenticated, async (req, res) => {
    try {
        const { id } = req.params;
        await Complain.findByIdAndUpdate(id, { status: 'Resolved' });
        res.redirect('/Admin');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
module.exports = router;
