-- This is an automatically generated file. Do not edit directly.

use draught_services;
DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE `products` (
   `productName` varchar(100) NOT NULL,
   `productID` INT NOT NULL AUTO_INCREMENT,
   `distributorID` INT NOT NULL ,
   `marketID` INT NOT NULL ,
   `status` varchar(10),
   `lastModified` DATETIME,
   `dateCreated` DATETIME
,  PRIMARY KEY (`productID`)
);

CREATE INDEX `products_productID` USING BTREE on `products`(`productID`);

