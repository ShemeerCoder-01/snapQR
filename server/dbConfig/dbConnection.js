const mysql2 = require('mysql2');
require('dotenv').config();

    // host: process.env.DATABASE_URL,
    // user:process.env.MYSQL_USER,
    // password:process.env.PASSWORD,
    // database:process.env.MYSQL_DATABASE
    // host:"127.0.0.1",
    // port:'3306',
    // user:"Shemeer",
    // password:process.env.PASSWORD,
    // database:'snapqr'

const connection = mysql2.createConnection({
    host:process.env.DATABASE_URL,
    user:process.env.MYSQL_USER,
    password:process.env.PASSWORD,
    database:process.env.MYSQL_DATABASE
});

const dbConnection = ()=>{
    connection.connect((err)=>{
        if(err){
            console.log("Error connecting to mysql database",err);
        }
        else{
            console.log('Connected to database...');
        }
    });

    // connection.end();
}

module.exports = {dbConnection,connection};