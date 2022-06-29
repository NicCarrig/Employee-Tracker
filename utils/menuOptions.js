const inquirer = require('inquirer');



function displayMainMenu() {
    inquirer.prompt({
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Update Employee Role",
            "Exit"
        ]
    }).then((answer) => {
        switch(answer.action){
            default:
                console.log(answer.action);
        }
    })
}

function viewAllDepartments(){

}

function viewAllRoles(){

}

function viewAllEmployees(){

}

function addDepartment(){
    //prompts user for name of department

}

function addRole(){
    //prompt user for name, salary, and department for role
}

function addEmployee(){
    //prompt user for first name, last name, role, and manager

}

function updateEmployeeRole(){

}


module.exports = {
    displayMainMenu,
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole
};