USE apartments_test;

DROP TABLE IF EXISTS Review;
DROP TABLE IF EXISTS Recommendation;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Apartment;
DROP TABLE IF EXISTS Amenities;
DROP TABLE IF EXISTS AptBuilding;

CREATE TABLE User (
  UserId VARCHAR(50) NOT NULL,
  indexid INT NOT NULL AUTO_INCREMENT ,
  FirstName VARCHAR(50) NOT NULL,
  LastName VARCHAR(50) NOT NULL,
  PRIMARY KEY (UserId),
KEY(indexid)
);

CREATE TABLE AptBuilding (
BuildingId VARCHAR(50) NOT NULL,
Address varchar(70),
Company VARCHAR(500),
PRIMARY KEY (BuildingId)
);

CREATE TABLE Apartment (
AptId VARCHAR(50) NOT NULL,
BuildingId VARCHAR(50) NOT NULL,
Price INTEGER,
NumBeds INTEGER,
NumBaths INTEGER,
PRIMARY KEY (AptId, BuildingId),
FOREIGN KEY (BuildingId) REFERENCES AptBuilding (BuildingId)
);

CREATE TABLE Review (
ReviewId varchar(50) NOT NULL,
UserId varchar(50) NOT NULL,
AptId varchar(50) NOT NULL,
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
FOREIGN KEY (UserId) REFERENCES User (UserId),
FOREIGN KEY (AptId) REFERENCES Apartment (AptId)
);

CREATE TABLE Amenities (
BuildingId varchar(50) NOT NULL,
AmenitiesId varchar(50) NOT NULL,
Internet tinyint(1),
Parking tinyint(1),
Gym tinyint(1),
WheelchairAccessible tinyint(1),
Elevator tinyint(1),
Pool tinyint(1),
WasherDryer tinyint(1),
SmallPetsAllowed tinyint(1),
AllPetsAllowed tinyint(1),
SecuritySystem tinyint(1),
GameRoom tinyint(1),
AirConditioned tinyint(1),
TVIncluded tinyint(1),
Furnished tinyint(1),
PRIMARY KEY (AmenitiesId),
FOREIGN KEY (BuildingId) REFERENCES AptBuilding (BuildingId)
);

CREATE TABLE Recommendation (
UserId VARCHAR(50) NOT NULL,
AptId VARCHAR(50)NOT NULL,
Company VARCHAR(50),
Price INTEGER,
NumBeds INTEGER,
NumBaths INTEGER,
PRIMARY KEY (UserId, AptId),
FOREIGN KEY (UserId) REFERENCES User (UserId),
FOREIGN KEY (AptId) REFERENCES Apartment (AptId)
);
