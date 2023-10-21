const mysql2 = require('mysql2');
require('dotenv').config();

const connection = mysql2.createConnection({
    host:"127.0.0.1",
    port:'3306',
    user:"Shemeer",
    password:process.env.PASSWORD,
    database:'snapqr'
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