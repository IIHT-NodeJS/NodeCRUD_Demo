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
});

mysqlConnection.connect((err) => {
  if (!err) console.log("db connection success");
  else
    console.log("db connection failed \n " + JSON.stringify(err, undefined, 2));
});

app.listen(3000, () => console.log("Express server is running at port 3000"));

//retirved employees from the database
app.get("/employees", (req, res ) => { // get req , in terms of crud the R that stands of read
  mysqlConnection.query("SELECT * fROM Employee", (err, rows, feilds) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

// get sepcific employee using the id 
// localhost:3000/employee/2 => the details of empoloyee with the id 2
app.get("/employee/:id", (req, res ) => { 
  mysqlConnection.query("SELECT * fROM Employee WHERE EmpID =? ",[req.params.id], (err, rows, feilds) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});
