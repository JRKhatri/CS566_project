const fs = require('fs');
const path = require('path')
const AWS = require('aws-sdk')
const Complaint = require('../models/Complaint');
const mybucket = require('../aws.json');
const { SNS } = require('aws-sdk');
const { Buffer } = require('buffer')


const s3 = new AWS.S3(mybucket);
const credentials = new AWS.SharedIniFileCredentials({ profile: 'sns_profile' });
const sns = new AWS.SNS({ credentials: credentials, region: 'us-east-1' });

/**
 * @swagger
 * /complaints/:id :
 *  post:
 *    description: Use to post  complaints data
 *    responses:
 *      '200':
 *        description: response data
 *
 *      
 */
exports.saveComplaint = async (req, res, next) => {
    try {
        //get latest data from db
        let newComplaint = req.body;
        let result;
        let latestTicketNumber = await Complaint.find({}).sort({ _id: -1 }).limit(1);
        let ticketNo;

        if (!latestTicketNumber[0]) {
            ticketNo = 0
        } else {
            ticketNo = parseInt(latestTicketNumber[0].tiketno.split("-")[1]);
        }

        if (req.file) {
            const fileName = req.file.originalname;
            const buffer = Buffer.from(req.file.buffer)
            console.log("buffer")
            const time = new Date()

            const params = {
                Bucket: 'complaintfeedbackproject',
                Key: `upload/${time + fileName}`,
                Body: buffer
            };

            s3.upload(params, async function (s3Err, data) {
                if (s3Err) {
                    console.log(s3Err)
                    throw s3Err
                }
                console.log("My location")
                newComplaint = { ...newComplaint, s3location: data.Location, tiketno: "COM-" + (ticketNo + 1) };
                result = await Complaint(newComplaint).save();

                console.log("inside ")
                jsonReturn(result)
                return res.status(200).json({ success: true, payload: result })
            })

        } else {
            console.log("My location")
            newComplaint = { ...newComplaint, s3location: "NONE", tiketno: "COM-" + (ticketNo + 1) };
            result = await Complaint(newComplaint).save();
            console.log("else")
            console.log(result)
            jsonReturn(result)
            return res.status(200).json({ success: true, payload: result })
        }

    } catch (err) {
        next({ status: 400, msg: err })
    }
}


exports.getComplaintById = async (req, res, next) => {

    try {
        const studentId = req.params.id
        const result = await Complaint.find({ studentId }).select(`_id tiketno studentId type postdate`)
        console.log(result)
        res.status(200).json({ success: true, data: result })
    } catch (err) {
        next({ status: 400, msg: err })
    }
}

exports.getComplaintDetailsById = async (req, res, next) => {

    try {
        const complaintId = req.params.id
        console.log(complaintId)
        const result = await Complaint.findById({ _id: complaintId })
        console.log(result.tiketno)
        res.status(200).json({ success: true, data: result })
    } catch (err) {
        next({ status: 400, msg: err })
    }
}

exports.getAllComplaints = async (req, res, next) => {
    try {
        const result = await Complaint.find()
        console.log(result)
        res.status(200).json({ success: true, data: result })
    } catch (err) {
        next({ status: 400, msg: err })
    }
}

exports.updateComplaints = async (req, res, next) => {
    try {
        const formData = req.body;
        const objFromDb = await Complaint.updateOne(
            { _id: formData.id }, {
            $push: {
                comments: { date: new Date(), message: formData.comment }
            }, $set: {
                status: formData.status
            }
        }
        );
        res.status(200).json({ success: true, data: objFromDb })

    } catch (err) {
        next({ status: 400, msg: err })
    }
}

//helper function for the save complaints and return result after email 
function jsonReturn(result) {
    if (result) {
        const { tiketno, postdate, studentId, name, email, priority } = result
        //Publishing sns email to admin notification once complaint is submitted to db
        let params1 = {
            Message: `Post Date:${postdate}, TicketNo:${tiketno}, Priority:${priority}`,
            Subject: `New complaint by: ${name}`,
            TopicArn: 'arn:aws:sns:us-east-1:842166701148:ComplaintFeedbackProject'
        };
        sns.publish(params1, function (err, data) {
            if (err) console.log(err, err.stack)
            else console.log(data)
        })
    
    }
}