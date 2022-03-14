const mongoose = require('mongoose')
const User = mongoose.model('User',{
    studentId:{ type: String, required: true },
    fullname: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    signupdate:{tyope: String},
    type: { type: String, required: true },
    role:{type:String} 
});
module.exports = User;