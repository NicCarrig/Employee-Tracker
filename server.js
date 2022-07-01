
const db = require('./db/connection');
const menu = require('./utils/menuOptions');
const cTable = require('console.table');



db.connect(err => {
    if(err) throw err;
    console.log('Database connected');
    menu.displayMainMenu();
});


