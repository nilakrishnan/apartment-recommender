USE apartments_test;

DROP TABLE IF EXISTS Review;
DROP TABLE IF EXISTS User;

CREATE TABLE User (
UserId VARCHAR(50) NOT NULL,
FirstName VARCHAR(50) NOT NULL,
LastName VARCHAR(50) NOT NULL,
PRIMARY KEY (`UserId`)
);

CREATE TABLE Review (
ReviewId varchar(50) NOT NULL,
UserId varchar(50) NOT NULL,
Date DATE,
ResponsivenessRating integer,
SecurityDepositReturnedRating integer,
WeekdayVolumeRating integer,
WeekendVolumeRating integer,
GreenStProximityRating integer,
TransportationProximity integer,
OverallRating integer,
Description VARCHAR(500),
PRIMARY KEY (ReviewId, UserId),
FOREIGN KEY (UserId) REFERENCES User (UserId)
);

CREATE TABLE AptBuilding (
BuildingId VARCHAR(50),
BuildingName varchar(70) ,
Address varchar(70),
Company VARCHAR(500),
PRIMARY KEY (BuildingId)
);

CREATE TABLE Apartment (
AptId VARCHAR(50),
Price INTEGER,
AptNumber INTEGER,
NumBeds INTEGER,
NumBaths INTEGER,
BuildingName VARCHAR(50),
BuildingId VARCHAR(50),
PRIMARY KEY (AptId, BuildingId),
FOREIGN KEY (BuildingId) REFERENCES Apt_building (BuildingId)
);

CREATE TABLE Amenities (
BuildingId varchar(50) NOT NULL,
AmenitiesId varchar(50) NOT NULL,
Elevator tinyint(1),
Pool tinyint(1),
Parking tinyint(1),
Internet tinyint(1),
Gym tinyint(1),
WasherDryer tinyint(1),
Security varchar(50),
PRIMARY KEY (AmenitiesId),
FOREIGN KEY (BuildingId) REFERENCES Apt_building (BuildingId)
);

/*
change apartments_test to whatever the db is called in your MySQLWorkbench
*/
