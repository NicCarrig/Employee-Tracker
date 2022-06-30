INSERT INTO departments (department_name)
VALUES 
   ('Sales'),
   ('Engineering'),
   ('Legal'),
   ('Finance');


INSERT INTO roles (title, salary, department_id)
VALUES
   ('Sales Lead', 75000, 1),
   ('Salesperson', 50000, 1),
   ('Engineering Lead', 95000, 2),
   ('Engineer', 75000, 2),
   ('Legal Team Lead', 125000, 3),
   ('Lawyer', 100000, 3),
   ('Accounts Manager', 85000, 4),
   ('Accountant', 75000, 4);



INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
   ('Sleve', 'McDicheal', 1, NULL),
   ('Willie', 'Dustice', 2, 1),
   ('Onson', 'Sweemey', 3, NULL),
   ('Jeromy', 'Gride', 4, 3),
   ('Darryl', 'Archideld', 5, NULL),
   ('Scott', 'Dourque', 6, 5),
   ('Anatoli', 'Smorin', 7, NULL),
   ('Shown', 'Furcotte', 8, 7);