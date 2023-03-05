-- This is an automatically generated file. Do not edit directly.

use draught_services;
DROP TABLE IF EXISTS employees CASCADE;

CREATE TABLE `employees` (
   `employeeName` varchar(100) NOT NULL,
   `employeeID` INT NOT NULL AUTO_INCREMENT,
   `routeID` INT  ,
   `dateHired` DATETIME,
   `dateTerminated` DATETIME,
   `status` varchar(10),
   `lastModified` DATETIME,
   `dateCreated` DATETIME
,  PRIMARY KEY (`employeeID`)
);

CREATE INDEX `employees_employeeID` USING BTREE on `employees`(`employeeID`);

