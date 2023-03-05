-- This is an automatically generated file. Do not edit directly.

use draught_services;
DROP TABLE IF EXISTS accounts CASCADE;

CREATE TABLE `accounts` (
   `accountName` varchar(100) NOT NULL,
   `accountID` INT NOT NULL AUTO_INCREMENT,
   `routeID` INT NOT NULL ,
   `marketID` INT NOT NULL ,
   `status` varchar(10),
   `dateCreated` DATETIME,
   `lastModified` DATETIME
,  PRIMARY KEY (`accountID`)
);

CREATE INDEX `accounts_accountID` USING BTREE on `accounts`(`accountID`);

