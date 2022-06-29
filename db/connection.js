const mysql = require('mysql2');
require('dotenv').config();

//Connect to SQL database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: process.env.DB_PASSWORD,
        database: 'employee_tracker'
    }
);



module.exports = db;