/* setting database connection to mongodb for application */
const mongoose = require('mongoose');
const dbUrl = 'mongodb://localhost:27017';

const mongoConnect = (callback) => {
    mongoose.connect(dbUrl, {
        useNewUrlparser : true,
            useUnifiedTopology : true,
            dbName : 'cs566FinalProject'
    }).then(client => {
        console.log('Database connection successfull')
        callback()
    })
    .catch(error => {
        console.log('Error in Database connection')
    })
}

exports.mongoConnect = mongoConnect;
