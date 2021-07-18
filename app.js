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
          message: ` Please choose from the following options.`,
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

  const employees = [];

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

  // const departments = [];
  // const departmentArr = () => {
    
  //   connection.query('SELECT * from department', function(err, res) {
  //     if (err) throw err;
  //     res.forEach(({ department_name }) => departments.push(department_name));
  //   })
  //   return departments;
  // }

//  functions 
  const viewAllEmployees =() => {
      connection.query(
          `SELECT * FROM employee`,

          function (err, res) {
              if (err) throw err;
              console.table(res);
              startPrompt(); 
          }
          
      )
  };

  const viewAllRoles  = () => {
    connection.query(
        `SELECT * FROM role`,

        function (err, res) {
            if (err) throw err;
            console.table(res);
            startPrompt(); 
        }
        
    )
  };

  const viewAllDepartments = () => {
    connection.query(
        `SELECT * FROM department `,

        function (err, res) {
            if (err) throw err;
            console.table(res);
            startPrompt(); 
        }
        
    )
  };



  const viewByManager =() => {
    

    

    connection.query("SELECT * FROM employee WHERE isManager = true", (err, results) => {
      if (err) throw err;

      let managers = [];

      results.forEach(({ id, first_name, last_name  }) => {
        managers.push({id: id, managerName: first_name + " " + last_name });
      })
      managerList = []; 

      results.forEach(({ first_name, last_name  }) => {
        managerList.push(first_name + " " + last_name );
      })
       
       
  
      inquirer
        .prompt ([
          {
            type: "list",
            name: "managerList",
            message: "Please select a manager from the list below to view their team.",
            choices: managerList, 
          },
        ])
        .then ((answer) => {
          
          let managerId; 
  
          managers.forEach ((item)=>{
            if(item.managerName === answer.managerList) {
              return managerId = item.id;
            }
          })
  
          connection.query(
            `SELECT 
            employee.id, 
            employee.first_name, 
            employee.last_name, 
            CONCAT (manager.first_name, " ", manager.last_name) AS manager, role.title AS title, role.salary AS salary, department.name AS department
            FROM employee
            LEFT JOIN role on employee.role_id = role.id 
            LEFT JOIN department on role.department_id = department.id
            JOIN employee AS manager ON employee.manager_id = manager.id
            WHERE employee.manager_id = ${managerId}`,
          
            function (err, res) {
              if (err) throw err;
              if (res.length === 0) {
                console.log("That manager does not have any direct reports.")
              }
              else{
              console.table(res);
              }
              startPrompt();
            });
        })
  })};
  



  const viewByDepartment =() => {
    connection.query("SELECT * FROM department", (err, results) => {
      if (err) throw err;
  
      let departments = [];
  
        results.forEach(({ id, name }) => {
          departments.push({id: id, departmentName: name });
        })
        departmentList = []; 

        results.forEach(({ id, name }) => {
          departmentList.push(name);
        })
  
      inquirer
        .prompt ([
          {
            type: "list",
            name: "departmentList",
            message: "Please select a department from the list below to view department members.",
            choices: departmentList,
          },
      
        ])
        .then ((answer) => {
        
          let departmentId;
  
          departments.forEach ((item)=>{
            if(item.departmentName === answer.departmentList) {
              return departmentId = item.id;
            }
          });

          connection.query(
            `SELECT 
            employee.id, 
            employee.first_name, 
            employee.last_name, 
            CONCAT (manager.first_name, " ", manager.last_name) AS manager, role.title AS title, role.salary AS salary, department.name AS department
            FROM employee
            LEFT JOIN role on employee.role_id = role.id 
            JOIN department on role.department_id = department.id
            LEFT JOIN employee AS manager ON employee.manager_id = manager.id
            WHERE role.department_id = ${departmentId}`,

            function (err, res) {
              if (err) throw err;
              if (res.length === 0) {
                console.log("That department does not have any employees.")
              }
              else{
              console.table(res);
              startPrompt();
              }
            });
          });

        
    })};





  const addEmployee = () => {
    

    inquirer
      .prompt([
        {
          name: "firstName",
          type: "input",
          message: "Please enter the Employee's first name.",
        },
        {
          name: "lastName",
          type: "input",
          message: "Please enter the Employee's last name.",
        },
        {
          name: "role",
          type: "list",
          message: "Please select the Employee role from the list below.",
          choices: roles,
        },
        {
          name: "isManager",
          type: "confirm",
          message: "Is the employee a manager with direct reports? ",
        },
        {
          name: "manager",
          type: "list",
          message: "Please assign a manager from the list below.",
         choices: managers,
        },
      ])
      .then((answer) => {

        let roleId;

        roles.forEach ((item)=>{
          if(item.title === answer.role) {
            return roleId = item.id;
          }
        })

        let managerId; 

        managers.forEach ((item)=>{
          if(item.managerName === answer.manager) {
            return managerId = item.id;
          }
        })

        connection.query("INSERT INTO employee SET ?",
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: roleId,
          manager_id: managerId,
        },
        (err) => {
          if (err) throw err;
          startPrompt();

        });
    });
  
  };







  const addRole = () => {
    connection.query("SELECT * FROM department", (err, results) => {
      if (err) throw err;
  
      let departments = [];
  
        results.forEach(({ id, name }) => {
          departments.push({id: id, departmentName: name });
        })
        departmentList = []; 

        results.forEach(({ id, name }) => {
          departmentList.push(name);
        })
  
    
      inquirer
        .prompt([
          {
            name: "newRole",
            type: "input",
            message: "Please enter the new role name.",
          },
          {
            name: "newRoleSalary",
            type: "input",
            message: "Please enter the new role salary.",
          },
          {
            name: "department",
            type: "list",
            message: "Please enter the new role's department.",
            choices: departmentList,
          },
        ])
        .then((answer) => {
  
          let departmentId; 
  
          departments.forEach ((item)=>{
            if(item.departmentName === answer.department) {
              return departmentId = item.id;
            }
          })
  
          connection.query("INSERT INTO role SET ?",
            {
              title: answer.newRole,
              salary: answer.newRoleSalary,
              department_id: departmentId,
            },
            (err) => {
              if (err) throw err;
              startPrompt();
  
            });
        });

    });
  
  };








  const addDepartment = () => {
    inquirer
      .prompt([
        {
          name: "newDepartment",
          type: "input",
          message: "Please enter the new department name.",
        },
      ])
      .then((answer) => {

      connection.query("INSERT INTO department SET ?",
        {
          name: answer.newDepartment,
        },
        (err) => {
          if (err) throw err;
          startPrompt();

        });
    });


  };





  const removeEmployee = () => {
    connection.query("SELECT * FROM employee", (err, results) => {
      if (err) throw err;
  
      let employees = [];
  
        results.forEach(({ id, first_name, last_name  }) => {
          employees.push({id: id, employeeName: first_name + " " + last_name });
        })
        employeeList = []; 

        results.forEach(({ first_name, last_name  }) => {
          employeeList.push(first_name + " " + last_name );
        })

    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeList",
          message: "Please select an employee to remove.",
          choices: employeeList,
        }
    ])
    .then ((answer) => {
      
      let employeeID;

      employees.forEach ((item)=>{
        if(item.employeeName === answer.employeeList) {
          return employeeID = item.id;
        }
      })

      connection.query("DELETE FROM employee WHERE ?",
        {
          id: employeeID,
        },
        (err) => {
          if (err) throw err;
          startPrompt();

        });
      });
      
    });
  };





  const removeRole = () => {
    connection.query("SELECT * FROM role", (err, results) => {
      if (err) throw err;
  
      let roles = [];
  
        results.forEach(({ id, title, department_id }) => {
          departments.push({id: id, title: title, department_id: department_id  });
        })

        roleList = []; 

        results.forEach(({ title  }) => {
          roleList.push(title );
        })
    inquirer
      .prompt([
        {
          type: "list",
          name: "roleList",
          message: "Please select a role to remove.",
          choices: roleList,
        }
    ])
    .then ((answer) => {
      
      let roleID;

      roles.forEach ((item)=>{
        if(item.title === answer.roleList) {
          return roleID = item.id;
        }
      });
    
      connection.query("DELETE FROM role WHERE ?",
        {
          id: roleID,
        },
        (err) => {
          if (err) throw err;
        });

      connection.query(
        `UPDATE employee SET role_id = NULL WHERE role_id = ${roleID}`,
        (err) => {
          if (err) throw err;
          startPrompt();
        });
    });

  });
  };




  const removeDepartment = () => {
    connection.query("SELECT * FROM department", (err, results) => {
      if (err) throw err;
  
      let departments = [];
  
        results.forEach(({ id, name }) => {
          departments.push({id: id, departmentName: name });
        })
        departmentList = []; 

        results.forEach(({ id, name }) => {
          departmentList.push(name);
        })
    inquirer
      .prompt([
        {
          type: "list",
          name: "departmentList",
          message: "Please select a department to remove.",
          choices: departmentList,
        }
    ])
    .then ((answer) => {
      
      let departmentID;

      departments.forEach ((item)=>{
        if(item.name === answer.departmentList) {
          return departmentID = item.id;
        }
      })

      connection.query("DELETE FROM department WHERE ?",
        {
          id: departmentID,
        },
        (err) => {
          if (err) throw err;
          startPrompt();

        });

      connection.query(
        `UPDATE role SET department_id = NULL WHERE department_id = ${departmentID}`,
        (err) => {
          if (err) throw err;
          menu();
        });
    });

  });
  };





  const updateRole = () => {
    roleArr();
    employeeArr();

    inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: "Please select an employee to update.",
        choices: employees,
      }, 
      {
        type: "list",
        name: "updatedRole",
        message: "Please select a role to assign.",
        choices: roles,
      },
  ])
  .then ((answer) => {
    
    let employeeId;

    employees.forEach ((item)=>{
      if(item.employeeName === answer.employee) {
        return employeeId = item.id;
      }
    });

    let roleId;

    roles.forEach ((item)=>{
      if(item.title === answer.updatedRole) {
        return roleId = item.id;
      }
    });

    connection.query(
      `UPDATE employee SET role_id = ${roleId} WHERE id = ${employeeId}`,
      (err) => {
        if (err) throw err;
        startPrompt();
      });
  })

  };






  const updateManager = () => {
    managerArr();
    employeeArr();


    inquirer
    .prompt([
        {
          type: "list",
          name: "employee",
          message: "Please select an employee to update.",
          choices: employees,
        }, 
        {
          type: "list",
          name: "updatedManager",
          message: "Please select a manager to assign.",
          choices: managers,
        },
    ])
    .then ((answer) => {
      console.log(answer);
      
      let employeeId;

      employees.forEach ((item)=>{
        if(item.employeeName === answer.employee) {
          return employeeId = item.id;
        }
      });

      let managerId;

      managers.forEach ((item)=>{
        if(item.managerName === answer.updatedManager) {
          return managerId = item.id;
        }
      });

      connection.query(
        `UPDATE employee SET manager_id = ${managerId} WHERE id = ${employeeId}`,
        (err) => {
          if (err) throw err;
          startPrompt();
        });
    })

  };




  const viewDepartmentBudget = () => {
    connection.query("SELECT * FROM department", (err, results) => {
      if (err) throw err;
  
      let departments = [];
  
        results.forEach(({ id, name }) => {
          departments.push({id: id, departmentName: name });
        })
        departmentList = []; 

        results.forEach(({ id, name }) => {
          departmentList.push(name);
        })

    inquirer
      .prompt([
        {
          type: "list",
          name: "departmentList",
          message: "Please select a department to review.",
          choices: departmentList,
        }
    ])
    .then ((answer) => {
    
      let departmentId;

      departments.forEach ((item)=>{
        if(item.departmentName === answer.departmentList) {
          return departmentId = item.id;
        }
      })
  
      connection.query(
        `SELECT 
          SUM(role.salary) Budget
          FROM employee
          JOIN role on employee.role_id = role.id 
          JOIN department on role.department_id = department.id
          WHERE role.department_id = ${departmentId}`,
      
          function (err, res) {
            if (err) throw err;
           
            console.table(res);
    
            startPrompt();
        });
    })

  });
  };
  
