const express = require('express');
const router = express.Router();
const Lawyer = require('../models/Lawyer');
const bcrypt = require('bcryptjs');

router.get('/Lawyer',(req, res)=>{
    res.render('Lawyer/index.ejs')
});
router.post('/Lawyer',async(req, res)=>{
    const { username, email, caseWin, caseLoss, phone, password, cpassword, gender, address } = req.body;
    if(password!=cpassword) res.send(`Invalid password`);
    const hashedPassword = await bcrypt.hash(password, 10);
    try {const newLawyer = new Lawyer({username,email,caseWin,caseLoss,phone,password:hashedPassword,gender,address,lastLogin: new Date()});
        await newLawyer.save();
        res.send('Success')
    } catch (err) {
        console.log(err)
        res.redirect('/Error')
    }
    res.render('Lawyer/index.ejs')
});
module.exports = router;