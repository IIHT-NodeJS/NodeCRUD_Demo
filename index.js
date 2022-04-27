const mysql = require("mysql");
const express = require("express");
var app = express();
const bodyparser = require("body-parser");

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "EmployeeDB",
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (!err) console.log("db connection success");
  else
    console.log("db connection failed \n " + JSON.stringify(err, undefined, 2));
});

app.listen(3000, () => console.log("Express server is running at port 3000"));

//retirved employees from the database
app.get("/employees", (req, res) => {
  // get req , in terms of crud the R that stands of read
  mysqlConnection.query("SELECT * fROM Employee", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

// get sepcific employee using the id
// localhost:3000/employee/2 => the details of empoloyee with the id 2
app.get("/employee/:id", (req, res) => {
  mysqlConnection.query(
    "SELECT * fROM Employee WHERE EmpID =? ",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

// delete employee with regards to the id
// localhost:3000/employee/2 => this will delete the employee with the id of 2
app.delete("/employee/:id", (req, res) => {
  mysqlConnection.query(
    "DELETE FROM Employee WHERE EmpID =? ",
    [req.params.id],
    (err, rows, feilds) => {
      if (!err) res.send("SUCESSFULLY DELETED EMPLOYEE! " + [req.params.id]);
      else console.log(err);
    }
  );
});

// WE ARE GOING TO INSERT AN EMPLOYEE
//POST OPERATION
app.post("/employees", (req, res) => {
  let emp = req.body;
  var sql ="SET @EmpID = ?; SET @Name = ?; SET @EmpCode = ?; SET @Salary = ?; \
   CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary)";
  mysqlConnection.query(
    sql,
    [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary],
    (err, rows, fields) => {
      if (!err)
        rows.forEach(element => {
          if (element.constructor == Array);
          res.send("Inserted employee and the id = " + element[0]);
        });
      else 
      console.log(err);
    });
});

// here we are going to update the pre existing data
app.put("/employees", (req, res) => {
  let emp = req.body;
  var sql ="SET @EmpID = ?; SET @Name = ?; SET @EmpCode = ?; SET @Salary = ?; \
   CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary)";
  mysqlConnection.query(
    sql,
    [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary],
    (err, rows, fields) => {
      if (!err)
       res.send("updated sucessfully");
      else 
      console.log(err);
    });
});
