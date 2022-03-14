const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const AWS = require('aws-sdk')
//  const { SNS } = require('aws-sdk');
const User = require('../models/User');
const config = require('../config.json');

//source code:https://stackabuse.com/publishing-and-subscribing-to-aws-sns-messages-with-node-js/

const credentials = new AWS.SharedIniFileCredentials({ profile: 'sns_profile' });
const sns = new AWS.SNS({ credentials: credentials, region: 'us-east-1' });

/* signup function */

exports.signup = async (req, res, next) => {
    try {
        const { studentId, fullname, email, phone, type } = req.body

        //validate if user already exists
        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).json({ success: false, message: "User Alredy Exists" })
        }
        //dcrypt the password
        const password = await bcrypt.hash(req.body.password, 10)

        //make new user body object
        const user = new User({ ...req.body, password, role: "USER" })
        await User(user).save()

        //release token after signup
        const token = jwt.sign(
            {
                studentId,
                fullname,
                email,
                phone,
                type,
                role: user.role
            },
            config.secret
        )

        //one time subscription for the admin in AWS sns service
        if (user.role === 'ADMIN') {
            let params = {
                Protocol: 'EMAIL',
                TopicArn: 'arn:aws:sns:us-east-1:842166701148:ComplaintFeedbackProject',
                Endpoint: email
            };
            sns.subscribe(params, (err, data) => {
                if (err) {
                    throw new err
                    console.log(err);
                } else {
                    console.log(data)
                }
            })
        }
        res.status(201).json({ success: true, token })

    } catch (err) {
        next({ status: 500, msg: err })
    }
}

// for sigin user
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            res.json({ success: false, msg: 'Username/Password Invalid' })
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            res.json({ success: false, msg: 'Username/Password Invalid' })
        }
        const token = jwt.sign(
            {
                studentId: user.studentId,
                fullname: user.fullname,
                email: user.email,
                type: user.type,
                role: user.role
            },
            config.secret
        )
        res.status(201).json({ success: true, token })
    } catch (err) {
        next({ status: 200, msg: err })
    }
}

//authorization for access to other resources
exports.authorize = async (req, res, next) => {

    try {
        const auth = req.headers.authorization;
        if (!auth) {
            res.status(403).json({ success: false, msg: "Unauthorized" })
        } else {
            const auth_token = auth.split(' ')[1];
            if (auth_token) {
                jwt.verify(auth_token, config.secret, (err, user) => {
                    if (err) {
                        return res.status(403).json({ 'error': "Forbidden" })
                    }
                    req.user = user
                    console.log(req.user)
                    next();
                });

            } else {
                console.log("authorize")
                res.status(401).json({ "error": "Unauthorized" })
            }
        }
    } catch (err) {
        next({ status: 401, msg: err })
    }
}
//Authorization for ADMIN
exports.authorizeAdmin = (req, res, next) => {
    try {
        if (req.user.role === "ADMIN") {
            console.log('authorizeAdmin')
            next();
        } else {
            res.status(401).json({ error: "Unauthorized" })
        }
    } catch (err) {
        next({ status: 401, msg: err })
    }

}

//Authorization for USER
exports.authorizeUser = (req, res, next) => {
    console.log("aayo")
    try {
        if (req.user.role === "USER") {
            next()
        } else {
            res.status(401).json({ error: "Unauthorized" })
        }
    } catch (err) {
        next({ status: 401, msg: err })
    }

}

