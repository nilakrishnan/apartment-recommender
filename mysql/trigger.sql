delete trigger if exists update_t
Delimiter $$
CREATE TRIGGER update_t
After INSERT ON Review
for each row
BEGIN
declare counter int default 1;
declare maxi int default 1;
SELECT max(indexid) INTO maxi FROM User;
while counter <= maxi do
IF (((SELECT FLOOR(AVG(ResponsivenessRating)) AS sesponserate FROM Review  NATURAL JOIN User 
WHERE User.UserId= (SELECT UserId FROM User WHERE indexid = counter)
GROUP BY User.UserId) <= NEW.ResponsivenessRating)
and ((SELECT FLOOR(AVG(SecurityDepositReturnedRating)) AS securityrate FROM Review  NATURAL JOIN User 
WHERE User.UserId= (SELECT UserId FROM User WHERE indexid = counter)
GROUP BY User.UserId) <= NEW.SecurityDepositReturnedRating) and 
((SELECT FLOOR(AVG(WeekdayVolumeRating)) AS weekdayrate FROM Review  NATURAL JOIN User 
WHERE User.UserId= (SELECT UserId FROM User WHERE indexid = counter)
GROUP BY User.UserId) <= NEW.WeekdayVolumeRating) and ((SELECT FLOOR(AVG(WeekendVolumeRating)) AS weekendrate FROM Review  NATURAL JOIN User 
WHERE User.UserId= (SELECT UserId FROM User WHERE indexid = counter)
GROUP BY User.UserId) <= NEW.WeekendVolumeRating) and ((SELECT FLOOR(AVG(TransportationProximity)) AS trate FROM Review  NATURAL JOIN User 
WHERE User.UserId= (SELECT UserId FROM User WHERE indexid = counter)
GROUP BY User.UserId) <= NEW.TransportationProximity) and ((SELECT FLOOR(AVG(GreenStProximityRating)) AS gstprox FROM Review  NATURAL JOIN User 
WHERE User.UserId= (SELECT UserId FROM User WHERE indexid= counter)
GROUP BY User.UserId) <= NEW.GreenStProximityRating) AND 
(SELECT FLOOR(AVG(OverallRating)) AS overallrate FROM Review  NATURAL JOIN User 
WHERE User.UserId=(SELECT UserId FROM User WHERE indexid= counter)
GROUP BY User.UserId)<= NEW.OverallRating)
  THEN
 Insert into Recommendation(UserId, AptId, Company, Price, NumBeds, NumBaths)
VALUES((SELECT UserId FROM User WHERE indexid = counter), New.AptId, (SELECT Company FROM Apartment NATURAL JOIN AptBuilding 
WHERE Apartment.AptId =New.AptId),(SELECT Price FROM Apartment NATURAL JOIN AptBuilding 
WHERE Apartment.AptId =New.AptId),(SELECT NumBeds FROM Apartment NATURAL JOIN AptBuilding 
WHERE Apartment.AptId =New.AptId),(SELECT NumBaths FROM Apartment NATURAL JOIN AptBuilding 
WHERE Apartment.AptId =New.AptId));
END IF; 
set counter := counter + 1;
end while;
END$$