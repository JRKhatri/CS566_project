const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User');
const config = require('../config.json');

/* signup function */

exports.signup = async (req, res, next) => {
    try {
        const {studentId, fullname, email, phone, type } = req.body
       
        //validate if user already exists

        const exist = await User.findOne({ email });
            if (exist) {
                return res.status(400).json({success:false, message:"User Alredy Exists"})
            }
             
        //dcrypt the password

        const password = await bcrypt.hash(req.body.password, 10)
       
        //make new user body object
        const user = new User({ ...req.body, password })
       

        await User(user).save()

        //release token after signup
        const token = jwt.sign(
            {
                studentId,
                fullname,
                email,
                type
            },
            config.secret
        )

        res.status(201).json({ success: true, token })


    } catch (err) {
        next({ status: 500, msg: err })
    }
}

// for sigin user
exports.login = async (req, res, next) => {
    try {
        console.log(req.body)
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
           
             res.json({success:false, msg:'Username/Password Invalid'})
        } 
        
            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                
               
                res.json({success:false, msg: 'Username/Password Invalid' })
            }

            const token = jwt.sign(
                {
                    studentId:user.studentId,
                    fullname: user.fullname,
                    email: user.email,
                    type: user.type,
                },
                config.secret
            )

            res.status(201).json({ success: true, token })

    } catch (err) {
    
        next({ status: 204, msg: err })

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
                const token = jwt.verify(auth_token, config.secret);
                req.token = token;
                next();

            }

        }


    } catch (err) {
        next({ status: 401, msg: err })

    }


}
