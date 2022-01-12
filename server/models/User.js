const mongoose = require('mongoose')
const User = mongoose.model('User',{
    studentId:{ type: String, required: true },
    fullname: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    type: { type: String, required: true },
});

module.exports = User;