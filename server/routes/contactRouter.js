const express = require('express')
const contactController = require('../controllers/contactController')
const authController = require('../controllers/authController')

const router = express.Router();
router.get('/',  contactController.getAllContacts)
router.post('/', authController.authorizeAdmin, contactController.saveContact)
router.delete('/:id', authController.authorizeAdmin,contactController.removeContactByEmail) 
router.patch('/:id',authController.authorizeAdmin, contactController.updateContactById )
    
module.exports =router
//router.patch('/',authController.authorizeAdmin, complaintController.updateComplaints)