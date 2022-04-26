steps for the db

1.create a schema

2.create table by running 
CREATE TABLE `employee`(
    `EmpID` int(11) NOT NULL AUTO_INCREMENT,
    `Name` varchar(45) DEFAULT NULL,
    `EmpCode` varchar(45) DEFAULT NULL,
    `Salary` int(11) DEFAULT NULL,
    PRIMARY KEY (`EMPID`)
) ENGINE= InnoDB AUTO_INCREMENT = 0 DEFAULT CHARSET = utf8mb4 ;

3. check the table createn by 

select * from employees

4. autheticate the table using 
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
flush privileges;

use your own username and password

5 create the connection and test the connection.


