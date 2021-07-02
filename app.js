//Dependencies.
const mysql = require(`mysql`);
const inquirer = require(`inquirer`);
const cTable = require(`console.table`);

//Connection 
const connection = mysql.createConnection({
    host: `localhost`,
    port: 3306,
    user: `root`,
    password: `password`,
    database: `employees_db`
  });

  connection.connect((err) => {
    if (err) throw err;
    
    startPrompt();
});

//Initial Prompt.
const startPrompt = () => {
    inquirer
      .prompt ([
        {
          type: `list`,
          name: `options`,
          message: `To get started, please choose from the following options.`,
          choices: 
            [
              `View all employees`, 
              `View all roles`,
              `View all departments`,
              `View employees by Manager`, 
              `View employees by Department`, 
              `Add employee`, 
              `Add role`, 
              `Add department`,
              `Remove employee`, 
              `Remove role`,
              `Remove department`,
              `Update employee role`, 
              `Update employee manager`,
              `View department budget`,
              `Exit`
            ]
        }
      ])
      .then ((answer) => {
        switch (answer.options) {
          case `View all employees`:
            viewAllEmployees()
            break;
          case `View all roles`:
            viewAllRoles()
            break;
          case `View all departments`:
            viewAllDepartments()
            break;
          case `View employees by Manager`:
            viewByManager()
            break;
          case `View employees by Department`:
            viewByDepartment()
            break;
          case `Add employee`:
            addEmployee()
            break;
          case `Add role`:
            addRole()
            break;
          case `Add department`:
            addDepartment()
            break;
          case `Remove employee`:
            removeEmployee()
            break;
          case `Remove role`:
            removeRole()
            break;
          case `Remove department`:
            removeDepartment()
            break;
          case `Update employee role`:
            updateRole()
            break;
          case `Update employee manager`:
            updateManager()
            break;
          case `View department budget`:
            viewDepartmentBudget()
            break;
          case `Exit`:
            connection.end();
        } 
      })
  };

  const employeeArr = () => {
    const employees = [];
    connection.query('SELECT * from employee', function(err, res) {
      if (err) throw err;
      res.forEach(({ first_name }) => employees.push(first_name + last_name));
    })
    return employees;
  };

  const roleArr = () => {
    const roles = [];
    connection.query('SELECT * FROM role', function(err, res) {
      if (err) throw err;
      res.forEach(({ title }) => roles.push(title));
    })
    return roles;
  };

  const departmentArr = () => {
    const departments = [];
    connection.query('SELECT * from department', function(err, res) {
      if (err) throw err;
      res.forEach(({ department_name }) => departments.push(department_name));
    })
    return departments;
  }

//  functions 
  const viewAllEmployees =() => {
      connection.query(
          `SELECT
          employee.id,
          employee.first_name,
          employee.last_name,
          role.title AS title,
          role.salary AS salary,
          CONCAT (manager.first_name, " ", manager.last_name) AS manager
          FROM employee`,

          function (err, res) {
              if (err) throw err;
              console.table(res);
              startPrompt(); 
          }
          
      )
  };

  const viewAllRoles  = () => {
    connection.query(
        `SELECT * FROM department`,

        function (err, res) {
            if (err) throw err;
            console.table(res);
            startPrompt(); 
        }
        
    )
  };

  const viewAllDepartments = () => {
    connection.query(
        `SELECT * FROM role`,

        function (err, res) {
            if (err) throw err;
            console.table(res);
            startPrompt(); 
        }
        
    )
  };

  const viewByManager =() => {
    
  };

  const viewByDepartment =() => {};

  const addEmployee =() => {};

  const addRole = () => {};

  const addDepartment = () => {};

  const removeEmployee = () => {};

  const removeRole = () => {};

  const removeDepartment = () => {};

  const updateRole = () => {};

  const updateManager = () => {};

  const viewDepartmentBudget = () => {};
  
