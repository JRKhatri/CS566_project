const mongoose = require('mongoose')

const Complaint = mongoose.model('Complaint', {
     tiketno:String,
     studentId:String,
     name:String,
     type:String,
     priority:String,
     complaint:String,
     postdate:Number,
     status:String,
     comments:[],
     s3location:String,
     },
    )

module.exports = Complaint;