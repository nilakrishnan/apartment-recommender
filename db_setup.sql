USE apartments_test;

DROP TABLE IF EXISTS Review;
DROP TABLE IF EXISTS User;

CREATE TABLE User (
UserId VARCHAR(50) NOT NULL,
FirstName VARCHAR(50) NOT NULL,
LastName VARCHAR(50) NOT NULL,
PRIMARY KEY (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE Review (
ReviewId VARCHAR(50) NOT NULL,
Date DATE,
Rating VARCHAR(50),
Description VARCHAR(500),
UserId varchar(50) NOT NULL,
PRIMARY KEY (ReviewId, UserId),
FOREIGN KEY (UserId) REFERENCES User (UserId)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*
change apartments_test to whatever the db is called in your MySQLWorkbench
use postman to add to User and Review table
*/
