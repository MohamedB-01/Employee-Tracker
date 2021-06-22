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
("Mohamed", "Bassiouni", 1, 1), 
("Shimaa", "Elshabouri", 2, 6), 
("Mariam", "Hassan", 4, 7), 
("Noor", "Abdo", 2, 7),
("Sarah","Seif", 6, Null), 
("Esraa","Awad", 6, Null), 
("Ahmed", "Khamis", 6, Null)
("Mai", "Jamal", 6, Null)
("Mahmoud", "Basha", 6, Null)
("Farida", "Elsherif", 6, Null)