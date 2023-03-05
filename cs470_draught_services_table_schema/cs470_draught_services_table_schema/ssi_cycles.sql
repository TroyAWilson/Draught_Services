-- This is an automatically generated file. Do not edit directly.

use draught_services;
DROP TABLE IF EXISTS cycles CASCADE;

CREATE TABLE `cycles` (
   `cycleID` INT NOT NULL AUTO_INCREMENT,
   `startDate` DATETIME,
   `endDate` DATETIME
,  PRIMARY KEY (`cycleID`)
);

CREATE INDEX `cycles_cycleID` USING BTREE on `cycles`(`cycleID`);

