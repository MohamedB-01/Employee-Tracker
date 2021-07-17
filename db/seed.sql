INSERT INTO department (name)
VALUES ("operations"), ("finance"), ("Human Resources"), ("legal");

INSERT INTO `role` (title, salary, department_id)
VALUES 
("CEO", 6000000.00, null),
("COO", 600000.00, 1), 
("Senior Engineer", 150000.00, 1), 
("CFO", 600000.00, 2), 
("Senior Accountant", 100000.00, 2),
("HR manager", 120000.00, 3), 
("HR Representative", 60000.00, 3),
("Senior legal counsel", 500000.00, 4), 
("Junior legal counsel", 150000.00, 4),


INSERT INTO employee (first_name, last_name, role_id, manager_id, isManager )
VALUES 
("Mike", "J", 1, null, true), 
("Sue", "Kim", 2, 1, true ), 
("Mariam", "Hassan", 3, 2, false), 
("Noor", "Abdo", 4, 1, true),
("Sarah","Seif", 5, 4, true), 
("Randy","Smith", 6, 1, true), 
("John", "Deer", 7, 6, false),
("Malia", "Ramzy", 8, 1, true),
("Joe", "Ortega", 9, 8, false),
("Farida", "Davidson", 9, 8, false)