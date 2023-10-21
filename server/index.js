const express = require('express');
const app = express();
require('dotenv').config();
// const { dbConnection, connection } = require('./dbConfig/dbConnection');
const uniqid = require('uniqid');
const cors = require('cors');
const Joi = require('joi');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT || 8001;
const SALTROUNDS = JSON.parse(process.env.SALTROUNDS);
const mysql2 = require('mysql2');
require('dotenv').config();

// dbConnection();
const connection = mysql2.createConnection({
    host:"localhost",
    user:"Shemeer",
    password:process.env.PASSWORD,
    database:'snapqr'
});


    connection.connect((err)=>{
        if(err){
            console.log("Error connecting to mysql database",err);
        }
        else{
            console.log('Connected to database...');
        }
    });


app.use(cors({
    origin: "https://snap-qr-lovat.vercel.app"
}));

app.use(express.json());

//@desc POST login user
//@route POST /login
//@ access public
app.post('/login', async (req, res) => {
    let { email, password } = req.body;
    const isValid = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(12).required()
    }).validate({email, password});

    if (isValid.error) {
        return res.status(400).send({
            status: "400",
            Error: isValid.error
        });
    }
    try {
        const hashedpassword = await bcrypt.hash(password, SALTROUNDS);
        const accessToken = jwt.sign({
            user: {
                email: email,
                password: hashedpassword
            }
        }, process.env.SECRETKEY, { expiresIn: "1m" });
        res.status(200).send({
            accessToken:accessToken,
            message:"User credentials verified successfully"
        });

    } catch (error) {
        res.status(400).send(error);
    }

    res.end();
});


//@desc GET QR Codes
//@route GET /qrcodes
//@ access private
app.get('/qrcodes', (req, res) => {
    let {email} = req.params;
    let command ;
    if(email !== undefined){
     command = `SELECT * FROM scanneddocs WHERE email=${email}`;
    }
    else{
     command = `SELECT * FROM scanneddocs`;
    }
    
    connection.query(command, (err, result) => {
        if (err) {
            console.error("Error fetching data from the database", err);
            res.status(500).send("Error fetching data from the database");
        } else {
            res.status(200).send({
                data: result,
                message: "Data fetched from the database successfully"
            });
        }

    })
});

//@desc POST save qrcodes data
//@route POST /qrcodes
//@ access private
app.post('/qrcodes', (req, res) => {
    let id = uniqid();
    let scandate = new Date().toLocaleString();
    let content = req.body.result;
    let thumbnail = JSON.stringify(req.body);
    let userEmail = req.body.userEmail;
    let command = "INSERT INTO scanneddocs (id, content, scandate, thumbnail,email) VALUES (?, ?, ?, ?,?)";
    connection.query(command, [id, content, scandate, thumbnail,userEmail], (err, result) => {
        if (err) {
            res.status(500).send("Error adding data to the database");
        } else {
            res.status(200).send("Data added to the database successfully");
        }

    });

});

//@desc DELETE QR Code data
//@route DELETE /qrcodes/:id
//@ access private
app.delete('/qrcodes/:id', (req, res) => {

});


app.listen(PORT, () => {
    console.log("Server Started...");
})