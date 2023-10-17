"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const crypto_1 = __importDefault(require("crypto"));
const uuid_1 = require("uuid");
const db_js_1 = __importDefault(require("../database/db.js"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const postUserSignUpOptions = {
    schema: {
        body: {
            type: 'object',
            required: ['userName', 'userEmail', 'userPassword'],
            properties: {
                userName: { type: 'string' },
                userEmail: { type: 'string', format: 'email' },
                userPassword: { type: 'string' },
            },
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    user_id: { type: 'string' },
                    userName: { type: 'string' },
                    userEmail: { type: 'string' },
                    salt: { type: 'string' },
                    newPassword: { type: 'string' },
                },
            },
        },
    },
};
const postUserSignInOptions = {
    schema: {
        body: {
            type: 'object',
            required: ['userEmail', 'userPassword'],
            properties: {
                userEmail: { type: 'string', format: 'email' },
                userPassword: { type: 'string' },
            },
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    userEmail: { type: 'string' },
                    userPassword: { type: 'string' },
                },
            },
        },
    },
};
function userRoutes(fastify, opts, done) {
    fastify.post('/signup', postUserSignUpOptions, async (request, reply) => {
        // console.log("this sign in route is called")
        const { userName, userEmail, userPassword } = request.body;
        const existingUser = await db_js_1.default.query("SELECT * FROM usertable WHERE email = $1", [userEmail]);
        if (existingUser.rows.length === 0) {
            try {
                // console.log(request.body)
                // Creating a unique salt for a particular user
                const salt = crypto_1.default.randomBytes(16).toString('hex');
                // Hash the salt and password with 1000 iterations, 64 length, and sha512 digest 
                let newPassword = crypto_1.default.pbkdf2Sync(userPassword, salt, 1000, 64, 'sha512').toString('hex');
                const user_id = (0, uuid_1.v4)();
                const transporter = nodemailer_1.default.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'centralizeshopping@gmail.com',
                        pass: process.env.mailPassword
                    }
                });
                const emailContent = `
           <html>
               <head>
                   <style>
                    
                       body {
                           font-family: Arial, sans-serif;
                           background-color: #f4f4f4;
                           margin: 0;
                           padding: 0;
                       }
                       .container {
                           max-width: 600px;
                           margin: 0 auto;
                           padding: 20px;
                           background-color: #fff;
                           box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                           text-align: left; 
                       }
                       h1 {
                           color: #333;
                           text-align: center;
                       }
                       p {
                           color: #666;
                           text-align: left; /* Align paragraphs to the left */
                           font-size: 18px;
                       }
                   </style>
               </head>
               <body>
                   <div class="container">
                       <h1>Welcome to Centralize Shopping</h1>
                       <p>Dear ${userName},</p>
                       <p>Thank you for joining Centralize Shopping!</p>
                       <p>If you have any questions or need assistance, please don't hesitate to contact our support team at centralizeshopping@gmail.com.</p>
                       <p>Happy shopping!</p>
                   </div>
               </body>
           </html>
       `;
                // Define email options
                const mailOptions = {
                    from: 'centralizeshopping@gmail.com',
                    to: userEmail,
                    subject: 'Welcome to Centralize Shopping',
                    html: emailContent
                };
                try {
                    await transporter.sendMail(mailOptions);
                    const data = await db_js_1.default.query('INSERT INTO usertable(user_id, name, email, user_password, salt) VALUES ($1, $2, $3, $4, $5) RETURNING *', [user_id, userName, userEmail, newPassword, salt]);
                    //  console.log("data.rows[0].name",data.rows[0].name)
                    return reply.status(201).send({
                        user_id,
                        userName: data.rows[0].name,
                        userEmail: data.rows[0].email,
                        salt,
                        newPassword: data.rows[0].user_password
                    });
                }
                catch (err) {
                    reply.status(500).send('Email sending failed');
                }
            }
            catch (e) {
                reply.status(500).send("Internal Server Error");
            }
        }
        else {
            reply.status(409).send("User exist");
        }
    });
    fastify.post('/signin', postUserSignInOptions, async (request, reply) => {
        //  console.log("this sign in route is called")
        const { userEmail, userPassword } = request.body;
        const data = await db_js_1.default.query("SELECT * FROM usertable WHERE email= $1", [userEmail]);
        if (data.rows.length === 0) {
            // console.log("user does not exist")
            reply.status(401).send("User does not exist");
        }
        else {
            try {
                const storedHashedPassword = data.rows[0].user_password;
                const salt = data.rows[0].salt;
                const hashedPassword = crypto_1.default.pbkdf2Sync(userPassword, salt, 1000, 64, 'sha512').toString('hex');
                // check if hash (stored in DB) and newly generated hash (newHash) are the same
                if (storedHashedPassword == hashedPassword) {
                    // console.log("done the process")
                    // console.log(data.rows[0].user_password)
                    reply.status(200).send({
                        userEmail: data.rows[0].email,
                        userPassword: data.rows[0].user_password
                    });
                }
                else {
                    //  console.log("Wrong password")
                    reply.status(401).send("Wrong password");
                }
            }
            catch (e) {
                // console.log("Internal Server Error")
                reply.status(500).send("Internal Server Error");
            }
        }
    });
    done();
}
exports.default = userRoutes;
