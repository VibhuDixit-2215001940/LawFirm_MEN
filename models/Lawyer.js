const mongoose = require('mongoose');
const lawyerSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    caseWin: {type: Number, required: true},
    caseLoss: { type: Number, required: true},
    phone: {type: Number, required: true, unique: true},
    password: { type: String, required: true },
    gender: { type: String, required: true},
    address: { type: String, required: true},
    lastLogin: { type: Date }
});

module.exports = mongoose.model('Lawyer', lawyerSchema);