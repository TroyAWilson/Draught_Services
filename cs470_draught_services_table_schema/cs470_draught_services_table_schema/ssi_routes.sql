-- This is an automatically generated file. Do not edit directly.

use draught_services;
DROP TABLE IF EXISTS routes CASCADE;

CREATE TABLE `routes` (
   `routeID` INT NOT NULL AUTO_INCREMENT,
   `routeName` varchar(50),
   `employeeID` INT NOT NULL ,
   `marketID` INT NOT NULL ,
   `cycleID` INT NOT NULL ,
   `status` varchar(10),
   `lastModified` DATETIME,
   `dateCreated` DATETIME
,  PRIMARY KEY (`routeID`)
);

CREATE INDEX `routes_routeID` USING BTREE on `routes`(`routeID`);
CREATE INDEX `routes_employeeID` USING BTREE on `routes`(`employeeID`);
CREATE INDEX `routes_cycleID` USING BTREE on `routes`(`cycleID`);

