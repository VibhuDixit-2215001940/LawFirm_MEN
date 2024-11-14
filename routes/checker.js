const express = require('express');
const router = express.Router(); 


router.get('/check', (req, res) => {// Route to display eligibility check form
    console.log('Rendering eligibility form');
    res.render('checker/index.ejs');
});


router.post('/check', (req, res) => {// Route to handle eligibility check form submission
    const { age, citizenship, education } = req.body;
    let isEligible = true;
    let eligibilityMessage = "You are eligible!";
    if (age < 18) {
        isEligible = false;
        eligibilityMessage = "Sorry, you must be 18 or older.";
    } else if (citizenship !== 'USA') {
        isEligible = false;
        eligibilityMessage = "Sorry, you must be a US citizen.";
    } else if (education !== 'High School') {
        isEligible = false;
        eligibilityMessage = "Sorry, you must have at least a high school education.";
    }
    res.json({ isEligible, eligibilityMessage });  // Send the result as a JSON response
});

module.exports = router;
