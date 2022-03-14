const User = require('../models/User');
const bcrypt = require('bcrypt');
const PASSWORD_ADMIN = "admin@admin";

 const insertAdminUser = async () =>{
    const findAdmin = await User.findOne({role:"ADMIN"})
    const date = new Date()
    console.log(findAdmin)
    if(findAdmin){
        console.log("Yes admin is there")
        return "Admin exists"
    }else{
        const password = await bcrypt.hash(PASSWORD_ADMIN, 10)
        const user = new User({ 
            studentId:"XXXXXX",
            role:"ADMIN",
            fullname: "Admin",
            password:password, 
            email: "cfs@admin.com",
            phone: "123",
            signupdate:date,
            type:"Employee",
        }
        )
        console.log("no admin")
         let x =await User(user).save()
         console.log(x)

    }
   
}
exports.insertAdminUser = insertAdminUser
