const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

//authentication : url with path signup and login  access the jwtoken 
router.post('/signup', authController.signup);
router.post('/login', authController.login);

//authorization : all other url should be authorize to use the services
router.use(authController.authorize)


module.exports = router