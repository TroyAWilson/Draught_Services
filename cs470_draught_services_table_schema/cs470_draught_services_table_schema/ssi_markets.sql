-- This is an automatically generated file. Do not edit directly.

use draught_services;
DROP TABLE IF EXISTS markets CASCADE;

CREATE TABLE `markets` (
   `marketID` INT NOT NULL AUTO_INCREMENT,
   `marketName` varchar(100),
   `city` varchar(100),
   `state` varchar(10),
   `status` varchar(10),
   `lastModified` DATETIME,
   `dateCreated` DATETIME
,  PRIMARY KEY (`marketID`)
);

CREATE INDEX `markets_marketID` USING BTREE on `markets`(`marketID`);

