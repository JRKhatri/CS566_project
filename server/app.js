const express = require('express');
const cors = require('cors');
const multer = require('multer')
const adminUser = require('./utils/createAdmin').insertAdminUser
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const mongoConnect = require('./utils/dbConnect').mongoConnect
const User = require('./models/User');

const authRouter = require('./routes/authRouter')
const complaintRouter = require('./routes/complaintRouter')
const contactRouter = require('./routes/contactRouter')
const upload = multer();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "ComplaintsFeedback System API",
        description: "ComplaintsFeedback system API Information",
        contact: {
          name: "Jyoti R Khatri"
        },
        servers: ["http://localhost:3030"]
      }
    },
    // ['.routes/*.js']
    apis: ["app.js"]
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  

//all urls access after authRouter needs JWT

/**
 * @swagger
 * /login :
 *  post:
 *    description: Use to login in app 
 *    responses:
 *      '200':
 *        description: response data
 */
/**
 * @swagger
 * /signup:
 *  post:
 *    description: Use to login in app 
 *    responses:
 *      '200':
 *        description: response data  
 */
app.use(authRouter);

/**
 * @swagger
 * /complaints:
 *  post:
 *    description: Use to post  complaints data (with file if file upladed)
 *    responses:
 *      '200':
 *        description: response data
 */
/**
 * @swagger
 * /complaints/:id:
 *  get:
 *    description: Use to get all  complaints filed by single user 
 *    responses:
 *      '200':
 *        description: response data
 */
/**
 * @swagger
 * /complaints/details/:id:
 *  get:
 *    description: Use to get all  complaints filed by single user 
 *    responses:
 *      '200':
 *        description: response data
 */
/**
 * @swagger
 * /complaints:
 *  get:
 *    description: Use to access all the complaints by admin 
 *    responses:
 *      '200':
 *        description: response data
 */
/**
 * @swagger
 * /complaints:
 *  patch:
 *    description: Use to update the complaints by admin
 *    responses:
 *      '200':
 *        description: response data
 */
app.use('/complaints', upload.single('file'), complaintRouter) //,

/**
 * @swagger
 * /contacts :
 *  post:
 *    description: Use to post contact information by admin
 *    responses:
 *      '200':
 *        description: response data
 */
/**
 * @swagger
 * /contacts:
 *  get:
 *    description: Use to access all the contact details by user and admin 
 *    responses:
 *      '200':
 *        description: response data
 */

/**
 * @swagger
 * /contacts/delete/:id:
 *  delete:
 *    description: Use to delete a contact information by Id 
 *    responses:
 *      '200':
 *        description: response data
 */
/**
 * @swagger
 * /contact/:id:
 *  get:
 *    description: Use to update a contact information by Id 
 *    responses:
 *      '200':
 *        description: response data
 */
app.use('/contacts', contactRouter)

app.use((err, req, res, next) => {
    console.log(err)
    console.log("400 route not found")
    res.status(400).json({ error: err })
})

mongoConnect((callback) => {
    adminUser()
    app.listen(3030, () => {
        console.log("Listening to 3030 localhost")
    });
})


//source code for swagger https://github.com/brian-childress/node-autogenerate-swagger-documentation/blob/master/app.js

