const express = require('express');
const db = require('./db/connection');
const menu = require('./utils/menuOptions');
const cTable = require('console.table');
// const inquirer = require('inquirer');

// const PORT = process.env.PORT || 3001;
// const app = express();


// //express middleware
// app.use(express.urlencoded( { extended: false } ));
// app.use(express.json());

// app.use((req, res) => {
//     res.status(404).end();
// });

db.connect(err => {
    if(err) throw err;
    console.log('Database connected');
    menu.displayMainMenu();
    // app.listen(PORT, () => {
    //     console.log(`Server running on PORT ${PORT}`);
    // });
});


