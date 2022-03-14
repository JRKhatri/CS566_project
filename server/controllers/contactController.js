const Contact = require('../models/Contact')

exports.saveContact = async (req, res, next) => {
    try {
        const { email } = req.body
        //validate if user already exists
        const exist = await Contact.findOne({ email });
        if (exist) {
            return res.json({ success: false, message: "User Alredy Exists" })
        }
        const result = await Contact(req.body).save()
        res.status(201).json({ success: true, data: result })

    } catch (err) {
        next({ status: 500, msg: err })
    }
}

exports.getAllContacts = async (req, res, next) => {
    try {
        const allContacts = await Contact.find();
        res.status(201).json({ success: true, data: allContacts })
    } catch (err) {
        next({ status: 500, msg: err })
    }
}

exports.removeContactByEmail = async (req, res, next) => {
    console.log(req.params.id)
    try {
        const result = await Contact.findOneAndDelete(req.params.id)
        res.status(200).json({ success: true, data: result })

    } catch (err) {
        next({ status: 500, msg: err })

    }
}

exports.updateContactById = async (req, res, next) => {
    const { department, name, position, email, phone, postdate, description } = req.body
    console.log(department)
    try {
        const result = await Contact.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    department: department,
                    name: name,
                    position: position,
                    email: email,
                    phone: phone,
                    postdate: postdate,
                    description: description
                }
            }
        );
        console.log(result)
        res.status(201).json({ success: true, data: result })

    } catch (err) {
        next({ status: 500, msg: err })
    }
}