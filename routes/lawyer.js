const express = require('express');
const router = express.Router();
const Lawyer = require('../models/Lawyer');
const bcrypt = require('bcryptjs');

router.get('/Lawyer', (req, res) => {
    res.render('Lawyer/index.ejs');
});

router.post('/Lawyer', async (req, res) => {
    const { username, email, caseWin, caseLoss, phone, password, cpassword, gender, address } = req.body;
    if (password !== cpassword) {
        return res.send('Invalid password');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    try {const newLawyer = new Lawyer({username,email,caseWin,caseLoss,phone,password: hashedPassword,gender,address,lastLogin: new Date(),});
        await newLawyer.save();
        const eligibilityMessage = "You are registered successfully"
        return res.render('Success/index.ejs',{eligibilityMessage});
    } catch (err) {
        console.error(err);
        if (err.code === 11000) {
            const duplicateKey = Object.keys(err.keyPattern)[0];
            const eligibilityMessage = `Duplicate entry for ${duplicateKey}`;
            return res.render('Success/fail.ejs',{eligibilityMessage});
        }
        return res.redirect('/Error');
    }
});
router.get('/Error', (req, res) => {
    res.send('An error occurred while processing your request.');
});
module.exports = router;