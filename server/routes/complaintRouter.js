
const express = require('express')
const complaintController = require('../controllers/complaintController')
const authController = require('../controllers/authController')
const router = express.Router();

router.post('/', authController.authorizeUser, complaintController.saveComplaint)
router.get('/:id', authController.authorizeUser, complaintController.getComplaintById)
router.get('/details/:id', complaintController.getComplaintDetailsById)
router.get('/', authController.authorizeAdmin, complaintController.getAllComplaints)
router.patch('/',authController.authorizeAdmin, complaintController.updateComplaints)

module.exports = router