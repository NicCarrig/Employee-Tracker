const inquirer = require('inquirer');
const { query } = require('../db/connection');
const db = require('../db/connection');



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
            case "View All Departments":
                viewAllDepartments();
                break;

            case "View All Roles":
                viewAllRoles();
                break;

            case "View All Employees":
                viewAllEmployees();
                break;    

            case "Add Department":
                addDepartment();
                break;

            case "Add Role":
                addRole();
                break;

            case "Add Employee":
                addEmployee();
                break;

            case "Update Employee Role":
                updateEmployeeRole();
                break;
            
            case "Exit":
                db.end();
                break;

            default:
                console.log("error has occured in in switch statement");
                console.log("Input: ", answer.action);
        }
    })
}

function viewAllDepartments(){
    const sql = `SELECT * FROM departments`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        displayMainMenu();
    });
}

function viewAllRoles(){
    const sql = `SELECT roles.id, roles.title, roles.salary, departments.department_name
                FROM roles
                INNER JOIN departments ON roles.department_id=departments.id`;

    db.query(sql, (err, rows) => {
        if (err) throw err;

        console.table(rows);
        displayMainMenu();
    });
}

function viewAllEmployees(){
    // const sql = `SELECT employees.id, employees.first_name, employees.last_name,
    //             roles.title, employees.manager_id
    //             FROM employees
    //             JOIN roles ON employees.role_id=roles.id`;

    const sql = `SELECT employees.first_name, employees.last_name, roles.title, roles.salary, departments.department_name,
                 CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employees
                 INNER JOIN roles on roles.id = employees.role_id 
                 INNER JOIN departments on departments.id = roles.department_id 
                 LEFT JOIN employees e on employees.manager_id = e.id`;


    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log("***********************EMPLOYEE LIST***********************");
        console.table(rows);
        displayMainMenu();
    });
}

function addDepartment(){
    //prompts user for name of department
    inquirer.prompt(
        {
            type: 'input',
            name: 'name',
            message: 'Please enter the name of the department you want to add'
        }
    ).then(input => {
        const sql = `INSERT INTO departments (department_name) VALUES (?)`;

        db.query(sql, input.name, (err, rows) => {
            if (err) throw err;

            console.table(rows);
            displayMainMenu();
        })
    })
}

function addRole(){
    //prompt user for name, salary, and department for role

    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Please enter the name/title for the role'
        },
        {
            type: 'input',
            name: 'salary',
            message: "Please enter the salary for the role",
            validate: (salary) => {
                if(typeof(parseInt(salary)) === 'number' && parseInt(salary) > 0){
                    return true;
                }
                else{
                    console.log("\nPlease enter a valid number");
                    return false;
                }
            }
        }
    ]).then(input => {
        
        //get all departments for list prompt
        db.query("SELECT * FROM departments", (err, results) => {
            if(err) throw err;

            // console.log(results);
            let depList = [];
            for(let i = 0; i < results.length; i++){
                //should create an array of strings starting with 
                depList.push(`${i+1}. ` + results[i].department_name);
            }
            // console.log(depList);
            inquirer.prompt({
                type: 'list',
                name: 'department',
                message: 'Please choose a department',
                choices: depList
            }).then(depName => {
                // console.log(input.title);
                // console.log(input.salary);
                // console.log(depName.department);
                const depID = parseInt(depName.department.split(".")[0]);
                // console.log(depID);
                const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
                const params = [input.title, input.salary, depID];

                db.query(sql, params, (err, row) =>{
                    if (err) throw err;

                    console.log(`Added ${input.title} to roles`);
                    displayMainMenu();
                });
            });
        });
    });
}

function addEmployee(){
    //prompt user for first name, last name, role, and manager

    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "Employees first name"
        },
        {
            type: 'input',
            name: 'last_name',
            message: "Employee's last name"
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Employee role ID number',
            validate: (role_id) => {
                if(typeof(parseInt(role_id)) === 'number' && parseInt(role_id) > 0){
                    return true;
                }
                else{
                    console.log("\nPlease enter a valid number");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Employee manager ID number (press enter if the employee does not have an assigned manager'
        }
    ]).then(input => {
        // console.log(input);
        // let mgmtID = input.manager_id;

        const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
        let params = [input.first_name, input.last_name, input.role_id, input.manager_id];

        if(typeof(parseInt(input.manager_id)) !== 'number' || !input.manager_id){
            params = [input.first_name, input.last_name, input.role_id, null];
        }

        db.query(sql, params, (err, row) => {
            if(err) throw err;

            console.log(`Added ${input.first_name} ${input.last_name} to the employee list`);
            displayMainMenu();
        });
    });
}

function updateEmployeeRole(){

    db.query(`SELECT * FROM roles`, (err, rows) => {
        if (err) throw err;
        
        let roleArr = [];
        for(let i = 0; i < rows.length; i++){
            roleArr.push(`${i+1}. ` + rows[i].title);
        }

        inquirer.prompt([
            {
                type: 'input',
                name: 'empID',
                message: 'Enter the ID number of the employee you want to update',
                validate: (emp_id) => {
                    if(typeof(parseInt(emp_id)) === 'number' && parseInt(emp_id) > 0){
                        return true;
                    }
                    else{
                        console.log("\nPlease enter a valid number");
                        return false;
                    }
                }
            },
            {
                type: 'list',
                name: 'roles',
                message: 'Please enter the new role for the employee',
                choices: roleArr
            }
        ]).then(input => {
            const roleID = parseInt(input.roles.split(".")[0]);
            const sql = `UPDATE employees SET role_id = ?
                        WHERE id = ?`;
            const params = [roleID, input.empID];

            db.query(sql, params, (err, result) => {
                if (err) throw err;

                console.log("Employee role updated");
                displayMainMenu();
            })
        })

    });
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