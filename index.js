const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');


app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database: 'EmployeeDB'
});

mysqlConnection.connect((err) => {
    if(!err) 
    console.log('db connection success' );
    else
    console.log('db connection failed \n ' + JSON.stringify(err, undefined, 2));
})