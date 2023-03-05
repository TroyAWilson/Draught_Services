-- This is an automatically generated file. Do not edit directly.

use draught_services;
DROP TABLE IF EXISTS transactions CASCADE;

CREATE TABLE `transactions` (
   `transactionID` INT NOT NULL AUTO_INCREMENT,
   `transactionDate` Date,
   `employeeID` INT NOT NULL ,
   `accountID` INT NOT NULL ,
   `productID` INT NOT NULL ,
   `distributorID` INT NOT NULL ,
   `marketID` INT NOT NULL ,
   `routeID` INT NOT NULL ,
   `cycleID` INT NOT NULL ,
   `taps` tinyint,
   `lastModified` DATETIME
,  PRIMARY KEY (`transactionID`)
);

CREATE INDEX `transactions_transactionID` USING BTREE on `transactions`(`transactionID`);

