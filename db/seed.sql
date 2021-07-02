INSERT INTO department (name)
VALUES ("operations"), ("finance"), ("Human Resources"), ("legal");

INSERT INTO `role` (title, salary, department_id)
VALUES 
("COO", 600000.00, 1), 
("Senior Engineer", 150000.00, 1), 
("CFO", 600000.00, 2), 
("Senior Accountant", 100000.00, 2),
("HR manager", 120000.00, 3), 
("HR Representative", 60000.00, 3),
("Senior legal counsel", 500000.00, 4), 
("Junior legal counsel", 150000.00, 4),


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Mike", "J", 1, 1), 
("Sue", "Kim", 2, 6), 
("Mariam", "Hassan", 4, 7), 
("Noor", "Abdo", 2, 7),
("Sarah","Seif", 6, 1), 
("Randy","Smith", 4, 1), 
("John", "Deer", 6, 5),
("Malia", "Ramzy", 3, 2),
("Joe", "Ortega", 6, 2),
("Farida", "Davidson", 6, 3)