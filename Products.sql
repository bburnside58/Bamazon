create DATABASE Bamazon_db;

USE Bamazon_db;
​
create table Products (
  ItemID INT NOT NULL,
  
  ProductName VARCHAR(40) NOT NULL,
  
  DepartmentName VARCHAR(40) NOT NULL,
  
  Price decimal(4, 2) NOT NULL,
  
  StockQuantity integer(10) NOT NULL,
  
  PRIMARY KEY (`ItemID`));
  
  INSERT INTO Products (ProductName,DepartmentName,Price,StockQuantity)
  VALUES ('toothbrush','toiletries',);