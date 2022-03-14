const mongoose = require('mongoose')
const Contact = mongoose.model('Contact',{
    department:{ type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    postdate:{type: String},
    position: { type: String, required: true },
    description:{type:String}
});

module.exports = Contact;