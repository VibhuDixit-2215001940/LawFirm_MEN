const express = require('express');
const router = express.Router();

router.get('/check', (req, res) => {
    res.render('checker/index.ejs');
});

router.post('/check', (req, res) => { // Route to handle eligibility check form submission
    const { age, username, Case, Offense, Date, Bail } = req.body;
    let x = 2024-Date;
    let isEligible = true;
    let eligibilityMessage = "You are eligible for bail!";

    if (age < 18) {
        isEligible = false;
        eligibilityMessage = "Sorry, you must be 18 or older to be eligible for bail.";
    } else if (Bail >= 10000) {
        isEligible = false;
        eligibilityMessage = `Sorry, bails is not allowd for <%= Bail %> of amount`;
    } else if (!Offense || Offense.trim() === "") {
        isEligible = false;
        eligibilityMessage = `Offense type cannot be empty.`;
    } else if(Case >= 1000 && Case < 10){
        isEligible = false;
        eligibilityMessage = `Sorry, bails is not allowed for case no <%= Case %>`;
    }
    if(isEligible) res.render('Success/index',{eligibilityMessage});
    else res.render('Success/fail',{eligibilityMessage});
});

module.exports = router;
